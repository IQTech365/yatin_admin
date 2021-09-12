import React, { useEffect, useState } from "react";
import "./MobileHeader.css";
import { Navbar, Container, Row, Col, Avatar, Image } from "react-bootstrap";
import MobileLogo from "../../../Assets/MobileLogo.png";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../Utils/History";
import { GetEvents } from "../../../Redux/DispatchFuncitons/Eventfunctions";

const MobileHeader = (props) => {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [ishost, setishost] = useState(false);
  const EventState = useSelector((state) => state.Eventdata);
  useEffect(() => {
    if (props.Eventdata && props.Eventdata.length > 0) {
      console.log(EventState);
      props.Eventdata[0].Host.map((host) => {
        if (host === Auth.Phone) {
          setishost(true);
        }
      });
     console.log(props.Eventdata[0].Name);
    }
  }, [props.Eventdata]);


  return (
    <Navbar bg="light" className="mobileheader_nav">
      <Container>
        <Navbar.Brand href="#home">
          <Row>
            <Col>
              <h4>Name</h4>
            </Col>
          </Row>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MobileHeader;
