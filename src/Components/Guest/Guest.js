import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Tab, Tabs } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../Guest/Guest.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import Userdataurl from "../Helpers/UserData/UserDatajustUrl";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { Grid } from '@material-ui/core'
import StarsIcon from "@material-ui/icons/Stars";
import { addCohost, removeCohost } from "../../Redux/DispatchFuncitons/Eventfunctions";
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import Backdrop from '@material-ui/core/Backdrop';
export default function Guest(props) {
  const [Events, setEvents] = useState([]);
  const [shouldchange, setshouldchange] = useState(false);
  const [eid, seteid] = useState("");
  const [guestList, setguestList] = useState([]);
  const [Hosts, setHosts] = useState([]);
  const [guestListaccept, setguestListaccept] = useState([]);
  const [guestListdecline, setguestListdecline] = useState([]);
  const [guestListmaybe, setguestListmaybe] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const dispatch = useDispatch();
  const [Eventdata, setEventdata] = useState([]);
  const [base, setbase] = useState("");
  const Auth = useSelector((state) => state.Auth);
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);

  useEffect(async () => {
    // if (shouldchange === false) {
    let RSVPList = [];
    let Participants = [];
    let data = [];
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (
        props.location.pathname ===
        "/MyEvents/guestlist/" +
        props.match.params.id +
        "/" +
        props.match.params.invno &&
        MyEvents.length > 0
      ) {
        await setEventdata(MyEvents[props.match.params.id]);
        await setbase("MyEvents");
        await setEvents(Eventdata);
        data = MyEvents[props.match.params.id][props.match.params.invno];
        console.log(data.RSVPList);
        await setHosts(data.Host);
        await seteid(data._id);
        RSVPList = data.RSVPList;
        if (data.Host.includes(Auth.Phone)) {
          setisAdmin(true);
        } else {
          setisAdmin(false);
        }
        Participants = [...data.Participants, ...data.Host];
        await setguestList(Participants);

      } else if (
        props.location.pathname ===
        "/inv/guestlist/" +
        props.match.params.id +
        "/" +
        props.match.params.invno &&
        myInvitations.length > 0
      ) {
        data = myInvitations[props.match.params.id][props.match.params.invno];
        await setEventdata(myInvitations[props.match.params.id]);
        await setbase("inv");
        await setEvents(Eventdata);
        RSVPList = data.RSVPList;
        await setHosts(data.Host);
        if (data.Host.includes(Auth.Phone)) {
          setisAdmin(true);
        } else {
          setisAdmin(false);
        }
        await seteid(data._id);
        Participants = [...data.Participants, ...data.Host];
        await setguestList(Participants);

      }

      let accept = [];
      let decline = [];
      let maybe = [];

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

      let all = [];
      let allrsvp = accept.concat(decline);
      allrsvp = allrsvp.concat(maybe);
      let Status = "Invited";
      for (let j = 0; j < Participants.length; j++) {
        let Status = "Invited";
        let found = false;
        for (let k = 0; k < allrsvp.length; k++) {
          if (
            allrsvp[k].By === Participants[j] ||
            allrsvp[k].By === "+91" + Participants[j]
          ) {
            Status = allrsvp[k].Status;
            found = true;
            break;
          } else {
            console.log("x");
          }
        }

        if (Participants[j].toString().startsWith("+")) {
          all.push({ By: Participants[j], Status: Status });
        } else {
          all.push({ By: "+91" + Participants[j], Status: Status });
        }
        found = false;
      }
      all = _.uniqBy(all, 'By');
      accept = _.uniqBy(accept, 'By');
      decline = _.uniqBy(decline, 'By');
      maybe = _.uniqBy(maybe, 'By');
      setguestList(all);
      setguestListaccept(accept);
      setguestListdecline(decline);
      setguestListmaybe(maybe);
    }
    //   if (Participants.length > 0) {
    //     await setshouldchange(true)
    //   }
    // }
  }, [myInvitations, MyEvents]);

  useEffect(() => {
    if (shouldchange === false) {
      setTimeout(() => setshouldchange(true), 3000);
    }
  }, [shouldchange])
  return (
    <>
      <Backdrop style={{
        display: shouldchange === false ? 'block' : 'none',

      }} open={shouldchange} >
        <CircularProgress style={{
          position: 'fixed', left: '45vw', top: '45vh',
        }} />
      </Backdrop>

      <div className="desktop-only w-100">
        <Header className="desktop-only" />
      </div>
      <Container className="guest-box">
        <Row
          style={{
            marginTop: 30,
            marginRight: 3,
            marginLeft: 3,
            width: "100%",
          }}
        >
          <Col xs={9}>
            <p style={{ fontWeight: "bold", fontSize: 20 }}>
              <IoArrowBackCircleOutline
                size={32}
                onClick={() => {
                  console.log(
                    "/" + base + "/eventpage/" + props.match.params.id
                  );
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
                <SupervisedUserCircleIcon />
                <span className="manage_guest">Manage Guests</span>
              </span>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row style={{ fontSize: '14px', fontWeight: '600', marginLeft: "auto" }}>
          <Col>
            <Tabs defaultActiveKey="All">
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
                          className={
                            "status " + guest.Status === "Accept"
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
                            <button
                              className="addHostButton"
                              onClick={async () => {
                                setshouldchange(false)
                                await dispatch(addCohost(eid, guest.By));

                              }}

                            >
                              {shouldchange === false ? <>...</> :
                                <>  <StarsIcon /> Add Co-Host</>}
                            </button>
                          </>
                        ) : (
                          guest.By !== Auth.Phone ?
                            <center>
                              <button
                                className="removeHostButton"
                                onClick={async () => {
                                  setshouldchange(false)
                                  await dispatch(removeCohost(eid, guest.By));
                                }}

                              >
                                {shouldchange === false ? <>...</> :
                                  <>  <StarsIcon /> Remove</>}
                              </button>
                            </center> : <center><StarsIcon /></center>
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
    </>
  );
}
