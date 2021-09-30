import React, { useEffect, useState } from "react";
import { Grid, } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Invitations.css";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import history from "../../Utils/History";
import Notifications from "../Notifications/Notification";
import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "../UserPorfile/UserProfile";
import Dateformatter from '../Helpers/DateFormatter/Dateformatter'
import SingleEvent from '../../Assets/singleevent.png';
import OtpInput from "react-otp-input";
import { authInv } from '../../Redux/DispatchFuncitons/Eventfunctions'
export default function Invitation(props) {
  const [data, setData] = useState(props.data);
  const [show, setshow] = useState(false);
  const [MainCode, setmaincode] = useState("");
  const [showAuthWindow, setshowAuthWindow] = useState(false);
  const [selected, setselected] = useState();
  const Auth = useSelector(state => state.Auth)
  const [useiinfopopup, setuserInfopopup] = useState(false);
  const [HasSkipped, setHasSkipped] = useState(false);
  useEffect(async () => {
    await setData(props.data);
  }, [props.data]);

  if (props.data !== undefined && props.data.length > 0) {
  } else {
    return <img src={NoInv} className="nodata" />;
  }
  const checkifauth = async (index) => {
    debugger
    await setselected(index)
    if (data[index][0].InvId.HasAuth === false) {
      history.push("/inv/eventpage/" + index)
    } else {
      if (data[index][0].InvId.AuthNums.includes(Auth.Phone)) {
        history.push("/inv/eventpage/" + index)
      } else {
        await setshowAuthWindow(true)
      }
    }
  }
  return (
    <Grid container spacing={0} className="mb-100 invitation_mobile" >
      <Popup
        component={Password}
        toggleShowPopup={setshowAuthWindow}
        showPopup={showAuthWindow}
        showall={selected}
        MainCode={data}
      />
      <Popup
        component={UserProfile}
        setuserInfopopup={setuserInfopopup}
        toggleShowPopup={setuserInfopopup}
        showPopup={useiinfopopup}
        url={"MyEvents/"}
        showall={setHasSkipped}
      />
      <Popup
        component={Notifications}
        setuserInfopopup={setshow}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={MainCode}
        showinvitaions={true}

      />
      {data.length > 0 && data.map((inv, index) => (
        <Grid
          item
          xs={12}
          sm={window.innerHeight / window.innerWidth > 0.9 ? 12 : 6}
          className="InvitationCard"
          key={"InvitationCard" + index}

        >
          {inv[0].filetype === "png" || inv[0].filetype === "jpg" || inv[0].filetype === "jpeg" ? (<img
            src={inv[0].file}
            className="inv-img"
            onClick={() => {
              console.log(Auth.Name)
              Auth.Name == "" || Auth.Name == undefined ?
                HasSkipped === false ?
                  setuserInfopopup(true) :
                  checkifauth(index)
                :
                checkifauth(index)
            }}
          />) : (
            <video
              muted
              type="video/mp4"
              autoPlay={true}
              src={
                inv[0].file
              }
              onClick={() => {
                console.log(Auth.Name)
                Auth.Name == "" || Auth.Name == undefined ?
                  HasSkipped === false ?
                    setuserInfopopup(true) :
                    history.push("/inv/eventpage/" + index)
                  :
                  history.push("/inv/eventpage/" + index);
              }}
              preload="none"
              className='w-100 inv-img'
            />
          )}

          <NotificationsNoneIcon
            className="card-button Notifyme t-white"
            onClick={async () => {
              if (Auth.Name !== "" || Auth.Name !== undefined) {
                await setmaincode(inv[0].MainCode)
                await setshow(true)
              } else {
                setuserInfopopup(true)
              }
            }}
            fontSize='large'
          />
          <div className="bottom-bar">
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Grid container spacing={0} className="event-info">
                  <Grid item xs={12} className="fs-bold t-white">
                    {inv[0].Name}
                  </Grid>
                  <Grid item xs={12} className="fs-small t-white ">
                    <Dateformatter Date={inv[0].Date + " " + inv[0].Time} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <button
                  className="card-button rsvp-button "
                  onClick={(e) => {
                    console.log(Auth.Name)
                    Auth.Name == "" || Auth.Name == undefined ?
                      HasSkipped === false ?
                        setuserInfopopup(true) :
                        history.push("/inv/eventpage/" + index)
                      :
                      history.push("/inv/eventpage/" + index);
                    e.preventDefault();
                  }}
                >
                  RSVP
                </button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))}
      <Grid
        item
        xs={12}>
        {data.length === 1 ? <center> <img src={SingleEvent} ></img></center> : <></>}
      </Grid>

    </Grid>
  );
}


export function Password(props) {
  const dispatch = useDispatch()
  const [PWD, setPWD] = useState();
  const verify = async () => {
    debugger
    if (PWD === props.MainCode[props.showall][0].InvId.PassWord) {
      await dispatch(authInv(props.MainCode[props.showall][0].InvId._id, props.showall))
    }
  }
  return (
    <div>Enter Password<br />
      <center>
        <OtpInput
          className="OTP"
          value={PWD}
          onChange={(otp) => setPWD(otp)}
          numInputs={4}
          separator={<span></span>}
          inputStyle="Otp-block"
          isInputNum={true} style={{ paddingLeft: '25%' }}
        /><br />
        <button className="w-100 save-event" onClick={() => {
          verify()
        }}
        >
          Verify
        </button>
      </center>
    </div>
  )
}
