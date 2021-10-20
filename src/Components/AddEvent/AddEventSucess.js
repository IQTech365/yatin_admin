import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import { Grid } from "@material-ui/core";
import check from "../../Assets/check-circle.1.png";
import { FcShare } from "react-icons/fc";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import axios from "axios";
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
  const [mode, setmode] = useState();
  const [sharelink, setcodesharelink] = useState("");
  const [Watsapp, setWatsapp] = useState("");
  const [SelectedCode, setSelectedCode] = useState("");
  const [image, getImage] = useState("");
  const [filetype, getfiletype] = useState("");
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

  const handleOnSubmit = async () => {
    debugger;
    var filesArray = [];
    let file = "";
    const response = await fetch(image);
    const blob = await response.blob();
    if (filetype === "jpeg" || filetype === "png" || filetype === "jpg") {
      file = new File([blob], "image.jpg", { type: blob.type });
      filesArray = [file];
    } else {
      file = await new File([blob], "video." + filetype, { type: blob.type });
      filesArray = [file];
    }

    // console.log(file);
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
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

          url: "https://mobillyinvite.com/MyInvitations/" + maincode,
          files: filesArray,
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
                <FormControl
                  variant="outlined"
                  className="w-100-p "
                  size="small"
                  variant="outlined"
                >
                  <Select
                    native
                    value={SelectedCode}
                    onChange={handleClose}
                    style={{
                      textAlign: "center",
                      padding: "none",
                      height: "38px",
                    }}
                    // className="selectboxblue"
                    displayEmpty
                  >
                    {" "}
                    {allevents &&
                      allevents.map((eve) => (
                        <option
                          value={(eve.code, eve.Name + "Code :" + eve.code)}
                        >
                          {" "}
                          {eve.Name + "Code :" + eve.code}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                {/* <Grid container spacing={0}>
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
                </Grid> */}
              </Grid>
              <Grid item xs={2}>
                <IconButton style={{ backgroundColor: "antiquewhite" }}>
                  <MdShare onClick={handleOnSubmit}></MdShare>
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
              <FcShare
                onClick={handleOnSubmit}
                className="share-button"
                type="button"
                title="Share this article"
                size={40}
                style={{ marginRight: "10px" }}
              />

              {/*    <WhatsappShareButton
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
                  style={{ height: "30px", width: "30px" }}
                />
              </WhatsappShareButton> */}
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
