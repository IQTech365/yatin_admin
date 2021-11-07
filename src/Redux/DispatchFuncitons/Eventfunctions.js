import axios from "axios";
import { url } from "../../Utils/Config";
import {
  EVENTSAVED,
  EVENTSAVEFAIL,
  GOTMYEVENTS,
  GETMYINVITAITONS, DELETEALBUM, DELETESTORY
} from "../Actions/EventActions";
import { deleteEvent } from './CodeFunctions';
import history from "../../Utils/History";
export function saveEvent(edata) {
  return (dispatch) => {
    console.log(edata);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    edata.date = dateTime;
    axios.post(url + "event/create", edata).then(async (res) => {
      console.log(res);
      await dispatch({
        type: DELETEALBUM
      })
      await dispatch({
        type: DELETESTORY
      })
      history.push("/MyEvents/event-create-success/" + res.data.MainCode);
    });
  };
}
export function addme(code, maincode) {
  return (dispatch) => {
    if (code === 'All') {
      axios
        .post(url + "event/addmetoall", { maincode: maincode })
        .then(async (res) => {

          if (res.data.status === 'success') {
            await dispatch(deleteEvent());
            await dispatch(GetEvents());
            await dispatch(GetInvitations());

          }
        })
        .catch((err) => {
          return 0;
        });
    } else {
      axios
        .post(url + "event/addme", { code: code, maincode: maincode })
        .then(async (res) => {

          if (res.data.status === 'success') {
            await dispatch(deleteEvent());
            await dispatch(GetEvents());
            await dispatch(GetInvitations());

          }
        })
        .catch((err) => {
          return 0;
        });
    }

  };
}


export function authInv(id, index) {
  return (dispatch) => {
    axios.post(url + "event/AuthInvite", { _id: id }).then(async (res) => {
      console.log("res", res)
      if (res.data.status === 'success') {
        await dispatch(deleteEvent());
        await dispatch(GetEvents());
        await dispatch(GetInvitations());
        history.push("/inv/eventpage/" + index)
      }
    });
  }
}

export function GetEvents() {
  return (dispatch) => {
    axios.get(url + "event/getmyEvents").then((res) => {
      dispatch({
        type: GOTMYEVENTS,
        payload: res.data.MyEvents,
      });
      return true
    });
  };
}

export function GetInvitations() {
  return (dispatch) => {
    axios.get(url + "event/getmyInvitaion").then((res) => {
      dispatch({
        type: GETMYINVITAITONS,
        payload: res.data.Invitations,
      });
      console.log(res);
      return true
    });
  };
}
export function rsvp_event(id, status, Phone) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/rsvp", { id: id, status: status, Phone: Phone, date: dateTime })
      .then((res) => {
        // dispatch(GetInvitations());
        // dispatch(GetEvents());
        console.log(res);
        return 1
      });
  };
}
export function like_event(id) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios.post(url + "event/like", { id: id, dateTime: dateTime }).then((res) => {
      dispatch(GetInvitations());
      dispatch(GetEvents());
      console.log(res);
    });
  };
}
export function comment_event(id, comment, setiscommenting) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/comment", { id: id, comment: comment, date: dateTime })
      .then(async (res) => {

        await dispatch(GetInvitations());
        await dispatch(GetEvents());
        setiscommenting(false)
        return 1;
      });
  };
}
export function change_event(id, type, data) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (dispatch) => {
    axios
      .post(url + "event/updateevents", { id: id, type: type, data: data, date: dateTime })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function add_participants(id, data) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/add_participants", { id: id, data: data, date: dateTime })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function update_participants(id, data) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/UpdateParticipants", { id: id, data: data, date: dateTime })
      .then(async (res) => {
        await dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function update_events(Type, Eventdata, maincode, _id, setIsSubmitted) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (dispatch) => {
    axios
      .post(url + "event/updateevents", {
        Type: Type,
        Eventdata: Eventdata,
        maincode: maincode,
        id: _id,
        date: dateTime
      })
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(GetInvitations());
          dispatch(GetEvents());
          console.log(res);
          setIsSubmitted(false)
          alert("Updated")
        } else {
          setIsSubmitted(false)
          alert("failed")
        }

      });
  };
}
export function uploadfiletoalbum(Album, MainCode, show, setIsProcessing) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (dispatch) => {
    axios
      .post(url + "event/addalbum", {
        Album: Album, _id: MainCode, date: dateTime
      })
      .then(async (res) => {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());
        console.log(res);
        await setIsProcessing(false)
        await show(false)
      });
  };
}
export function deleteInvite(MainCode) {

  return (dispatch) => {
    axios
      .post(url + "event/delete", {
        maincode: MainCode,
      })
      .then(async (res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        history.push('/inv')
        console.log(res);
      });
  };
}
export function UpdateSchedules(eid, Schedule) {

  return (dispatch) => {
    axios
      .post(url + "event/updateSchedule", {
        eid: eid, Schedule: Schedule,
      })
      .then(async (res) => {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());

      });
  };
}
export function UpdateAlbum(eid, Schedule) {

  return (dispatch) => {
    axios
      .post(url + "event/updateAlbum", {
        eid: eid, Schedule: Schedule,
      })
      .then(async (res) => {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());

      });
  };
}
export function UpdateStory(id, story) {
  return (dispatch) => {
    axios
      .post(url + "event/updateStory", {
        id: id, story: story,
      })
      .then(async (res) => {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());

      });
  };
}
export function addCohost(eid, newHost) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/addHost", {
        _id: eid, newHost: newHost, date: dateTime
      })
      .then(async (res) => {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());

      });
  };
}

export function removeCohost(eid, newHost) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/removeHost", {
        _id: eid, newHost: newHost, date: dateTime
      })
      .then(async (res) => {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());

      });
  };
}