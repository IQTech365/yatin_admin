import React, { useState, useEffect } from "react";
import Header from "../Helpers/Header/Header.js";
import { Container, Row, Col, Form } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../Comments/Comments.css";
import { Grid } from "@material-ui/core";
import { FcLike } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { url } from "../../Utils/Config";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import { FcLikePlaceholder } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import history from "../../Utils/History";
import { likecomment } from "../../Redux/DispatchFuncitons/postfunctions";
import { comment_event } from "../../Redux/DispatchFuncitons/Eventfunctions";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { IconButton } from "@material-ui/core";
export default function Coments(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  let Events = useSelector((state) => state.Eventdata);
  const [MainCode, setMainCode] = useState("");
  const [eveid, seteveid] = useState("");
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState("");
  let base = "";

  let Eventdata = [];
  const getcomments = () => {
    axios
      .post(url + "post/getEventcomments", {
        id: props.match.params._id,
        Phone: Auth.Phone,
      })
      .then(async (res) => {
        if (res.data.data && res.data.data.length > comments.length) {
          console.log(res.data.data);
          await setcomments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        return { err: "error 404" };
      });
  };
  useEffect(() => {
    getcomments();
    const interval = setInterval(() => {
      getcomments();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const submit = async () => {
    if (comment !== "") {
      var saved = await dispatch(
        comment_event(props.match.params._id, comment)
      );
      if (saved === 1) {
        await setcomment("");
        await getcomments();
      }
    }
  };
  useEffect(async () => {
    // console.log("/MyEvents/eventpage/chat/" + props.match.params.id);
    if (Events.myEvents.length > 0 && Events.myInvitations.length > 0) {
      if (
        props.location.pathname ===
        "/MyEvents/comments/" + props.match.params.id
      ) {
        Eventdata = Events.myEvents[props.match.params.id];
        base = "MyEvents";
        await seteveid(Eventdata[0]._id)
        await setMainCode(Eventdata[0].MainCode)
        //  await setcomments(Eventdata[0].CommentList)
      } else {
        Eventdata = Events.myInvitations[props.match.params.id];
        base = "inv";
        await seteveid(Eventdata[0]._id)
        await setMainCode(Eventdata[0].MainCode)
        //  await setcomments(Eventdata[0].CommentList)
      }
    } else {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    }
  }, [Events.myEvents, Events.myInvitations]);

  // useEffect(() => {
  //   if (props.showcommment === true) {
  //     console.log(props.id);
  //     axios
  //       .post(url + "post/getpostcomments", {
  //         id: props.id,
  //         Phone: Auth.Phone,
  //       })
  //       .then((res) => {
  //         if (res.data.data) {
  //           console.log(res.data.data);
  //           setcomments(res.data.data);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return { err: "error 404" };
  //       });
  //   }
  // }, [props.showcommment]);

  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Container className="ofh h80" fluid>
        <Container>
          <Row
            style={{
              marginTop: 20,
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 5,
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: 23 }}>
              <IoArrowBackCircleOutline
                size={40}
                onClick={() => {
                  history.goBack();
                }}
              />
              Event
            </p>
            <Col></Col>
          </Row>
        </Container>
        <Grid
          container
          spacing={2}
          style={{
            margin: 5,
          }}
        >
          {comments.map((comment) => (
            <Grid container spacing={1}>
              <Grid item xs={2} md={1}>
                <UserDataUrl showIcon={true} Phone={comment.CommentBy} />
              </Grid>
              <Grid item xs={8} md={9}>
                <h5 className="m-0 p-0">
                  <UserDataUrl showName={true} Phone={comment.CommentBy} />
                </h5>
                <p className=" m-5px fs-14">{comment.Comment}</p>
              </Grid>
              <Grid item xs={2} md={1}>
                <Like
                  likeby={comment.likeby}
                  MainCode={MainCode}
                  _id={comment._id}
                />
                {comment.likeby ? comment.likeby.Length : 0}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Grid
        container
        spacing={0}
        style={{
          margin: 5,
          position: "fixed",
          bottom: "0px",
        }}
      >
        <Grid item xs={10}>
          <Form.Control
            placeholder="Write a Comment"
            style={{
              width: "100%",
              margin: 0,
              marginTop: "5px",
              marginBottom: "5px",
            }}
            value={comment}
            onChange={(e) => {
              setcomment(e.target.value);
            }}
          />
        </Grid>
        <Grid
          item
          xs={2}
          onClick={() => {
            submit();
          }}
        >
          <IconButton>
            {" "}
            <IoMdSend
              size={20}
              style={{ float: "right", margin: "auto", marginTop: "5px" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
export function Like(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [isliked, setisliked] = useState(false);
  useEffect(() => {
    setisliked(props.likeby ? props.likeby.includes(Auth.Phone) : false);
  }, []);
  async function Dislike() {
    let likelistcpy = [...props.likeby];
    likelistcpy[props.index] = false;
    await setisliked(false);
  }
  async function Like() {
    let likelistcpy = [...props.likeby];
    likelistcpy[props.index] = true;
    // props.setLikeList(likelistcpy);
    await setisliked(true);
  }
  const likethecomment = () => { };
  return (
    <>
      {isliked === false ? (
        <FcLikePlaceholder
          size={30}
          onClick={() => {
            dispatch(likecomment(props._id, Auth.Phone, props.MainCode));
            Like();
            likethecomment();
          }}
        />
      ) : (
        <FcLike
          size={30}
          onClick={() => {
            dispatch(likecomment(props._id, Auth.Phone, props.MainCode));
            Dislike();
            likethecomment();
          }}
        />
      )}
      {props.likeby.Length}
    </>
  );
}
