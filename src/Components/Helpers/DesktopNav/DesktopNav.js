import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { BiNews } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import history from "../../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Popups/Popup";
import Notifications from "../../Notifications/Notification";
import { IoImagesSharp } from "react-icons/io5";
import { deleteInvite } from '../../../Redux/DispatchFuncitons/Eventfunctions'
import { Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";

export default function DesktopNav(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const useStyles = makeStyles({});
  const [ishost, setishost] = useState(false);
  const [show, setshow] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false)
  useEffect(() => {
    if (props.Eventdata && props.Eventdata.length > 0) {
      //  console.log(props.Eventdata)
      var Host = props.Eventdata[0].Host;
      for (var i = 0; i < Host.length; i++) {
        if (Host[i] === Auth.Phone) {
          setishost(true);
        }
      }
    }
    // console.log(props.base);
  }, [props.Eventdata]);

  return (
    <Container className="navigation-box" fluid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={showPopup}
      >
        <div className="modal-card">
          <IconButton
            className="popup-close"
            onClick={() => {
              toggleShowPopup(false);
            }}
          >
            <CancelIcon color="secondary" fontSize="large" />
          </IconButton>
          <Row className="m-0"><center><h3
            style={{ fontSize: 20, textAlign: 'center', fontWeight: 400 }}
          >
            Do you want to delete this invite?</h3></center>
          </Row>
          <Row className="m-0" style={{ paddingTop: 20 }}>
            <Col><Button variant="danger"
              style={{ borderRadius: 20 }}
              className="w-100" onClick={() => {
                dispatch(deleteInvite(props.Eventdata[0].MainCode))
              }}>Yes</Button>
            </Col>
            <Col><Button variant="primary" className="w-100"
              style={{ borderRadius: 20 }}
              onClick={() => {
                toggleShowPopup(false);
              }}>No</Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <Row>
        <Col
          md={2}
          className="tac"
          onClick={() => {
            history.push("../albums/" + props.id);
          }}
        >
          <IoImagesSharp size={30} />
          <a>Album</a>
        </Col>
        <Col
          md={2}
          className="tac"
          onClick={() => {
            history.push("./feed/" + props.id + "/" + props.MainCode);
          }}
        >
          <BiNews size={30} />
          Feed
        </Col>
        {/* <Col
          md={2}
          className="tac"
          onClick={() => {
            setshow(true);
          }}
        >
          <AiOutlineBell size={30} />
          Notifications
        </Col> */}
        <Col md={2} className="tac">
          <DropdownButton id="dropdown-item-button" title="More">
            <Dropdown.Item
              as="button"
              onClick={() => {
                history.push("/" + props.base + "/story/" + props.id);
              }}
            >
              Our Story
            </Dropdown.Item>
            {/* <Dropdown.Item
              as="button"
              onClick={() => {
                history.push("/" + props.base + "/albums/" + props.id);
              }}
            >
              Albums
            </Dropdown.Item> */}
            <Dropdown.Item
              as="button"
              onClick={() => {
                toggleShowPopup(true)
                // dispatch(deleteInvite(Eventdata[0].MainCode))
              }}
            >
              Delete Invite
            </Dropdown.Item>
            {ishost === true ? (

              <Dropdown.Item
                as="button"
                onClick={() => {
                  history.push("/MyEvents/admin/" + props.id);
                }}
              >
                Admin
              </Dropdown.Item>
            ) : (
              <></>
            )}
          </DropdownButton>
        </Col>
      </Row>
      <Popup
        component={Notifications}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={props.MainCode}
        showinvitaions={true}
      />
    </Container>
  );
}
