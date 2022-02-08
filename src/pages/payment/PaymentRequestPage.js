import React from "react";

const PaymentRequestPage = (props) => {
  React.useEffect(() => {
    window.GlobalPayments.configure({
      "X-GP-Api-Key": "QwAnDGYZlLNAl6xo9WTZLLMHACbETHqV",
      "X-GP-Environment": "test",
    });
    window.GlobalPayments.on("error", (error) => {});
  }, []);

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
          text: `Make Payment`,
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
      //   styles: confirmPurchaseAddPlan(),
    });

    cardForm.on("token-success", (resp) => {
        console.log('toekn-success--', JSON.stringify(resp));
      //   setOpenEdgeResponse({ status: true, resp, flag: 1 });
      //   setTempToken(resp);
      //   setTokenStatus(true);
    });

    cardForm.on("token-error", (resp) => {
        console.log('toekn-error--', JSON.stringify(resp));
      // var name = resp?.error?.detail && getFieldName(resp?.error?.detail[0]?.data_path)
      // if(resp?.error?.message.match(/card\_number/gi)){
      //     name='card_number';
      //     checkNonEmpty(name, 'Invalid Card')
      // }
      // else{
      //     checkNonEmpty(name, resp.error.message)
      // }
    });

    cardForm.on("card-number-test", (resp) => {
      //   document.getElementById("card_number").style.display = "none";
    });
    cardForm.on("card-expiration-test", (resp) => {
      //   document.getElementById("card").style.display = "none";
    });

    cardForm.on("card-cvv-test", (resp) => {
      //   setCvv(resp.valid);
    });
  }, []);

  return (
    <>
      <div id="card-number"></div>
      <div id="card-expiration"></div>
      <div id="card-cvv"></div>
      <div id="submit"></div>
    </>
  );
};

export default PaymentRequestPage;