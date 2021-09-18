import React, { useState, useEffect } from "react";
import { url } from "../../Utils/Config";
import "./InvitationMain/InvitaionMain.css"
import { Container, Row, Col, Carousel, Form } from "react-bootstrap";
import Header from "../Helpers/Header/Header"
import Icon from "../../Assets/comment.png";
import NavMobile from "../Helpers/NavMobile/NavMobile";
import DesktopNav from "../Helpers/DesktopNav/DesktopNav";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { HiHome } from "react-icons/hi";
import { AiOutlineLike, AiOutlineSync } from "react-icons/ai"
import { GoCalendar, GoLocation } from "react-icons/go"
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import history from "../../Utils/History";
import LoginSignup from "../Auth/LoginSignup";
import { FaUserFriends } from "react-icons/fa";
import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
import { GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import Dateformatter from '../Helpers/DateFormatter/Dateformatter'
import { IoSendSharp } from "react-icons/io5";
import './Invitations.css'
import './InvitationMain/InvitaionMain.css'
import { addEvent } from '../../Redux/DispatchFuncitons/CodeFunctions'
export default function Hoxinvitation(props) {
  const [Invitations, setInvitations] = useState([]);
  const [show, setshow] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const myInvitations = useSelector((state) => state.Eventdata.myInvitations);

  const dispatch = useDispatch();
  useEffect(async () => {
    if (Auth.isLoggedIn === false) {
      if (props.match.params.maincode !== "" && props.match.params.Code !== "" && props.match.params.Code !== undefined) {
        await dispatch(addEvent(props.match.params.Code, props.match.params.maincode))
        // await dispatch(GetInvitations());
        // history.push("/");
      } else if (props.match.params.Code === undefined && props.match.params.maincode !== "") {
        await dispatch(addEvent("All", props.match.params.maincode))
      }
    }
    else {
      await dispatch(GetInvitations());
      myInvitations.map((invite, index) => {
        console.log(invite);
        if (invite[0].MainCode === props.match.params.maincode) {
          history.push("/inv/eventpage/" + index);
        }
      });

    }

  }, [Auth.isLoggedIn]);
  const replacelinks = (desc) => {
    var sindices = [];
    var eindices = [];
    let newdesc = <></>;
    let descpy = desc
    let returnelement = []
    let restafter
    for (var i = 0; i < desc.length; i++) {
      if (desc[i] === "{") sindices.push(i);
      if (desc[i] === "}") eindices.push(i);
    }
    let starting = 0;
    if (sindices.length === 0) {
      return <>{desc}</>
    } else {
      for (var i = 0; i < sindices.length; i++) {

        let restbefore = descpy.substring(starting, sindices[i]);
        let link = descpy.substring(sindices[i] + 1, eindices[i]);
        restafter = descpy.substring(eindices[i] + 1, desc.length);
        starting = eindices[i] + 1;
        returnelement.push(<>{restbefore}</>)
        returnelement.push(<span className="t-blue" >{link}</span>)
        //
      }
      returnelement.push(<>{restafter}</>)
      return (<p>{returnelement.map(elm => (elm))}</p>)
    }
  }
  useEffect(async () => {
    if (props.match.params.Name === undefined) {
      console.log(props.match.params.maincode);
      await axios
        .post(url + "event/viewinvite", {
          MainCode: props.match.params.maincode,
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.Status === "success") {
            let EVENTCPY = [...res.data.Events]
            //  await dispatch(addEvent(res.data.Events[0].code, res.data.Events[0].maincode))
            for (let i = 0; i < EVENTCPY.length; i++) {
              EVENTCPY[i].Description = await replacelinks(EVENTCPY[i].Description)
            }

            await setInvitations(EVENTCPY);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    } else {
      await axios
        .post(url + "event/viewEvent", {
          maincode: props.match.params.maincode,
          Code: props.match.params.Code
        })
        .then(async (res) => {
          if (res.data.Status === "success") {
            let EVENTCPY = [...res.data.Events]
            //  await dispatch(addEvent(res.data.Events[0].code, res.data.Events[0].maincode))
            for (let i = 0; i < EVENTCPY.length; i++) {
              EVENTCPY[i].Description = await replacelinks(EVENTCPY[i].Description)
            }

            await setInvitations(EVENTCPY);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    }

  }, []);

  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <DesktopNav />
      <Popup
        component={LoginSignup}
        toggleShowPopup={setshow}
        showPopup={show}
      />
      <Carousel controls={false} interval={99999999999999} className="mb-10 invitation_carousel">
        {Invitations &&
          Invitations.map((eve, index) => (
            <Carousel.Item
              onClick={() => {
                setshow(true);
              }}
            >
              <Container className="upper-menu">
                <Row
                  style={{
                    marginTop: 20,
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 10,
                  }}
                >
                  <p style={{ color: "black" }}>
                    <HiHome
                      style={{ backgroundColor: "white", borderRadius: "50px" }}
                      size={30}

                    />
                  </p>
                  <Col></Col>
                  <FaUserFriends
                    size={30}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: 20,
                      padding: "0.1em 0.4em",
                    }} />
                </Row>
              </Container>
              <Container className="container-event">
                {eve.filetype === "png" ||
                  eve.filetype === "jpg" ||
                  eve.filetype === "jpeg" ? (
                  <Image src={eve.file} className="fullimagemain" />
                ) : (
                  <video
                    muted
                    type="video/mp4"
                    autoPlay={true}
                    src={eve.file}
                    preload="none"
                    className="w-100"
                    style={{ height: '60vh', objectFit: 'cover' }}
                  />
                )}
                <Container className="box-event" fluid style={{ marginTop: "5vh" }}>

                  <UserDataUrl
                    Phone={eve.Host[0]}
                    showIcon={true}
                    className="m-10px"
                  />
                  <div style={{ position: "relative", float: "right" }}>
                    <IoSendSharp style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "1.5vh",
                    }} />

                    <Image src={Icon} className="go-chat" />
                  </div>
                  <h4 className="avatar-name">
                    <UserDataUrl Phone={eve.Host[0]} showName={true} />
                  </h4>
                  <Form.Control
                    size="sm"
                    placeholder="Write Comment"
                    className="form-control"
                    style={{
                      border: 0,
                      width: "auto",
                      height: "20px",
                      marginLeft: "60px",
                    }}
                  />

                  <br />
                  <Row>
                    <Col>
                      <center>
                        <span className="Like-count">0</span>

                        <AiOutlineLike size="25" className="info-icon"
                          style={{ color: "#4e4e4e" }} />
                      </center>
                    </Col>
                    <Col>
                      <center>

                        <AiOutlineSync size="25"
                          style={{ color: "#4e4e4e" }} />
                      </center>
                    </Col>
                    <Col>
                      <center>

                        <GoCalendar
                          style={{ color: "#4e4e4e" }}
                          size="25" />
                      </center>
                    </Col>
                    <Col>
                      <center>

                        <GoLocation
                          style={{ color: "#4e4e4e" }}
                          size="25" />
                      </center>
                    </Col>
                  </Row>
                  <br />

                  <h3 className="event-date"><Dateformatter Date={eve.Date + " " + eve.Time} /></h3>
                  <p className="event-des">
                    {/* {showfulldescription === false
                      ? eve.Description.slice(0, 50) + "..."
                      : eve.Description} */}
                    {eve.Description}
                  </p>
                  {/* {eve.Description.length > 50 ? (
                    <a
                      href="#"
                      className="invitationmain_link"
                      onClick={() => {
                        setshowfulldescription(!showfulldescription);
                      }}
                    >
                      {showfulldescription === false
                        ? "Show More"
                        : "Show Less"}
                    </a>
                  ) : (
                    <></>
                  )} */}
                </Container>
              </Container>
            </Carousel.Item>
          ))}
      </Carousel>
      <NavMobile />
    </>
  );
}
