import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Input, Image } from "antd";
import "./Media.css"
import { uploadString } from "../../Utils/FileUpload_Download";
export default function Media(props) {
    const [media, setmediaData] = useState(props.CurrentEventDetails.file)
    const [currentGroupIndex, seCurrentGroupIndex] = React.useState(-1);
    const [currentGroup, setCurrentGroup] = React.useState(null);
    const [groups, setGroups] = React.useState(media?.groups);
    const [mediaLink, setMediaLink] = React.useState(props.CurrentEventDetails.file.media_link);
    const [playing, setPlaying] = React.useState(!props.isEditable);

    const _videoControl = () => {
        setPlaying(!playing);
    };

    const download = async (media) => {
        let EventsCpy = await { ...props.CurrentEventDetails };
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
        await reader.readAsDataURL(media.media_link);
    };

    const _onSave = async () => {
        let EventsCpy = await { ...props.CurrentEventDetails };
        EventsCpy.file = { media_link: mediaLink, groups };
        await props.SetCurrentEventDetails(EventsCpy);
        props.show(false);
        // console.log("Modified Groups--", JSON.stringify(groups));
        // dispatch(Actions.updateMediaRequestAsync(data));
    };
    const _setGroupInputField = (field, value, index) => {
        console.log("CurrentIndex - ", index);
        const newGroups = JSON.parse(JSON.stringify(groups));
        const newCurrentGroup = Object.assign({}, currentGroup);
        newCurrentGroup.inputs[index][field] = value;
        setCurrentGroup(newCurrentGroup);
        newGroups[currentGroupIndex] = newCurrentGroup;
        setGroups(newGroups);
    };
    useEffect(() => {
        if (media) {
            console.log("mmmmm---", media);
            if (media.groups[0].mediaType === "image") {
                seCurrentGroupIndex(0);
                setCurrentGroup(media.groups[0]);
            }
        }
    }, [media]);
    return (
        <div>


            < div style={{ position: "relative" }}>
                {media?.groups[0].mediaType === "image" ?
                    <img
                        width={'100%'}
                        src={media?.media_link}
                        height={450}
                    /> :
                    <ReactPlayer
                        url={media?.media_link}
                        playing={playing} height='450' width='300'
                    />}

                <div
                    style={{
                        position: "absolute",
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: 'center',
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {currentGroup && currentGroup.inputs.map((input, index) => {
                        console.log('position-x', input.position_x);
                        console.log('position-y', input.position_y);
                        return (
                            <Input
                                key={index}
                                className="drag-input"
                                placeholder="enter text"
                                value={input.text}
                                id={`text-${index}`}
                                name={`text-${index}`}
                                onChange={(event) => {
                                    _setGroupInputField("text", event.target.value, index);
                                }}
                                style={{
                                    position: 'relative',
                                    backgroundColor: "transparent",
                                    color: input.color,
                                    fontSize: parseInt(input.size),
                                    width: `${input.text.length}ch`,
                                    padding: 0,
                                    top: input.position_y,
                                    left: input.position_x,
                                }}
                                disabled={!props.isEditable}
                            />
                        );
                    })}
                </div>
            </div>
            {props.isEditable ?
                <div className='edit pannel' >
                    <button onClick={_videoControl}>{playing ? "Pause" : "Play"}</button>
                    <button onClick={_onSave}>Save</button>
                </div> : <></>}
        </div>
    )
}
