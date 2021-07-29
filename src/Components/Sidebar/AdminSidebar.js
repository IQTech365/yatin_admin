import React from "react";
import "../Sidebar/Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowRightSLine } from "react-icons/ri";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Component } from "react";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import { IoArrowBackCircleOutline } from "react-icons/io5";
export default function AdminSidebar(props) {
  let Eventdata = [];
  let base = "";
  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents[props.match.params.id]
  );
  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations[props.match.params.id]
  );
  if (props.location.pathname === "/MyEvents/admin/" + props.match.params.id) {
    Eventdata = MyEvents;
    base = "MyEvents";
  } else {
    Eventdata = myInvitations;
    base = "inv";
  }
  console.log(Eventdata);
  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Container className="guestlist-box" style={{ padding: "25px" }}>
        <Row>
          <Col>
            <p style={{
                fontWeight: 600,
                fontSize: 20,
                paddingLeft: "10px",
                marginBottom: 20,
                marginTop: 20,
            
              }}>
              <IoArrowBackCircleOutline
                size={30}
                onClick={() => {
                  history.goBack();
                }}
              />
              Admin
            </p>
          </Col>
        </Row>
        {Eventdata &&
          Eventdata.map((eventdata, index) => (
            <a
              className="linkto-rows"
              onClick={() => {
                history.push(
                  "/" + base + "/admin/" + props.match.params.id + "/" + index
                );
              }}
            >
              <Row className="sidebar-rows">
                <Col style={{ margin: "auto", padding: "10px" }}>{eventdata.Name}</Col>
                <Col>
                  <RiArrowRightSLine size={20} className="arrow-iconcs" />
                </Col>
              </Row>
            </a>
          ))}
      </Container>
    </>
  );
}
