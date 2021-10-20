import React, { useState, useEffect } from "react";
import Login from "../../Assets/Auth.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { Grid } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import OtpInput from "react-otp-input";
import Timer from "../Helpers/timer/timer";
import {
  loginuser,
  getopt,
  verifyotp,
} from "../../Redux/DispatchFuncitons/AuthFunctions";
import { Row, Col, Form, Button } from "react-bootstrap";
import history from "../../Utils/History";
export default function LoginSignup() {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [todo, settodo] = useState(0);
  const [step, setStep] = useState(0);
  const [number, setnumber] = useState(0);
  const [error, setError] = useState("");
  const [OTP, SetOPT] = useState();
  const [agree, setAgree] = useState(false);

  const [Phone, setPhone] = useState("");
  let phone = "";
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const handleClick = (e) => {
    phone = "+" + number.toString();
    if (phone.length < 9) {
      setError("Invalid Phone Number");
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
            <img src={Login} alt="login" className="Auth-image" />
            <Grid container spacing={0}>
              <Grid item xs={12} className="modal-title">
                Login
                <p className="modal-title-description">
                  Enter your Mobile Number and Verify to login
                </p>
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
                  type="submit"
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  disabled={!agree}
                  className="get-otp-button"
                >
                  Request OTP
                </Button>
                <Form.Check
                  type="checkbox"
               
                  label="Yes, I want ro recieve important information & updates on my Whatsapp"
                  style={{
                    fontSize: 12,
                    marginTop: "10px",
                    fontWeight: 700
                  }}
                  required
                  onChange={checkboxHandler}
                />
              </Grid>
            </Grid>
          </Form.Group>
       
      </div>
    );
  } else if (step === 1) {
    return (
      <div>
        <div id="recaptcha-container" size="invisible"></div>
        <img src={Login} alt="login" className="Auth-image" />
        <Grid container spacing={0}>
          <Grid item xs={12} className="modal-title">
            Authorized OTP
            <p className="modal-title-description">
              Enter the code you recieved on your number
            </p>
          </Grid>
          <Grid item xs={12} className="modal-title">
            <span style={{ fontSize: 13, color: "#727272" }}>
              Enter One Time Password (OTP)
            </span>
          </Grid>
          <Grid item xs={12} className="modal-title">
        
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
                >
                  Resend OTP
                </button>
              </Col>
            </Row>

            <p
              className="label w-100 tac"
              style={{ marginTop: 10, color: "#727272" }}
            >
              <Timer setStep={setStep} settodo={settodo} />
            </p>
          </Grid>
          <p style={{ fontSize: 9, color: "#727272" }}>
            <b style={{ color: "black" }}>
              Yes, I Want to recieve important information {"&"} updates on my
              Whatsapp{" "}
            </b>
          </p>
        </Grid>
      </div>
    );
  }
}
