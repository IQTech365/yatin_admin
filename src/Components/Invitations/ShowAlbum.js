import React, { useState, useEffect } from "react";
import "./AlbumStyle.css";
import AlbumsNone from "../../Assets/AlbumsNone.jpg";
import { Container, Row, Col, Button, Toast } from "react-bootstrap";
import Header from "../Helpers/Header/Header";
import MobileNav from "../Helpers/NavMobile/NavMobile.js";
import DesktopNav from "../Helpers/DesktopNav/DesktopNav.js";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Select, FormControl } from "@material-ui/core";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { AiFillCaretRight } from "react-icons/ai";
import { uploadString } from "../../Utils/FileUpload_Download";
import { uploadfiletoalbum } from "../../Redux/DispatchFuncitons/Eventfunctions";
import Addtoalbum from "./Addtoalbum";
import { useSwipeable } from "react-swipeable";
import { Swiper, SwiperSlide } from "swiper/react";
import { FcShare } from "react-icons/fc";
import { MdShare } from "react-icons/md";
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper";
SwiperCore.use([Navigation, Thumbs]);
// install Swiper modules

export default function ShowAlbum(props) {
  const [showA, setShowA] = useState(false);
  const [username, setusername] = useState("");
  const toggleShowA = () => setShowA(!showA);
  const [isUploaded, setisUploaded] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [Eventdata, setEventdata] = useState([]);
  const [uniqurl, setuniqurl] = useState("");
  const [Name, setName] = useState("");
  const [IsAdmin, setIsAdmin] = useState(false);
  const [MainCode, setMainCode] = useState("");
  const [base, setbase] = useState("");
  const [images, setimages] = useState([]);
  const [Prevfiles, setPrevfiles] = useState([]);
  const dispatch = useDispatch();
  const [Type, setType] = useState("");
  const [show, setshow] = useState(false);
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  const Auth = useSelector((state) => state.Auth);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
  const [currentmedia, setcurrentmedia] = useState(0);
  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  useEffect(async () => {
    let data = [];
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (
        props.location.pathname ===
        "/MyEvents/albums/" + props.match.params.id &&
        MyEvents.length > 0
      ) {
        console.log(MyEvents[0]);
        data = MyEvents[props.match.params.id][0];
        await setEventdata(data.InvId.Album);
        await setbase("MyEvents");
        await setType(data.InvId.Type);
        await setusername(Auth.Name);
        await setName(data.Name);
        await setMainCode(data.MainCode);
        if (data.Host.includes(Auth.Phone)) {
          await setIsAdmin(true);
        } else {
          await setIsAdmin(false);
        }
        await setuniqurl(data.file);
      } else if (
        props.location.pathname === "/inv/albums/" + props.match.params.id &&
        myInvitations.length > 0
      ) {
        data = myInvitations[props.match.params.id][0];
        console.log(myInvitations[0]);
        await setEventdata(data.InvId.Album);
        await setbase("inv");
        await setusername(Auth.Name);
        await setType(data.InvId.Type);
        await setName(data.Name);
        await setMainCode(data.MainCode);
        if (data.Host.includes(Auth.Phone)) {
          await setIsAdmin(true);
        } else {
          await setIsAdmin(false);
        }
        await setuniqurl(data.file);
      }
      console.log(Eventdata);
    }
  }, [MyEvents, myInvitations]);
  useEffect(() => {
    let imagescpy = [];
    let Prevfilescpy = [];

    if (Eventdata.length > 0) {
      Eventdata.map((eve) => {
        Prevfilescpy.push({ file: eve.file, type: eve.type });
        imagescpy.push({
          file: eve.file,
          type: eve.type,
        });
      });
    }
    setimages(imagescpy);

    setPrevfiles(Prevfilescpy);
    console.log(images);
  }, [Eventdata]);

  const handleOnSubmit = async () => {

    var filesArray = [];
    let file = "";
    const response = await fetch(images[0].file);
    const blob = await response.blob();
    file = new File([blob], "image.jpg", { type: blob.type });
    filesArray = [file];
    // console.log(file);
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      await navigator
        .share({
          title: "Hello👋",
          text:
            "Hi👋 I have added new Images to album for " +
            Name +
            " .Please See  on the Link Below ",

          url: "https://mobillyinvite.com/MyInvitations/" + MainCode,
          files: filesArray,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  const save = async () => {
    let Album = [];
    let uniqueurl =
      props.Type +
      Math.floor(100000 + Math.random() * 900000) +
      "/" +
      "Album/" +
      props.match.params.id +
      Eventdata[0].Name;
    images.map(async (fildeata, index) => {
      if (index > Prevfiles.length) {
        let newurl = await uploadString(
          fildeata.file,
          uniqueurl + "." + fildeata.type
        );
        Album.push({ file: newurl, type: fildeata.type });
      } else {
        Album.push({ file: fildeata.file, type: fildeata.type });
      }
    });
    console.log(Album);
    await dispatch(uploadfiletoalbum(Album, Eventdata[0].MainCode));
    setisUploaded(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentmedia < images.length - 1
        ? setcurrentmedia(currentmedia + 1)
        : setcurrentmedia(0),
    onSwipedRight: () =>
      currentmedia > 0
        ? setcurrentmedia(currentmedia - 1)
        : setcurrentmedia(images.length - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <div>
      <div className="desktop-only w-100">
        <Header className="desktop-only" />
      </div>
      <Addtoalbum
        toggleShowPopup={setshow}
        showPopup={show}
        images={images}
        _id={props.match.params.id}
        eventname={Name}
        Type={Type}
        MainCode={MainCode}
        uniqurl={uniqurl}
      />

      <DesktopNav id={props.match.params.id} base={base} />
      <MobileNav id={props.match.params.id} base={base} MainCode={MainCode} />

      <Container style={{ margin: 0, padding: 0, marginTop: 10 }} fluid>
        <Row className="p-0 m-0">
          <Col xs={5} md={10} className="p-0 m-0">
            {" "}
            <h3 className="p-5px"> Albums</h3>
          </Col>
          <Col xs={2} className="p-0 m-0">
            {IsAdmin === true ? (
              <MdShare onClick={handleOnSubmit} className="share" style={{ float: 'right' }}></MdShare>
            ) : (
              <></>
            )}
          </Col>
          <Col xs={5} md={2} className="p-0 m-0">
            {IsAdmin === true ? (
              <>
                <Button
                  variant="secondary"
                  style={{
                    width: "25% !important",
                    float: "right",
                    borderRadius: "20px",
                  }}
                  className="albumedit_btn"
                  onClick={() => {
                    setshow(true);
                  }}
                >
                  Add/Edit
                </Button>
              </>
            ) : (
              <></>
            )}
          </Col>{" "}
          <p sty>
            {" "}
            <AiFillCaretRight /> {Name}
          </p>
        </Row>
        <br />
        {images.length === 0 ? (
          <>
            {IsAdmin === true ? (
              <>
                {" "}
                <img src={AlbumsNone} className="blank-album" />
                <br />
                <h3 className="tac">Add Albums😍 Now!</h3>
                <p style={{ textAlign: "center" }}>
                  Share with your friends the final pictures of event any time
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="primary"
                    className="addalbums_btn"
                    onClick={() => {
                      setshow(true);
                    }}
                  >
                    Add Albums
                  </Button>
                </div>
              </>
            ) : (
              <>
                {" "}
                <img src={AlbumsNone} className="blank-album" /> <br />
                <h3 className="tac">No Albums😍 Yet!</h3>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    style={{ borderRadius: "20px" }}
                    onClick={toggleShowA}
                  >
                    Ask For Album
                  </Button>
                </div>
                <Container>
                  <Toast
                    show={showA}
                    onClose={toggleShowA}
                    position="top-end"
                    /*  delay={4000} autohide  */ style={{ marginTop: "20px" }}
                  >
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="me-auto">{username}</strong>
                    </Toast.Header>
                    <Toast.Body>Requested Admin for Photos😎</Toast.Body>
                  </Toast>
                </Container>
              </>
            )}
          </>
        ) : (
          <>
            {/* <Swiper {...params}>
              {images.map((img) => (
                <div>
                  <Image
                    alt="img"
                    src={img.file}
                    fluid
                    className="image-gallery-image"
                  />
                </div>
              ))}
            </Swiper> */}
            <Row>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
                style={{
                  marginTop: 0,
                  position: "fixed",
                  outline: "none",
                  left: 0,
                  margin: 0,
                }}
              >
                {images.map((post, index) => (
                  <SwiperSlide>
                    <img
                      src={post.file}
                      key={index}
                      style={{
                        height: "60vh",
                        objectFit: "contain",
                        width: "100%",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
            <Row>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={20}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper"
                style={{
                  bottom: "7vh",
                  width: "100vw",
                  height: "80px",
                  objectFit: "contain",
                  position: "fixed",
                }}
              >
                {images.map((post, index) =>
                  post.fileurl !== "" ? (
                    <SwiperSlide>
                      <img
                        src={post.file}
                        key={index}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "inherit",
                          border: "2px solid lightgrey",
                          borderRadius: "8px",
                        }}
                      />
                    </SwiperSlide>
                  ) : (
                    <></>
                  )
                )}
              </Swiper>
            </Row>
            {/* <Row  {...handlers} style={{ marginTop: 0, position: 'fixed', top: '10vh', outline: 'none', left: 0, margin: 0, height: '65vh' }}>
              {images.map((post, index) => (

                post.file !== "" && index === currentmedia ?
                  <img className="Media" src={post.file} key={index} onClick={() => { setcurrentmedia(index) }} onmo /> : <></>)
              )}

            </Row>
            <Row style={{ marginTop: 5, position: 'fixed', bottom: '15vh', overflowX: 'scroll', width: '100vw', margin: 0, left: 0 }}>
              {images.map((post, index) => (
                post.fileurl !== "" ?
                  <img className="item-options" src={post.file} key={index} onClick={() => { setcurrentmedia(index) }} />
                  : <></>)
              )}


            </Row> */}
          </>
        )}
      </Container>
    </div>
  );
}
