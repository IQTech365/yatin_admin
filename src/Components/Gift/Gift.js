import React, { useState, useEffect } from "react";
import "./Gift.css";
import GiftBanner from "./GiftBanner";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { url, GiftShopCategory } from "../../Utils/Config";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import NavMobile from "../Helpers/NavMobile/NavMobile";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Row, Col } from "react-bootstrap";
import history from "../../Utils/History";
import { Button } from "react-bootstrap";
import AmazonLogo from "../../Assets/AmazonLogo.png";
import { FaShoppingCart } from "react-icons/fa";
import Lottie from "react-lottie";
import animationData from "../Animations/giftloading.json";

export default function Gift(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dispatch = useDispatch();
  const [gifts, setgifts] = useState([]);
  const [Eventdata, setEventdata] = useState([]);
  const [category, setcategory] = useState("");
  const [maincode, setmaincode] = useState("");
  const [base, setbase] = useState("");
const [name,setName] = useState("");

  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);

  const redirect = () => {
    window.location.href = "https://shop.mobillyinvite.com/";
  };
  useEffect(async () => {
    let data = [];
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
      
    } else {

      if (
        props.location.pathname ===
        "/MyEvents/eventpage/gift/" +
        props.match.params.id +
        "/" +
        props.match.params.MainCode &&
        MyEvents.length > 0
      ) {
        data = MyEvents[props.match.params.id][0];
        await setEventdata(MyEvents[props.match.params.id][0]);
        await setName(data.Name);
        await setbase("MyEvents");
        await setcategory(MyEvents[props.match.params.id][0].InvId.Type);
        await getgifts(MyEvents[props.match.params.id][0].InvId.Type);

      } else if (
        props.location.pathname ===
        "/inv/eventpage/gift/" +
        props.match.params.id +
        "/" +
        props.match.params.MainCode &&
        myInvitations.length > 0
      ) {
        await setEventdata(myInvitations[props.match.params.id][0]);
        await setbase("inv");
        await setcategory(myInvitations[props.match.params.id][0].InvId.Type);
        await getgifts(myInvitations[props.match.params.id][0].InvId.Type);
      }
    }
  }, [MyEvents, myInvitations]);
  function getgifts(c) {
    let Category = "";

    GiftShopCategory.map((cat, index) => {
      if (cat.Name === c) {
        Category = cat.id;
      }
    });

    axios
      .post(url + "event/ListGifts", { category: Category })
      .then(function (response) {
        // console.log(response.data.alldata);
        if (response.data.status === "success") {
          setgifts(response.data.alldata);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {" "}
      {gifts.length <= 0 ? (
        <div>
          {" "}
          <Lottie options={defaultOptions} height={400} width={400} />
          <p style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold" }}>Getting Some Cool Gifts <br /> for Your Event</p>
        </div>
      ) : (
        <>
          <NavMobile base={base} id={props.match.params.id} MainCode={props.match.params.MainCode} />
          <GiftBanner />
          {/* <p style={{fontSize: "14px", textAlign: "center", fontWeight: "bold"}}>By Some Gifts for Your Event-{name}</p> */}
          <Grid spacing={0} container>
            <Grid xs={12} item className="back-navigation desktop-only p-10px">
              <div
                style={{
                  width: "100%",
                  marginTop: 5,
                  marginRight: 3,
                  marginLeft: 3,
                }}
              >
                <IoArrowBackCircleOutline
                  size={40}
                  style={{ color: "black" }}
                  onClick={() => history.goBack()}
                />
                <h3 style={{ color: "black", fontSize: 28, fontWeight: "900" }}>
                  Feed
                </h3>
              </div>
            </Grid>

            {gifts.map((gift, index) => (
              <Grid xs={12} sm={3} item key={index}>
                <Row className="product_card">
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    {" "}
                    <img src={gift.images[0].src} fluid />
                    <img
                      src={AmazonLogo}
                      style={{ height: "15px", objectFit: "contain" }}
                    />
                  </Col>
                  <Col>
                    {" "}
                    <div className="product_cardbody">
                      <div className="card-title">
                        <h4 style={{ fontSize: 13 }}>{gift.name}</h4>
                        <h3 style={{ fontSize: 13 }}>₹{gift.price}</h3>
                      </div>

                      <p>{gift.short_description}</p>

                      <div className="btn-group">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            window.open(
                              gift.external_url,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          style={{ borderRadius: "20px" }}
                        >
                          <FaShoppingCart style={{ marginRight: 5 }} />
                          Buy Now
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() =>
                            window.open(
                              gift.permalink,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          style={{ borderRadius: "20px" }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Grid>
            ))}
            <Button
              variant="primary"
              style={{ margin: "auto", borderRadius: "20px" }}
              onClick={redirect}
            >
              Load More
            </Button>
            <Grid xs={12} item className="m-b-50px"></Grid>
          </Grid>
        </>
      )}
    </>
  );
}
