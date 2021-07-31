import React, { useState, useEffect } from "react";
import { Container, Row, Button, Form, Image, Col } from "react-bootstrap";
import Logo from "../../Assets/LightLogo.png";

import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import history from "../../Utils/History";
import { loginuser } from "../../Redux/DispatchFuncitons/AuthFunctions";
import LoginSignup from "../Auth/LoginSignup";
import Swiper, { Autoplay } from "react-id-swiper";
import SecondSlide from "../../Assets/SecondSlide.png";
import DancingImg from "../../Assets/DancingImg.jpg";
import DarkLogo from "../../Assets/DarkLogo.png";
import { Provider, LikeButton } from "@lyket/react";


export default function MainBanner() {
  const loop = {
    loop: true,
    Autoplay: {
      delay: 3000,
      slidesPerView:1,
      autoplayDisableOnInteraction: false
    },
   
  };

  const [showPopup, toggleShowPopup] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    let ischeck = reactLocalStorage.get("isLoggedIn");
    let Phone = reactLocalStorage.get("Phone");
    // let Token = reactLocalStorage.get("Token", true);
    if (ischeck === false || ischeck === undefined || ischeck === "") {
      console.log("push");
      history.push("/");
    } else {
      console.log("loginuser");
      dispatch(loginuser(Phone));
    }
  }, []);
  return (
    <Swiper {...loop}>
      {/* Slider One */}
      <Container fluid className="wrapper">
        <Popup
          toggleShowPopup={toggleShowPopup}
          showPopup={showPopup}
          component={LoginSignup}
        />
        <Row>
          <img src={Logo} style={{ margin: "auto" }} />
        </Row>
        <Container className="header_containmain">
          <Row>
            <h3 className="header_heading" style={{ marginTop: "auto" }}>
              A Smarter way to invite
            </h3>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <p className="header_slogan">
              Invite people to celebrate your occasion
            </p>
          </Row>
          <Row
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Form.Control
              type="number"
              placeholder="Working on it"
              className="phonenumber_text"
              disabled
            />
          </Row>
          <Row style={{ marginTop: 13 }}>
            <Button
              variant="primary mobile_numberbtn"
              onClick={() => {
                toggleShowPopup(true);
              }}
            >
              Try Now
            </Button>
          </Row>
          <Row className="row_down">
            <Provider apiKey="acc0dbccce8e557db5ebbe6d605aaa">
              <LikeButton namespace="testing-react"  id="how-to-reduce-footprint" totalLikes="number" />
            </Provider>
            <div className="addthis_inline_share_toolbox">
            </div>
          </Row>
          <Row className="alignthat_btnh">
            <Button
              variant="light mybutton_here"
              onClick={() => {
                toggleShowPopup(true);
              }}
            >
              Login / Signup
            </Button>
          </Row>
        </Container>
      </Container>

      {/*  Slider two */}
      <Container fluid className="wrapper second_slide">
        <Popup
          toggleShowPopup={toggleShowPopup}
          showPopup={showPopup}
          component={LoginSignup}
        />
        <Row>
          <Col style={{display: 'flex', justifyContent: "center"}}>
            <img src={DarkLogo} style={{ margin: "auto" }} />
          </Col>
        </Row>
        <Container className="header_slidertwo">
          <Row>
            <h3 className="secondslide_heading">
              Multiple <br />
              Events
            </h3>
          </Row>
          <Row>
            <p className="secondslide_par">
              Manage Multiple Events Simultaneously
            </p>
          </Row>
          <Row>
            <Image src={SecondSlide} className="image_secondslide" />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Form.Control
              type="number"
              placeholder="Working on it"
              className="phonenumber_text"
              disabled
            />
          </Row>
          <Row>
            <Button
              variant="primary slide_numberbtn"
              onClick={() => {
                toggleShowPopup(true);
              }}
            >
              Try Now
            </Button>
          </Row>

          <Row className="row_down">
          <Provider apiKey="acc0dbccce8e557db5ebbe6d605aaa">
              <LikeButton namespace="testing-react"  id="how-to-reduce-footprint" totalLikes="number" />
            </Provider>
            <div className="addthis_inline_share_toolbox"></div>
          </Row>
          <Row className="alignthat_btnh">
            <Button
              variant="light mybutton_here"
              onClick={() => {
                toggleShowPopup(true);
              }}
            >
              Login / Signup
            </Button>
          </Row>
        </Container>
      </Container>

      {/*  Slider 3 */}
      <Container fluid className="wrapper third_slide">
        <Popup
          toggleShowPopup={toggleShowPopup}
          showPopup={showPopup}
          component={LoginSignup}
        />
        <Row>
        <Col style={{display: 'flex', justifyContent: "center"}}>
            <img src={DarkLogo} style={{ margin: "auto" }} />
          </Col>
        </Row>
        <Container style={{ float: "right" }}>
          <Row>
            <h3 className="secondslide_heading">
              Video <br />
              Invitation
            </h3>
          </Row>
          <Row>
            <p className="secondslide_par">
              Invite people to celebrate your occasion online via Zoom or Meet
            </p>
          </Row>
          <Row>
            {" "}
            <p className="thirdslide_extra">Unlimited Timeless Conferencing*</p>
          </Row>

          <Row style={{ marginTop: 20 }}>
            <Form.Control
              type="number"
              placeholder="Working on it"
              className="phonenumber_text"
              disabled
            />
          </Row>
          <Row>
            <Button
              variant="primary slide_numberbtn"
              onClick={() => {
                toggleShowPopup(true);
              }}
            >
              Try Now
            </Button>
          </Row>
          <Row className="row_down">
          <Provider apiKey="acc0dbccce8e557db5ebbe6d605aaa">
              <LikeButton namespace="testing-react"  id="how-to-reduce-footprint" totalLikes="number" />
            </Provider>
            <div className="addthis_inline_share_toolbox"></div>
          </Row>

          <Row className="alignthat_btnh">
            <Button
              variant="light mybutton_here"
              onClick={() => {
                toggleShowPopup(true);
              }}
            >
              Login/Signup
            </Button>
          </Row>
        </Container>
      </Container>
    </Swiper>
  );
}
