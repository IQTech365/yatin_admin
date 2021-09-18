import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./Invitations.css"
import Header from "../Helpers/Header/Header";
import Row from "react-bootstrap/Row";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import history from "../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import AddSchedule from '../AddEvent/Extras/Schedule';

export default function ShowSchedule(props) {
  const dispatch = useDispatch();
  const [Eventdata, setEventdata] = useState([])
  const [base, setbase] = useState("")
  const [Id, setId] = useState("")
  const [isadmin, setisadmin] = useState(false)
  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents
  );

  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations
  );
  useEffect(async () => {

    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (
        props.location.pathname ===
        "/MyEvents/schedule/" +
        props.match.params.id +
        "/" +
        props.match.params.event
      ) {
        await setEventdata(MyEvents[props.match.params.id][props.match.params.event].Schedule);
        await setbase("MyEvents");
        await setId(MyEvents[props.match.params.id][props.match.params.event]._id)
        await setisadmin(true)
      } else {
        await setEventdata(myInvitations[props.match.params.id][props.match.params.event].Schedule);
        await setId(myInvitations[props.match.params.id][props.match.params.event]._id)
        await setbase("inv");
        await setisadmin(false)
      }
    }
  }, [myInvitations, MyEvents])

  return (
    <>
      <div className="desktop-only w-100" >
        <Header className="desktop-only" />
      </div>

      <Grid container spacing={0}>
        <Grid item xs={false} md={2}></Grid>
        <Grid item xs={12} md={10}>
          <Row
            style={{
              marginTop: 20,
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 10,
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: 23 }}>
              <IoArrowBackCircleOutline
                size={40}
                onClick={() => {
                  history.goBack();
                }}
              />
              Schedules
            </p>
          </Row>
        </Grid>

        <Grid item xs={12} style={{ padding: '18px' }}>
          <AddSchedule CurrentEventDetails={Eventdata} IsAdmin={isadmin} Eid={Id} />
        </Grid>

      </Grid>
    </>
  );
}
