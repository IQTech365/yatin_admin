import React, { useCallback } from "react";
import "../Feed/Feed.css";
import { Container, Row, Col, } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserData from "../Helpers/UserData/UserData";
import { IoCameraOutline } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import "react-bootstrap-tagsinput/dist/index.css";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from '@material-ui/core'
export default function AddPost(props) {
    const Auth = useSelector((state) => state.Auth);

    const onDrop = useCallback(async (acceptedFiles) => {

        if (acceptedFiles[0].size > 80259265) {
            alert("Max file size 5mb");
            return false;
        }
        let url = "";
        let ftype = acceptedFiles[0].type.split("/");
        //   console.log(ftype)
        props.settype(ftype[1]);
        var reader = await new FileReader();
        reader.onload = async function () {
            url = reader.result;
            props.setimageurl(url);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
        await reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
    });

    return (
        <Container
            className="addpost-event  "
            style={{ marginTop: 10, marginBottom: 10 }}
            fluid
        > {props.isSubmit === false ? (
            <></>
        ) : (
            <CircularProgress style={{
                position: 'fixed', left: '45vw', top: '45vh', zIndex: 999
            }} />
        )}
            <Grid container spacing={0} className="commentinp">
                <Grid item xs={2} md={1} style={{ margin: 'auto' }}>
                    <UserData Phone={Auth.Phone} showIcon={true} />
                </Grid>
                <Grid item xs={8} md={10}>
                    <input
                        type="text"
                        onChange={(e) => {
                            props.setcaption(e.target.value);
                        }}
                        value={props.caption}
                        variant="outlined"
                        size="small"
                        className="w-100"
                        placeholder="Add a Post"
                        style={{
                            width: "100%",
                            outline: "none",
                            border: "none",
                            background: "#f6f6f6",
                            height: "100%",
                            fontSize: 14,
                        }}
                    />
                </Grid>
                <Grid item xs={2} md={1}>
                    {props.isSubmit === false ? (
                        <IconButton
                            onClick={() => {
                                props.submit();
                            }}
                        >
                            <SendIcon style={{ color: "black" }} />
                        </IconButton>
                    ) : (
                        <IconButton>
                            ...
                        </IconButton>
                    )}
                </Grid>
            </Grid>

            <Row className="addmedia-tag" style={{ marginTop: 20 }}>
                <Col className="btn t-blue ll-blue btn-rnd m-5px" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <a style={{ color: "#007bff" }}>
                        <IoCameraOutline size={20} /> Add Media
                    </a>
                </Col>
                <Col className="btn t-blue ll-blue btn-rnd m-5px">
                    <a
                        style={{ color: "#007bff" }}
                        onClick={() => {
                            props.setShowTagQuery(true);
                        }}
                    >
                        <FaTag size={17} />Add  Tags
                    </a>
                    {/* )} */}
                </Col>
            </Row>
            {props.imageurl !== "" ? (
                props.type === "png" ||
                    props.type === "jpg" ||
                    props.type === "jpeg" ? (
                    <Row>
                        <Col md={12}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img
                                    src={props.imageurl}
                                    className="w-100"

                                />
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <center>
                            <video
                                src={props.imageurl}
                                type="video/mp4"
                                controls={true}
                                preload="none"
                                height={260}
                                width={window.innerWidth > 400 ? 800 : window.innerWidth}
                                autoPlay="true"
                            />
                        </center>
                    </Row>
                )

            ) : (
                <></>
            )}


        </Container>
    )
}
