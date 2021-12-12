import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import Tenmplate from "../../../Assets/ChoosefromTemplate.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import CanvasEditor from "./CanvasEditor";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { uploadString } from "../../../Utils/FileUpload_Download";
SwiperCore.use([Pagination]);
export default function ImageSelectionModal(props) {
  const [Show, setswitch] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 620259265) {
      alert("Max file size 10 mb");
      return false;
    }
    let EventsCpy = await { ...props.CurrentEventDetails };
    let type = acceptedFiles[0].type.split("/");
    EventsCpy.filetype = type[1];
    var reader = await new FileReader();
    reader.onload = async function () {
      let url = await uploadString(reader.result, props.uniqueCode);
      EventsCpy.file = url;
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
      uniqueCode={props.uniqueCode}
    />
  );
}

export function ImageSelectionModalTemplates(props) {
  const [allimgsforcategory, setallimgsforcategory] = useState([
    { Url: Tenmplate },
  ]);
  const [currentimage, setcurrentimage] = useState(0);
  const [SelectedImage, setSelectedImage] = useState("");
  const [isImageSelected, setisImageSelected] = useState(false);
  const [loadedRemoteImgs, setloadedRemoteImgs] = useState(false);
  const AllTemplates = useSelector((state) => state.AllTemplates);
  const save = async (file) => {
    let EventsCpy = await { ...props.CurrentEventDetails };
    EventsCpy.file = file;
    await setSelectedImage(file);
    await setisImageSelected(true);
  };

  useEffect(async () => {
    let AllTemplatescpy = [];
    for (let i = 0; i < AllTemplates.length; i++) {
      if (AllTemplates[i].Category === props.Type) {
        AllTemplatescpy.push(AllTemplates[i]);
      }
    }
    await setallimgsforcategory(AllTemplatescpy);
    await setloadedRemoteImgs(true);
  }, []);

  return (
    <>
      {isImageSelected === false ? (
        loadedRemoteImgs === false ? (
          <h1>Loading Templates</h1>
        ) : allimgsforcategory.length > 0 ? (
          <div>
            <div style={{ width: "100%", height: "450px" }}>
              <img
                src={allimgsforcategory[currentimage].Thumbnail}
                style={{
                  width: "100%",
                  height: "inherit",
                  objectFit: "contain",
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button
                className="btn-primary"
                onClick={() => {
                  save(allimgsforcategory[currentimage].urlToImage[0].src);
                }}
                className="template_btn"
                style={{ marginTop: 2 }}
              >
                Edit
              </Button>
            </div>


            <div
              style={{
                width: "100%",
                marginTop: "5px",
              }}
            >
              <Swiper slidesPerView={5} className="mySwiper">
                {allimgsforcategory.map((img, index) => (
                  <SwiperSlide>
                    <img
                      src={img.Thumbnail}
                      style={{
                        width: "50px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                      onClick={() => {
                        setcurrentimage(index);
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <h1>No images found for this Category</h1>
        )
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
          uniqueCode={props.uniqueCode}
        />
      )}
    </>
  );
}
