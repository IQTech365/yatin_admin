import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import Tenmplate from "../../../Assets/ChoosefromTemplate.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import CanvasEditor from "./CanvasEditor";
import VideoEdior from "./VideoEdior";
import Media from "../../RenderMedia/Media";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { uploadString } from "../../../Utils/FileUpload_Download";
import ReactPlayer from "react-player";

SwiperCore.use([Pagination]);
export default function ImageSelectionModal(props) {
  const [Show, setswitch] = useState(false);
  const [imgSwitch, setimgSwitch] = useState("img");
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
    <div>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          className={imgSwitch === "img" ? "selected-bar" : "tac"}
          onClick={() => {
            setimgSwitch("img");
          }}
        >
          Image
        </Grid>
        <Grid
          item
          xs={6}
          className={imgSwitch !== "img" ? "selected-bar" : "tac"}
          onClick={() => {
            setimgSwitch("video");
          }}
        >
          Video
        </Grid>
      </Grid>
      <br />
      {imgSwitch === "img" ? (
        <div>
          <ImageSelectionModalTemplates
            CurrentEventDetails={props.CurrentEventDetails}
            SetCurrentEventDetails={props.SetCurrentEventDetails}
            Type={props.Type}
            show={props.show}
            uniqueCode={props.uniqueCode}
          />
        </div>
      ) : (
        <div>
          <VidoeSelectionModal
            CurrentEventDetails={props.CurrentEventDetails}
            SetCurrentEventDetails={props.SetCurrentEventDetails}
            Type={props.Type}
            show={props.show}
            uniqueCode={props.uniqueCode}
          />
        </div>
      )}
    </div>
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

  useEffect(() => {
    let AllTemplatescpy = [];
    for (let i = 0; i < AllTemplates.length; i++) {
      if (AllTemplates[i].Category === props.Type) {
        AllTemplatescpy.push(AllTemplates[i]);
      }
    }
    setallimgsforcategory(AllTemplatescpy);
    setloadedRemoteImgs(true);
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
            <div style={{ textAlign: "center" }}>
              <Button
                className="btn-primary template_btn"
                onClick={() => {
                  save(allimgsforcategory[currentimage].urlToImage[0].src);
                }}
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
                  <SwiperSlide key={index}>
                    <img
                    key={index}
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

export function VidoeSelectionModal(props) {
  const [allVidsforcategory, setallVidsforcategory] = useState([]);
  const [currentvideo, setcurrentvideo] = useState(0);
  const [SelectedVideo, setSelectedVideo] = useState("");
  const [isVideoSelected, setisVideoSelected] = useState(false);
  const [loadedRemoteVids, setloadedRemoteVids] = useState(false);
  const AllTemplates = useSelector((state) => state.VideoTemplates);

  const savevid = (file, type) => {
    let EventsCpy = { ...props.CurrentEventDetails };
    EventsCpy.file = file;
    EventsCpy.filetype = "media:" + type;
    props.SetCurrentEventDetails(EventsCpy);
    setSelectedVideo(file);
    setisVideoSelected(true);
  };

  useEffect(() => {
    //** Only Video Files */
    let videoFilesOnly = [];
    if (AllTemplates && AllTemplates.length > 0) {
      AllTemplates.forEach((allTemplate, i) => {
        if (allTemplate.groups && allTemplate.groups.length > 0) {
          const videoGroups = allTemplate.groups.filter(
            (group) => group.mediaType === "video"
          );
          if(videoGroups.length > 0){
            const newAllTemplate = Object.assign({},{ ...allTemplate, groups: videoGroups });
            videoFilesOnly.push(newAllTemplate);
          }
        }
      });
    }
    setallVidsforcategory(videoFilesOnly);
    setloadedRemoteVids(true);
  }, []);

  return (
    <>
      {isVideoSelected === false ? (
        loadedRemoteVids === false ? (
          <h1>Loading Templates</h1>
        ) : allVidsforcategory.length > 0 ? (
          <div>
            <div style={{ width: "100%", height: "450px" }}>
              {allVidsforcategory[currentvideo]?.groups[0]?.mediaType ===
              "image" ? (
                <img
                  src={allVidsforcategory[currentvideo]?.media_link}
                  style={{
                    width: "100%",
                    height: "inherit",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <ReactPlayer
                  url={allVidsforcategory[currentvideo].media_link}
                  height="300"
                  width="250"
                  muted={true}
                  playing={true}
                  volume={0.5}
                />
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                className="btn-primary template_btn"
                onClick={() => {
                  savevid(
                    allVidsforcategory[currentvideo],
                    allVidsforcategory[currentvideo].groups[0].mediaType
                  );
                }}
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
                {allVidsforcategory.map((img, index) => (
                  <SwiperSlide key={index}>
                    {img?.groups[0]?.mediaType === "image" ? (
                      <img
                        src={img.media_link}
                        style={{
                          width: "100%",
                          height: "inherit",
                          objectFit: "contain",
                        }}
                        onClick={() => {
                          setcurrentvideo(index);
                        }}
                      />
                    ) : (
                      <ReactPlayer
                        url={img?.media_link}
                        height="450"
                        width="300"
                        onClick={() => {
                          setcurrentvideo(index);
                        }}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <h1>No images found for this Category</h1>
        )
      ) : (
        <Media
          SelectedVideo={SelectedVideo}
          isVideoSelected={isVideoSelected}
          SetCurrentEventDetails={props.SetCurrentEventDetails}
          CurrentEventDetails={props.CurrentEventDetails}
          show={props.show}
          currentvideo={currentvideo}
          setcurrentvideo={setcurrentvideo}
          allVidsforcategory={allVidsforcategory}
          uniqueCode={props.uniqueCode}
          isEditable={true}
        />
      )}
    </>
  );
}
