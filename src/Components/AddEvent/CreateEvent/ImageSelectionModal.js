import React, { useState, useCallback, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import Tenmplate from "../../../Assets/TemplateNone.svg";
import axios from "axios";
import { url } from "../../../Utils/Config";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CanvasEditor from "./CanvasEditor";
import Checkbox from "@material-ui/core/Checkbox";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import Repeatable from 'react-repeatable'
import { IoArrowBackCircleOutline } from "react-icons/io5";
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
  const [isImageSelected, setisImageSelected] = useState(false);
  const [loadedRemoteImgs, setloadedRemoteImgs] = useState(false);
  const [Bold, setBold] = useState(false);
  const [Text, setText] = useState("");
  const [Color, setColor] = useState("#FF0000");
  const [FontSize, setFontSize] = useState(20);
  const [isMoveEnable, setisMoveEnable] = useState(false);
  const [LineNumber, setLineNumber] = useState(0);
  const canvas = useRef(null);
  const input = useRef(null);
  let ctx, catImage;
  const [TextColorArray, setTextColorArray] = useState([]);
  const [up, setup] = useState(60);
  const [left, setleft] = useState(60);
  const save = async (file) => {
    let EventsCpy = await { ...props.CurrentEventDetails };
    EventsCpy.file = file;
    await setSelectedImage(file);
    await setisImageSelected(true);
    // await props.SetCurrentEventDetails(EventsCpy);
    // props.show(false);
  };

  useEffect(() => {
    axios
      .post(url + "template/gettemplate", {
        Category: props.Type,
      })
      .then(async (res) => {
        if (res.data.Templates.length > 0) {
          setallimgsforcategory(res.data.Templates);
          setloadedRemoteImgs(true)
        } else {
          setloadedRemoteImgs(false)
        }
      })
      .catch(() => { });
  }, []);
  useEffect(() => {

    rerendercanvas()
  }, [canvas, SelectedImage, Bold, Text, FontSize, Color, up, left, isImageSelected])


  const rerendercanvas = async () => {
    if (SelectedImage && canvas && isImageSelected === true) {

      catImage = new Image();
      catImage.src = SelectedImage;
      catImage.crossOrigin = "anonymous";
      ctx = canvas.current.getContext("2d");
      ctx.clearRect(0, 0, 320, 400);
      ctx.textAlign = "left";
      ctx.drawImage(catImage, 0, 0, 320, 400);
      if (Text === "") {
        await setTextColorArray([]);
      } else {
        await setFormattedText(Text, ctx);
      }
    } else if (isImageSelected === true) {
      rerendercanvas()
    }
  }

  const download = async () => {
    debugger;
    var dataURL = canvas.current.toDataURL("image/jpeg", 1.0);
    let EventsCpy = await { ...props.CurrentEventDetails };
    EventsCpy.filetype = "png";
    EventsCpy.file = dataURL;
    await props.SetCurrentEventDetails(EventsCpy);
    props.show(false);
  };
  const setFormattedText = async (text, ctx) => {
    if (text == "") {
      setTextColorArray([]);
      return false;
    }
    let TextColorArraycpy = [...TextColorArray];
    let newtextarray = [];
    let finalarray = [];
    let boldcpy = Bold;
    if (text && text.includes("\n")) {
      newtextarray = text.split("\n");
      if (TextColorArraycpy.length > 0) {
        for (let j = 0; j < newtextarray.length; j++) {
          if (TextColorArraycpy[j] === undefined) {
            finalarray.push({
              inp: newtextarray[j],
              Color: Color,
              FontSize: FontSize,
              Bold: boldcpy,
            });
          } else {
            let data = {};
            data.inp = newtextarray[j];
            if (TextColorArraycpy[j].Color !== undefined) {
              data.Color = TextColorArraycpy[j].Color;
            } else {
              data.Color = Color;
            }
            if (TextColorArraycpy[j].FontSize !== undefined) {
              data.FontSize = TextColorArraycpy[j].FontSize;
            } else {
              data.FontSize = FontSize;
            }
            if (TextColorArraycpy[j].Bold !== undefined) {
              data.Bold = TextColorArraycpy[j].Bold;
            } else {
              data.Bold = boldcpy;
            }
            finalarray.push(data);
          }
        }
      } else {
        newtextarray.map((data) => {
          finalarray.push({
            inp: data,
            Color: Color,
            FontSize: FontSize,
            Bold: boldcpy,
          });
        });
      }
      await setTextColorArray([...finalarray]);
    } else {
      finalarray = [
        { inp: text, Color: Color, FontSize: FontSize, Bold: boldcpy },
      ];
      await setTextColorArray([...finalarray]);
    }

    for (let i = 0; i < finalarray.length; i++) {
      let text = { ...finalarray[i] };
      ctx.fillStyle = text.Color;
      if (text.Bold === false) {
        ctx.font = text.FontSize + "px Comic Sans MS";
      } else {
        ctx.font = "bold " + text.FontSize + "px Comic Sans MS";
      }
      if (i === 0) {
        ctx.fillText(text.inp, left, +up);
      } else {
        ctx.fillText(text.inp, left, up + 25 * i);
      }
    }
  };

  const getLineNumber = async (text, input) => {
    let indices = [0];
    for (var i = 0; i < text.length; i++) {
      if (text[i] === "\n") indices.push(i);
    }
    if (input.current.selectionStart === 0) {
      await setLineNumber(0);
    }
    else if (input.current.selectionStart < text.length) {

      indices.push(text.length)
      for (i = 0; i < indices.length - 1; i++) {

        if (
          input.current.selectionStart > indices[i] &&
          input.current.selectionStart <= indices[i + 1]
        ) {
          await setLineNumber(i);
          return false;
        }
      }
    } else {
      await setLineNumber(indices.length - 1);
    }
  };
  return (
    <>
      {isImageSelected === false ? (
        loadedRemoteImgs === false ? <h1>Loading Templates</h1> :
          <div>
            <div style={{ width: "100%", height: "300px" }}>
              <img
                src={allimgsforcategory[currentimage].Url}
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
                    save(allimgsforcategory[currentimage].Url);
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
                  src={img.Url}
                  style={{ width: "50px", height: "50px" }}
                  onClick={() => {
                    setcurrentimage(index);
                  }}
                />
              ))}
            </div>
          </div>
      ) : (
        <>
          <div style={{ width: "100%", height: "410px" }}>
            <img src={SelectedImage} style={{ position: 'relative', zIndex: 2, width: 320, height: 400, display: Text === "" ? 'block' : 'none' }} />
            <canvas ref={canvas} width={320} height={400} style={{ position: 'relative', zIndex: 1, bottom: Text === "" ? '400px' : '0px' }} />
          </div>
          {isMoveEnable === false ?
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <textarea
                  ref={input}
                  rows={8}
                  className="template_input"
                  placeholder="Enter Text"
                  vlaue={Text}

                  onClick={(e) => {

                    getLineNumber(Text, input);
                  }}
                  onKeyDown={() => {
                    getLineNumber(Text, input);
                  }}
                  onKeyUp={() => {
                    getLineNumber(Text, input);
                  }}
                  onChange={(e) => {

                    getLineNumber(Text, input);
                    setText(e.target.value);
                  }}
                  style={{ height: "70px", marginBottom: '20px' }}
                />
              </Grid>
              <Grid item xs={3}>
                <center>
                  <Checkbox
                    checked={Bold}
                    onChange={async (e) => {
                      setBold(e.target.checked);
                      let TextColorArraycpy = [...TextColorArray];
                      if (
                        TextColorArraycpy[LineNumber] !== undefined
                      ) {
                        TextColorArraycpy[LineNumber].Bold =
                          e.target.checked;
                        await setTextColorArray([...TextColorArraycpy]);
                      }
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <div>Bold</div>
                </center>
              </Grid>
              <Grid item xs={3}>
                <center>
                  <input
                    type="color"
                    id="body"
                    name="body"
                    style={{ marginTop: "10px" }}
                    value={Color}
                    onChange={async (e) => {
                      setColor(e.target.value);
                      let TextColorArraycpy = [...TextColorArray];
                      if (
                        TextColorArraycpy[LineNumber] !== undefined
                      ) {
                        TextColorArraycpy[LineNumber].Color =
                          e.target.value;
                        await setTextColorArray([...TextColorArraycpy]);
                      }
                    }}
                  />
                  <div>Color</div>
                </center>
              </Grid>

              <Grid item xs={3}>
                <center>
                  <input
                    type="Number"
                    className="template_input"
                    placeholder="1"
                    style={{
                      textAlign: "center",
                      margin: 0,
                      height: "4vh",
                      marginTop: "6px",
                    }}
                    value={FontSize}
                    onChange={async (e) => {
                      setFontSize(e.target.value);
                      let TextColorArraycpy = [...TextColorArray];
                      if (
                        TextColorArraycpy[LineNumber] !== undefined
                      ) {
                        TextColorArraycpy[LineNumber].FontSize =
                          e.target.value;
                      }
                      await setTextColorArray([...TextColorArraycpy]);
                    }}
                  />
                  <div>Font</div>
                </center>
              </Grid>
              <Grid item xs={3}>
                <button className='btn btn-primary' onClick={() => {
                  setisMoveEnable(true)
                }}>
                  Move
                </button>
              </Grid>
              <Grid
                item
                xs={12}
                onClick={() => {
                  download();
                }}
                className="l-blue btn t-white m-b-10 mt-15px"
              >
                Done
              </Grid>
            </Grid>
            : <Movable setisMoveEnable={setisMoveEnable} setup={setup} setleft={setleft} up={up} left={left} />}
        </>
      )}
    </>
  );
}
function Movable(props) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <IoArrowBackCircleOutline size={30} onClick={() => {
          props.setisMoveEnable(false)
        }} fontSize="large" />
      </Grid>
      <Grid item xs={4}>

        <Repeatable
          repeatDelay={500}
          repeatInterval={32}
          className="moveup"
          onHold={async (event) => {
            await props.setup(props.up - 2);
          }}
          onMouseDown={(e) => {
            e.preventDefault()
          }}
        >
          <KeyboardArrowUpRoundedIcon
            onClick={() => {
              props.setup(props.up - 2);
            }}
          />
        </Repeatable>
        <Repeatable
          repeatDelay={500}
          repeatInterval={32}
          className="moveright"
          onMouseDown={(e) => {
            e.preventDefault()
          }}
          onHold={async (event) => {
            props.setleft(props.left + 3);
          }}>
          <KeyboardArrowRightRoundedIcon
            onClick={() => {
              props.setleft(props.left + 3);
            }}
          />
        </Repeatable>
        <Repeatable
          repeatDelay={500}
          repeatInterval={32}
          className="movedown"
          onMouseDown={(e) => {
            e.preventDefault()
          }}
          onHold={async (event) => {
            props.setup(props.up + 3);
          }}>
          <KeyboardArrowDownRoundedIcon
            onClick={() => {
              props.setup(props.up + 3);
            }}
          />
        </Repeatable>
        <Repeatable
          repeatDelay={500}
          repeatInterval={32}
          className="moveleft"
          onMouseDown={(e) => {
            e.preventDefault()
          }}
          onHold={async (event) => {
            props.setleft(props.left - 2);
          }}>
          <KeyboardArrowLeftRoundedIcon
            onClick={() => {
              props.setleft(props.left - 2);
            }}
          /> </Repeatable>
      </Grid>

      <Grid item xs={4}>
      </Grid>
    </Grid>
  )
}
