import "./Extras.css";
import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { Form, Button, Toast } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import BlankSchedule from "../../../Assets/BlankSchedule.svg";
import { UpdateSchedules } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import { useDispatch, useSelector } from "react-redux";
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
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
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
  const Auth = useSelector((state) => state.Auth);
  const [showfulldescription, setshowfulldescription] = useState(false);
  useEffect(() => {
    setSubevent([...props.CurrentEventDetails]);
  }, [props.CurrentEventDetails]);

  const save = async () => {
    if (subname !== "" && datetime !== "" && description !== "") {
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        link: link,
      };
      // console.log([...subEvent, data]);
      let newdata = [...subEvent, data];
      await setSubevent(newdata);

      await dispatch(UpdateSchedules(props.Eid, newdata));
      Delete();
      setadd(false);
    } else {
      setError(true);
    }
    setsubname("");
    setdatetime("");
    setdescription("");
    setvenue("");
    setlink("");
  };

  const saveedit = async () => {
    if (subname !== "" && datetime !== "" && description !== "") {
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        link: link,
      };
      let subEventcpy = [...subEvent];
      subEventcpy[editselected] = data;
      await setSubevent(subEventcpy);
      await dispatch(UpdateSchedules(props.Eid, subEventcpy));
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
    setlink("");
    setshowfulldescription(false);
  };

  const Deleteone = async (i) => {
    let subeventcpy = [...subEvent];
    subeventcpy = subeventcpy.filter((sube, index) => {
      return index !== i;
    });
    await setSubevent([...subeventcpy]);
    var EventsCopy = [...subeventcpy];
    await dispatch(UpdateSchedules(props.Eid, [...subeventcpy]));
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={8} style={{ margin: "auto" }}>
        {subEvent.length > 0 || add === true ? (
          <>
            {subEvent.map((eve, index) => (
              <Grid
                item
                xs={12}
                className="card-shadow m-b-10 schedule-details"
                style={{ display: add === true ? "none" : "" }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} md={12}>
                    {edit === true && editselected === index ? (
                      <>
                        <Form.Label style={{ fontWeight: 500 }}>
                          Schedule Name
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Edit Name"
                          onChange={(e) => {
                            setsubname(e.target.value);
                          }}
                          value={subname}
                        />
                        <br />

                        <form noValidate>
                          <Form.Label style={{ fontWeight: 500 }}>
                            Date
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="datetime-local"
                            placeholder="Edit Date"
                            id="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputProps={{
                              className: "nounder",
                            }}
                            onChange={(e) => {
                              setdatetime(e.target.value);
                            }}
                            value={datetime}
                          />{" "}
                          <br />
                        </form>

                        <Form.Label style={{ fontWeight: 500 }}>
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Enter Description"
                          style={{ height: "100px" }}
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                          value={description}
                          InputProps={{
                            className: "nounder",
                          }}
                        />

                        <br />
                        {/*    <Form.Label style={{ fontWeight: 500 }}>
                          Link (Optional)
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Enter Link"
                          InputProps={{
                            className: "nounder",
                          }}
                          onChange={(e) => {
                            setlink(e.target.value);
                          }}
                          value={link}
                        />
                        <br /> */}
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
                            <Dateformatter
                              Date={
                                eve.datetime.split("T")[0] +
                                " " +
                                eve.datetime.split("T")[1]
                              }
                            />
                          </Grid>
                          {/*  <Grid
                            item
                            xs={12}
                            onClick={() => {
                              window.open("http://" + eve.link);
                            }}
                            className="Link"
                          >
                            {eve.link}
                          </Grid> */}
                          <br />
                          <Grid item xs={12}>
                            <p className="event-des schedule_des">
                              {showfulldescription === false
                                ? eve.description.slice(0, 50) + "..."
                                : eve.description}
                            </p>
                            {eve.description.length > 50 ? (
                              <a
                                href="#"
                                className="invitationmain_link"
                                onClick={() => {
                                  setshowfulldescription(!showfulldescription);
                                }}
                              >
                                {showfulldescription === false
                                  ? "Show More"
                                  : "Show Less"}
                              </a>
                            ) : (
                              <></>
                            )}
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      columnGap: "20px",
                    }}
                  >
                    {edit === true && editselected === index ? (
                      <>
                        <Button
                          style={{ borderRadius: "20px" }}
                          variant="outline-danger"
                          onClick={() => {
                            Delete();
                            setadd(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          style={{ borderRadius: "20px" }}
                          onClick={() => {
                            save();
                          }}
                        >
                          Save
                        </Button>
                      </>
                    ) : props.IsAdmin === true ? (
                      <center>
                        <IconButton
                          onClick={() => {
                            setshowfulldescription(false);
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
                            setshowfulldescription(false);
                          }}
                        >
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </center>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  <Grid item xs={4} md={2}></Grid>
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <center>
            {" "}
            <img src={BlankSchedule} />
            {props.IsAdmin === true ? (
              <></>
            ) : (
              <>
                {" "}
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Button
                    variant="primary"
                    style={{ borderRadius: "20px" }}
                    onClick={toggleShowA}
                  >
                    Ask For Schedule
                  </Button>
                </div>
                <Toast
                  show={showA}
                  onClose={toggleShowA}
                  position="top-end"
                  delay={4000}
                  autohide
                  style={{ marginTop: "20px" }}
                >
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Informed!</strong>
                  </Toast.Header>
                  <Toast.Body style={{ textAlign: "left" }}>
                    Requested Admin to Add Schedule✨
                  </Toast.Body>
                </Toast>
              </>
            )}
          </center>
        )}
      </Grid>
      {add == true && props.IsAdmin === true ? (
        <Grid item xs={12} md={8} style={{ margin: "auto" }} className="mb-100">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Form.Label style={{ fontWeight: 500 }}>Schedule Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter Schedule Name"
                onChange={(e) => {
                  setsubname(e.target.value);
                }}
                InputProps={{
                  className: "nounder",
                }}
                value={subname}
                style={{ borderRadius: "20px" }}
              />

              <br />

              <Form.Label style={{ fontWeight: 500 }}>Schedule</Form.Label>
              <form noValidate>
                <Form.Control
                  size="sm"
                  type="datetime-local"
                  placeholder="Small text"
                  id="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputProps={{
                    className: "nounder",
                  }}
                  onChange={(e) => {
                    setdatetime(e.target.value);
                  }}
                  style={{ borderRadius: "20px" }}
                  value={datetime}
                />
              </form>
              <br />
              <Form.Label style={{ fontWeight: 500 }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                style={{ height: "100px" }}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                value={description}
                style={{ borderRadius: "20px" }}
                InputProps={{
                  className: "nounder",
                }}
              />
              <br />
              {/*  <Form.Label style={{ fontWeight: 500 }}>
                Link (Optional)
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter Link"
                style={{borderRadius:'20px'}}
                InputProps={{
                  className: "nounder",
                }}
                onChange={(e) => {
                  setlink(e.target.value);
                }}
                value={link}
              /> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                columnGap: "20px",
              }}
            >
              <Button
                style={{ borderRadius: "20px" }}
                variant="outline-danger"
                onClick={() => {
                  Delete();
                  setadd(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                style={{ borderRadius: "20px" }}
                onClick={() => {
                  save();
                }}
              >
                Save
              </Button>
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
