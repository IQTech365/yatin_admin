import React, { useEffect, useState } from "react";
import Access from "../../../Assets/AddAccess.svg";
import "../AddEvent.css";
import { Grid, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { saveEvent } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import { uploadString } from "../../../Utils/FileUpload_Download";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { FaArrowCircleUp } from "react-icons/fa";
import AddCode from "./AddCode";
import * as XLSX from "xlsx";
import Addformultiple from "./Addformultiple";
// import {ArrowCircleUpIcon} from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
    border: "solid 1px grey",
  },
}));
export default function NewAddParticipants(props) {
  const [eventKey, setKey] = useState(0);
  const dispatch = useDispatch();
  const Eventdata = useSelector((state) => state.Eventdata);
  let supported = "";
  let attribute = ["name", "tel"];
  const opts = { multiple: true };
  const [EntryWay, setEntryWay] = useState("Code");
  const [code, setCodes] = useState([]);
  const [isMobile, SetIsMobile] = useState(false);
  const [isSaving, setisSaving] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  let Albumcpy = [];
  let Storycpy = [];
  let codescpy = [];

  useEffect(async () => {
    supported = "contacts" in navigator && "ContactsManager" in window;
    if (supported === true) {
      SetIsMobile(true);
    } else {
      SetIsMobile(false);
    }
  }, []);

  const readExcel = async (file) => {
    const fileReader = new FileReader();
    await fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      const bufferArray = e.target.result;
      const wb = await XLSX.read(bufferArray, { type: "buffer" });
      const wsname = await wb.SheetNames[0];
      const ws = await wb.Sheets[wsname];
      const data = await XLSX.utils.sheet_to_json(ws);
      await saveparticipantsfromexcel(data);
    };
    fileReader.onerror = (error) => {
      // console.log(error);
    };
  };

  const saveparticipantsfromexcel = async (d) => {
    let result = d.map((cdata) => {
      if (cdata.Contact) {
        return cdata.Contact;
      } else {
        return cdata;
      }
    });
    for (let i = 0; i < result.length; i++) {
      if (typeof result[i] === "string") {
        if (result[i].startsWith("+")) {
        } else {
          result[i] = "+91" + result[i];
        }
      } else {
        result[i] = "+91" + result[i];
      }
    }
    let particpantscpy = [...participants];
    particpantscpy[eventKey] = [...result];
    await setParticipants([...particpantscpy]);
    return 1;
  };

  const openContactPicker = async () => {
    try {
      let ldata = [];
      const contacts = await navigator.contacts.select(attribute, opts);
      contacts.map(async (contact) => {
        await ldata.push(contact.tel[0]);
      });
      await saverecipeients(ldata);
    } catch (err) {
      console.log(err);
    }
  };

  const saverecipeients = async (data) => {
    let particpantscpy = [...participants];
    let contactlist = [];
    let clist = [];
    data.map((contact) => {
      clist.push(contact);
      if (typeof contact === "string") {
        if (contact.startsWith("+")) {
        } else {
          contact = "+91" + contact;
        }
      } else {
        contact = "+91" + contact;
      }
      contact = contact.replaceAll(" ", "");
      contactlist.push(contact);
    });

    particpantscpy[eventKey] = [...contactlist];
    await setParticipants([...particpantscpy]);
  };

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  const save = async () => {
    await setEntryWay("Code");

    for (var i = 0; i < props.Events.length; i++) {
      await codescpy.push(
        await randomString(
          8,
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        )
      );
    }
    await setCodes(codescpy);
    await setisSaving(true);
    let EventCpy = [...props.Events];
    if (participants.length === 0 && EntryWay === "Contacts") {
      await setisSaving(false);
      return false;
    }
    let particpantsCpy = [...participants];
    particpantsCpy.map(async (listdata, index) => {
      if (listdata.length === 0) {
        alert("Please Add Guests to Event no " + (index + 1));
        await setisSaving(false);
        return false;
      } else {
        EventCpy[index].Participants = listdata;
      }
    });
    await create_event();
  };
  const create_event = async () => {
    let uniqueurl =
      props.Type + Math.floor(100000 + Math.random() * 900000) + "/";
    let EventCpy = [...props.Events];
    // for (let i = 0; i < EventCpy.length; i++) {
    //     let jointname = EventCpy[i].Name.split(' ').join('')
    //     let furl =
    //         uniqueurl + "Event_image/" + i + jointname;

    //     if (EventCpy[i].file.includes('firebasestorage.googleapis.com')) {

    //     } else {
    //         let url = await uploadString(EventCpy[i].file, furl);
    //         EventCpy[i].file = url;
    //         EventCpy[i].GuestInvite = false
    //     }
    // }
    // await props.setEvents(EventCpy);
    // if (Eventdata && Eventdata.ALBUM && Eventdata.ALBUM.length > 0) {
    //     Albumcpy = [];
    //     for (let i = 0; i < Eventdata.ALBUM.length; i++) {
    //         let shurl = uniqueurl + "Album/" + i + "." + Eventdata.ALBUM[i].type;

    //         let url = await uploadString(Eventdata.ALBUM[i].data, shurl);
    //         Eventdata.ALBUM[i].file = url;
    //         await Albumcpy.push({ file: url, type: Eventdata.ALBUM[i].type });
    //     }
    // }
    // if (Eventdata && Eventdata.STORY && Eventdata.STORY.length > 0) {
    //     Storycpy = [];
    //     for (let i = 0; i < Eventdata.STORY.length; i++) {
    //         let shurl = uniqueurl + "Story/" + i + "." + Eventdata.STORY[i].type;

    //         let url = await uploadString(Eventdata.STORY[i].file, shurl);
    //         Eventdata.STORY[i].file = url;
    //         await Storycpy.push({
    //             ...Eventdata.STORY[i],
    //             file: url,
    //             type: Eventdata.STORY[i].type,
    //         });
    //     }
    // }
    await dispatch(
      saveEvent({
        Type: props.Type,
        Events: EventCpy,
        Album: Albumcpy,
        Story: Storycpy,
        code: codescpy,
        EntryWay: EntryWay,
      })
    );
    //  setisSaving(false);
  };
  return (
    <>
      <Modal className="f-s-modal" open={openModal}>
        <div className="f-s-modal-card">
          <Addformultiple
            Name="Schedule"
            className="modal-component"
            open={setopenModal}
            participants={participants}
            eventKey={eventKey}
            setParticipants={setParticipants}
            setKey={setKey}
            Events={props.Events}
            isMobile={isMobile}
            openContactPicker={openContactPicker}
            saveparticipantsfromexcel={saveparticipantsfromexcel}
            isSaving={isSaving}
          />
        </div>
      </Modal>
      <Grid container spacing={0}>
        {isSaving === true ? <CircularProgress className="Progress" /> : <></>}
        <img src={Access} className="access-logo " />
        <b className="tac w-100 b theme-font ">
          Give access to your guest or Upload CSV with for group access
        </b>
        <Grid item xs={12}>
          <p className="w-100 tac theme-font">
            <b>
              <u>Note</u>
            </b>
            :{" CSV can only by accessed via desktop"}
          </p>
        </Grid>
        <Grid container spacing={0}>
          {/*             <Grid item xs={12} sm={12}>
                    <Button variant="secondary"
                        className=" btn custom-file-upload t-white l-blue mt-5px"
                        style={{ display: isMobile === true ? "block" : "none" }}
                        onClick={() => {
                            if (props.Events.length === 1) {
                                openContactPicker();
                            } else {
                                setopenModal(true)
                            }

                        }}

                    >
                        PhoneBook
                    </Button>
                </Grid> */}
          <Grid item xs={12}>
            <AddCode
              Events={props.Events}
              code={code}
              setCodes={setCodes}
              setEntryWay={setEntryWay}
              save={save}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant="secondary"
              htmlfor="input1"
              className="btn t-white mt-5px"
              style={{
                display:
                  window.innerWidth > window.innerHeight ? "block" : "none",
                width: "96%",
                margin: "2%",
                borderRadius: "20px",
              }}
              onClick={(e) => {
                if (props.Events.length > 1) {
                  alert("clicked>");
                  // console.log("done 2")
                  e.preventDefault();
                  setopenModal(true);
                } else {
                  // console.log("done 2")
                  e.preventDefault();
                  setopenModal(true);
                }
              }}
              disabled
            >
              {props.Events.length === 1 ? " Upload Excel" : "Add Participants"}
            </Button>
            <input
              type="file"
              id="input1"
              className="upload-excel mt-10px"
              onChange={(e) => {
                if (props.Events.length < 1) {
                  readExcel(e.target.files[0]);
                  // console.log("done 1")
                }
              }}
              style={{ display: isMobile === false ? "block" : "none" }}
              multiple={false}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Grid>
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
          sm={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <FaArrowCircleUp size={50} style={{color: '#3897F1'}} />
        </Grid>

        <Grid item xs={participants.length > 0 ? 6 : 12}>
          <button
            className="btn next l-blue mt-10px t-white"
            onClick={() => {
              props.handleBack();
            }}
            style={{ position: "fixed", bottom: "10px" }}
          >
            Back
          </button>
        </Grid>
        <Grid item xs={participants.length > 0 ? 6 : false}>
          <button
            style={{ display: participants.length > 0 ? "block" : "none" }}
            className="btn next mt-10px l-blue t-white p-5px"
            onClick={() => {
              save();
            }}
          >
            Next
          </button>
        </Grid>
      </Grid>
    </>
  );
}
