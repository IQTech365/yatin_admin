// import React, { useEffect, useState } from "react";
import Logo from "../Assets/Logo.svg";
import history from "./History";
import MobileLogo from "../Assets/MobileLogo.png"
export default function Headings(props) {
  // const [url, seturl] = useState("");
  // useEffect(() => {
  //   let urlstr = props.url.split("/");
  //   seturl(urlstr[1]);
  // }, []);

  return (
    <span className="black-t title-name">
      <img
        src={MobileLogo}
        className="Logo"
        alt="logo"
        width="30"
        height="30"
        onClick={() => history.push("/home")}
      />
    </span>
  );

  //return <span className="black-t">{props.url}123</span>;
}
