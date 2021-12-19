import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import history from "../../Utils/History";
import LoginSignup from "../Auth/LoginSignup";
import Popup from "../Helpers/Popups/Popup";
export default function Hoxdetails(props) {
    const [show, setshow] = useState(false);
    return (<>
        <div className="container-fluid" >

            <Popup
                component={LoginSignup}
                toggleShowPopup={setshow}
                showPopup={show}
            />
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
                        {props.match.params.field.toUpperCase()}
                    </p>
                    <Col></Col>
                </Row>
            </Container>
            Sender has added a {props.match.params.field} please Login to
            view

        </div>  <div className="please-login container-fluid" style={{ position: 'fixed', bottom: '10%', left: '10%' }}>
            Login
        </div></>
    );
}
