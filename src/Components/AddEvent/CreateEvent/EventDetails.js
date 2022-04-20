import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Modal,
  Switch,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./CreateEvent.css";
import AddImg from "../../../Assets/AddImage.svg";
import Map from "../../Helpers/Maps/Maps";
import CancelIcon from "@material-ui/icons/Cancel";
import ImageSelectionModal from "./ImageSelectionModal";
import { useDispatch } from "react-redux";
import { BsInfoCircleFill } from "react-icons/bs";
import AppText from "../../../Utils/Constants";
import Utils from "../../../Utils/Utils";

export default function EventDetails(props) {
  const useStyles = makeStyles((theme) => ({
    notchedOutline: {
      borderWidth: "3px",
      // borderColor: "#3897f1 !important",
      borderRadius: "8px",
      color: "#3897f1 !important",
      fontSize: "12px !important",
    },
    activeTabButton: {
      width: "100%",
      justifyContent: "center",
      backgroundColor: "#3897f1",
    },
    inactiveTabButton: {
      width: "100%",
      justifyContent: "center",
      backgroundColor: "#00000014",
    },
  }));

  const classes = useStyles();

  const [processing, setProcessing] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const [CurrentEventDetails, SetCurrentEventDetails] = useState({
    ...props.Events[props.SelectedEvent],
  });
  const [IsSubmitted, setSubmit] = useState(false);
  const [shedulevisible, SetScheduleVisible] = useState(false);
  const [storyvisible, SetStoryVisible] = useState(false);
  const [albumvisible, SetAlbumVisible] = useState(false);
  const [Link, setLink] = useState("");
  const [Location, setLocation] = useState("");
  const [isEditLocation, setisEditLocation] = useState(false);
  const [address, setaddress] = useState("");
  const [eventTypeIndex, setEventTypeIndex] = useState(0);
  const [isOnlineInApp, setIsOnlineInApp] = useState(false);

  useEffect(() => {
    if (props.Events[props.SelectedEvent] !== undefined) {
      SetCurrentEventDetails(props.Events[props.SelectedEvent]);
    }
  }, []);
  useEffect(() => {
    props.setDisablesave(false);
    if (props.Events[props.SelectedEvent] !== undefined) {
      SetCurrentEventDetails(props.Events[props.SelectedEvent]);
    }

    if (
      CurrentEventDetails !== {} &&
      CurrentEventDetails.Location !== undefined
    ) {
      if (CurrentEventDetails.Location === "") {
        setaddress("");
      } else {
        try {
          if (JSON.parse(CurrentEventDetails.Location === {})) {
            throw "unwanted";
          } else {
            setaddress(JSON.parse(CurrentEventDetails.Location).address);
            setLocation(JSON.parse(CurrentEventDetails.Location).address);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setaddress("");
    }
  }, [props.SelectedEvent]);

  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "271872414479-lumfn9dkcqh1k1et8dfau81dkcng81s4.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCdk1XolxNow08BXLxbzCeDReSrNTTlXCo";
  var clientSecret = "GpxXOinOWEyYdsbnVjolU9is";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const save = async () => {
    let eventscpy = props.Events;
    let currentEvent = props.SelectedEvent;
    console.log(CurrentEventDetails);
    eventscpy[props.SelectedEvent] = CurrentEventDetails;
    await props.setEvents(eventscpy);
    // await props.SelectEvent(0);
    let result = await props.checkIfEventEmpty(
      eventscpy,
      props.Type,
      props.seterroring,
      props.SelectedEvent
    );
    await setSubmit(true);
    if (result.status === true && props.Type !== "") {
      let EventsCopy = [...props.Events];
      await props.setDisablesave(true);

      props.handleNext();
    } else {
      // console.log("result false");
      // console.log(IsSubmitted);
      await props.SelectEvent(result.index);
      // console.log(result.index);
    }
  };

  const changevenue = () => {
    if (
      CurrentEventDetails.VenueType === "Online" ||
      CurrentEventDetails.VenueType === "Both"
    ) {
      // CreateMeeting();
      SetCurrentEventDetails({
        ...CurrentEventDetails,
        Location: "",
      });
    }
  };
  const dispatch = useDispatch();

  return (
    <Grid container spacing={1} className="p-15px pt-0">
      <Grid item xs={12} sm={12}>
        {CurrentEventDetails !== undefined &&
        CurrentEventDetails.file === "" ? (
          <center>
            <img
              src={AddImg}
              className={
                IsSubmitted === true ? "add-Img error-box" : "add-Img "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
            />
          </center>
        ) : CurrentEventDetails !== undefined &&
          CurrentEventDetails.filetype !== undefined ? (
          CurrentEventDetails.filetype === "png" ||
          CurrentEventDetails.filetype === "jpg" ||
          CurrentEventDetails.filetype === "jpeg" ? (
            <img
              src={
                CurrentEventDetails !== undefined
                  ? CurrentEventDetails.file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              className={
                processing === true
                  ? "transparent uploaded-file w-100 "
                  : "notTransparent uploaded-file w-100 "
              }
            />
          ) : (
            <video
              type="video/mp4"
              style={{ height: "300px" }}
              autoPlay={true}
              src={
                CurrentEventDetails !== undefined
                  ? CurrentEventDetails.file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              preload="none"
              className={
                processing === true
                  ? " transparent w-100 "
                  : "notTransparent w-100 "
              }
            />
          )
        ) : (
          <></>
        )}
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={showPopup}
            onClose={() => {
              toggleShowPopup(false);
            }}
          >
            <div className="modal-card">
              <CancelIcon
                onClick={() => {
                  toggleShowPopup(false);
                }}
                color="secondary"
                className="popup-close"
                fontSize="large"
                style={{ bottom: "10px", position: "inherit" }}
              />

              <ImageSelectionModal
                className="modal-component"
                data={props.Events}
                setEvents={props.setEvents}
                SelectEvent={props.SelectEvent}
                SelectedEvent={props.SelectedEvent}
                processing={processing}
                setDisablesave={props.setDisablesave}
                CurrentEventDetails={CurrentEventDetails}
                SetCurrentEventDetails={SetCurrentEventDetails}
                show={toggleShowPopup}
                Type={props.Type}
                uniqueCode={props.uniqueCode}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <span className="label">Enter Event Name</span>
        <TextField
          placeholder="Name"
          id="outlined-basics"
          variant="outlined"
          className="w-100-p "
          size="small"
          value={CurrentEventDetails.Name}
          onChange={async (e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Name: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Name === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>

      <Grid item xs={5} style={{ marginTop: 10 }}>
        <span className="label">Time</span>
        <TextField
          id="time"
          // label="Time"
          variant="outlined"
          type="time"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          className="w-100-p "
          inputProps={{
            step: 300, // 5 min
          }}
          ampm={false}
          value={CurrentEventDetails.Time}
          onChange={(e) => {
            // console.log(e.target.value);
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Time: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Time === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={7} style={{ marginTop: 10 }}>
        <span className="label">Date</span>
        <TextField
          id="date"
          // label="Date"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          className="w-100-p "
          value={
            CurrentEventDetails.Date === ""
              ? "01-01/2020"
              : CurrentEventDetails.Date
          }
          placeholder="DD-MM-YY"
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Date: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Date === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ fontSize: "12px" }}
        />
      </Grid>
      <Grid item lg={12} xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          {Utils.EventTypes.map((eventType, i) => {
            const selected = eventTypeIndex === i;
            return (
              <Grid item lg={4} xs={4} sm={4} md={4} key={i}>
                <Button
                  className={
                    selected
                      ? classes.activeTabButton
                      : classes.inactiveTabButton
                  }
                  onClick={() => {
                    setEventTypeIndex(i);
                    changevenue();
                    SetCurrentEventDetails({
                      ...CurrentEventDetails,
                      VenueType: eventType,
                    });
                  }}
                >
                  {eventType}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {eventTypeIndex !== 1 && <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={isOnlineInApp}
              onChange={() => {
                setIsOnlineInApp(!isOnlineInApp);
              }}
              name="online_in_app"
              color="primary"
            />
          }
          label="InApp-Online"
        />
      </Grid>}
      {/* <Grid item xs={6} style={{ marginTop: 10 }}>
        <span className="label">Type</span>
        <select
          className="w-100-p selectboxblue"
          value={CurrentEventDetails.VenueType}
          onChange={(e) => {
            changevenue();
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              VenueType: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.VenueType === ""
              ? true
              : false
          }
          variant="outlined"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <option value="Online-Inapp">OnlineInApp</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>
      </Grid> */}
      <>
        <Grid
          item
          xs={12}
          style={{ marginTop: 10 }}
          className={
            CurrentEventDetails.VenueType === "Offline" ? "hide" : "show"
          }
        >
          <span className="label "> Link </span>
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            className="w-100-p "
            placeholder="Add Link Below"
            value={
              CurrentEventDetails.VenueType === "Online" ||
              CurrentEventDetails.VenueType === "Hybrid"
                ? CurrentEventDetails.Link
                : "Meeting Created"
            }
            disabled={isOnlineInApp}
            onChange={(e) => {
              SetCurrentEventDetails({
                ...CurrentEventDetails,
                Link: e.target.value,
                Location: "",
              });
            }}
            error={
              IsSubmitted === true && CurrentEventDetails.Link === ""
                ? true
                : false
            }
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </Grid>
        <Grid
          style={{ marginTop: 10 }}
          item
          xs={12}
          sm={12}
          className={
            CurrentEventDetails.VenueType === "Online" ||
            CurrentEventDetails.VenueType === "Online-Inapp"
              ? "hide"
              : "show"
          }
        >
          {isEditLocation === true ? (
            <>
              <Map
                SetCurrentEventDetails={SetCurrentEventDetails}
                CurrentEventDetails={CurrentEventDetails}
                center={{ lat: 20.5937, lng: 78.9629 }}
                height="300px"
                zoom={12}
                setLocation={setLocation}
                Location={Location}
                type={"Offline"}
                setisEditLocation={setisEditLocation}
                setaddress={setaddress}
              />
            </>
          ) : (
            <Grid container spacing={0} style={{ width: "100%" }}>
              <Grid xs={12}>
                <span className="label " style={{ width: "100%" }}>
                  Location
                </span>
              </Grid>
              <Grid xs={12}>
                <div
                  className="fs-14"
                  onClick={() => setisEditLocation(true)}
                  style={{
                    width: "100%",
                    border: "Solid 2px #3897f1",
                    borderRadius: "8px",
                    padding: "8px",
                    position: "relative",
                    bottom: "6px",
                  }}
                >
                  {Location === ""
                    ? "Please add location"
                    : Location.length > 25
                    ? Location.substring(0, 25)
                    : Location}
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <p
            style={{ textAlign: "left", fontSize: "12px", marginTop: "-5px" }}
          >
            <BsInfoCircleFill />

            {CurrentEventDetails.VenueType === "Online"
              ? " Add Your Zoom Other Links"
              : CurrentEventDetails.VenueType === "Online-Inapp"
              ? " No Further Action Required"
              : CurrentEventDetails.VenueType === "Offline"
              ? " Add Your Location"
              : " Add Your Location and Meeting Link"}
          </p>
        </Grid>

        <Grid item xs={12}>
          <span className="label">Description</span>

          <TextField
            id="outlined-basic"
            // label="Description"
            size="small"
            variant="outlined"
            className="w-100-p   "
            value={CurrentEventDetails.Description}
            onChange={(e) => {
              SetCurrentEventDetails({
                ...CurrentEventDetails,
                Description: e.target.value,
              });
            }}
            error={
              IsSubmitted === true && CurrentEventDetails.Description === ""
                ? true
                : false
            }
            multiline={true}
            rows={2}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </Grid>
      </>
      {props.SelectedEvent === 0 ? (
        <>
          <Grid
            item
            xs={8}
            className="talc fs-bold  label"
            style={{ paddingTop: "15px" }}
          >
            Add Password
          </Grid>
          <Grid item xs={4}>
            <Switch
              checked={CurrentEventDetails.IsPassword}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
              className="fr"
              onChange={(e) => {
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  IsPassword: !CurrentEventDetails.IsPassword,
                });
              }}
            />
          </Grid>
        </>
      ) : (
        <></>
      )}
      {/* Album, Schdedule and Story Commented Below */}

      {/*      <Grid
        item
        xs={props.SelectedEvent === 0 ? 4 : 12}
        md={props.SelectedEvent === 0 ? 4 : 12}
      >
        <Paper
          elevation={3}
          className="schedule-card"
          onClick={() => {
            SetScheduleVisible(true);
          }}
        >
          <center>
            <img src={Scehedule} alt="schedule" className="schedule-icon" />

            <button className="add-schedule theme-font">Schedule</button>
          </center>
        </Paper>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="f-s-modal"
            open={shedulevisible}
            onClose={() => {
              SetScheduleVisible(false);
            }}
          >
            <div className="f-s-modal-card">
              <AddDetails
                Name="Schedule"
                className="modal-component"
                data={props.Events}
                setEvents={props.setEvents}
                SelectEvent={props.SelectEvent}
                SelectedEvent={props.SelectedEvent}
                CurrentEventDetails={CurrentEventDetails}
                Events={props.Events}
                SelectedEvent={props.SelectedEvent}
                SetCurrentEventDetails={SetCurrentEventDetails}
                SetScheduleVisible={SetScheduleVisible}
                open={SetScheduleVisible}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      {props.SelectedEvent === 0 ? (
        <>
          <Grid item xs={4} md={4}>
            <Paper
              elevation={3}
              className="schedule-card"
              onClick={() => {
                SetStoryVisible(true);
              }}
            >
              <center>
                <img src={Storyimg} alt="schedule" className="schedule-icon" />

                <button className="add-schedule theme-font">Story</button>
              </center>
            </Paper>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="f-s-modal"
                open={storyvisible}
                onClose={() => {
                  SetStoryVisible(false);
                }}
              >
                <div className="f-s-modal-card">
                  <AddDetails
                    Name="Story"
                    className="modal-component"
                    data={props.Events}
                    setEvents={props.setEvents}
                    SelectEvent={props.SelectEvent}
                    SelectedEvent={props.SelectedEvent}
                    CurrentEventDetails={CurrentEventDetails}
                    Events={props.Events}
                    SelectedEvent={props.SelectedEvent}
                    SetCurrentEventDetails={SetCurrentEventDetails}
                    SetScheduleVisible={SetScheduleVisible}
                    open={SetStoryVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={4} md={4}>
            <Paper
              elevation={3}
              className="schedule-card"
              onClick={() => {
                SetAlbumVisible(true);
              }}
            >
              <center>
                <img src={Albumsimg} alt="schedule" className="schedule-icon" />

                <button className="add-schedule theme-font">Albums</button>
              </center>
            </Paper>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="f-s-modal"
                open={albumvisible}
                onClose={() => {
                  SetAlbumVisible(false);
                }}
              >
                <div className="f-s-modal-card">
                  <AddDetails
                    Name="Album"
                    className="modal-component"
                    data={props.Events}
                    setEvents={props.setEvents}
                    SelectEvent={props.SelectEvent}
                    SelectedEvent={props.SelectedEvent}
                    CurrentEventDetails={CurrentEventDetails}
                    Events={props.Events}
                    SelectedEvent={props.SelectedEvent}
                    SetCurrentEventDetails={SetCurrentEventDetails}
                    SetScheduleVisible={SetScheduleVisible}
                    open={SetAlbumVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
        </>
      ) : (
        <></>
      )} */}

      <Grid item xs={12}>
        <button
          className={
            props.disablesave === false
              ? "btn save-event "
              : "btn save-event  disabled"
          }
          onClick={() => {
            if (props.disablesave === false) {
              save();
            }
          }}
          style={{ marginTop: "20px" }}
        >
          Next
        </button>
      </Grid>
    </Grid>
  );
}
