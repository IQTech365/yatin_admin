import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../Guest/Guest.css";
import Header from "../Helpers/Header/Header";
import { IoMdPersonAdd } from "react-icons/io";
import history from "../../Utils/History";
import Userdataurl from "../Helpers/UserData/UserDatajustUrl";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { Grid } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import {
  addCohost,
  removeCohost,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import Backdrop from "@material-ui/core/Backdrop";

export default function Guest(props) {
  const dispatch = useDispatch();
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
  const Auth = useSelector((state) => state.Auth);
  const [Hosts, setHosts] = useState([]);
  const [guestList, setguestList] = useState([]);
  const [guestListaccept, setguestListaccept] = useState([]);
  const [guestListdecline, setguestListdecline] = useState([]);
  const [guestListmaybe, setguestListmaybe] = useState([]);
  const [shouldchange, setshouldchange] = useState(false);
  const [eid, seteid] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [base, setbase] = useState("");
  useEffect(async () => {
    let RSVPList = [];
    let Participants = [];
    let accept = [];
    let decline = [];
    let maybe = [];
    let data = [];
    let all = [];
    if (
      props.location.pathname ===
      "/MyEvents/guestlist/" +
      props.match.params.id +
      "/" +
      props.match.params.invno &&
      MyEvents.length > 0
    ) {
      data = MyEvents[props.match.params.id][props.match.params.invno];
      await setbase("MyEvents");
    } else {
      data = myInvitations[props.match.params.id][props.match.params.invno];
      await setbase("inv");
    }

    RSVPList = _.orderBy(data.RSVPList, "By", "asc");
    Participants = [...data.Participants, ...data.Host].sort();
    await setguestList(Participants);
    await setHosts(data.Host);
    await seteid(data._id);
    if (data.Host.includes(Auth.Phone)) {
      await setisAdmin(true);
    } else {
      await setisAdmin(false);
    }
    RSVPList.map((rsvp) => {
      if (Participants.includes(rsvp.By)) {
        if (rsvp.Status === "Accept") {
          accept.push(rsvp);
        }
        if (rsvp.Status === "Decline") {
          decline.push(rsvp);
        }
        if (rsvp.Status === "May Be") {
          maybe.push(rsvp);
        }
      }
    });
    let allrsvp = [...accept, ...decline, ...maybe];

    for (let i = 0; i < Participants.length; i++) {
      let Status = "Invited";
      let found = false;
      for (let j = 0; j < allrsvp.length; j++) {
        if (allrsvp[j].By === Participants[i]) {
          found = true;
          Status = allrsvp[j].Status;
        }
      }
      all.push({ By: Participants[i], Status: Status });
      found = false;
    }
    await setshouldchange(true);
    all = [...new Set(all)];
    await setguestList(all);

    await setguestListaccept(accept);
    await setguestListdecline(decline);
    await setguestListmaybe(maybe);
  }, [myInvitations, MyEvents]);
  return (
    <div>
      <div className="desktop-only w-100">
        <Header className="desktop-only" />
      </div>
      <Container fluid className="guest-box">
        <Row
          style={{
            marginTop: 30,
            marginRight: 3,
            marginLeft: 3,
            width: "100%",
          }}
        >
          <Col xs={10}>

            <p style={{ fontWeight: "bold", fontSize: 20 }}>
              <IoIosArrowBack
                size={32}
                onClick={() => {

                  history.push(
                    "/" + base + "/eventpage/" + props.match.params.id
                  );
                }}
              />
              View Guest
            </p>
          </Col>
          <Col>
            {isAdmin === true ? (
              <span
                style={{ fontWeight: "500", fontSize: 20 }}
                onClick={() => {
                  history.push(
                    "/MyEvents" +
                    "/Manage-GuestList/" +
                    props.match.params.id +
                    "/" +
                    props.match.params.invno
                  );
                }}
              >
                <IoMdPersonAdd />
                <span className="manage_guest">Manage Guests</span>
              </span>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row
          style={{
            fontSize: "14px",
            fontWeight: "600",
            marginLeft: "auto",
            marginTop: 20,
          }}
        >
          <Col>
            <Tabs defaultActiveKey="All" className="tabs_guestlist">
              <Tab eventKey="All" title="All">
                {guestList.map((guest) => (
                  <Grid className="p-5px" container spacing={0}>
                    <Grid item xs={2} md={1}>
                      <Userdataurl showIcon={true} Phone={guest.By} />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid item xs={12} className="m-0 ">
                        <Userdataurl showName={true} Phone={guest.By} />
                      </Grid>
                      <Grid item xs={12} className="m-0 ">
                        <span
                          style={{ fontWeight: 'bold' }}
                          className={
                            guest.Status === "Accept"
                              ? "user-accept"
                              : guest.Status === "Decline"
                                ? "user-decline"
                                : guest.Status === "May Be"
                                  ? "user-maybe"
                                  : "user-invited"
                          }
                        >
                          {guest.Status}
                        </span>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      {isAdmin === true ? (
                        Hosts.includes(guest.By) === false ? (
                          <>
                            {shouldchange === false ? (
                              <>...</>
                            ) : (
                              <button
                                className="addHostButton"
                                onClick={async () => {
                                  setshouldchange(false);
                                  await dispatch(addCohost(eid, guest.By));
                                }}
                                onDoubleClick={async () => {
                                  setshouldchange(false);
                                  await dispatch(addCohost(eid, guest.By));
                                }}
                              >
                                <>
                                  {" "}
                                  <StarsIcon /> Add Co-Host
                                </>
                              </button>
                            )}
                          </>
                        ) : guest.By !== Auth.Phone ? (
                          <center>
                            {" "}
                            {shouldchange === false ? (
                              <>...</>
                            ) : (
                              <button
                                className="removeHostButton"
                                onClick={async () => {
                                  setshouldchange(false);
                                  await dispatch(removeCohost(eid, guest.By));
                                }}
                                onDoubleClick={async () => {
                                  setshouldchange(false);
                                  await dispatch(removeCohost(eid, guest.By));
                                }}
                              >
                                <>
                                  {" "}
                                  <StarsIcon /> Remove
                                </>
                              </button>
                            )}
                          </center>
                        ) : (
                          <center>
                            <StarsIcon />
                          </center>
                        )
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Tab>

              <Tab eventKey="Accept" title="Accept">
                {guestListaccept.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>
              <Tab eventKey="Decline" title="Decline">
                {guestListdecline.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>
              <Tab eventKey="Maybe" title="Maybe">
                {guestListmaybe.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
