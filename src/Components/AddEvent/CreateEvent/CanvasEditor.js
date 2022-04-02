import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./CanvasEditor.scss";
import { toPng } from "html-to-image";
import { Grid } from "@material-ui/core";
import { FcInfo } from "react-icons/fc";
import CircularProgress from "@material-ui/core/CircularProgress";
import { uploadString } from "../../../Utils/FileUpload_Download";
export default function CanvasEditor(props) {
    const [version, setversion] = useState(0);
    const [IsProcessing, setIsProcessing] = useState(false);
    const [IsSaving, setIsSaving] = useState(false);
    const loadIamge = async () => {
        await setIsProcessing(true);
        setInterval(async () => {
            await setIsProcessing(false);
        }, 5000);
    };

    const download = async () => {
        let file = await toPng(document.getElementById("image")).then(
            async function (blob) {
                let EventsCpy = await { ...props.CurrentEventDetails };
                let url = await uploadString(blob, props.uniqueCode);
                // EventsCpy.filetype = "media video";
                EventsCpy.filetype = 'png';
                EventsCpy.file = url;
                await props.SetCurrentEventDetails(EventsCpy);
                props.show(false);
            }
        );
    };

    return (
        <>
            {IsProcessing === true ? (
                <center style={{ height: "500px" }}>
                    <CircularProgress style={{ position: "relative", top: "200px" }} />
                </center>
            ) : (
                <>
                    <p style={{ marginLeft: 10, fontSize: '15px' }}>
                        <FcInfo size={23} /> Click on the text to edit
                    </p>
                    <div
                        id="image"
                        style={{
                            backgroundImage: `url(${props.allimgsforcategory[props.currentimage].urlToImage[version]
                                .src
                                })`,
                            backgroundSize: "contain",
                            height: "500px",
                            overflow: "hidden",
                            width: "320px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                            zIndex: 0,
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        {props.allimgsforcategory[props.currentimage].Texts.map(
                            (txt, index) => (
                                <p
                                    contentEditable="true"
                                    key={index}
                                    className="editable-content"
                                    style={{
                                        position: "relative",
                                        width: txt.Style.width,
                                        margin: txt.Style.margin,
                                        top: txt.Style.top,
                                        fontSize: txt.Style.fontSize,
                                        color: txt.Style.color,
                                        fontWeight: txt.Style.fontWeight,
                                        transform: txt.Style.transform,
                                        textAlign: txt.Style.textAlign,
                                        paddingRight: txt.Style.paddingRight,
                                        paddingLeft: txt.Style.paddingLeft,
                                        fontFamily: txt.Style.fontFamily,
                                        zIndex: index + 1
                                    }}
                                >
                                    {txt.editable}
                                </p>
                            )
                        )}
                    </div>
                </>
            )}
            {IsSaving === false ? (
                <Grid container spacing={0}>

                    <Grid item xs={6} justify="center">

                        <center style={{ paddingTop: "10px" }}>
                            {/*     <p style={{margin:'auto', textAlign:'left', marginLeft:'15px' }}>Colors</p> */}
                            {props.allimgsforcategory[props.currentimage].urlToImage.map(
                                (options, index) => (
                                    <>

                                        <Button
                                            className="color-blocks"
                                            style={{ backgroundColor: options.color }}
                                            onClick={() => {
                                                setversion(index);
                                                loadIamge();
                                            }}
                                        ></Button>
                                    </>
                                )
                            )}
                        </center>
                    </Grid>

                    <Grid item xs={6}>
                        <button
                            className="save-event"
                            style={{ marginTop: "5px" }}
                            onClick={async () => {
                                await setIsSaving(true);
                                await download();
                                await setIsSaving(false);
                            }}
                        >
                            Save
                        </button>
                    </Grid>
                </Grid>

            ) : (
                <>
                    <center>
                        <CircularProgress />
                    </center>
                </>
            )}
        </>
    );
}
