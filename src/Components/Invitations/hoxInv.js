import React from "react";
import { Container, Row, Col, Carousel, Form } from "react-bootstrap";
import hoxInvImg from "../../Assets/hoxInvImg.jpg";
import avt from "../../Assets/avt.png";
import { Grid } from "@material-ui/core";
import Star1 from "../../Assets/Star1.png";
import date from "../../Assets/date.png";
import offline from "../../Assets/offline.png";
import online from "../../Assets/online.png";

export default function hoxInv() {
  return (
    <Carousel
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        zIndex: 8999,
      }}
    >
      <Carousel.Item>
        <img src={hoxInvImg} className="d-block rsvpimage" alt="First slide" />
        <Container
          style={{
            width: "90%",
            height: "70vh",
            background: "white",
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            borderTopLeftRadius: "23px",
            borderTopRightRadius: "23px",
          }}
        >
          <Grid
            container
            spacing={1}
            style={{ marginTop: "20px", justifyContent: "center" }}
          >
            <Grid item xs={2}>
              <img src={avt} />
            </Grid>
            <Grid item xs={7} style={{ marginTop: "2px" }}>
              <p
                style={{ fontWeight: 700, fontSize: "14px", marginBottom: "0" }}
              >
                Soubhagya Ranjan
              </p>
              <p style={{ fontSize: "12px", color: "#858585" }}>Event Admin</p>
            </Grid>
            <Grid item xs={2} style={{ marginTop: "2px" }}>
              <img src={Star1} />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "20px", justifyContent: "center" }}
          >
            <Grid item xs={8}>
              <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                Mayur's Haldi Function
              </p>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "20px", justifyContent: "center" }}
          >
            <Grid item xs={2}>
              <img src={date} />
            </Grid>
            <Grid item xs={7}>
              <p
                style={{ fontWeight: 700, fontSize: "14px", marginBottom: "0" }}
              >
                14 December 2021
              </p>
              <p style={{ fontSize: "12px", color: "#858585" }}>Tuesday 4pm</p>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "20px", justifyContent: "center" }}
          >
            <Grid item xs={2}>
              <img src={offline} />
            </Grid>
            <Grid item xs={7}>
              <p
                style={{ fontWeight: 700, fontSize: "14px", marginBottom: "0" }}
              >
                Soubhagya Residency
              </p>
             
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "20px", justifyContent: "center" }}
          >
            <Grid item xs={2}>
              <img src={online} />
            </Grid>
            <Grid item xs={7}>
              <p
                style={{ fontWeight: 700, fontSize: "14px", marginBottom: "0" }}
              >
                Online
              </p>
              
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
}
