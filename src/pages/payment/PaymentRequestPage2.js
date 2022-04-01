import React, { useState, useEffect } from "react";
import styles from './PopupMsg.module.scss';
import css from './PaymentStyles.module.scss';

const initialCCDetails = {
  card_number: '',
  card: '',
  card_security_code: ''
}

const PaymentRequestPage2 = () => {
  const [ccerrors] = React.useState(initialCCDetails);
  const [openEdgeResponse, setOpenEdgeResponse] = useState({});
  const [cardHolderName, setCardHolderName] = useState('');
  const [CVV, setCVV] = useState(false);
  const cardHolderTextId ='card-holder-name';

  React.useEffect(() => {
    window.GlobalPayments.configure({
      "X-GP-Api-Key": "QwAnDGYZlLNAl6xo9WTZLLMHACbETHqV",
      "X-GP-Environment": "test",
      "enableAutocomplete": true
    });
    window.GlobalPayments.on("error", (error) => {});
  }, []);

  React.useEffect(() => {
    if (openEdgeResponse.status) {
      if (!CVV) {
        checkNonEmpty("card_security_code", "Invalid CVV");
      } else if(!cardHolderName){
        checkNonEmpty("card_holder", "Name Required");
      }else {
        const data = { cardHolderName, openEdgeResponse };
        console.log(JSON.stringify(openEdgeResponse));
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    }
  }, [openEdgeResponse]);

  React.useEffect(() => {
    const cardForm = window.GlobalPayments.ui.form({
      fields: {
        "card-number": {
          target: "#card-number",
          placeholder: "**** **** **** ****",
        },
        "card-expiration": {
          target: "#card-expiration",
          placeholder: "MM / YYYY",
        },
        "card-cvv": {
          target: "#card-cvv",
          placeholder: "****",
        },
        submit: {
          target: "#submit",
          text: "Save",
          button: {
            background: "#173654",
            width: "100%",
            "max-width": "349px",
            height: "48px",
            "border-radius": "50px",
            color: "#FFF",
            border: "0px",
            padding: "10px 40px",
            "font-size": "1.125rem",
            margin: "20px auto 40px auto !important",
          },
        },
      },
      styles: {
        button: {
          background: "#173654",
          width: "100%",
          "max-width": "349px",
          height: "48px",
          "border-radius": "50px",
          color: "#FFF",
          border: "0px",
          padding: "10px 40px",
          "font-size": "1.125rem",
          margin: "20px auto 40px auto !important",
          cursor: "pointer",
        },
        input: {
          border: "1px",
          width: "100% !important",
          "max-width": "200px",
          padding: "15px 20px 0px 20px",
          position: "relative",
          bottom: "9px",
          background: "#FFF",
        },
        "input:focus": {
          border: "0px",
          outline: "none",
        },
      },
    });

    cardForm.on("token-success", (resp) => {
      setOpenEdgeResponse({ status: true, resp, flag: 1 });
    });

    cardForm.on("token-error", (resp) => {
      console.log("toekn-error--", JSON.stringify(resp));
      var name =
        resp?.error?.detail && getFieldName(resp?.error?.detail[0]?.data_path);
      if (resp?.error?.message.match(/card\_number/gi)) {
        name = "card_number";
        checkNonEmpty(name, "Invalid Card");
      } else {
        checkNonEmpty(name, resp.error.message);
      }
    });

    cardForm.on("card-number-test", (resp) => {
      document.getElementById("card_number").style.display = "none";
    });
    cardForm.on("card-expiration-test", (resp) => {
      document.getElementById("card").style.display = "none";
    });

    cardForm.on("card-cvv-test", (resp) => {
      if (resp.valid) {
        checkNonEmpty("card_security_code", "");
        // setCvv(resp.valid);
      }
    });
  }, []);

  function getFieldName(path){
    const list = path.split('/');
    var name = list[list.length -1];
    if(['card', 'expiry_month', 'expiry_year'].includes(name)){ name = 'card' }
    return name;
  }

  function getResponse(status, resp, flag) { 
    var name = resp?.error?.detail && getFieldName(resp?.error?.detail[0]?.data_path)
    if(status){
      setOpenEdgeResponse({ status, resp, flag }) 
    }
    else{
      if(resp?.error?.message.match(/card\_number/gi)){
          name='card_number';
          checkNonEmpty(name, 'Invalid Card')
      }
      else{
          checkNonEmpty(name, resp.error.message)
      }
    }
  }

  function checkNonEmpty(name, message) {
    Object.keys(ccerrors).map(item => {
        if(item === name){
          document.getElementById(item).style.display = "block"
          document.getElementById(item).textContent = message;
        }
        else{
          document.getElementById(item).style.display="none"
        }
    })
  }

  const onHandleHolderName = (e) => {
    const value = e.target.value;
    if(value.length == 0){ 
      setCardHolderName(value);
      document.getElementById(cardHolderTextId).style.display = "block"
      document.getElementById(cardHolderTextId).textContent = 'Required';
    }
    else if(/^[\sa-zA-Z]+$/gi.test(value)){
      setCardHolderName(value);
      document.getElementById(cardHolderTextId).style.display="none"
    }
    else { 
      document.getElementById(cardHolderTextId).style.display = "block"
      document.getElementById(cardHolderTextId).textContent = 'Invalid Input';
    }
  }

  return <div className={`tab-pane fade show active ${css.mobile_form_add_card}`} id="creditcard-add" role="tabpanel" aria-labelledby="creditcard-add-tab">
    <div className={`${styles.payment_method_dv}`}>
      <form action="" className={`${styles.account_management_form}`}>
        <div className="form-group">
          <ul className="row">
            <li className={`${styles.m_form} col-lg-6 col-md-6 col-12`}>
              <label>HOLDER NAME</label>
              <div className={`${styles.card_number} ${css.margin_holder_name}`}>
                <input
                  placeholder="**** **** **** ****"
                  value={cardHolderName}
                  onChange={onHandleHolderName}
                  maxLength = {128}
                />
              </div>
              <div id="card-holder-name" className={`${styles.error_message}`}>{ccerrors.cardHolderName}</div>
            </li>
            <li className={`${styles.m_form} col-lg-6 col-md-6 col-12`}>
              <label>CARD NUMBER</label>
              <div id="card-number" className={`${styles.card_number}`}></div>
              <div id="card_number" className={`${styles.error_message}`}></div>
            </li>
            <li className={`${styles.m_form} col-lg-6 col-md-6 col-12`}>
              <label>EXP DATE</label>
              <div id="card-expiration" className={`${styles.card_expiration}`}></div>
              <div id="card" className={`${styles.error_message}`}></div>
            </li>
            <li className={`${styles.m_form} col-lg-6 col-md-6 col-12`}>
              <label>CVV</label>
              <div id="card-cvv" className={`${styles.card_cvv}`}></div>
              <div id="card_security_code" className={`${styles.error_message}`}></div>
            </li>

          </ul>
          <div className={`${styles.form_submission_field} ${styles.acc_addpayment_popup} text-center`}>
            <div className={`${styles.ot_button}`} id="submit"></div>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default PaymentRequestPage2;
