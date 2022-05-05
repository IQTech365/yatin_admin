import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BiNews, BiPhotoAlbum, BiCalendarEvent } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import "./NavMobile.css";
import { AiOutlineShopping } from "react-icons/ai";
import history from "../../../Utils/History";
import { useSelector } from "react-redux";

import Popup from "../Popups/Popup";
import Notifications from "../../Notifications/Notification";
import { HiHome } from "react-icons/hi";
export default function NavMobile(props) {
  const [show, setshow] = useState(false);
  const [eventcode, seteventcode] = useState("");
  const Auth = useSelector((state) => state.Auth);
  const [ishost, setishost] = useState(false);

  useEffect(() => {
    if (props.Eventdata && props.Eventdata.length > 0) {
      props.Eventdata[0].Host.map((host) => {
        if (host === Auth.Phone) {
          setishost(true);
        }
      });
      // console.log(props.Eventdata[0].Name);
    }
  }, [props.Eventdata]);
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          zIndex: 255,
        }}
        className="deskhide-nav"
      >
        <Nav
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",

            width: "100vw",
            height: "4.5vh",
          }}
        >
          <Nav.Link
            onClick={() => {
              if (Auth.isLoggedIn === true) {
                history.push("/" + props.base + "/eventpage/" + props.id);
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <BiCalendarEvent size={25} className="reacticons_align" />
            <p className="mobilebar_text">Invites</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              if (Auth.isLoggedIn === true) {
                history.push("/" + props.base + "/albums/" + props.id);
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <BiPhotoAlbum size={25} />
            <p className="mobilebar_text">Albums</p>
          </Nav.Link>

          {/*  <Nav.Link
            onClick={() => {
             if(Auth.isLoggedIn===true){ history.push("/" + props.base + '/eventpage/' + "gift/" + props.id + "/" + props.MainCode);
            }}
            style={{ textDecoration: "none" }}
          >
            <BiGift size={25} style={{ marginLeft: '8px' }} />
            <p className="mobilebar_text_notif">Notifications</p>
          </Nav.Link> */}
          <Nav.Link
            style={{ textDecoration: "none" }}
            onClick={() => {
              history.push("/" + props.base);
            }}
          >
            <HiHome size={30} />
            <p className="mobilebar_text">Home</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              if (Auth.isLoggedIn === true) {
                history.push(
                  "/" +
                    props.base +
                    "/eventpage/" +
                    "feed/" +
                    props.id +
                    "/" +
                    props.MainCode
                );
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <BiNews size={25} />
            <p className="mobilebar_text">Feed</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              if (Auth.isLoggedIn === true) {
                history.push("/" + props.base + "/more/" + props.id);
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <BsThreeDots size={25} />
            <p className="mobilebar_text">More</p>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Popup
        component={Notifications}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={props.MainCode}
        showinvitaions={true}
        eventcode={eventcode}
      />
    </>
  );
}
