import React, { useState } from "react";
import TemplateOne from "../../Assets/TemplateOne.jpg";
import "./Templates.scss";
import LoginSignup from "../Auth/LoginSignup";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Helpers/Popups/Popup";
import { Button } from "react-bootstrap";

export default function SingleTemplate(props) {
  const [showPopup, toggleShowPopup] = useState(false);
  const dispatch = useDispatch();
  return (
    <div class="page-content">
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={LoginSignup}
      />
      <div
        class="card template_card"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div class="content">
          <h2 class="title" style={{ visibility: "hidden" }}>
            {props.name}
          </h2>
          <p class="copy" style={{ visibility: "hidden" }}>
            {props.desc}
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {" "}
        <Button
          className="template_btn"
          variant="primary"
          onClick={() => {
            toggleShowPopup(true);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

SingleTemplate.defaultProps = {
  image: TemplateOne,
  name: "Template",
  desc: "Yatin Weds Charu",
};
