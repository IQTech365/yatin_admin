import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from 'react-bootstrap';
import { BsFillInfoCircleFill } from "react-icons/bs";
import './CanvasEditor.scss'
import { toPng } from 'html-to-image';
export default function CanvasEditor(props) {
    const [version, setversion] = useState(0);
    const download = async () => {
        let file = await toPng(document.getElementById('image'))
            .then(async function (blob) {
                let EventsCpy = await { ...props.CurrentEventDetails };
                console.log(blob)
                EventsCpy.filetype = "png";
                EventsCpy.file = blob;
                await props.SetCurrentEventDetails(EventsCpy);
                props.show(false);
            });

    };
    return (
        <>

            <div
                id="image"
                style={{
                    backgroundImage: `url(${props.allimgsforcategory[props.currentimage].urlToImage[version].src})`,
                    backgroundSize: "contain",
                    height: "500px",
                    overflow: "hidden",
                    width: "320px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    zIndex: 0,
                    padding: 0, margin: 0,

                }}
            >
                {props.allimgsforcategory[props.currentimage].Texts.map((txt, index) => (
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
                            fontFamily: txt.Style.fontFamily,
                            zIndex: index + 1,
                        }}
                    >
                        {txt.editable}
                    </p>
                ))}

            </div>
            <div className="choose-colors">
                {props.allimgsforcategory[props.currentimage].urlToImage.map((options, index) => (
                    <Button
                        className="color-blocks"
                        style={{ backgroundColor: options.color }}
                        onClick={() => {
                            setversion(index)
                        }}
                    ></Button>
                ))}

            </div>
            <button className="save-event" style={{ marginTop: '5px' }} onClick={() => {
                download()
            }}>
                Save
            </button>


        </>
    );
}
