import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "../../Assets/ChooseFromGallery.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import "../AddEvent/Extras/Extras.css";
import { Grid } from "@material-ui/core";
import "../Helpers/Popups/Popup.css";
import { Modal } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { uploadString } from "../../Utils/FileUpload_Download";
import { uploadfiletoalbum } from "../../Redux/DispatchFuncitons/Eventfunctions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
export default function Addtoalbum(props) {
    const dispatch = useDispatch();
    const EventState = useSelector((state) => state.Eventdata);
    const [IsProcessing, setIsProcessing] = useState(false);


    useEffect(async () => {
        if (props.showPopup === true) {
            await savetoredux([...props.images])
        } else {
            await savetoredux([])
        }
    }, [props.showPopup]);

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        let dataarray = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
            if (acceptedFiles[i].size > 5259265) {
            } else {
                let type = acceptedFiles[i].type.split("/");
                type = type[1];
                await getBase64(acceptedFiles[i]).then(async (data) => {
                    dataarray.push({ file: data, type: type });
                });
            }
        }
        await Addtoalbum(dataarray)
        return true;
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, image/jpg",
    });

    const Addtoalbum = async (data) => {

        await dispatch({ type: "ADDALBUM", payload: data })
    }

    const deleteimage = async (i) => {
        let bkpalbum = EventState.ALBUM.filter((item, index) => i !== index);
        await savetoredux([...bkpalbum])
        return 1;

    };
    const savetoredux = async (data) => {
        await dispatch({ type: "SAVEALBUM", payload: data })
    }
    const save = async () => {

        await setIsProcessing(true);
        let albumcopy = [...EventState.ALBUM];
        let newuniqurl = "";
        if (props.uniqurl.split("%2F")[1] === "InternalTemplates") {
            newuniqurl =
                props.uniqurl.split("%2F")[2] +
                Math.floor(100000 + Math.random() * 900000) +
                "/Album/";
        } else {
            newuniqurl = props.uniqurl.split("%2F")[1] + "/Album/";
        }
        for (let i = 0; i < albumcopy.length; i++) {
            if (
                albumcopy[i].file.length > 1 &&
                !albumcopy[i].file.includes("firebasestorage.googleapis.com")
            ) {
                let url = await uploadString(albumcopy[i].file, newuniqurl + i);
                albumcopy[i].file = url;
            }
        }

        await dispatch(
            uploadfiletoalbum(
                albumcopy,
                props.MainCode,
                props.toggleShowPopup,
                setIsProcessing
            )
        );
        await savetoredux([])
    };
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={props.showPopup}
            >
                <div className="modal-card">
                    <IconButton
                        className="popup-close"
                        onClick={() => {
                            props.toggleShowPopup(false);
                        }}
                    >
                        <CancelIcon color="secondary" fontSize="large" />
                    </IconButton>

                    <div {...getRootProps()} style={{ width: "100%" }}>
                        <input {...getInputProps()} />
                        <img src={Gallery} className="w-100 uploadhere" />
                        {IsProcessing === true ? (
                            <p className="tac">Please wait while files are uploading</p>
                        ) : (
                            <></>
                        )}
                    </div>
                    {IsProcessing === true ? (
                        <CircularProgress
                            style={{
                                position: "relative",
                                left: "45%",
                            }}
                        />
                    ) : (
                        <>
                            <Grid item xs={12} className="ofh view">
                                <Grid container spacing={4}>
                                    {EventState.ALBUM && EventState.ALBUM.length > 0
                                        ? EventState.ALBUM.map((image, index) => (
                                            <Grid item xs={4} md={2} key={"img" + index}>
                                                <CancelIcon
                                                    onClick={() => {
                                                        deleteimage(index);
                                                    }}
                                                    color="secondary"
                                                    className="delete-img"
                                                />
                                                <img src={image.file} className="w-100 preview" />
                                            </Grid>
                                        ))
                                        : Array.from({ length: 30 }, (value, key) => (
                                            <Grid
                                                item
                                                xs={2}
                                                md={1}
                                                key={"img" + key}
                                                className="w-100 preview grey m-5px"
                                            ></Grid>
                                        ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="submit jcc">
                                <button
                                    onClick={() => {
                                        save();
                                    }}
                                    className="add-album  "
                                >
                                    Save
                                </button>
                            </Grid>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
