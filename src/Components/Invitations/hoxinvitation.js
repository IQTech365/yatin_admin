import React, { useState, useEffect } from "react";
import { url } from "../../Utils/Config";
import "./InvitationMain/InvitaionMain.css";
import { Container, Carousel, Button } from "react-bootstrap";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Grid } from "@material-ui/core";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import history from "../../Utils/History";
import hoxLogin from "../Auth/hoxLogin";
import Fullsizepopup from "../Helpers/Popups/Fullsizepopup";
import { useSelector, useDispatch } from "react-redux";
import { GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import { BsArrowRightShort } from "react-icons/bs";
import "./Invitations.css";
import "./InvitationMain/InvitaionMain.css";
import { addEvent } from "../../Redux/DispatchFuncitons/CodeFunctions";
import { reactLocalStorage } from "reactjs-localstorage";
import Star1 from "../../Assets/Star1.png";
import date from "../../Assets/date.png";
import offline from "../../Assets/offline.png";
import online from "../../Assets/online.png";

export default function Hoxinvitation(props) {
  const [Invitations, setInvitations] = useState([]);
  const [show, setshow] = useState(false);
  const [showdes, setshowdes] = useState(false);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const Auth = useSelector((state) => state.Auth);
  const myInvitations = useSelector((state) => state.Eventdata.myInvitations);

  const dispatch = useDispatch();
  useEffect(async () => {
    if (Auth.isLoggedIn === false) {
      if (
        props.match.params.maincode !== "" &&
        props.match.params.Code !== "" &&
        props.match.params.Code !== undefined
      ) {
        await dispatch(
          addEvent(props.match.params.Code, props.match.params.maincode)
        );
        // await dispatch(GetInvitations());
        // history.push("/");
      } else if (
        props.match.params.Code === undefined &&
        props.match.params.maincode !== ""
      ) {
        await dispatch(addEvent("All", props.match.params.maincode));
      }
    } else {
      await dispatch(GetInvitations());
      myInvitations.map((invite, index) => {
        console.log(invite);
        if (invite[0].MainCode === props.match.params.maincode) {
          history.push("/inv/eventpage/" + index);
        }
      });
    }
  }, [Auth.isLoggedIn]);

  /*   useEffect(() => {
    const intervalId = setTimeout(() => {
      setshow(true);
    }, 8000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);
 */
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
        returnelement.push(<span className="t-blue">{link}</span>);
        //
      }
      returnelement.push(<>{restafter}</>);
      return <p>{returnelement.map((elm) => elm)}</p>;
    }
  };
  useEffect(async () => {
    debugger;
    let islogeding = reactLocalStorage.get("isLoggedIn");
    let phone = reactLocalStorage.get("Phone");
    if (props.match.params.Code === undefined) {
      console.log(props.match.params.maincode);
      await axios
        .post(url + "event/viewinvite", {
          MainCode: props.match.params.maincode,
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.Status === "success") {
            if (islogeding && phone) {
              if (
                res.data.Events[0].Participants.includes(phone) ||
                res.data.Events[0].Host.includes(phone)
              ) {
                history.push("/home");
              }
            }

            let EVENTCPY = [...res.data.Events];
            //  await dispatch(addEvent(res.data.Events[0].code, res.data.Events[0].maincode))
            for (let i = 0; i < EVENTCPY.length; i++) {
              EVENTCPY[i].Description = await replacelinks(
                EVENTCPY[i].Description
              );
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
          Code: props.match.params.Code,
        })
        .then(async (res) => {
          if (res.data.Status === "success") {
            if (islogeding && phone) {
              if (
                res.data.Events[0].Participants.includes(phone) ||
                res.data.Events[0].Host.includes(phone)
              ) {
                history.push("/home");
              }
            }
            let EVENTCPY = [...res.data.Events];
            //  await dispatch(addEvent(res.data.Events[0].code, res.data.Events[0].maincode))
            for (let i = 0; i < EVENTCPY.length; i++) {
              EVENTCPY[i].Description = await replacelinks(
                EVENTCPY[i].Description
              );
            }
            await EVENTCPY.filter((eve) => {
              return eve.code !== props.match.params.Code;
            });
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
      <Fullsizepopup
        component={hoxLogin}
        toggleShowPopup={setshow}
        showPopup={show}
      />

      <Carousel
        controls={true}
        slide={true}
        interval={7000}
        slide={true}
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
        }}
      >
        {Invitations &&
          Invitations.map((eve, index) => (
            <Carousel.Item>
              {eve.filetype === "png" ||
              eve.filetype === "jpg" ||
              eve.filetype === "jpeg" ? (
                <Image
                  src={eve.file}
                  style={{ height: "100vh", objectFit: "cover", width: "100%" }}
                />
              ) : (
                <video
                  className="w-100"
                  style={{ height: "100vh", objectFit: "cover" }}
                  type="video/mp4"                 
                  autoPlay muted
                >
                  <source src={eve.file} type="video/mp4"></source>
                </video>
              )}
              <Container
                style={{
                  opacity: "0.85",
                  overflow: "scroll",
                }}
                className="hoxInv-container"
              >
                <Grid
                  container
                  spacing={1}
                  style={{ marginTop: "20px", justifyContent: "center" }}
                >
                  <Grid item xs={2}>
                    <UserDataUrl
                      Phone={eve.Host[0]}
                      showIcon={true}
                      className="m-10px"
                    />
                  </Grid>
                  <Grid item xs={7} style={{ marginTop: "2px" }}>
                    <UserDataUrl Phone={eve.Host[0]} showName={true} />

                    <p style={{ fontSize: "12px", color: "#858585" }}>
                      Event Admin
                    </p>
                  </Grid>
                  <Grid item xs={2} style={{ marginTop: "2px" }}>
                    <img src={Star1} />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  style={{ marginTop: "20px", justifyContent: "center" }}
                >
                  <Grid item xs={8}>
                    <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                      {eve.Name}
                    </p>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  style={{ marginTop: "20px", justifyContent: "center" }}
                >
                  <Grid item xs={2}>
                    <img src={date} />
                  </Grid>
                  <Grid item xs={7}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        marginBottom: "0",
                      }}
                    >
                      {eve.Date}
                    </p>
                    <p style={{ fontSize: "12px", color: "#858585" }}>
                      {eve.Time}
                    </p>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                {eve.VenueType === "Offline" ? (
                  <>
                    {" "}
                    <Grid
                      container
                      spacing={1}
                      style={{ marginTop: "20px", justifyContent: "center" }}
                    >
                      <Grid item xs={2}>
                        <img src={offline} />
                      </Grid>
                      <Grid item xs={7}>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            marginBottom: "0",
                          }}
                        >
                          {eve.Location.length > 25
                            ? eve.Location.split(":")[3].replace(
                                /[^a-zA-Z ]/g,
                                ""
                              )
                            : eve.Location.split(":")[3].replace(
                                /[^a-zA-Z ]/g,
                                ""
                              )}
                        </p>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {eve.VenueType === "Online" ||
                eve.VenueType === "Online-Inapp" ? (
                  <>
                    {" "}
                    <Grid
                      container
                      spacing={1}
                      style={{ marginTop: "20px", justifyContent: "center" }}
                    >
                      <Grid item xs={2}>
                        <img src={online} />
                      </Grid>
                      <Grid item xs={7}>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            marginBottom: "0",
                          }}
                        >
                          Online
                        </p>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                <Grid
                  container
                  spacing={1}
                  style={{ marginTop: "20px", justifyContent: "center" }}
                >
                  <Grid item xs={11}>
                    <p style={{ fontSize: "12px"}}>
                      {eve.Description}
                    </p>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <Grid item xs={7}>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#EB304A",
                          borderRadius: "12px",
                          borderColor: "#EB304A",
                          padding: "10px",
                          fontSize: "15px"
                        }}
                        onClick={() => {
                          setshow(true);
                        }}
                      >
                        Join Invite Now! <BsArrowRightShort />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
}
