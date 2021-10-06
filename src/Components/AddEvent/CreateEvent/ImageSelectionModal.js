import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import Tenmplate from "../../../Assets/TemplateNone.svg";
import axios from "axios";
import { url } from "../../../Utils/Config";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CanvasEditor from "./CanvasEditor";
import { useSelector } from "react-redux";
export default function ImageSelectionModal(props) {
  const [Show, setswitch] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 10259265) {
      alert("Max file size 10 mb");
      return false;
    }
    let EventsCpy = await { ...props.CurrentEventDetails };
    let type = acceptedFiles[0].type.split("/");
    EventsCpy.filetype = type[1];
    var reader = await new FileReader();
    reader.onload = async function () {
      EventsCpy.file = reader.result;
      await props.SetCurrentEventDetails(EventsCpy);
      props.show(false);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4",
  });

  return Show === false ? (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <h2 className="tac">Upload Your Picture</h2>
      </Grid>
      <Grid item xs={6}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img src={Gallery} className="w-100" />
        </div>
      </Grid>
      <Grid
        item
        xs={6}
        onClick={() => {
          setswitch(true);
        }}
      >
        <img src={Tenmplate} className="w-100" />
      </Grid>
    </Grid>
  ) : (
    <ImageSelectionModalTemplates
      CurrentEventDetails={props.CurrentEventDetails}
      SetCurrentEventDetails={props.SetCurrentEventDetails}
      Type={props.Type}
      show={props.show}
    />
  );
}

export function ImageSelectionModalTemplates(props) {
  const [allimgsforcategory, setallimgsforcategory] = useState([
    { Url: Tenmplate },
  ]);
  const [currentimage, setcurrentimage] = useState(0);
  const [SelectedImage, setSelectedImage] = useState("");
  const [SelectedTemplate, setSelectedTemplate] = useState("");
  const [isImageSelected, setisImageSelected] = useState(false);
  const [loadedRemoteImgs, setloadedRemoteImgs] = useState(false);
  const AllTemplates = useSelector(state => state.AllTemplates)
  const save = async (file) => {
    let EventsCpy = await { ...props.CurrentEventDetails };
    EventsCpy.file = file;
    await setSelectedImage(file);
    await setisImageSelected(true);
    // await props.SetCurrentEventDetails(EventsCpy);
    // props.show(false);
  };

  useEffect(async () => {
    let AllTemplatescpy = await AllTemplates.filter(async (temps, index) => {
      return temps.Category === props.Type;
    });
    await setallimgsforcategory(AllTemplatescpy);
    await setloadedRemoteImgs(true)
  }, []);

  return (
    <>
      {isImageSelected === false ? (
        loadedRemoteImgs === false ? <h1>Loading Templates</h1> :
          <div>
            <div style={{ width: "100%", height: "300px" }}>
              <img
                src={allimgsforcategory[currentimage].urlToImage[0].src}
                style={{ width: "100%", height: "299px" }}
              />
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  position: "relative",
                  bottom: "40px",
                  left: "280px",
                }}
              >
                <CheckCircleOutlineIcon
                  style={{
                    color: "Green",
                    background: "#fff",
                    borderRadius: "100%",
                  }}
                  onClick={() => {
                    save(allimgsforcategory[currentimage].urlToImage[0].src);
                  }}
                  fontSize="large"
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "60px",
                overflowX: "scroll",
                marginTop: "5px",
              }}
            >
              {allimgsforcategory.map((img, index) => (
                <img
                  src={img.urlToImage[0].src}
                  style={{ width: "50px", height: "50px" }}
                  onClick={() => {
                    setcurrentimage(index);
                  }}
                />
              ))}
            </div>
          </div>
      ) : (
        <CanvasEditor
          SelectedImage={SelectedImage}
          isImageSelected={isImageSelected}
          SetCurrentEventDetails={props.SetCurrentEventDetails}
          EventsCpy={props.CurrentEventDetails}
          show={props.show}
          currentimage={currentimage}
          setcurrentimage={setcurrentimage}
          allimgsforcategory={allimgsforcategory}
        />
      )}
    </>
  );
}
