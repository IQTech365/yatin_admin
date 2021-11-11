import React from "react";
import { Modal } from "@material-ui/core";
import "./Popup.css";
import CancelIcon from "@material-ui/icons/Cancel";
export default function Fullsizepopup(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="f-s-modal"
        open={props.showPopup}
      /*   onClose={() => {
          props.toggleShowPopup(false);
        }} */
      >
        <div
          className="hoxInv-container animated-hox"
          style={{
            width: "90%",
            height: "70vh",
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%)",
            borderTopLeftRadius: "23px",
            borderTopRightRadius: "23px",
          }}
        >
          <CancelIcon
            onClick={() => {
              props.toggleShowPopup(false);
            }}
            color="secondary"
            className="popup-close"
            style={{marginTop:'4vh'}}
          />
          <props.component
            className="modal-component"
            hide={props.toggleShowPopup}
            url={props.url ? props.url : ""}
            MainCode={props.MainCode}
            showall={props.showall}
            showinvitaions={props.showinvitaions}
            showevent={props.showevent}
            eventCode={props.eventCode}
            Groups={props.Groups}

          />
        </div>
      </Modal>
    </div>
  );
}
