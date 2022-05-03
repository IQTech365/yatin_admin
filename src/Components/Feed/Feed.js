import React, { useState, useEffect, useCallback } from "react";
import "../Feed/Feed.css";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import zoomicon from "../../Assets/zoomicon.png";
import axios from "axios";
import { addpost } from "../../Redux/DispatchFuncitons/postfunctions";
import { uploadString } from "../../Utils/FileUpload_Download";
import { useDropzone } from "react-dropzone";
import "react-bootstrap-tagsinput/dist/index.css";
import history from "../../Utils/History";
import { url } from "../../Utils/Config";
import { Modal } from "@material-ui/core";
import Media from "./Media";
import NavMobile from "../Helpers/NavMobile/NavMobile";
import AddTags from "./AddTags";
import Popup from "../Helpers/Popups/Popup";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Postrender from "./Posts";
import AddPost from "./AddPost";
import Lottie from "react-lottie";
import animationData from "../Animations/blankfeed.json";
import blankfeed from "../../Assets/blankfeed.svg";

export default function Feed(props) {
  const Auth = useSelector((state) => state.Auth);
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
  const dispatch = useDispatch();

  const [isSubmit, setisSubmit] = useState(false);
  const [isloaded, toggleisloaded] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const [ShowTagQuery, setShowTagQuery] = useState(false);
  const [showcommment, setshowcommment] = useState(false);
  const [currentPosts, setcurrentPosts] = useState([]);
  const [currentfilteredPosts, setcurrentfilteredPosts] = useState([]);
  const [participant, setparticipant] = useState([]);
  const [Eventdata, setEventdata] = useState([]);
  const [admins, setadmins] = useState([]);
  const [Tags, setTags] = useState([]);
  const [base, setbase] = useState("");
  const [filter, setfilter] = useState("All");
  const [caption, setcaption] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [type, settype] = useState("");
  const [popuptype, setpopuptype] = useState("");
  const [showcommmentforpost, setshowcommmentforpost] = useState(null);

  const defaultOptions = {
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(async () => {
    getposts();
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      dispatch(GetEvents());
      dispatch(GetInvitations());
    } else {
      setfilter("All");
      if (
        props.location.pathname ===
          "/MyEvents/eventpage/feed/" +
            props.match.params.id +
            "/" +
            props.match.params.MainCode &&
        MyEvents.length > 0
      ) {
        setEventdata(MyEvents[props.match.params.id]);

        setbase("MyEvents");
        setadmins(MyEvents[props.match.params.id][0].Host);

        guestlist([
          ...MyEvents[props.match.params.id][0].Participants,
          ...MyEvents[props.match.params.id][0].Host,
        ]);
      } else if (
        props.location.pathname ===
          "/inv/eventpage/feed/" +
            props.match.params.id +
            "/" +
            props.match.params.MainCode &&
        myInvitations.length > 0
      ) {
        setEventdata(myInvitations[props.match.params.id]);
        // await setisAdmin(true)

        setbase("inv");
        setadmins(myInvitations[props.match.params.id][0].Host);
        guestlist([
          ...myInvitations[props.match.params.id][0].Participants,
          ...myInvitations[props.match.params.id][0].Host,
        ]);
      }
    }
  }, [MyEvents, myInvitations]);

  const submit = async () => {
    setisSubmit(true);
    var d = new Date();
    let unique = d.getTime();
    let url = Eventdata[0].MainCode + unique + "." + type;
    console.log(url);
    let newurl = "";
    if (imageurl !== "") {
      newurl = await uploadString(imageurl, url);
    }
    dispatch(
      addpost(
        Eventdata[0].MainCode,
        Auth.Phone,
        newurl,
        type,
        Tags,
        caption,
        setisSubmit
      )
    );
    setcaption("");
    setimageurl("");
    settype("");
    setTags([]);
    //await setisSubmit(false);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }
    let url = "";
    let ftype = acceptedFiles[0].type.split("/");
    settype(ftype[0]);
    var reader = new FileReader();
    reader.onload = async function () {
      url = reader.result;
      setimageurl(url);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
  });

  const getposts = async () => {
    if (props.match.params.id !== undefined && props.match.params.id !== "") {
      axios
        .post(url + "post/getposts", { maincode: props.match.params.MainCode })
        .then(async function (response) {
          toggleisloaded(true);

          setcurrentPosts(response.data.Posts);
          filterposts(response.data.Posts, Eventdata[0].Host);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  };
  const filterposts = async (Posts, admins) => {
    let Postscpy = [];
    for (let i = 0; i < Posts.length; i++) {
      if (admins.includes(Posts[i].by) === true) {
        Postscpy.push(Posts[i]);
      }
    }
    await setcurrentfilteredPosts(Postscpy);
  };

  const guestlist = async (Participants) => {
    var ParticipantsCPY = [];
    for (let i = 0; i < Participants.length; i++) {
      var Phone = "";
      if (Participants[i] !== Auth.Phone) {
        if (typeof Participants[i] === "string") {
          Phone = Participants[i].includes("+")
            ? Participants[i]
            : "+91" + Participants[i];
        } else {
          Phone = Participants[i].toString().includes("+")
            ? Participants[i]
            : "+91" + Participants[i];
        }

        // await axios
        //   .post(url + "auth/getuserdetails", {
        //     Phone: Phone,
        //   })
        //   .then(async (res) => {
        //     if (res.data.user) {
        //       await ParticipantsCPY.push({
        //         name: res.data.user.Name,
        //         id: Participants[i],
        //       });
        //     } else {
        //       await ParticipantsCPY.push({
        //         name: Participants[i],
        //         id: Participants[i],
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     return { err: "error 404" };
        //   });
      }
    }
    console.log(Participants);
    setparticipant(Participants);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getposts();
    }, 3000);
    return () => clearInterval(interval);
  }, [Eventdata]);

  useEffect(() => {
    console.log(admins);
    console.log(admins.includes("+917447525123"));
  }, [filter]);

  return (
    <>
      <NavMobile
        base={base}
        id={props.match.params.id}
        MainCode={props.match.params.MainCode}
      />
      <Popup
        component={AddTags}
        toggleShowPopup={setShowTagQuery}
        showPopup={ShowTagQuery}
        MainCode={[...participant]}
        showall={setTags}
        url={Tags}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="f-s-modal"
        open={showPopup}
        onClose={() => {
          toggleShowPopup(false);
        }}
      >
        <Container fluid className="p-0 m-0">
          <div className="f-s-modal-card ">
            <Media
              toggleShowPopup={toggleShowPopup}
              currentPosts={currentPosts}
              popuptype={popuptype}
            />
          </div>
        </Container>
      </Modal>
      <Container className="guestlist-box" fluid>
        <div className="back-navigation desktop-only">
          <Row style={{ marginTop: 5, marginRight: 3, marginLeft: 3 }}>
            <IoArrowBackCircleOutline
              size={40}
              style={{ color: "black" }}
              onClick={() => history.goBack()}
            />
            <h3 style={{ color: "black", fontSize: 28, fontWeight: "900" }}>
              Feed
            </h3>
          </Row>
        </div>
        {Eventdata && Eventdata.length > 0 ? (
          <>
            {Eventdata[0].filetype === "png" ||
            Eventdata[0].filetype === "jpg" ||
            Eventdata[0].filetype === "jpeg" ? (
              <Image src={Eventdata[0].file} fluid style={{ height: "30vh" }} />
            ) : (
              <video
                muted
                type="video/mp4"
                autoPlay={true}
                src={Eventdata[0].file}
                preload="none"
                className="w-100"
                style={{ height: "30vh" }}
              />
            )}
          </>
        ) : (
          <></>
        )}

        <Image src={zoomicon} className="profile-avatar" />
        <h3 className="event-headings">
          {Eventdata[0] ? Eventdata[0].Name : ""}
        </h3>

        <div className="select-list">
          <Row className="p-0 m-0">
            <Col>
              <Button
                variant="outline-primary"
                style={{ width: "30vw", borderRadius: 20 }}
                onClick={async () => {
                  await setpopuptype("Photo");
                  toggleShowPopup(true);
                }}
              >
                Photos
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={async () => {
                  await setpopuptype("Videos");
                  toggleShowPopup(true);
                }}
                style={{ width: "30vw", borderRadius: 20, marginLeft: 20 }}
              >
                Videos
              </Button>
            </Col>
          </Row>
        </div>
        <div className="select-list mt-10px">
          <Row className="filterbox">
            <Col
              onClick={async () => {
                await setfilter("All");
                // await filterposts(currentPosts);
              }}
              className={filter === "All" ? "filter-type" : ""}
            >
              <span style={{ width: "30vw", borderRadius: 20 }}>All</span>
            </Col>
            <Col
              onClick={async () => {
                await setfilter("Update");

                // await filterposts(currentPosts);
              }}
              className={filter === "Update" ? "filter-type" : ""}
            >
              <span style={{ width: "30vw", borderRadius: 20 }}> Update</span>
            </Col>
          </Row>
        </div>
      </Container>

      {isSubmit === true ? (
        <center>
          <CircularProgress style={{ color: "black" }} />
        </center>
      ) : (
        <AddPost
          settype={settype}
          setimageurl={setimageurl}
          setcaption={setcaption}
          caption={caption}
          submit={submit}
          setShowTagQuery={setShowTagQuery}
          imageurl={imageurl}
          isSubmit={isSubmit}
          type={type}
        />
      )}
      {currentPosts.length <= 0 ? (
         <>
         <Lottie options={defaultOptions} height={200} width={400} />
         <p style={{ textAlign: "center", fontWeight: "600" }}>No Posts!</p>
       </>
      ) : (
       ""
      )}
      {isloaded === false ? (
        <center>
          <CircularProgress style={{ color: "black" }} />
        </center>
      ) : (
        <Postrender
          data={currentPosts}
          filter={filter}
          filterdata={currentfilteredPosts}
          getposts={getposts}
          Eventdata={Eventdata}
          showcommmentforpost={showcommmentforpost}
          showcommment={showcommment}
          Maincode={props.match.params.Maincode}
          setshowcommmentforpost={setshowcommmentforpost}
          setshowcommment={setshowcommment}
          admins={admins}
        />
      )}
    </>
  );
}
