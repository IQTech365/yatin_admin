import React, { useState, useCallback } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { uploadString } from "../../Utils/FileUpload_Download";
import { useSelector, useDispatch } from "react-redux";
import { saveuserinfo } from "../../Redux/DispatchFuncitons/AuthFunctions";
import "./userProfile.css";
import ProfilePic from "../../Assets/ProfilePic.png"
import Radio from "@material-ui/core/Radio";
import { BsFillInfoCircleFill } from "react-icons/bs"

export default function UserProfile(props) {
  const Auth = useSelector((state) => state.Auth);
  const [showerror, setshowerror] = useState(false);
  const [Name, setName] = useState(Auth.Name === undefined || Auth.Name === '' ? '' : Auth.Name)
  const [DOB, setDOB] = useState(Auth.DOB === undefined || Auth.DOB === '' ? '' : Auth.DOB)
  const [Gender, setGender] = useState(Auth.Gender === undefined || Auth.Gender === '' ? '' : Auth.Gender);
  const [Image, setImage] = useState(Auth.Profile === undefined || Auth.Profile === '' ? '' : Auth.Profile);

  const dispatch = useDispatch();
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }
    let type = acceptedFiles[0].type.split("/");
    type = type[1];
    var reader = await new FileReader();
    reader.onload = async function () {
      await setImage(reader.result)
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg",
  });
  const save = async () => {

    if (Name === "" || DOB === "" || Gender === "") {
      setshowerror(true);
    } else {
      let url = Image
      if (Image === '') {

      } else if (Image.length > 1 && !Image.includes('firebasestorage.googleapis.com')) {
        url = await uploadString(
          Image,
          "Profile/" + Auth.Phone
        );
      }

      await dispatch(saveuserinfo(Name, Gender, DOB, url, props.url));
      setshowerror(false);
      props.hide(false);
    }
  };
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <Grid container spacing={0} style={{ padding: "15px" }}>
      <Grid item xs={12} {...getRootProps()}>
        <input {...getInputProps()} />
        <center>

          {Image == "" ? (
            <img src={ProfilePic} className="Profile" style={{ height: "130px" }} />
          ) : (
            <img src={Image} className="Profile" style={{ height: "130px", borderRadius: '50%', height: "130px" }} />
          )}
          <p style={{ fontStyle: 'italic', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}> <BsFillInfoCircleFill /> For Best Experience, Fill Your Profile✨ </p>
        </center>
      </Grid>



      <Grid item xs={12}>

        <span>Name</span>
        <br />
        <TextField
          variant="outlined"
          className="w-100 mt-5px"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          error={showerror === true && Name === "" ? true : false}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: '10px' }}>
        <span>DOB</span>
        <TextField
          variant="outlined"
          className="w-100 mt-5px"
          type="date"
          defaultValue="2017-05-24"
          value={DOB}
          onChange={(e) => {
            setDOB(e.target.value);
          }}
          error={showerror === true && DOB === "" ? true : false}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: '10px' }}>
        Male
        <Radio
          checked={Gender === 'M'}
          onChange={handleChange}
          value="M"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'M' }}
        />Female
        <Radio
          checked={Gender === 'F'}
          onChange={handleChange}
          value="F"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'F' }}
        /> Other
        <Radio
          checked={Gender === 'O'}
          onChange={handleChange}
          value="O"
          name="radio-button-demo"
          inputProps={{ 'aria-label': '0' }}
        />
      </Grid>

      <Grid item xs={5}>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#3897F1",
            borderRadius: 25,
            marginTop: 10,
          }}
          className="w-100 m-b-5px"
          onClick={() => {
            save();
          }}
        >
          Save
        </Button>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <Button
          variant="contained"
          color="secondary"
          style={{
            backgroundColor: "grey",
            borderRadius: 25,
            marginTop: 10,
          }}
          className="w-100 m-b-5px"
          onClick={() => {
            if (props.showall !== undefined) {
              props.showall(true)
            }
            props.hide(false)
          }}
        >
          Skip
        </Button>

      </Grid>

    </Grid >
  );
}
