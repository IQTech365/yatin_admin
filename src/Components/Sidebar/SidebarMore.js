import React, { useState, useEffect } from "react";
import "../Sidebar/Sidebar.css";
import { IoArrowBackCircleOutline, IoCall } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Header from "../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import history from "../../Utils/History";
import DancingImg from "../../Assets/DancingImg.png";
import {IoIosArrowBack} from "react-icons/io"
import { GoBook } from "react-icons/go";
import { IoPowerSharp, IoTrashOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import {
  GetEvents,
  GetInvitations, deleteInvite
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { logout } from '../../Redux/DispatchFuncitons/AuthFunctions'
import { Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";

export default function SidebarMore(props) {
  const [base, setbase] = useState("");
  const [ishost, setishost] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [Eventdata, setEventdata] = useState([]);
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
  const [showPopup, toggleShowPopup] = useState(false)
  useEffect(async () => {
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (props.location.pathname === "/MyEvents/more/" + props.match.params.id && MyEvents.length > 0) {
        await setEventdata(MyEvents[props.match.params.id])
        await setbase("MyEvents");
        console.log(Eventdata)
        var Host = MyEvents[props.match.params.id][0].Host;
        for (var i = 0; i < Host.length; i++) {
          if (Host[i] === Auth.Phone) {
            await setishost(true);
            console.log(ishost)
          }
        }
      } else if (props.location.pathname === "/inv/more/" + props.match.params.id && myInvitations.length > 0) {

        await setEventdata(myInvitations[props.match.params.id])
        await setbase("inv");
        console.log(Eventdata)
        var Host = myInvitations[props.match.params.id][0].Host;
        for (var i = 0; i < Host.length; i++) {
          if (Host[i] === Auth.Phone) {
            await setishost(true);
            console.log(ishost)
          }
        }
      }
    }

  }, [myInvitations, MyEvents]);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={showPopup}
      >
        <div className="modal-card">
          <IconButton
            className="popup-close"
            onClick={() => {
              toggleShowPopup(false);
            }}
          >
            <CancelIcon color="secondary" fontSize="large" />
          </IconButton>
          <Row className="m-0"><center><h3 style={{ fontSize: 20, textAlign: 'center', fontWeight: 400 }}>
            Do you want to delete this invite?</h3></center>
          </Row>
          <Row className="m-0" style={{ paddingTop: 20 }}>
            <Col><Button variant="danger"
              style={{ borderRadius: 20 }}
              className="w-100" onClick={() => {
                dispatch(deleteInvite(Eventdata[0].MainCode))
              }} >Yes</Button>
            </Col>
            <Col><Button variant="primary"
              style={{ borderRadius: 20 }} className="w-100" onClick={() => {
                toggleShowPopup(false);
              }}>No</Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Container className="guestlist-box" style={{ padding: "25px" }}>
        <Row style={{boxShadow:'0px 3px 8px -2px rgb(122 122 122 / 33%)', margin:"0"}}>
          <Col>
            <p
              style={{
                fontWeight: 600,
                fontSize: 20,
                paddingLeft: "10px",
                marginTop:'10px'
              }}
            >
              <IoIosArrowBack
                size={30}
                onClick={() => {
                  history.goBack();
                }}
              />
              More
            </p>
          </Col>
        </Row>
        <Image src={DancingImg} className="sidebar_img" />
        <a
          className="linkto-rows"
          onClick={() => {
            history.push("../" + "story/" + props.match.params.id);
          }}
        >
          <Row className="sidebar-rows">
            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                <GoBook size="25" /> Our Story
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>
        {ishost === true ? (
          <a
            className="linkto-rows"
            onClick={() => {
              history.push("/MyEvents/" + 'event-create-success/' + Eventdata[0].MainCode + '/Share');
            }}
          >
            <Row className="sidebar-rows">
              <Col xs={8}>
                <p style={{ margin: "auto", padding: "15px" }}>
                  <IoShareSocialOutline size="25" /> Share
                </p>
              </Col>
              <Col>
                <p>
                  <RiArrowRightSLine size={20} className="arrow-iconcs" />
                </p>
              </Col>
            </Row>
          </a>) : <></>}
        <a
          className="linkto-rows"
          onClick={() => {
            toggleShowPopup(true)
            // dispatch(deleteInvite(Eventdata[0].MainCode))
          }}
        >
          <Row className="sidebar-rows">
            <Col xs={8}>
              <p style={{ margin: "auto", padding: "15px" }}>
                {" "}
                <IoTrashOutline size="25" /> Delete Invite
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>
        {ishost === true ? (
          <a
            className="linkto-rows"
            onClick={() => {
              history.push("/MyEvents/" + "admin/" + props.match.params.id);
            }}
          >
            <Row className="sidebar-rows">
              <Col>
                <p style={{ margin: "auto", padding: "15px" }}>
                  <FaUserAlt size="20" /> Admin
                </p>
              </Col>
              <Col>
                <p>
                  {" "}
                  <RiArrowRightSLine size={20} className="arrow-iconcs" />
                </p>
              </Col>
            </Row>
          </a>
        ) : (
          <></>
        )}


        <a className="linkto-rows">
          <Row className="sidebar-rows">

            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                <IoCall size="25" /> Contact Us
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>
        <a className="linkto-rows" onClick={() => { dispatch(logout()) }}>
          <Row className="sidebar-rows">

            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                <IoPowerSharp size="25" /> Logout
              </p>
            </Col>
            <Col>
              <p>
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>

        {/* <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>Recommendaton</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

        {/*  <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>Prices</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

      </Container>
    </>
  );
}
