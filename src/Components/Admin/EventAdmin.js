import React, { useState, useEffect } from "react";
import Header from "../Helpers/Header/Header.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "./EventAdmin.css";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import history from "../../Utils/History";
import { IoIosArrowBack } from "react-icons/io"
import { url } from "../../Utils/Config";
import axios from "axios";
import { GetEvents } from "../../Redux/DispatchFuncitons/Eventfunctions";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Grid } from "@material-ui/core";
export default function EventAdmin(props) {
  const dispatch = useDispatch();
  const [options, setoptions] = useState({
    labels: ["Yes", "No", "Maybe", "N/A"],
    colors: ["#008744", "#E74D5F", "#FFA700", "#0000fa"],
  });
  const [series, setseries] = useState([1, 1, 1, 1]);
  const [comment, setcomment] = useState("");
  const Auth = useSelector((state) => state.Auth);
  const [Eventdata, setEventdata] = useState("")
  const [Rsvplist, setRsvplist] = useState([])
  let MyEvents = useSelector(
    (state) =>
      state.Eventdata.myEvents
  );

  useEffect(async () => {
    if (MyEvents && MyEvents.length > 0) {

      let Rsvplistcpy = []
      let accept = [];
      let decline = [];
      let maybe = [];
      let Participants = []
      let Host = []
      let all = []
      await setEventdata(MyEvents[props.match.params.id][props.match.params.eid]);
      await setRsvplist(MyEvents[props.match.params.id][props.match.params.eid].RSVPList);
      Participants = MyEvents[props.match.params.id][props.match.params.eid].Participants;
      Host = MyEvents[props.match.params.id][props.match.params.eid].Host;
      if (MyEvents[props.match.params.id][props.match.params.eid].RSVPList !== undefined
        || MyEvents[props.match.params.id][props.match.params.eid].RSVPList.length > 0) {
        Rsvplistcpy = [...MyEvents[props.match.params.id][props.match.params.eid].RSVPList] || [];

        for (let i = 0; i < Rsvplistcpy.length; i++) {

          if (Rsvplistcpy[i].Status === "Accept") {
            accept.push(Rsvplistcpy[i]);
          }
          if (Rsvplistcpy[i].Status === "Decline") {
            decline.push(Rsvplistcpy[i]);
          }
          if (Rsvplistcpy[i].Status === "May Be") {
            maybe.push(Rsvplistcpy[i]);
          }

        }

        let allrsvp = accept.concat(decline);
        allrsvp = allrsvp.concat(maybe);
        for (let j = 0; j < Participants.length; j++) {
          let Status = "invited";
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
              // console.log("x");
            }
          }

          if (Participants[j].toString().startsWith("+")) {
            all.push({ By: Participants[j], Status: Status });
          } else {
            all.push({ By: "+91" + Participants[j], Status: Status });
          }
          found = false;
        }
        await setseries([accept.length, decline.length, maybe.length, Participants.length + Host.length - (accept.length + decline.length + maybe.length)]);
        console.log(90, [accept.length, decline.length, maybe.length, Participants.length + Host.length - (accept.length + decline.length + maybe.length)])
      }
      else {
        setseries([0, 0, 0, Participants.length]);
        // console.log(94, [0, 0, 0, Participants.length])
      }
    } else {
      await dispatch(GetEvents());

    }

  }, [MyEvents])
  const submit = () => {
    if (comment !== "") {
      // console.log({
      // message: comment,
      //   Participants: Eventdata.Participants,
      //     by: Auth.Phone,
      //       img: Eventdata.file,
      //         Eid: Eventdata._id,
      //           Maincode: Eventdata.MainCode,
      // });

      axios
        .post(url + "notification/sendNotifications", {
          message: comment,
          Participants: Eventdata.Participants,
          by: Auth.Phone,
          img: Eventdata.file,
          Eid: Eventdata._id,
          Maincode: Eventdata.MainCode,
        })
        .then((res) => {
          if (res.data.data) {
            // console.log(res.data.data);
            setcomment("");
            alert("message Sent as Notification");
          }
        })
        .catch((err) => {
          // console.log(err);
          alert("message failed ");
        });
    }
  };
  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Container style={{ marginTop: 25 }}>
        <Row>
          <Col>
            <p style={{ fontWeight: 700, fontSize: 23 }}>
              <IoArrowBackCircleOutline
                size={40}
                onClick={() => {
                  history.goBack();
                }}
              />
              Event
            </p>
          </Col>
          <Col>
            <Button
              variant="dark"
              style={{ float: "right", borderRadius: 20 }}
              className="edit-eventbtn"
              onClick={() => {
                history.push(
                  "/MyEvents" + "/Manage-Event/" +
                  props.match.params.id +
                  "/" +
                  props.match.params.eid
                );
              }}
            >
              Edit Event
            </Button>
          </Col>
        </Row>

        <Chart
          options={options}
          series={series}
          type="donut"
          width="320"
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Row style={{ justifyContent: "center" }}>
          <Col>
            {Eventdata && Eventdata.EntryWay === "Code" ? <>


              <Grid
                item
                xs={12}
                style={{ marginTop: 30 }}
                className="tac m-b-25px clipboard"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://mobillyinvite.com/MyInvitations/" + Eventdata.MainCode + "/" + Eventdata.code
                  );
                }}
              >
                <Grid container spacing={0} >
                  <Grid item xs={10} md={11} className="link" >
                    {"https://mobillyinvite.com/MyInvitations/xxxxx"
                    }

                  </Grid>
                  <Grid item xs={2} md={1} className="p-t-10">
                    <FileCopyIcon className="v-t" />
                  </Grid>
                </Grid>
              </Grid>

            </> : <> <Grid
              item
              xs={12}
              className="tac m-b-25px clipboard"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://mobillyinvite.com/MyInvitations/" +
                  Eventdata.MainCode
                );
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={10} md={11} className="link">
                  {"https://mobillyinvite.com/xxxxx"}
                </Grid>
                <Grid item xs={2} md={1} className="p-t-10">
                  <FileCopyIcon className="v-t" />
                </Grid>
              </Grid>
            </Grid></>}

          </Col>
        </Row>
        {/* <Row className="messageboard">
          <h3 className="messageboard-txt">Message Board</h3>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          {" "}
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Write text here"
            style={{ marginTop: 10 }}
            onChange={(e) => {
              setcomment(e.target.value);
            }}
            value={comment}
          />
          <Button
            variant="outline-primary"
            style={{ width: "40vh", borderRadius: 20, marginTop: 30 }}
            onClick={() => {
              submit();
            }}
          >
            Send
          </Button>
        </Row> */}
      </Container>
    </>
  );
}

