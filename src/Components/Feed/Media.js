import React, { useState, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Container, Row } from "react-bootstrap";
import "./Feed.css";
export default function Media(props) {
    const [currentmedia, setcurrentmedia] = useState(0);
    useEffect(async () => {

        let isselected = false;
        for (let i = 0; i < props.currentPosts.length; i++) {
            if (isselected === false) {
                if (
                    props.popuptype === "Photo" &&
                    (props.currentPosts[i].filetype === "jpeg" ||
                        props.currentPosts[i].filetype === "jpg" ||
                        props.currentPosts[i].filetype === "png")
                ) {
                    await setcurrentmedia(i);
                    // console.log(props.currentPosts[i])
                    // console.log(i)
                    isselected = true;
                } else if (
                    props.popuptype === "Videos" &&
                    props.currentPosts[i].filetype === "mp4"
                ) {
                    await setcurrentmedia(i);
                    isselected = true;
                }
            }
        }
    }, []);

    return (
        <Container fluid>
            <Row
                style={{ marginleft: 30, position: "absolute", top: 0, zIndex: 99999 }}
            >
                <IoArrowBackCircleOutline
                    size={40}
                    style={{ color: "black" }}
                    onClick={() => props.toggleShowPopup(false)}
                />
                <h3 style={{ color: "black", fontSize: 28, fontWeight: "900" }}>
                    {props.popuptype}
                </h3>
            </Row>
            <Row
                style={{
                    marginTop: 0,
                    position: "fixed",
                    top: 0,
                    outline: "none",
                    left: 0,
                    margin: 0,
                }}
            >
                {props.currentPosts.map((post, index) =>
                    post.fileurl !== "" && index === currentmedia ? (
                        props.popuptype === "Photo" &&
                            (post.filetype === "jpeg" ||
                                post.filetype === "jpg" ||
                                post.filetype === "png") ? (
                            <img
                                className="Media"
                                src={post.fileurl}
                                key={index}
                                onClick={() => {
                                    setcurrentmedia(index);
                                }}
                            />
                        ) : props.popuptype === "Videos" && post.filetype === "mp4" ? (
                            <>
                                <video
                                    className="Media"
                                    src={post.fileurl + "#t=0.5"}
                                    type="video/mp4"
                                    controls={true}
                                    autoplay="true"
                                    preload="metadata"
                                    height={window.innerWidth - 150}
                                    width={window.innerWidth > 400 ? 800 : window.innerWidth}
                                />
                            </>
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    )
                )}
            </Row>
            <Row
                style={{
                    marginTop: 5,
                    position: "fixed",
                    bottom: 0,
                    overflowX: "scroll",
                    width: "100vw",
                    margin: 0,
                    left: 0,
                }}
            >
                {props.currentPosts.map((post, index) =>
                    post.fileurl !== "" ? (
                        props.popuptype === "Photo" &&
                            (post.filetype === "jpeg" ||
                                post.filetype === "jpg" ||
                                post.filetype === "png") ? (
                            <img
                                className="item-options"
                                src={post.fileurl}
                                key={index}
                                onClick={() => {
                                    setcurrentmedia(index);
                                }}
                            />
                        ) : props.popuptype === "Videos" && post.filetype === "mp4" ? (
                            <video
                                className="item-options"
                                width={50}
                                height={50}
                                src={post.fileurl + "#t=0.5"}
                                type="video/mp4"
                                autoPlay={false}
                                preload="metadata"
                                onClick={() => {
                                    setcurrentmedia(index);
                                }}
                            />
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    )
                )}
            </Row>
        </Container>
    );
}
