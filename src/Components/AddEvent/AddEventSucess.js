import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import { Grid } from "@material-ui/core";
import check from "../../Assets/check-circle.1.png";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import axios from "axios";
import { url } from "../../Utils/Config";
import { useSelector } from "react-redux";
import { WhatsappShareButton } from "react-share";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import WhatsIcon from "../../Assets/WhatsIcon.png";

export default function AddEventSucess(props) {
  const Auth = useSelector((state) => state.Auth);
  const [maincode, setmaincode] = useState(props.match.params.id);
  const [allevents, setallevents] = useState([]);
  const [pwd, setpwd] = useState("");
  const [mode, setmode] = useState();
  const [sharelink, setcodesharelink] = useState("");
  const [Watsapp, setWatsapp] = useState("");
  const [SelectedCode, setSelectedCode] = useState("");
  const [image, getImage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios
      .post(url + "event/viewinvitation", {
        MainCode: props.match.params.id,
      })
      .then(async (res) => {
        await setallevents(res.data.Events);
        if (res.data.Events[0].EntryWay === "Code") {
          setSelectedCode(
            res.data.Events[0].Name + " code: " + res.data.Events[0].code
          );

          setcodesharelink(
            " https://mobillyinvite.com/MyInvitations/" +
              maincode +
              "/" +
              res.data.Events[0].code
          );
          await setWatsapp(
            "Hi there ! You have been invited by " +
              Auth.Name +
              " to " +
              res.data.Events[0].Name +
              ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
              " https://mobillyinvite.com/MyInvitations/" +
              maincode +
              "/" +
              res.data.Events[0].code
          );
          await getImage(res.data.Events[0].file);
          await setpwd(res.data.Events[0].InvId.PassWord);
          await setType(res.data.Events[0].InvId.Type);
        } else {
          setcodesharelink(
            " https://mobillyinvite.com/MyInvitations/" +
              maincode +
              "/" +
              res.data.Events[0].code
          );
          await setWatsapp(
            "Hi there ! You have been invited by " +
              Auth.Name +
              " to " +
              res.data.Events[0].Name +
              ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
              " https://mobillyinvite.com/MyInvitations/" +
              maincode
          );
          await setpwd(res.data.Events[0].InvId.PassWord);
        }

        await setmode(res.data.Events[0].EntryWay);
      });
    console.log(allevents);
  }, []);

  const handleOnSubmit = async () => {
    const response = await fetch("data:image/jpeg;base64,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");
    const blob = await response.blob();
    const file = new File([blob], "share.jpg", { type: 'image/jpeg' });
    console.log(file);
    if (navigator.share) {
      await navigator
        .share({
          title: "title",
          text:  type +
          " \n Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! ",

          url: "https://mobillyinvite.com/MyInvitations/" + maincode,
          files: [file],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (data, Name) => {
    await setSelectedCode(Name);
    await setcodesharelink(
      " https://mobillyinvite.com/MyInvitations/" + maincode + "/" + data
    );
    await setWatsapp(
      "Hi there ! You have been invited by " +
        Auth.Name +
        " to " +
        allevents[0].Name +
        ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
        " https://mobillyinvite.com/MyInvitations/" +
        maincode +
        "/" +
        allevents[0].code
    );
    setAnchorEl(null);
  };
  useEffect(() => {
    if (navigator.share === undefined) {
      if (window.location.protocol === "http:") {
        window.location.replace(
          window.location.href.replace(/^http:/, "https:")
        );
      }
    }
  }, []);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={false} sm={3} md={3} />
      <Grid item xs={12} sm={6} md={6}>
        <Grid container spacing={0} className="p-10px">
          <Grid item xs={12}>
            <center>
              <img src={check} className="p-10px " />
            </center>
          </Grid>
          <Grid item xs={12}>
            <h2 className="tac theme-font">
              Your Invitation has been sucessfully created.
            </h2>
          </Grid>
          <Grid item xs={12} style={{ display: pwd !== "" ? "block" : "none" }}>
            <h4 className="w-100 tac"> Passcode:{pwd} </h4>
          </Grid>
          <Grid item xs={12}>
            <p className="tac" style={{ fontWeight: "700" }}>
              Share Exclusive Invite✨
            </p>
          </Grid>

          <Grid
            item
            xs={12}
            className="tac m-b-25px clipboard"
            onClick={() => {
              navigator.clipboard.writeText(
                "https://mobillyinvite.com/MyInvitations/" + maincode
              );
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={10} md={11} className="link p-t-5">
                {"https://mobillyinvite.com/xxxxx"}
              </Grid>
              <Grid item xs={2} md={1} className="p-t-10">
                <FileCopyIcon className="v-t" />
              </Grid>
            </Grid>
          </Grid>
          {allevents &&
          allevents.length > 0 &&
          allevents[0].EntryWay === "Code" ? (
            <>
              <Grid item xs={12} className="tac m-b-25px clipboard grey">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={10}
                    md={11}
                    className="link p-t-5"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    {SelectedCode}
                  </Grid>
                  <Grid item xs={2} md={1} className="p-t-10">
                    <FileCopyIcon
                      className="v-t"
                      onClick={() => {
                        navigator.clipboard.writeText(sharelink);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}
          <Grid item xs={12} className="w-100 tac">
            Share With 1-Click
          </Grid>
          <Grid
            item
            xs={12}
            className="tac m-b-25px"
            style={{ zIndex: "33333" }}
          >
            <center>
              <button
                onClick={handleOnSubmit}
                className="share-button"
                type="button"
                title="Share this article"
              >
                Share
              </button>
              <WhatsappShareButton
                url={" "}
                title={pwd !== "" ? Watsapp + ". Password: " + pwd : Watsapp}
                separator=" "
                className="Demo__some-network__share-button"
              >
                <img
                  src={WhatsIcon}
                  className=""
                  style={{ height: "30px", width: "30px" }}
                />
              </WhatsappShareButton>
            </center>
          </Grid>
          <Grid item xs={12} className="tac" style={{ fontSize: 10 }}>
            Note: Only those who have invite can access
          </Grid>
          <Grid item xs={12} className="down-float">
            <button
              className="btn save-event mt-10px"
              style={{ position: "fixed", bottom: "0", right: "0" }}
              onClick={() => {
                if (props.match.params.Share === undefined) {
                  history.push("/");
                } else {
                  history.goBack();
                }
              }}
            >
              {props.match.params.Share === undefined ? "Done" : "Back"}
            </button>
          </Grid>
        </Grid>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        {allevents &&
          allevents.map((eve) => (
            <MenuItem
              onClick={() =>
                handleClose(eve.code, eve.Name + "Code :" + eve.code)
              }
            >
              {eve.Name + "Code :" + eve.code}
            </MenuItem>
          ))}
      </Menu>
    </Grid>
  );
}
