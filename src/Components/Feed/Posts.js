
import React, { useState, useEffect } from "react";
import "../Feed/Feed.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import UserData from "../Helpers/UserData/UserData";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import { likepost } from "../../Redux/DispatchFuncitons/postfunctions";
import "react-bootstrap-tagsinput/dist/index.css";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import FeedComments from "./FeedComments";
import { MdDeleteForever } from "react-icons/md";
import { deletePost } from '../../Redux/DispatchFuncitons/postfunctions'
export default function Postrender(props) {
    const dispatch = useDispatch();
    const Auth = useSelector((state) => state.Auth);
    const [Posts, setPosts] = useState([])
    const [isAdmin, setisAdmin] = useState(false)
    useEffect(async () => {
        if (props.admins.includes(Auth.Phone)) {
            await setisAdmin(true)
        }
        if (props.filter === 'All') {
            setPosts(props.data)
        } else {
            setPosts(props.filterdata)
        }
        // console.log(props.admins)
    }, [props.data, props.filter, props.filterdata])
    async function deletePostUI(index) {

        let postcpy = [...Posts]
        postcpy.filter((post, i) => i !== index);
        await setPosts(postcpy)
    }
    return (
        <div className="mb-100">
            <>
                {Posts.map((post, index) => (
                    <Container
                        className="main-feed"
                        style={{
                            marginTop: 10,
                            padding: 20,

                        }}
                    >
                        <Row className="m-0">
                            <Col xs={2} md={1} fluid>
                                <UserData showIcon={true} Phone={post.by} className="fl" />
                            </Col>
                            <Col className="m-0 p-0">
                                <p className="m-5px fs-14">
                                    <b>
                                        <UserDataUrl Phone={post.by} showName={true} />
                                    </b>
                                    {post.tags.length > 0 ? (
                                        <>
                                            {" "}
                                            is with:{" "}
                                            <b>
                                                <UserDataUrl Phone={post.tags[0]} showName={true} />
                                            </b>
                                            {post.tags.length >= 2 ? (
                                                <> and {post.tags.length - 1} other(s)</>
                                            ) : (
                                                <></>
                                            )}
                                            :
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </p>
                            </Col>
                            <Col xs={12}>
                                <p className=" m-5px fs-14">{post.caption}</p>
                            </Col>
                        </Row>

                        {post.fileurl !== "" ? (
                            post.filetype === "png" ||
                                post.filetype === "jpg" ||
                                post.filetype === "jpeg" ||
                                post.filetype === "image" ? (
                                <Image src={post.fileurl} fluid style={{height:'auto', padding:'4px', borderRadius:'10px'}}/>
                            ) : (
                                <center>
                                    <video
                                        width={window.innerWidth > 500 ? 800 : window.innerWidth}
                                        autoplay={true}
                                        type="video/mp4"
                                        controls={true}
                                        preload="metadata"
                                        style={{height:'auto'}}
                                    >
                                        <source src={post.fileurl + "#t=0.5"} type="video/mp4"></source>
                                    </video>
                                </center>
                            )
                        ) : (
                            <></>
                        )}
                        <Row className="m-0 p-0">
                            <Col xs={isAdmin === true ? 4 : 6} className="mt-10px">
                                <center>
                                    <a
                                        style={{ color: "rgb(244 67 54)" }}
                                        onClick={() => {
                                            props.getposts();
                                        }}
                                    >
                                        <Like
                                            index={index}
                                            LikeList={post.LikeList}
                                            _id={post._id}
                                            getposts={props.getposts}
                                            maincode={props.Maincode}
                                        />
                                    </a>
                                </center>
                            </Col>
                            <Col xs={isAdmin === true ? 4 : 6} className="mt-10px">
                                <center>
                                    <a
                                        style={{ color: "#007bff" }}
                                        onClick={async () => {
                                            // console.log(props.showcommmentforpost)
                                            // console.log(!props.showcommment)
                                            // console.log(!props.showcommment)
                                            if (props.showcommmentforpost === post._id) {
                                                props.setshowcommment(!props.showcommment);
                                                props.setshowcommmentforpost(post._id);
                                                await props.getposts();
                                            } else {
                                                props.setshowcommment(true);
                                                props.setshowcommmentforpost(post._id);
                                                await props.getposts();
                                            }
                                        }}
                                    >
                                        <FaRegComment size={23} style={{ marginLeft: 30 }} />

                                        {post.CommentList.length}
                                    </a>
                                </center>
                            </Col>
                            <Col xs={4} className="mt-10px col-4" style={{ display: isAdmin === true ? 'block' : 'none' }} > <center>
                                <a
                                    style={{ color: "rgb(244 67 54)" }}
                                    onClick={async () => {
                                        await deletePostUI(index)
                                        await dispatch(deletePost(post._id));

                                    }}
                                >
                                    <MdDeleteForever size={25} style={{ marginLeft: 30 }} color="red" />
                                </a></center>
                            </Col>
                        </Row>

                        <Col>
                            {props.showcommment === true && props.showcommmentforpost === post._id ? (
                                <FeedComments
                                    id={post._id}
                                    getposts={props.getposts}
                                    data={post.CommentList}
                                    maincode={props.MainCode}
                                    post={post}
                                />
                            ) : (
                                <></>
                            )}
                        </Col>
                    </Container>
                ))}
            </>
        </div>
    )
}
export function Like(props) {
    const dispatch = useDispatch();
    const Auth = useSelector((state) => state.Auth);
    const [isLike, setisLike] = useState(false);
    const [count, setcount] = useState(0);
    useEffect(() => {
        props.LikeList.map((likedata) => {
            if (likedata.LikeBy === Auth.Phone) {
                setisLike(true);
            }
        });
        setcount(props.LikeList.length);
    }, []);

    return (
        <>
            {isLike === false ? (
                <FcLikePlaceholder
                    size={30}
                    onClick={async () => {
                        await dispatch(likepost(props._id, Auth.Phone, props.maincode));
                        await setisLike(true);
                        // await props.getposts(props.maincode);
                        await setcount(count + 1);
                    }}
                />
            ) : (
                <FcLike
                    size={30}
                    onClick={async () => {
                        await dispatch(likepost(props._id, Auth.Phone, props.maincode));
                        await setisLike(false);
                        // await props.getposts(props.maincode);
                        await setcount(count - 1);
                    }}
                />
            )}
            {count}

        </>
    );
}
