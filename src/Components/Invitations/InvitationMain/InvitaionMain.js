import React, { useState, useEffect } from "react";
import "./InvitaionMain.css";
import Header from "../../Helpers/Header/Header";
import { BiVideo } from "react-icons/bi";
import Icon from "../../../Assets/comment.png";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import platform from "platform";
import { WhatsappShareButton } from "react-share";
import Form from "react-bootstrap/Form";
import ShareVideo from "../../../Assets/ShareVideo.mp4";
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
import { FiShare2 } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HelpIcon from "@material-ui/icons/Help";
import { CircularProgress } from "@material-ui/core";
import { IoShareSocialOutline } from "react-icons/io5";
import { FcShare } from "react-icons/fc";
import { FiGift } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiEditCircleFill } from "react-icons/ri";

import Media from "../../RenderMedia/Media";
import OptionModal from "../../OptionModal/OptionModal";
import ConnectGuestModal from "../../ConnectGuestModal/ConnectGuestModal";

export default function InvitaionMain(props) {
  const dispatch = useDispatch();
  const [comment, setcomment] = useState("");
  const [likeCount, setlikeCount] = useState([]);
  const [MainCode, setmaincode] = useState();
  const [iscommenting, setiscommenting] = useState(false);
  const [commentcountplus, setcommentcountplus] = useState(0);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [openConnectGuestModal, setConnectGuestModal] = useState(false);
  const [selectedOptionModal, setSelectedOptionModal] = useState({
    title: "Like",
    id: 1,
    icon: <AiOutlineLike size={22} />,
  });

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
    const response = await fetch(ShareVideo);
    const blob = await response.blob();
    const file = new File([blob], "share.mp4", { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
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
          files: [file],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  const shareios = async (image, filetype, url, Name, Date) => {
    if (navigator.share) {
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
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  const _onCloseOptionModal = (value) => {
    setSelectedOptionModal(value);
    setOpenOptionModal(false);
  };

  const _onCloseConnectGuestModal = () => {
    //
  };

  React.useEffect(() => {
    if (selectedOptionModal.id === 3) {
      setConnectGuestModal(true);
    } else {
      setConnectGuestModal(false);
    }
  }, [selectedOptionModal]);

  return (
    <>
      {iscommenting === true ? (
        <CircularProgress
          style={{
            position: "fixed",
            left: "45vw",
            top: "45vh",
            zIndex: 999,
            color: "red",
          }}
        />
      ) : (
        <></>
      )}
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
      <Carousel
        interval={8000}
        controls={true}
        slide={true}
        style={{ height: "92vh", overflow: "scroll" }}
      >
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
                  {true ? (
                    <></>
                  ) : (
                    <>
                      {" "}
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
                    </>
                  )}
                </Row>
              </Container>
              <Container className="container-event">
                {eve.filetype.includes("media") ? (
                  <Media CurrentEventDetails={eve} isEditable={false} />
                ) : eve.filetype === "png" ||
                  eve.filetype === "jpg" ||
                  eve.filetype === "jpeg" ? (
                  <Image src={eve.file} className="fullimagemain" />
                ) : (
                  <video
                    type="video/mp4"
                    autoPlay={true}
                    controls={true}
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
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
                  {eve.Host.includes(Auth.Phone) ? (
                    <span
                      onClick={() => {
                        share(
                          eve.file,
                          eve.filetype,
                          "https://mobillyinvite.com/MyInvitations/" +
                            eve.MainCode,
                          eve.Name,
                          eve.Date
                        );
                        // history.push(
                        //   "/" +
                        //   props.base +
                        //   "/event-create-success/" +
                        //   eve.MainCode +
                        //   '/Share'
                        // );
                      }}
                      style={{ width: "100%" }}
                    >
                      Share <FiShare2 />
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        history.push("/" + props.base + "/rsvp/" + props.id);
                      }}
                      style={{ width: "100%" }}
                    >
                      RSVP <IsRsvp RSVPList={eve.RSVPList} />
                      <AiOutlineSync />
                    </span>
                  )}
                  {/* <div
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
                          await setiscommenting(true);
                          await dispatch(
                            comment_event(eve._id, comment, setiscommenting)
                          );
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
                  /> */}
                </Container>
                <br />
                <Container>
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <center className="icon-labels">
                        {eve.Host.includes(Auth.Phone) ? (
                          <>
                            <FiUsers
                              size={22}
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
                            <br />
                            <>GuestList</>
                          </>
                        ) : (
                          <>
                            <FiUsers
                              size={22}
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
                            <br />
                            <>GuestList</>
                          </>
                        )}
                      </center>
                    </Col>
                    <Col>
                      <center className="icon-labels">
                        {eve.Host.includes(Auth.Phone) ? (
                          <>
                            {platform.name === "Safari" &&
                            platform.version.split(".")[0] >= 13 ? (
                              <>
                                {/* <WhatsappShareButton
                                url={"https://mobillyinvite.com/MyInvitations/" +
                                  eve.MainCode +
                                  "/" +
                                  eve.code}
                                title={
                                  "Hi👋 You Have Been Invited By " +
                                  " " +
                                  Auth.Name +
                                  " " +
                                  "to" +
                                  " " +
                                  eve.Name +
                                  " " +
                                  "on" +
                                  " " +
                                  eve.Date +
                                  " " +
                                  "Please See Your Digital Invite🎉 on the Link Below"
                                }
                                separator=" "
                                className="Demo__some-network__share-button"
                              > */}

                                <FiGift
                                  size={23}
                                  onClick={() => {
                                    history.push(
                                      "/" +
                                        props.base +
                                        "/eventpage/" +
                                        "gift/" +
                                        props.id +
                                        "/" +
                                        eve.MainCode
                                    );
                                  }}
                                />
                                <br />
                                <>Add Gift</>
                              </>
                            ) : (
                              <>
                                {" "}
                                {/* <FiGift size={23} /> */}
                                {selectedOptionModal.icon}
                                <RiEditCircleFill
                                  size="15"
                                  style={{ color: "#3897f1", marginTop: -15 }}
                                  onClick={() => setOpenOptionModal(true)}
                                />
                                <br />
                                {/* <>Buy Gift</> */}
                                {selectedOptionModal.title}
                                {/* {" "}
                                <FiShare2
                                  size={23}
                                  onClick={() => {
                                    share(
                                      eve.file,
                                      eve.filetype,
                                      "https://mobillyinvite.com/MyInvitations/" +
                                      eve.MainCode +
                                      "/" +
                                      eve.code,
                                      eve.Name,
                                      eve.Date
                                    );
                                    // history.push(
                                    //   "/" +
                                    //   props.base +
                                    //   "/event-create-success/" +
                                    //   eve.MainCode +
                                    //   '/Share'
                                    // );
                                  }}
                                /> */}
                              </>
                            )}
                          </>
                        ) : (
                          <center className="icon-labels">
                            {" "}
                            <FiGift size="25" style={{ color: "#4e4e4e" }} />
                            <br />
                            {/* <>Buy Gift</>{" "} */}
                            {selectedOptionModal.title}
                          </center>
                        )}
                      </center>
                    </Col>
                    <Col>
                      <center className="icon-labels">
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
                        <br />
                        <>Schedule</>
                      </center>
                    </Col>
                    <Col>
                      <center className="icon-labels">
                        {eve.VenueType == "Online-Inapp" && "Online" ? (
                          <BiVideo
                            style={{ color: "#4e4e4e" }}
                            size="28"
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
                        <br />
                        <>Location</>
                      </center>
                    </Col>
                  </Row>
                  <h2 className="event-date" style={{ marginTop: "5px" }}>
                    {eve.Name}
                  </h2>
                  <h3 className="event-date">
                    <Dateformatter Date={eve.Date + " " + eve.Time} />
                  </h3>
                  <p className="event-des">
                    {eve.Description}
                    {/* {showfulldescription === false
                      ? eve.Description.slice(0, 50) + "..."
                      : eve.Description} */}
                  </p>{" "}
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
      <OptionModal
        onClose={_onCloseOptionModal}
        open={openOptionModal}
        selectedValue={selectedOptionModal}
      />
      <ConnectGuestModal
        onClose={_onCloseConnectGuestModal}
        open={openConnectGuestModal}
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
