import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, IconButton } from "@material-ui/core";
import "./Invitations.css"
import Header from "../Helpers/Header/Header";
import BlankSchedule from "../../Assets/BlankSchedule.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import history from "../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import Dateformatter from "../Helpers/DateFormatter/Dateformatter";
import Story from './AddStory'
import AlbumsNone from "../../Assets/AlbumsNone.jpg";

export default function ShowStory(props) {
    const dispatch = useDispatch();
    const [Eventdata, setEventdata] = useState([])
    const [base, setbase] = useState("")
    const [maincode, setmaincode] = useState("")
    const [uniqurl, setuniqurl] = useState("");
    const [Id, setId] = useState("")
    const [isadmin, setisadmin] = useState(false)
    const [IsAdmin, setIsAdmin] = useState(false);
    let MyEvents = useSelector(
        (state) => state.Eventdata.myEvents
    );
    const Auth = useSelector((state) => state.Auth);
    let myInvitations = useSelector(
        (state) => state.Eventdata.myInvitations
    );
    useEffect(async () => {
        let data = []
        if (MyEvents.length === 0 && myInvitations.length === 0) {
            await dispatch(GetEvents());
            await dispatch(GetInvitations());
        } else {

            if (
                props.location.pathname ===
                "/MyEvents/story/" +
                props.match.params.id

            ) {
                data = MyEvents[props.match.params.id][0]
                await setEventdata(data.InvId.Story);
                await setbase("MyEvents");
                await setId(data._id)
                await setisadmin(true);
                await setmaincode(data.MainCode)
                if (data.Host.includes(Auth.Phone)) {
                    await setIsAdmin(true);
                } else {
                    await setIsAdmin(false);
                }
                await setuniqurl(data.file)
            } else {
                data = myInvitations[props.match.params.id][0]
                await setEventdata(data.InvId.Story)
                await setId(data._id)
                await setbase("inv");
                await setisadmin(false);
                if (data.Host.includes(Auth.Phone)) {
                    await setIsAdmin(true);
                } else {
                    await setIsAdmin(false);
                }
                await setuniqurl(data.file)
                await setmaincode(data.MainCode)
            }
        }
    }, [myInvitations, MyEvents])

    return (
        <>
            <div className="desktop-only w-100" >
                <Header className="desktop-only" />
            </div>

            <Grid container spacing={0}>
                <Grid item xs={false} md={2}></Grid>
                <Grid item xs={12} md={10}>
                    <Row
                        style={{
                            marginTop: 20,
                            marginRight: 3,
                            marginLeft: 3,
                            marginBottom: 10,
                        }}
                    >
                        <p style={{ fontWeight: "bold", fontSize: 23 }}>
                            <IoArrowBackCircleOutline
                                size={40}
                                onClick={() => {
                                    history.goBack();
                                }}
                            />
                            Story
                        </p>
                    </Row>
                </Grid>

                <Grid item xs={12} style={{ padding: '5px' }}>
                    {Eventdata.length === 0 ? <>
                    </> : <></>}
                    <Story Eventdata={Eventdata} uniqurl={uniqurl} maincode={maincode} />
                </Grid>





            </Grid>
        </>
    );
}
