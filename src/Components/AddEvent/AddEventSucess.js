import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import ShareVideo from "../../Assets/ShareVideo.mp4";
import { Grid } from "@material-ui/core";
import check from "../../Assets/check-circle.1.png";
import { FcShare } from "react-icons/fc";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import axios from "axios";
import platform from "platform";
import { url } from "../../Utils/Config";
import { useSelector } from "react-redux";
import { WhatsappShareButton } from "react-share";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import WhatsIcon from "../../Assets/WhatsIcon.png";
import { IconButton, Select, FormControl } from "@material-ui/core";
import { MdShare } from "react-icons/md";
export default function AddEventSucess(props) {
  const Auth = useSelector((state) => state.Auth);
  const [maincode, setmaincode] = useState(props.match.params.id);
  const [allevents, setallevents] = useState([]);
  const [pwd, setpwd] = useState("");
  const [currentcode, setCurrentCode] = useState("");
  const [mode, setmode] = useState();
  const [sharelink, setcodesharelink] = useState("");
  const [Watsapp, setWatsapp] = useState("");
  const [SelectedCode, setSelectedCode] = useState("");
  const [image, getImage] = useState("");
  const [filetype, getfiletype] = useState("");
  const [type, setType] = useState("");
  const [isShowingAlert, setShowingAlert] = React.useState(false);
  const [selectedindex, setselectedindex] = useState(null);
  useEffect(() => {
    console.log("changed");
  }, [currentcode]);
  useEffect(() => {
    axios
      .post(url + "event/viewinvitation", {
        MainCode: props.match.params.id,
      })
      .then(async (res) => {
        await setallevents(res.data.Events);
        if (res.data.Events[0].EntryWay === "Code") {
          setCurrentCode(
            res.data.Events[0].Name + " code: " + res.data.Events[0].code
          );
          setSelectedCode(
            res.data.Events[0].Name + " code: " + res.data.Events[0].code
          );
          await setselectedindex(res.data.Events[0].code);
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
          await getfiletype(res.data.Events[0].filetype);
          await setpwd(res.data.Events[0].InvId.PassWord);
          await setType(res.data.Events[0].InvId.Type);
        } else {
          setcodesharelink(
            " https://mobillyinvite.com/MyInvitations/" +
              maincode +
              "/" +
              res.data.Events[0].code
          );
          await setselectedindex(res.data.Events[0].code);
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
    // console.log(allevents);
  }, []);

  const handleOnSubmit = async (all) => {
    setShowingAlert(true);
    const response = await fetch(ShareVideo);
    const blob = await response.blob();
    const file = new File([blob], "share.mp4", { type: blob.type });

    // console.log(file);
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      let url = "";
      if (all === true) {
        url = "https://mobillyinvite.com/MyInvitations/" + maincode;
      } else {
        url =
          "https://mobillyinvite.com/MyInvitations/" +
          maincode +
          "/" +
          selectedindex;
      }

      await navigator
        .share({
          title: "Hello👋",
          text:
            "Hi👋 You Have Been Invited By " +
            " " +
            Auth.Name +
            " " +
            "to" +
            " " +
            allevents[0].Name +
            " " +
            "on" +
            " " +
            allevents[0].Date +
            " " +
            "Please See Your Digital Invite🎉 on the Link Below",

          url: url,
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

  const handleClose = async (e) => {
    console.log(e.target.value.split(":")[1]);
    await setselectedindex(e.target.value.split(":")[1]);
    await setCurrentCode(e.target.value);
    await setSelectedCode(e.target.value);
    // await setcodesharelink(
    //   " https://mobillyinvite.com/MyInvitations/" + maincode + "/" + data
    // );
    // await setWatsapp(
    //   "Hi there ! You have been invited by " +
    //   Auth.Name +
    //   " to " +
    //   allevents[0].Name +
    //   ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
    //   " https://mobillyinvite.com/MyInvitations/" +
    //   maincode +
    //   "/" +
    //   allevents[0].code
    // );
    // setAnchorEl(null);
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
          <Grid item xs={12} style={{ marginTop: "10vh" }}>
            <center>
              <img src={check} className="p-10px " />
            </center>
          </Grid>
          <Grid item xs={12}>
            <h2 className="tac theme-font">
              Your Invitation has been sucessfully created.
            </h2>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: pwd !== "" && pwd !== null ? "block" : "none" }}
          >
            <h4 className="w-100 tac"> Passcode:{pwd} </h4>
          </Grid>
          <Grid item xs={12}>
            <p className="tac" style={{ fontWeight: "700" }}>
              Share Exclusive Invite✨
            </p>
          </Grid>

          {allevents &&
          allevents.length > 1 &&
          allevents[0].EntryWay === "Code" ? (
            <>
              <Grid item xs={10} className="tac m-b-25px mt-5px">
                <select
                  value={currentcode}
                  onChange={(e) => {
                    setselectedindex(e.target.value.split(":")[1]);
                    setCurrentCode(e.target.value);
                  }}
                  style={{
                    textAlign: "center",

                    marginTop: "5px",
                  }}
                  className="selectboxblue"
                  displayEmpty
                >
                  {" "}
                  {allevents &&
                    allevents.map((eve) => (
                      <option value={eve.Name + "Code :" + eve.code}>
                        {" "}
                        {eve.Name + "Code :" + eve.code}
                      </option>
                    ))}
                </select>
              </Grid>
              <Grid item xs={2}>
                <IconButton style={{ backgroundColor: "antiquewhite" }}>
                  <MdShare
                    onClick={async () => {
                      await handleOnSubmit(false);
                    }}
                  ></MdShare>
                </IconButton>
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
              {/*    <Grid
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
          </Grid> */}
 {platform.name === "Safari" &&
              platform.version.split(".")[0] >= 13 ? (
                <>
                  {" "}
                  <WhatsappShareButton
                    url={" "}
                    title={
                      pwd !== "" && pwd !== null
                        ? Watsapp + ". Password: " + pwd
                        : Watsapp
                    }
                    separator=" "
                    className="Demo__some-network__share-button"
                  >
                    <img
                      src={WhatsIcon}
                      className=""
                      style={{ height: "50px", width: "50px" }}
                    />
                  </WhatsappShareButton>{" "}
                </>
              ) : (
                <> <FcShare
                onClick={async () => {
                  await handleOnSubmit(true);
                }}
                className="share-button"
                type="button"
                title="Share this article"
                size={40}
                style={{ marginRight: "10px" }}
              /></>
              )}
             
              <div>
                <div
                  className={`alert alert-success ${
                    isShowingAlert ? "alert-shown" : "alert-hidden"
                  }`}
                  onTransitionEnd={() => setShowingAlert(false)}
                >
                  <strong>Wait!</strong> Generating Link
                </div>
              </div>
             
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
      {/* <Menu
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
      </Menu> */}
    </Grid>
  );
}
