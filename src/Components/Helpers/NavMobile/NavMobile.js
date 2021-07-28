import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { MdEvent } from "react-icons/md";
import { IoImagesSharp, IoPowerSharp } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { GrGallery } from "react-icons/gr";
import { BiNews, BiHomeAlt, BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import "./NavMobile.css";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { BiChevronDown } from "react-icons/bi";
import history from "../../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Popups/Popup";
import Notifications from "../../Notifications/Notification";
export default function NavMobile(props) {
  const [show, setshow] = useState(false);
  const [maincode, setmaincode] = useState("");
  const [eventcode, seteventcode] = useState("");
  const Auth = useSelector((state) => state.Auth);
  const [ishost, setishost] = useState(false);

  useEffect(() => {
    if (props.Eventdata && props.Eventdata.length > 0) {
      props.Eventdata[0].InvId.Host.map((host) => {
        if (host === Auth.Phone) {
          setishost(true);
        }
      });
      console.log(props.Eventdata[0].InvId.Host);
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
          zIndex: 255

        }}
        className="deskhide-nav"
      >
        <Nav
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "23px",
            height: '4.5vh'
          }}
          className="navigation_mobile"
        >
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + '/eventpage/' + props.id);
            }}
            style={{ textDecoration: "none" }}
          >
            <BiHomeAlt size={25} className="reacticons_align" />
            <p className="mobilebar_text">Home</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + '/albums/' + props.id);
            }}
            style={{ textDecoration: "none" }}
          >
            <BiPhotoAlbum size={25} />
            <p className="mobilebar_text">Gallery</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + '/eventpage/' + "feed/" + props.id);
            }}
            style={{ textDecoration: "none" }}
          >
            <BiNews size={25} />
            <p className="mobilebar_text">Feed</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              setshow(true);
            }}
            style={{ textDecoration: "none" }}
          >
            <AiOutlineBell size={25} />
            <p className="mobilebar_text_notif">Notifications</p>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + "/more/" + props.id);
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
