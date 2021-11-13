import React, { useState, useEffect } from "react";
import Login from "../../Assets/Auth.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { Grid } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import Timer from "../Helpers/timer/timer";
import {
  loginuser,
  getopt,
  verifyotp,
} from "../../Redux/DispatchFuncitons/AuthFunctions";
import {Link} from 'react-router-dom';
import { Row, Col, Form, Button } from "react-bootstrap";
import history from "../../Utils/History";

export default function HoxLogin() {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [todo, settodo] = useState(0);
  const [step, setStep] = useState(0);
  const [number, setnumber] = useState(0);
  const [error, setError] = useState("");
  const [OTP, SetOPT] = useState();
  const [agree, setAgree] = useState(true);
  const [term, setterm] = useState(true);
  const [Phone, setPhone] = useState("");
  let phone = "";
  const checkboxHandler = () => {
    setAgree(!agree);
  };
  const checkboxtermHandler = () => {
    setterm(!term);
  };
  const handleClick = (e) => {
    phone = "+" + number.toString();
    if (phone.length < 9) {
      setError("Invalid Phone Number");
    } else if (!agree) {
      setError("please check the boxes");
    }
    else if (!term) {
      setError("please check the boxes");
    } else {
      dispatch(getopt(phone));
      setPhone(phone);
      setStep(1);
    }
  };

  const handleCheck = () => {
    dispatch(verifyotp(Phone, OTP));
  };
  useEffect(() => {
    if (Auth.isLoggedIn === true) {
      history.push("/home");
    }
  }, [Auth.isLoggedIn]);




  useEffect(() => {
    if (Auth.OTPStatus === true) {

      if (Auth.isVerified === true) {
        dispatch(loginuser(Phone));
      } else if (Auth.isVerified === false) {
        // setStep(1);
      } else {
        setError("please check the input");
      }
    }
  }, [Auth.isVerified, Auth.OTPStatus]);

  if (step === 0) {
    return (
      <div>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <div id="sign-in-button"></div>
         {/*   <img src={Magician} alt="login" className="Auth-image" style={{height: '200px', objectFit:'contain'}} />  */}
          <Grid container spacing={0} style={{position:'fixed', bottom:'0', marginBottom:'30px', padding: '20px'}}>
        
            <Grid item xs={12} className="modal-title">
           
                <p style={{fontSize:'20px', fontWeight:'bold', color:'#ffffff'}}>
                What's your mobile <br /> number?
                </p>
             
             {/*  <p className="modal-title-description">
                Enter your Mobile Number and Verify to login
              </p> */}
            </Grid>
            <Grid item xs={12} className="modal-title">
              <PhoneInput
                country={"in"}
                value={number}
                onChange={(phone) => setnumber(phone)}
                
              />
              <p className="error">{Auth.Message || error}</p>
              <Button
                variant="primary"
                style={{background:'#EB304A', fontWeight: 600}}
                type="submit"
                onClick={(e) => {
                  handleClick(e);
                }}
                disabled={agree === false || term === false}
                className="get-otp-button"
              >
                Continue
              </Button>
            {/*   <Form.Check
                type="checkbox"

                label="Yes, I want to recieve important information & updates on my Whatsapp"
                style={{
                  fontSize: 9,
                  marginTop: "10px",
                  fontWeight: 700,
                }}
                required
                onChange={checkboxHandler}
                checked={agree}
              />

              <Form.Check
                type="checkbox"
                label={(<> I agree to the <Link onClick={() => {
                  history.push("/terms");
                }}>terms and conditions</Link> applied.</>)}
               
                style={{
                  fontSize: 9,
                  marginTop: "3px",
                  fontWeight: 700,

                }}
                required
                onChange={checkboxtermHandler}
                checked={term}
              /> */}
            </Grid>
          </Grid>
        </Form.Group>

      </div>
    );
  } else if (step === 1) {
    return (
      <div>
        <div id="recaptcha-container" size="invisible"></div>
       {/*  <img src={Login} alt="login" className="Auth-image" /> */}
        <Grid container spacing={0} style={{position:'fixed', bottom:'0', marginBottom:'30px', padding: '20px'}}>
         {/*  <Grid item xs={12} className="modal-title">
            Authorized OTP
            <p className="modal-title-description">
              Enter the code you recieved on your number
            </p>
          </Grid> */}
          <Grid item xs={12} className="modal-title">
            <span style={{ fontSize: 15, color: "#ffffff", marginBottom:'10px' }}>
              Enter One Time Password (OTP)
            </span>
          </Grid>
          <Grid item xs={12} className="modal-title" style={{marginTop:'10px'}}>

            <OtpInput
              className="OTP"
              autocomplete="one-time-code"
              value={OTP}
              onChange={(OTP) => SetOPT(OTP)}
              numInputs={6}
              separator={<span></span>}
              inputStyle="Otp-block"
              isInputNum={true}
            />

            <p className="error">{Auth.Message}</p>
            <Row style={{ margin: "auto" }}>
              <Col>
                <button
                  onClick={(e) => {
                    handleCheck();
                  }}
                  className={todo ? "resend-otp" : "get-otp-button"}
                  style={{background:'#EB304A', color:'white', fontWeight:'600', border:'none'}}
                >
                  Verify
                </button>
              </Col>
              <Col>
                <button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  className={todo ? "get-otp-button" : "resend-otp"}
                  style={{border:'none', background:'#ffffff', color:'black', fontWeight:'600'}}
                >
                  Resend OTP
                </button>
              </Col>
            </Row>

            <p
              className="label w-100 tac"
              style={{ marginTop: 10, color: "#ffffff" }}
            >
              <Timer setStep={setStep} settodo={settodo} />
            </p>
          </Grid>
         
        </Grid>
      </div>
    );
  }
}
