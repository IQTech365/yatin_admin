import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Eventlist.css";
import history from "../../Utils/History";
import Dateformatter from '../Helpers/DateFormatter/Dateformatter'
import SingleEvent from '../../Assets/singleevent.png'
import Media from '../RenderMedia/Media'
export default function EventList(props) {
  const [show, setshow] = useState(false);
  const [MainCode, setmaincode] = useState("");

  const [data, setData] = useState(props.data);
  useEffect(async () => {
    // console.log(props.data);
    await setData(props.data);
  }, [props.data]);

  if (props.data !== undefined && props.data.length > 0) {
  } else {
    return <img src={NoInv} className="nodata" />;
  }
  return (
    <Grid container className="mb-100 contain-main" >

      {data.map((inv, index) => (
        <Grid
          item
          xs={12}
          sm={window.innerHeight / window.innerWidth > 0.9 ? 12 : 6}
          className="InvitationCard"
          key={"invContainer" + index}

          onClick={() => {
            history.push("/MyEvents/eventpage/" + index);
          }}
        >

          {inv[0].filetype.includes('media') ?
            <Media
              CurrentEventDetails={inv[0]}
              isEditable={false}
              onClick={() => {
                history.push("/MyEvents/eventpage/" + index);
              }}
            /> :
            inv[0].filetype === "png" || inv[0].filetype === "jpg" || inv[0].filetype === "jpeg" ? (<img
              src={inv[0].file}
              className="inv-img"

            />) : (
              <video
                muted
                type="video/mp4"
                autoPlay={true}
                src={
                  inv[0].file
                }
                onContextMenu={e => e.preventDefault()}
                controlsList="nodownload"
                onClick={() => {
                  history.push("/MyEvents/eventpage/" + index);
                }}
                preload="none"
                className='w-100 inv-img'
              />
            )}


          <div className="bottom-bar">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container spacing={0} className="event-info">
                  <Grid item xs={12} className="fs-bold t-white" style={{ fontSize: '18px' }}>
                    {inv[0].Name}
                  </Grid>
                  <Grid item xs={7} className="animated-list" style={{ color: 'black', fontSize: '15px', borderRadius: '5px', fontWeight: '700' }}>
                    <Dateformatter Date={inv[0].Date + " " + inv[0].Time} />

                  </Grid>

                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
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
