import React, { useState, useCallback, useEffect, useRef } from "react";
import { colors, IconButton } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from "@material-ui/core";
export default function CanvasEditor(props) {
    const [Bold, setBold] = useState(false);
    const [LoadedImage, setLoadedImage] = useState(false);
    const [Text, setText] = useState('');
    const [Color, setColor] = useState("#FF0000");
    const [FontSize, setFontSize] = useState(20);
    const canvas = useRef(null)
    let ctx;
    const catImage = new Image();
    const [TextColorArray, setTextColorArray] = useState([]);
    let line = 0;
    useEffect(() => {

        ctx = canvas.current.getContext("2d")

        ctx.clearRect(0, 0, 320, 400)
        ctx.fillRect(0, 0, 320, 400)

        catImage.src = props.SelectedImage
        catImage.crossOrigin = "anonymous";

        catImage.onload = () => {
            ctx.drawImage(catImage, 0, 0, 320, 400)
        }

    }, [canvas, ctx])
    useEffect(async () => {
        if (props.SelectedImage && canvas && props.isImageSelected === true) {
            ctx = canvas.current.getContext("2d")
            ctx.clearRect(0, 0, 320, 400)

            const catImage = new Image();
            catImage.src = props.SelectedImage
            catImage.crossOrigin = "anonymous"
            ctx.textAlign = "left"
            ctx.fillRect(0, 0, 320, 400)
            ctx.drawImage(catImage, 0, 0, 320, 400)
            if (Text === "") {
                await setTextColorArray([])
            } else {
                await setFormattedText(Text, ctx)
            }
        }
    }, [canvas, Text, LoadedImage])
    const printtext = () => {

    }

    const download = async () => {
        debugger
        var dataURL = canvas.current.toDataURL('image/jpeg', 1.0);
        console.log(dataURL);
        let EventsCpy = await { ...props.CurrentEventDetails };
        EventsCpy.filetype = 'png';
        EventsCpy.file = dataURL;
        await props.SetCurrentEventDetails(EventsCpy);
        props.show(false);
    }
    const setFormattedText = async (text, ctx) => {
        if (text == "") {
            setTextColorArray([])
            return false
        }
        let TextColorArraycpy = [...TextColorArray]
        let newtextarray = []
        let finalarray = []
        let boldcpy = Bold
        if (text && text.includes('\n')) {
            newtextarray = text.split('\n')
            if (TextColorArraycpy.length > 0) {
                for (let j = 0; j < newtextarray.length; j++) {
                    if (newtextarray[j] !== "") {


                        if (TextColorArraycpy[j] === undefined) {
                            finalarray.push({ inp: newtextarray[j], Color: Color, FontSize: FontSize, Bold: boldcpy })
                        } else {
                            let data = {};
                            data.inp = newtextarray[j];
                            if (TextColorArraycpy[j].Color !== undefined) {
                                data.Color = TextColorArraycpy[j].Color
                            } else {
                                data.Color = Color
                            }
                            if (TextColorArraycpy[j].FontSize !== undefined) {
                                data.FontSize = TextColorArraycpy[j].FontSize
                            } else {
                                data.FontSize = FontSize
                            }
                            if (TextColorArraycpy[j].Bold !== undefined) {
                                data.Bold = TextColorArraycpy[j].Bold
                            } else {
                                data.Bold = boldcpy
                            }
                            finalarray.push(data)
                        }
                    }
                }
            } else {
                newtextarray.map(data => {
                    finalarray.push({ inp: data, Color: Color, FontSize: FontSize, Bold: boldcpy })
                })
            }
            await setTextColorArray([...finalarray])
        } else {
            finalarray = [{ inp: text, Color: Color, FontSize: FontSize, Bold: boldcpy }]
            await setTextColorArray([...finalarray])
        }

        for (let i = 0; i < finalarray.length; i++) {
            let text = { ...finalarray[i] }
            ctx.fillStyle = text.Color
            if (text.Bold === false) {
                ctx.font = text.FontSize + "px Comic Sans MS"
            } else {
                ctx.font = "bold " + text.FontSize + "px Comic Sans MS"
            }
            if (i === 0) {
                ctx.fillText(text.inp, 60, +60)
            } else {
                ctx.fillText(text.inp, 60, 60 + (18 * (i)))
            }

        }
        console.log(finalarray)


    }
    return (<>
        <div style={{ width: "100%", height: "410px" }}>
            <canvas
                ref={canvas}
                width={320}
                height={400}
            />
        </div>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <textarea
                    rows={8}
                    className="template_input"
                    placeholder="Enter Text"
                    vlaue={Text}
                    onChange={(e) => { setText(e.target.value) }}
                    style={{ height: '100px' }}
                />
            </Grid>
            <Grid item xs={3}>
                <center>
                    <Checkbox
                        checked={Bold}
                        onChange={async (e) => {
                            setBold(e.target.checked)
                            let TextColorArraycpy = [...TextColorArray];
                            if (TextColorArraycpy[TextColorArraycpy.length - 1] !== undefined) {
                                TextColorArraycpy[TextColorArraycpy.length - 1].Bold = e.target.checked
                                await setTextColorArray([...TextColorArraycpy])
                            }


                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <div>Bold</div>
                </center>
            </Grid>
            <Grid item xs={3}>
                <center>
                    <input type="color" id="body" name="body" style={{ marginTop: '10px' }}
                        value={Color} onChange={async (e) => {
                            setColor(e.target.value)
                            let TextColorArraycpy = [...TextColorArray];
                            if (TextColorArraycpy[TextColorArraycpy.length - 1] !== undefined) {
                                TextColorArraycpy[TextColorArraycpy.length - 1].Color = e.target.value
                                await setTextColorArray([...TextColorArraycpy])
                            };


                            // 
                        }} />
                    <div>Color</div>
                </center>
            </Grid>

            <Grid item xs={3}>
                <center>
                    <input
                        type="Number"
                        className="template_input"
                        placeholder="1"
                        style={{ textAlign: 'center', margin: 0, height: '4vh', marginTop: '6px' }}
                        value={FontSize}
                        onChange={async (e) => {
                            setFontSize(e.target.value)
                            let TextColorArraycpy = [...TextColorArray];
                            if (TextColorArraycpy[TextColorArraycpy.length - 1] !== undefined) {
                                TextColorArraycpy[TextColorArraycpy.length - 1].FontSize = e.target.value;
                            }

                            await setTextColorArray([...TextColorArraycpy])
                        }}
                    />
                    <div>Font</div>
                </center>
            </Grid>
            <Grid item xs={3} onClick={() => { download() }}>
                <center>

                    <IconButton className="l-blue t-white">
                        <div className="tab_bar-icon-image">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </IconButton>
                    <div>Done</div>
                </center>
            </Grid>
        </Grid></>
    )
}
