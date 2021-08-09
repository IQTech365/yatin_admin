import "./Extras.css"
import React, { useState, useEffect } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BlankSchedule from "../../../Assets/BlankSchedule.svg";
import { UpdateSchedules } from '../../../Redux/DispatchFuncitons/Eventfunctions'
import { useDispatch } from "react-redux";
import Dateformatter from "../../Helpers/DateFormatter/Dateformatter";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    wordBreak: "break-word",
  },
}));
export default function AddSchedule(props) {
  const dispatch = useDispatch()
  const [subEvent, setSubevent] = useState([...props.CurrentEventDetails]);
  const [edit, setedit] = useState(false);
  const [add, setadd] = useState(false);
  const [editselected, settoedit] = useState(null);
  const [subname, setsubname] = useState("");
  const [venue, setvenue] = useState("");
  const [datetime, setdatetime] = useState("");
  const [description, setdescription] = useState("");
  const [link, setlink] = useState("");
  const [isError, setError] = useState(false);
  const [showfulldescription, setshowfulldescription] = useState(false)
  useEffect(() => {
    setSubevent([...props.CurrentEventDetails]);
  }, [props.CurrentEventDetails])
  const save = async () => {
    if (subname !== "" && datetime !== "" && description !== "") {
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        link: link
      };
      console.log([...subEvent, data]);

      await setSubevent([...props.CurrentEventDetails, ...subEvent, data]);
      await dispatch(UpdateSchedules(props.Eid, [...props.CurrentEventDetails, ...subEvent, data]))
      Delete();
      setadd(false);
    } else {
      setError(true);
    }
  };

  const saveedit = async () => {
    if (subname !== "" && datetime !== "" && description !== "") {
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        link: link
      };
      let subEventcpy = [...subEvent];
      subEventcpy[editselected] = data;
      await setSubevent(subEventcpy);
      await dispatch(UpdateSchedules(props.Eid, subEventcpy))
      var EventsCopy = [...subEventcpy];
      Delete();
      setedit(false);
      settoedit(null);
    } else {
      setError(true);
    }
  };
  const classes = useStyles();
  const Delete = () => {
    setsubname("");
    setdatetime("");
    setdescription("");
    setvenue("");
    setshowfulldescription(false)
  };

  const Deleteone = async (i) => {
    let subeventcpy = [...subEvent];
    subeventcpy = subeventcpy.filter((sube, index) => {
      return index !== i;
    });
    await setSubevent([...subeventcpy]);
    var EventsCopy = [...subeventcpy];
    await dispatch(UpdateSchedules(props.Eid, [...subeventcpy]))
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {subEvent.length > 0 || add === true ? (
          <>
            {subEvent.map((eve, index) => (
              <Grid
                item
                xs={12}
                className="card-shadow m-b-10 schedule-details"
              >
                <Grid container spacing={0}>
                  <Grid item xs={8} md={10}>
                    {edit === true && editselected === index ? (
                      <>
                        <TextField
                          className="w-100 m-7px"
                          size="small"
                          label="Event Name"
                          onChange={(e) => {
                            setsubname(e.target.value);
                          }}
                          value={subname}
                        />

                        <form noValidate>
                          <TextField
                            id="datetime-local"
                            label="Schedule timing"
                            type="datetime-local"
                            defaultValue="2017-05-24 T 10:30"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className="w-100 m-7px"
                            size="small"
                            onChange={(e) => {
                              setdatetime(e.target.value);
                            }}
                            value={datetime}
                          />
                        </form>

                        <TextField
                          className="w-100 m-7px"
                          size="small"
                          label="Link"
                          onChange={(e) => {
                            setlink(e.target.value);
                          }}
                          value={link}
                        />
                        <TextField
                          className="w-100 m-7px"
                          size="small"
                          label="Description"
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                          value={description}
                        />
                      </>
                    ) : (
                      <>
                        <Grid
                          container
                          spacing={0}
                          className="padding-left-7 p-10-p "
                        >
                          <Grid item xs={12}>
                            <div className="ScheduleName l-blue-t m-0">
                              {eve.Name}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            {eve.Venue}
                          </Grid>
                          <Grid item xs={12} className="dtime">
                            <Dateformatter Date={eve.datetime.split("T")[0] + " " + eve.datetime.split("T")[1]} />
                          </Grid>
                          <Grid item xs={12} onClick={() => {
                            window.open('http://' + eve.link)

                          }} className="Link">
                            {eve.link}
                          </Grid><br />
                          <Grid item xs={12}>
                            <p className="event-des schedule_des">{showfulldescription === false ? eve.description.slice(0, 50) + '...' : eve.description}</p>
                            {eve.description.length > 50 ?
                              <a href="#" className="invitationmain_link" onClick={() => { setshowfulldescription(!showfulldescription) }}>
                                {showfulldescription === false ? 'Show More' : 'Show Less'}
                              </a> : <></>}

                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={4} md={2} >
                    {edit === true && editselected === index ? (
                      <center>
                        <IconButton
                          onClick={() => {
                            saveedit();
                          }}
                        >
                          <CheckCircleOutlineIcon color="success" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            Delete();
                          }}
                        >
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </center>
                    ) : (

                      props.IsAdmin === true ? <center>
                        <IconButton
                          onClick={() => {
                            setshowfulldescription(false)
                            setsubname(eve.Name);
                            setdatetime(eve.datetime);
                            setdescription(eve.description);
                            setvenue(eve.Venue);
                            setedit(true);
                            settoedit(index);
                            setadd(false);
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            Deleteone(index);
                            setshowfulldescription(false)
                          }}
                        >
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </center> : <></>

                    )}
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  <Grid item xs={4} md={2}></Grid>
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <center>  <img src={BlankSchedule} /></center>
        )}
      </Grid>
      {add == true && props.IsAdmin === true ? (
        <Grid item xs={12} className="card-shadow mb-100">
          <Grid container spacing={2}>
            <Grid item xs={7} md={10}>
              <TextField
                className="w-100 m-7px l-blue-t"
                size="small"
                label="Event Name"
                onChange={(e) => {
                  setsubname(e.target.value);
                }}
                value={subname}
                variant="standard"
                InputProps={{
                  className: "nounder",
                }}
              />

              <form noValidate>
                <TextField
                  id="datetime-local"
                  label="Schedule timing"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className="w-100 m-7px"
                  variant="standard"
                  InputProps={{
                    className: "nounder",
                  }}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setdatetime(e.target.value);
                  }}
                  value={datetime}
                />
              </form>
              <TextField
                className="w-100 m-7px"
                variant="standard"
                InputProps={{
                  className: "nounder",
                }}
                size="small"
                label="Link"
                onChange={(e) => {
                  setlink(e.target.value);
                }}
                value={link}
              />
              <TextField
                className="w-100 m-7px"
                variant="standard"
                InputProps={{
                  className: "nounder",
                }}
                size="small"
                label="Sub-Event description "
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                value={description}
              />
            </Grid>
            <Grid item xs={5} md={2}>
              <center>
                <IconButton
                  onClick={() => {
                    save();
                  }}
                >
                  <CheckCircleOutlineIcon
                    color="inherit"
                    fontSize={"large"}
                    style={{ color: "green" }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => {
                    Delete();
                    setadd(false);
                  }}
                >
                  <DeleteForeverIcon color="error" fontSize={"large"} />
                </IconButton>
              </center>
              {/* <center>
                {props.CurrentEventDetails.VenueType === "Online" ? (
                  <ControlPointIcon
                    className="schedule-l-icon"
                    fontSize={"large"}
                  />
                ) : (
                  <LocationOnRoundedIcon
                    className="schedule-l-icon"
                    fontSize={"large"}
                  />
                )}
              </center> */}
            </Grid>
            <Grid item xs={8} md={10}></Grid>
            <Grid item xs={4} md={2}></Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12} md={12}>
        {props.IsAdmin === true ? (
          <center>
            <AddCircleRoundedIcon
              onClick={() => {
                setadd(true);
                setedit(false);
                settoedit(null);
              }}
              fontSize="large"
              className="add-button  m-5px "
            />
          </center>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}
