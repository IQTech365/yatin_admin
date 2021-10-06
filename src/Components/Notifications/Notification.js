import React from "react";
import { Avatar } from "@material-ui/core";
import "./Notifications.css"
import { useSelector } from "react-redux";
import NoNotfcations from '../../Assets/NoNotifications.svg'
import Dateformatter from '../Helpers/DateFormatter/Dateformatter'
export default function Notification(props) {
  const Notifications = useSelector((state) => state.Notifications);
  const Auth = useSelector((state) => state.Auth);

  return (
    <>
      <div className="Notificationportion-strt p-2 ">
        <div className="Notifications-header d-flex flex-row" style={{ marginTop: -15 }}>
          <h4
            className="font-weight-bold pr-5 pt-2"
            style={{ marginRight: "0%" }}
          >
            Notifications
          </h4>
        </div>
      </div>
      {Notifications.length > 0 ? (
        <div className="ofh " style={{ marginTop: "13px", height: '40vh' }}>
          {Notifications.map((note, index) =>
            note.by === Auth.Phone ? <></> : (props.MainCode && note.MainCode === props.MainCode ?
              <div className="media  mb-3">
                <Avatar className="mr-3" src={note.img} alt="img" style={{ top: '4px' }} />
                <div className="media-body">
                  <h5 className="mt-0 font-weight-bold small">
                    {note.Notification}
                  </h5>
                  <p className="text-secondary time_notification"><Dateformatter Date={note.date.split('T')[0] + ' ' + note.date.split('T')[1].substring(0, 5)} /></p>
                </div>
              </div> : <></>)
          )}
        </div>) :
        <>
          <img src={NoNotfcations} className="w-100" />
          <br />
          <h4 className="tac">No Notification</h4>
        </>
      }


    </>
  );
}
