import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Helpers/Header/Header";
import FootMenu from "../Helpers/FootMenu/FootMenu";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitations/Invitation";
import EventList from "../Events/Eventlist";
import { useSelector, useDispatch } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { getNotification } from "../../Redux/DispatchFuncitons/NotificationFunctions";
import { getChats } from "../../Redux/DispatchFuncitons/Chatgroupfunctions";
import { addme } from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Home(props) {
  const dispatch = useDispatch();
  const [Menu, setMenu] = useState(0);
  const [showtoast, setshowtoast] = useState(true);
  const CodeEvent = useSelector(state => state.CodeEvent)
  const EventState = useSelector((state) => state.Eventdata);
  useEffect(async () => {
    if (CodeEvent.Code !== "") {
      await dispatch(addme(CodeEvent.Code, CodeEvent.Maincode));
    }

    dispatch(GetEvents());
    dispatch(GetInvitations());
    dispatch(getNotification());
    // dispatch(getChats());

    if (
      props.location.pathname === "/inv" ||
      props.location.pathname === "/" ||
      props.location.pathname === "/home"
    ) {
      await setMenu(0);
    } else {
      setMenu(1);
    }


  }, []);
  useEffect(async () => {
    dispatch(GetEvents());
    dispatch(GetInvitations());
    dispatch(getNotification());
    dispatch(getChats());
  }, []);

  return (
    <><div className="w-100" >
      <Header url={props.location.pathname} />

    </div>
      {showtoast === true ? <Alert severity="error" color="error" className="desktop-only toaster " onClick={() => {
        setshowtoast(false)
      }}>
        Please use Mobile for better Experience
      </Alert> : <></>
      }
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12}>
          {Menu === 0 ? (
            <Invitation data={EventState.myInvitations} className="w-100" />
          ) : (
            <EventList data={EventState.myEvents} className="w-100" />
          )}
        </Grid>
      </Grid>
      <FootMenu menu={Menu} setMenu={setMenu} />
    </>
  );
}
