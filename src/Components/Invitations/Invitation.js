import React, { useEffect, useState } from "react";
import { Grid, } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Invitations.css";
import history from "../../Utils/History";
import Popup from "../Helpers/Popups/Popup";
import { useSelector } from "react-redux";
import UserProfile from "../UserPorfile/UserProfile";
import Dateformatter from '../Helpers/DateFormatter/Dateformatter'
export default function Invitation(props) {
  const [data, setData] = useState(props.data);
  const [show, setshow] = useState(false);
  const [MainCode, setmaincode] = useState("");
  const Auth = useSelector(state => state.Auth)
  const [useiinfopopup, setuserInfopopup] = useState(false);
  const [HasSkipped, setHasSkipped] = useState(false);
  useEffect(async () => {
    console.log(props.data);
    let datacpy = [...props.data];

    await setData(props.data);
  }, [props.data]);

  if (props.data !== undefined && props.data.length > 0) {
  } else {
    return <img src={NoInv} className="nodata" />;
  }

  return (
    <Grid container spacing={0} className="mb-100 invitation_mobile" >
      <Popup
        component={UserProfile}
        setuserInfopopup={setuserInfopopup}
        toggleShowPopup={setuserInfopopup}
        showPopup={useiinfopopup}
        url={"MyEvents/"}
        showall={setHasSkipped}
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
                  history.push("/inv/eventpage/" + index)
                :
                history.push("/inv/eventpage/" + index);
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

       
          <div className="bottom-bar">
         
            <Grid container spacing={0}>
            
              <Grid item xs={9}>
                <Grid container spacing={0} className="event-info">
                  <Grid item xs={12} className="fs-bold t-white" style={{fontSize:'23px'}}>
                    {inv[0].Name}
                  </Grid>
                  <Grid item xs={8}  className="animated-list" style={{ color:'black', fontSize:'15px', borderRadius:'3px', fontWeight:'700'}}>
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
     

    </Grid>
  );
}
