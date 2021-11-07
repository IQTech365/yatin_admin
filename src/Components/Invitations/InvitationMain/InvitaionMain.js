import React, { useState, useEffect } from "react";
import "./InvitaionMain.css";
import Header from "../../Helpers/Header/Header";
import { BiVideo } from "react-icons/bi";
import Icon from "../../../Assets/comment.png";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiHome } from "react-icons/hi";
import { GoCalendar, GoLocation } from "react-icons/go";
import Carousel from "react-bootstrap/Carousel";
import UserDataUrl from "../../Helpers/UserData/UserDatajustUrl";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineLike, AiOutlineSync } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import Dateformatter from "../../Helpers/DateFormatter/Dateformatter";
import {
  like_event,
  comment_event,
} from "../../../Redux/DispatchFuncitons/Eventfunctions";
import history from "../../../Utils/History";
import NavMobile from "../../Helpers/NavMobile/NavMobile";
import DesktopNav from "../../Helpers/DesktopNav/DesktopNav";
import { FaUserFriends } from "react-icons/fa";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HelpIcon from "@material-ui/icons/Help";
import { CircularProgress } from "@material-ui/core";
import { IoShareSocialOutline } from "react-icons/io5";

export default function InvitaionMain(props) {
  const dispatch = useDispatch();
  const [comment, setcomment] = useState("");
  const [likeCount, setlikeCount] = useState([]);
  const [MainCode, setmaincode] = useState();
  const [iscommenting, setiscommenting] = useState(false);
  const [commentcountplus, setcommentcountplus] = useState(0);
  const Auth = useSelector((state) => state.Auth);
  const checkiflike = (index) => {
    let likeCountCopy = [...likeCount];
    if (likeCount.length > 0) {
      if (likeCount[index].me === true) {
        likeCountCopy[index].me = false;
        likeCountCopy[index].count -= 1;
      } else {
        likeCountCopy[index].me = true;
        likeCountCopy[index].count += 1;
      }
    } else {
      likeCountCopy[index].me = true;
      likeCountCopy[index].count = 1;
    }
    setlikeCount(likeCountCopy);
  };
  const replacelinks = (desc) => {
    var sindices = [];
    var eindices = [];
    let newdesc = <></>;
    let descpy = desc;
    let returnelement = [];
    let restafter;
    for (var i = 0; i < desc.length; i++) {
      if (desc[i] === "{") sindices.push(i);
      if (desc[i] === "}") eindices.push(i);
    }
    let starting = 0;
    if (sindices.length === 0) {
      return <>{desc}</>;
    } else {
      for (var i = 0; i < sindices.length; i++) {
        let restbefore = descpy.substring(starting, sindices[i]);
        let link = descpy.substring(sindices[i] + 1, eindices[i]);
        restafter = descpy.substring(eindices[i] + 1, desc.length);
        starting = eindices[i] + 1;
        returnelement.push(<>{restbefore}</>);
        returnelement.push(
          <span className="t-blue" onClick={() => window.open(link)}>
            {link}
          </span>
        );
        //
      }
      returnelement.push(<>{restafter}</>);
      return <p>{returnelement.map((elm) => elm)}</p>;
    }
  };
  useEffect(async () => {
    console.log(props.Eventdata);
    if (props.Eventdata && props.Eventdata.length > 0) {
      props.Eventdata[0].Description = await replacelinks(
        props.Eventdata[0].Description
      );
      await setmaincode(props.Eventdata[0].MainCode);
      let countarray = [];
      let liked = false;
      for (let i = 0; i < props.Eventdata.length; i++) {
        if (props.Eventdata[i].LikeList.length <= 0) {
          countarray.push({ count: 0, me: false });
        } else {
          for (let j = 0; j < props.Eventdata[i].LikeList.length; j++) {
            if (props.Eventdata[i].LikeList.LikeBy === Auth.Phone) {
              liked = true;
            } else {
            }
          }
          countarray.push({
            count: props.Eventdata[i].LikeList.length,
            me: liked,
          });
          liked = false;
        }
      }
      console.log(countarray);
      setlikeCount(countarray);
    }
    setcommentcountplus(0);
  }, [props.Eventdata]);
  const share = async (image, filetype, url, Name, Date) => {

    var filesArray = [];
    let file = "";
    const response = await fetch(image);
    const blob = await response.blob();
    if (filetype === "jpeg" || filetype === "png" || filetype === "jpg") {
      file = new File([blob], "image.jpg", { type: blob.type });
      filesArray = [file];
    } else {
      file = await new File([blob], "video." + filetype, { type: blob.type });
      filesArray = [file];
    }
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {


      await navigator
        .share({
          title: "Hello👋",
          text:
            "Hi👋 You Have Been Invited By " +
            " " +
            Auth.Name +
            " " +
            "to" +
            " " +
            Name +
            " " +
            "on" +
            " " +
            Date +
            " " +
            "Please See Your Digital Invite🎉 on the Link Below",

          url: url,
          files: filesArray,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  }
  return (
    <>
      {iscommenting === true ? <CircularProgress style={{
        position: 'fixed', left: '45vw', top: '45vh', zIndex: 999, color: 'red'
      }} /> : <></>}
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <DesktopNav
        id={props.id}
        MainCode={MainCode}
        base={props.base}
        Eventdata={props.Eventdata}
      />
      {/*  <Toggler /> */}
      <Carousel interval={8000} controls={true} slide={true} style={{ height: '92vh', overflow: 'scroll' }}>
        {props.Eventdata &&
          props.Eventdata.map((eve, index) => (
            <Carousel.Item>
              <Container className="upper-menu">
                <Row
                  style={{
                    marginTop: 20,
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 10,
                    zIndex: 200,
                  }}
                >
                  <p style={{ color: "black" }}>
                    <HiHome
                      style={{ backgroundColor: "white", borderRadius: "50px" }}
                      size={30}
                      onClick={() => {
                        history.push("/" + props.base);
                      }}
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
                    }}
                    onClick={() => {
                      history.push(
                        "/" +
                        props.base +
                        "/guestlist/" +
                        props.id +
                        "/" +
                        index
                      );
                    }}
                  />
                </Row>
              </Container>
              <Container className="container-event">
                {eve.filetype === "png" ||
                  eve.filetype === "jpg" ||
                  eve.filetype === "jpeg" ? (
                  <Image src={eve.file} className="fullimagemain" />
                ) : (
                  <video
                    type="video/mp4"
                    autoPlay={true}
                    controls={true}
                    src={eve.file}
                    preload="none"
                    className="w-100 fullimagemain"

                  />
                )}
                <Container
                  className="box-event"
                  fluid
                  style={{ marginTop: "5vh" }}
                >
                  <div
                    style={{ position: "relative", left: "10px", top: "3px" }}
                  >
                    <UserDataUrl
                      Phone={Auth.Phone}
                      showIcon={true}
                      className="m-10px"
                    />
                  </div>
                  <div
                    className="event-chat-buttons"
                    style={{ marginTop: "1vh" }}
                  >
                    <IoSendSharp
                      style={{
                        height: "20px",
                        width: "20px",
                        marginRight: "1.5vh",
                      }}
                      onClick={async () => {
                        if (comment !== "") {
                          await setiscommenting(true)
                          await dispatch(comment_event(eve._id, comment, setiscommenting));
                          setcomment("");

                          await setcommentcountplus(commentcountplus + 1);
                        }
                      }}
                    />

                    <>
                      <span className="Like-count comment_like">
                        {eve.CommentList
                          ? eve.CommentList.length + commentcountplus
                          : 0 + commentcountplus}
                      </span>
                      <Image
                        src={Icon}
                        className="go-chat"
                        onClick={() => {
                          history.push(
                            "/" +
                            props.base +
                            "/comments/" +
                            props.id +
                            "/" +
                            eve._id
                          );
                        }}
                      />
                    </>
                  </div>
                  <h4 className="avatar-name">
                    <UserDataUrl Phone={Auth.Phone} showName={true} />
                  </h4>
                  <Form.Control
                    size="sm"
                    placeholder="Congratulate!"
                    className="form-control"
                    value={comment}
                    onChange={(e) => {
                      setcomment(e.target.value);
                    }}
                    style={{
                      border: 0,
                      width: "auto",
                      height: "20px",
                      marginLeft: "60px",
                      boxShadow: "none",
                    }}
                  />

                  <br />
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <center>
                        {eve.Host.includes(Auth.Phone) ?
                          <FaUserFriends
                            size={30}
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              borderRadius: 20,
                              padding: "0.1em 0.4em",
                            }}
                            onClick={() => {
                              history.push(
                                "/" +
                                props.base +
                                "/guestlist/" +
                                props.id +
                                "/" +
                                index
                              );
                            }}
                          /> : <>
                            <span className="Like-count">
                              {likeCount[index] != undefined
                                ? likeCount[index].count
                                : 0}
                            </span>
                            <AiOutlineLike
                              size="25"
                              className="info-icon"
                              style={{ color: "#4e4e4e" }}
                              onClick={() => {
                                checkiflike(index);
                                dispatch(like_event(eve._id));
                              }}
                            /></>}

                      </center>
                    </Col>
                    <Col

                    >
                      <center>
                        {eve.Host.includes(Auth.Phone) ? <>
                          <IoShareSocialOutline
                            size={30}
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              borderRadius: 20,
                              padding: "0.1em 0.4em",
                            }}
                            onClick={() => {
                              share(eve.file, eve.filetype,
                                "https://mobillyinvite.com/MyInvitations/" + eve.MainCode + '/' + eve.code, eve.Name, eve.Date)
                              // history.push(
                              //   "/" +
                              //   props.base +
                              //   "/event-create-success/" +
                              //   eve.MainCode +
                              //   '/Share'
                              // );
                            }}
                          />
                        </> :
                          <div onClick={() => {
                            history.push("/" + props.base + "/rsvp/" + props.id);
                          }}>
                            <IsRsvp RSVPList={eve.RSVPList} />
                            <AiOutlineSync
                              size="25"
                              style={{ color: "#4e4e4e" }}
                            />
                            {/* <Image
                            src={RSVP}

                            className="info-icon"
                          /> */}
                          </div>}
                      </center>
                    </Col>
                    <Col>
                      <center>
                        <GoCalendar
                          style={{ color: "#4e4e4e" }}
                          size="25"
                          onClick={() => {
                            history.push(
                              "/" +
                              props.base +
                              "/schedule/" +
                              props.id +
                              "/" +
                              index
                            );
                          }}
                        />
                        {/*  <Image
                          src={CalendarIcon}
                          
                        /> */}
                      </center>
                    </Col>
                    <Col>
                      <center>
                        <p>
                          {" "}
                          {eve.VenueType == "Online-Inapp" && "Online" ? (
                            <BiVideo
                              style={{ color: "#4e4e4e" }}
                              size="26"
                              onClick={() => {
                                history.push(
                                  "/" +
                                  props.base +
                                  "/location/" +
                                  props.id +
                                  "/" +
                                  index
                                );
                              }}
                            />
                          ) : (
                            <GoLocation
                              style={{ color: "#4e4e4e" }}
                              size="25"
                              onClick={() => {
                                history.push(
                                  "/" +
                                  props.base +
                                  "/location/" +
                                  props.id +
                                  "/" +
                                  index
                                );
                              }}
                            />
                          )}
                        </p>

                        {/*  <Image
                          src={Location}
                          
                        /> */}
                      </center>
                    </Col>
                  </Row>


                  <h2 className="event-date" style={{ marginTop: '5px' }}>{eve.Name}</h2>
                  <h3 className="event-date">
                    <Dateformatter Date={eve.Date + " " + eve.Time} />
                  </h3>
                  <p className="event-des">
                    {eve.Description}
                    {/* {showfulldescription === false
                      ? eve.Description.slice(0, 50) + "..."
                      : eve.Description} */}
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
      <NavMobile
        className="footnavmobile"
        id={props.id}
        MainCode={MainCode}
        base={props.base}
        Eventdata={props.Eventdata}
      />
    </>
  );
}
export function IsRsvp(props) {
  const Auth = useSelector((state) => state.Auth);
  const [showicon, setshowicon] = useState("");
  useEffect(() => {
    for (let i = 0; i < props.RSVPList.length; i++) {
      if (
        props.RSVPList[i].By === Auth.Phone &&
        props.RSVPList[i].Status === "Accept"
      ) {
        setshowicon("Accept");
      } else if (
        props.RSVPList[i].By === Auth.Phone &&
        props.RSVPList[i].Status === "May Be"
      ) {
        setshowicon("May Be");
      } else if (
        props.RSVPList[i].By === Auth.Phone &&
        props.RSVPList[i].Status === "Decline"
      ) {
        setshowicon("Decline");
      } else {
      }
    }
    console.log(showicon);
  }, [props.RSVPList]);
  return (
    <span className="RSVP-count">
      {showicon === "Accept" ? (
        <CheckCircleIcon style={{ color: "Green" }} />
      ) : showicon === "Decline" ? (
        <CancelIcon color="secondary" />
      ) : showicon === "May Be" ? (
        <ErrorIcon style={{ color: "#dec509" }} />
      ) : (
        <HelpIcon color="primary" />
      )}
    </span>
  );
}
