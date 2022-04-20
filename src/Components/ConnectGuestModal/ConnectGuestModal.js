import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";

const ConnectGuestModal = (props) => {
  const { onClose, open } = props;
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [mobileError, setMobileError] = useState(null);

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const saveGuestConnectInfo = () => {
    if (!nameError && !mobileError) {
      setNameError(null);
      setMobileError(null);
      //TODO: Save Guest Connect Info in database
    } else if(name === ''){
      setNameError("Name is required");
    }else if(mobile === ''){
      setMobileError("Mobile is required");
    }
  };

  const onNameChange = (e) => {
    if (e.target.value === "") {
      setNameError("Name is required");
    }
    setName(e.target.value);
  };

  const onMobileChange = (e) => {
    if (e.target.value === "") {
      setMobileError("Mobile is required");
    }
    setMobile(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const validateName = () => {
    if (name === null || name === "") {
      setNameError("Name is required");
    } else {
      setNameError(null);
    }
  };

  const validateMobile = () => {
    if (mobile === null || mobile === "") {
      setMobileError("Mobile is required");
    } else {
      setMobileError(null);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} style={{padding: 0}}>
      <DialogTitle>Guest Connect Info</DialogTitle>
      <Grid container style={{ padding: 10, width: 150 }}>
        <Grid item lg={12}>
          <TextField
            placeholder="Enter name*"
            onChange={onNameChange}
            onBlur={validateName}
            fullWidth
            variant="outlined"
            style={{ borderRadius: 0, marginBottom: 10 }}
            size="small"
          />
        </Grid>
        <Grid item lg={12}>
          <span style={{ color: "#FF0000", fontSize: 12 }}>
            {nameError}
          </span>
        </Grid>
        <Grid item lg={12} style={{backgroundColor: '#FF0000'}}>
          <TextField
            placeholder="Enter mobile number*"
            onChange={onMobileChange}
            onBlur={validateMobile}
            fullWidth
            variant="outlined"
            style={{ borderRadius: 0, marginBottom: 10, marginTop: 10 }}
            size="small"
          />
        </Grid>
        <Grid item lg={12}>
          <span style={{ color: "#FF0000", fontSize: 12 }}>
            {mobileError}
          </span>
        </Grid>
        <Grid item lg={12}>
          <TextField
            placeholder="Enter address (Optional)"
            onChange={onAddressChange}
            fullWidth
            variant="outlined"
            style={{ borderRadius: 0, marginBottom: 10, marginTop: 10 }}
            size="small"
          />
        </Grid>
        <Grid item lg={12}>
          <Button
            onClick={saveGuestConnectInfo}
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#3897f1" }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ConnectGuestModal;
