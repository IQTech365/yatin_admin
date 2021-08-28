import React, { useState, useEffect, useRef } from "react";
import { colors, IconButton } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import Repeatable from 'react-repeatable'
export default function CanvasEditor(props) {
    const [Bold, setBold] = useState(false);
    const [LoadedImage, setLoadedImage] = useState(false);
    const [Text, setText] = useState("");
    const [Color, setColor] = useState("#FF0000");
    const [FontSize, setFontSize] = useState(20);
    const [Move, setMove] = useState('');
    const [LineNumber, setLineNumber] = useState(0);
    const [isMouseDown, setisMouseDown] = useState(false);
    const canvas = useRef(null);
    const input = useRef(null);
    let ctx;
    const catImage = new Image();
    const [TextColorArray, setTextColorArray] = useState([]);
    const [up, setup] = useState(60);
    const [left, setleft] = useState(60);
    let line = 0;
    let interval;
    useEffect(() => {
        ctx = canvas.current.getContext("2d");

        ctx.clearRect(0, 0, 320, 400);
        ctx.fillRect(0, 0, 320, 400);

        catImage.src = props.SelectedImage;
        catImage.crossOrigin = "anonymous";

        catImage.onload = () => {
            ctx.drawImage(catImage, 0, 0, 320, 400);
        };
    }, [canvas, ctx]);
    useEffect(async () => {
        if (props.SelectedImage && canvas && props.isImageSelected === true) {
            ctx = canvas.current.getContext("2d");
            ctx.clearRect(0, 0, 320, 400);

            const catImage = new Image();
            catImage.src = props.SelectedImage;
            catImage.crossOrigin = "anonymous";
            ctx.textAlign = "left";
            ctx.fillRect(0, 0, 320, 400);
            ctx.drawImage(catImage, 0, 0, 320, 400);
            if (Text === "") {
                await setTextColorArray([]);
            } else {
                await setFormattedText(Text, ctx);
            }
        }
    }, [canvas, Text, LoadedImage, up, left, Color, FontSize, Bold,]);

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
    // useEffect(() => {
    //     if (isMouseDown === true && Move !== '') {
    //         switch (Move) {
    //             case 'up': setup(up - 2);
    //                 break;
    //             case 'down': setup(up + 3);
    //                 break;
    //             case 'left': setleft(left + 3);
    //                 break;
    //             case 'right': setleft(left - 2);
    //                 break;
    //             default: break;
    //         }
    //     }
    // }, [isMouseDown, left, up,])
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
            <div style={{ width: "100%", height: "410px" }}>
                <canvas ref={canvas} width={320} height={400} />
            </div>
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
                    <Grid container spacing={1}>
                        <Repeatable
                            repeatDelay={500}
                            repeatInterval={32}
                            className="moveup"
                            onHold={async (event) => {
                                await setup(up - 2);
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <KeyboardArrowUpRoundedIcon
                                onClick={() => {
                                    setup(up - 2);
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
                                setleft(left + 3);
                            }}>
                            <KeyboardArrowRightRoundedIcon
                                onClick={() => {
                                    setleft(left + 3);
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
                                setup(up + 3);
                            }}>
                            <KeyboardArrowDownRoundedIcon
                                onClick={() => {
                                    setup(up + 3);
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
                                setleft(left - 2);
                            }}>
                            <KeyboardArrowLeftRoundedIcon
                                onClick={() => {
                                    setleft(left - 2);
                                }}
                            /> </Repeatable>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    onClick={() => {
                        download();
                    }}
                    className="l-blue btn t-white m-b-10 mt-15px"
                >
                    Done {LineNumber + Move}{isMouseDown === true ? 'true' : 'false'}
                </Grid>
            </Grid>
        </>
    );
}
