import React, { useState, useEffect, useCallback } from "react";
import "./EditEvent.css";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, TextareaAutosize } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import Map from "../Helpers/Maps/Places";
import { Grid, Select } from "@material-ui/core";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import history from "../../Utils/History";
import { update_events } from "../../Redux/DispatchFuncitons/Eventfunctions";
import { uploadString } from "../../Utils/FileUpload_Download";
export default function EditEvent(props) {
  const useStyles = makeStyles((theme) => ({
    notchedOutline: {
      borderWidth: "3px",
      borderColor: "lightgrey !important",
      borderRadius: "150px",
      color: "#3897f1 !important",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const [IsSubmitted, setIsSubmitted] = useState(false);



  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [VenueType, setVenueType] = useState("");
  const [Link, setLink] = useState("");
  const [Location, setLocation] = useState("");
  const [address, setaddress] = useState("");
  const [Description, setDescription] = useState("");
  const [isEditLocation, setisEditLocation] = useState(false);

  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents[props.match.params.id]
  );

  useEffect(async () => {

    await setName(MyEvents[props.match.params.invno].Name)
    await setDate(MyEvents[props.match.params.invno].Date)
    await setTime(MyEvents[props.match.params.invno].Time)
    await setVenueType(MyEvents[props.match.params.invno].VenueType)
    await setLink(MyEvents[props.match.params.invno].Link)
    await setLocation(MyEvents[props.match.params.invno].Location || "")
    await setaddress(MyEvents[props.match.params.invno].Location.address !== null ? MyEvents[props.match.params.invno].Location.address : "")
    await setDescription(MyEvents[props.match.params.invno].Description || "")
  }, [])
  const save = async () => {
    let data = {
      Name, Date, Time, VenueType, Link, Location, address, Description
    }
    dispatch(update_events(MyEvents[props.match.params.invno].InvId.Type,
      data,
      MyEvents[props.match.params.invno].MainCode,
      MyEvents[props.match.params.invno]._id, setIsSubmitted));

  };
  useEffect(async () => {
    if (typeof Description === "object") {
      await setDescription(MyEvents[props.match.params.invno].Description.props.children)
    }
  }, [Description])

  return (

    <Grid container spacing={2} style={{ padding: '10px' }}>
      <Grid item xs={12} >
        <p style={{ fontWeight: "bold", fontSize: 23 }}>
          <IoArrowBackCircleOutline
            size={40}
            onClick={() => {
              history.goBack();
            }}
          />
          Edit Events
        </p>
      </Grid>

      <Grid item xs={12}>
        <span className="label">Name</span>
        <TextField
          id="outlined-basics"
          variant="outlined"
          className="w-100-p"
          size="small"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        {IsSubmitted === true && Name === "" ? (
          <span className="error p-l-5px">please enter Name</span>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item xs={12}>
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
          className="w-100 "
          inputProps={{
            step: 300, // 5 min
          }}
          ampm={false}
          value={Time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        {IsSubmitted === true && Time === "" ? (
          <span className="error p-l-5px">please Add File</span>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item xs={12}>
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
          className="w-100"
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />

      </Grid>
      <Grid item xs={12}> <span className="label">Type</span>
        <select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="w-100-p selectboxblue pob0"
          value={VenueType}
          onChange={(e) => {
            setVenueType(e.target.value);
          }}
          variant="outlined"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          size="small"
        >
          <option
            className="w-100-p"

            value="Online-Inapp"
          >
            Online-Inapp
          </option>
          <option
            className="w-100-p"

            value="Online"
          >
            Online
          </option>

          <option
            className="w-100-p"

            value="Offline"
          >
            Offline
          </option>
          <option
            className="w-100-p"

            value="Both"
          >
            Both
          </option>
        </select>
      </Grid>
      <Grid item xs={12} style={{
        display:
          VenueType === "Online" || VenueType === "Both"
            ? "block"
            : "none",
      }}>
        <span className="label">Change Links </span>
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          className="w-100-p "
          value={Link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        {IsSubmitted === true && Link === "" ? (
          <span className="error p-l-5px">please Add File</span>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item xs={12} style={{
        display:
          VenueType === "Offline" || VenueType === "Both"
            ? "block"
            : "none",
      }}>
        {isEditLocation === true ? (
          <>
            <Map

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
                  borderRadius: "150px",
                  padding: "8px",
                  position: 'relative',
                  bottom: '6px'
                }}
              >
                {Location === ""
                  ? "Please Enter A location"
                  : Location.split(":")[3].length > 25
                    ? Location.split(":")[3].replace(/[^a-zA-Z ]/g, "")
                    : Location.split(":")[3].replace(/[^a-zA-Z ]/g, "")}
              </div>
            </Grid>
          </Grid>
        )}
        <span
          className={
            IsSubmitted === true && Location === ""
              ? "error"
              : "hide"
          }
          style={{ width: '100%' }}
        >
          Please add Location
        </span>

      </Grid>
      <Grid item xs={12}>
        <span className="label">Description</span>
        <TextareaAutosize
          id="outlined-basic"
          // label="Description"
          size="small"
          variant="outlined"
          className="w-100-p m-7px notchedOutline"
          value={Description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}

          multiline={true}
          rows={4}
          style={{ height: "150px", padding: '10px', borderRadius: "15px" }}
        />

      </Grid>
      <div className="update">
        <center>
          <Button
            variant="primary"
            className="update-buttons"
            onClick={() => {
              save();
              setIsSubmitted(true);
            }}
          >
            {IsSubmitted === false ? "Update" : 'Saving'}
          </Button>
          <Button
            variant="outline-danger"
            className="update-buttons"
            onClick={() => {
              //reload();
              history.goBack();
            }}
          >
            Cancel
          </Button>
        </center>
      </div>
    </Grid>

  );
}
