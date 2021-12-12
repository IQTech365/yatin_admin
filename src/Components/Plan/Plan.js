import React, { useState } from "react";
import "./Plan.css";
import { Grid, Paper } from "@material-ui/core";
function Plancard(props) {
  return (
    <Paper
      className="plancard"
      onClick={() => {
        props.selectplan(props.plani);
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          className={"upperplan " + props.plan}
          style={{ borderRadius: "10px" }}
        >
          <Grid xs={12} className="tac t-white pfsmall">
            {props.plan}
          </Grid>
          <Grid xs={12} className="tac t-white pflarge">
            {props.invites}
            <br />
            Invites
          </Grid>
          <Grid xs={12} className="tac t-white pfmed">
            {props.cost}
          </Grid>
        </Grid>
        <Grid item xs={12} className="lowerplan mt-5px">
          <ul className="a">
            <li>Multiple Events</li>
            <li>Albums</li>
            <li>Schedule</li>
            <li>Our Story</li>
            <li>Location</li>
            <li>Multiple Admin</li>
          </ul>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default function Plan(props) {
  const [selectedplan, selectplan] = useState(3);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div className="planheadbottom"></div>
        <div className="planheadtop"></div>
      </Grid>
      <Grid item xs={12} className="plancardholder">
        {/*    <Plancard
          plan={"Free"}
          selectplan={selectplan}
          cost={"RS 00 / Month"}
          invites={"50"}
          plani={0}
        />

        <Plancard
          plan={"Bronze"}
          selectplan={selectplan}
          cost={"RS 99 / Month"}
          invites={"200"}
          plani={1}
        />

        <Plancard
          plan={"Silver"}
          selectplan={selectplan}
          cost={"RS 299 / Month"}
          invites={"400"}
          plani={2}
        /> */}

        {/*  <Plancard
          plan={"Gold"}
          selectplan={selectplan}
          cost={"RS 499 / Month"}
          invites={"Unlimited"}
          plani={3}
        /> */}
      </Grid>
      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Plan Amount
            </Grid>
            <Grid item xs={3} className="plan-float">
              {selectedplan === 0 ? "₹00" : <></>}
              {selectedplan === 1 ? "₹99" : <></>}
              {selectedplan === 2 ? "₹299" : <></>}
              {selectedplan === 3 ? "₹499" : <></>}
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Extra Template
            </Grid>
            <Grid item xs={3} className="plan-float">
              Rs 00
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Coupon Discount
            </Grid>
            <Grid item xs={3} className="plan-float">
              {selectedplan === 0 ? "₹00" : <></>}
              {selectedplan === 1 ? "₹-99" : <></>}
              {selectedplan === 2 ? "₹-299" : <></>}
              {selectedplan === 3 ? "₹-499" : <></>}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Total Amount
            </Grid>
            <Grid item xs={3} className="plan-float">
              <b>
                <u>
                  0
                </u>
              </b>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className="m-7px">
        <p style={{ fontWeight: '700', fontSize: '12px', width: '90%', margin: 'auto', backgroundColor: 'antiquewhite' }}>Hurray! A Special Treat From Us! Enjoy Our Plans for Free🎁🎀 (Limited Time Only)</p>
        <button
          className="custom-file-upload"
          style={{ position: "fixed", bottom: "20px" }}
          onClick={() => props.handleNext()}
        >
          Next
        </button>
      </Grid>
    </Grid>
  );
}
