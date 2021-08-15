import React, { useState, useEffect, useCallback } from "react";
import { Grid, Paper, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { useDropzone } from "react-dropzone";
import AlbumsNone from "../../Assets/AlbumsNone.jpg";
import Gallery from "../../Assets/ChooseFromGallery.svg";
import CreateIcon from "@material-ui/icons/Create";
import Dateformatter from "../Helpers/DateFormatter/Dateformatter";
import DateTimePicker from 'react-datetime-picker';
import { uploadString } from '../../Utils/FileUpload_Download'
import { UpdateStory } from '../../Redux/DispatchFuncitons/Eventfunctions'
import { useDispatch, useSelector } from "react-redux";

export default function AddStory(props) {
    const dispatch = useDispatch();
    const [subStory, setsubStory] = useState([]);
    const [subname, setsubname] = useState("");
    const [file, setfile] = useState("");
    const [filetype, setfiletype] = useState("");
    const [datetime, setdatetime] = useState("");
    const [description, setdescription] = useState("");
    const [currentedited, setcurrentedited] = useState(null);
    const [add, setadd] = useState(false);
    const [edit, setedit] = useState(false);
    const [isError, setError] = useState(false);
    const [uniqurl, setuniqurl] = useState('');
    const save = async () => {
        debugger
        if (
            subname !== "" &&
            datetime !== "" &&
            description !== "" &&
            file !== ""
        ) {
            setError(false);
            let data = {
                Name: subname,
                datetime: datetime,
                description: description,
                file: file,
                filetype: filetype,
            };
            console.log([...subStory, data]);

            let subStorycopy = [...subStory, data];
            for (let i = 0; i < subStory.length; i++) {
                if (!subStory[i].file.includes('firebasestorage.googleapis.com')) {
                    let newurl = await uploadString(subStory[i].file, uniqurl + i + "." + subStory[i].filetype)
                    subStory[i].file = newurl;
                }
            }
            await dispatch(UpdateStory(props.maincode, subStorycopy))
            await setsubStory([...subStory, data]);
            Delete();
            setadd(false)
        } else {
            setError(true);
        }
    };
    const onDrop = useCallback(async (acceptedFiles) => {
        let dataurl = "";

        if (acceptedFiles[0].size > 5259265) {
        } else {
            let type = acceptedFiles[0].type.split("/");
            await getBase64(acceptedFiles[0]).then(async (data) => {
                setfile(data);
                setfiletype(type[1]);
            });
        }
    }, []);

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: "image/jpeg, image/png, image/jpg",
    });

    const Delete = () => {
        setsubname("");
        setfile("");
        setfiletype("");
        setdatetime("");
        setdescription("");
        setadd(false);
    };
    const Deletesingle = async (i) => {
        let subStorycpy = [...subStory];

        subStorycpy = subStorycpy.filter((eventdata, index) => {
            return index !== i;
        });
        await dispatch(UpdateStory(props.maincode, subStorycpy))

        await setsubStory(subStorycpy);
        await setedit(false);
        await setcurrentedited(null);
    };
    const settoedit = (i) => {
        let data = { ...subStory[i] };
        setsubname(data.Name);
        setfile(data.file);
        setfiletype(data.filetype);
        setdatetime(data.datetime);
        setdescription(data.description);
    };
    const saveedit = async () => {
        let subStorycpy = [...subStory];
        if (
            subname !== "" &&
            datetime !== "" &&
            description !== "" &&
            file !== ""
        ) {
            setError(false);
            let data = {
                Name: subname,
                datetime: datetime,
                description: description,
                file: file,
                filetype: filetype,
            };
            subStorycpy[currentedited] = data;
            await setsubStory([...subStorycpy]);
            await dispatch(UpdateStory(props.maincode, [...subStorycpy]))
            // dispatch({
            //     type: SAVESTORY,
            //     payload: subStory,
            // });
            Delete();
            setedit(false);
        } else {
            setError(true);
        }
    };
    useEffect(async () => {
        setsubStory(props.Eventdata)
        if (props.uniqurl.split('%2F')[1] === "InternalTemplates") {
            let newurl = props.uniqurl.split('%2F')[2] + Math.floor(100000 + Math.random() * 900000) + '/Album/';
            for (let i = 0; i < subStory.length; i++) {

                if (subStory[i].file && subStory[i].file.includes('firebasestorage.googleapis.com')) {
                    newurl = subStory[i].file.split('%2F')[1] + '/Album/'
                }
            }
            console.log(newurl)
            await setuniqurl(newurl)
        } else {
            await setuniqurl(props.uniqurl.split('%2F')[1] + '/Album/')
            console.log(props.uniqurl.split('%2F')[1] + '/Album/')
        }

    }, [props.Eventdata, props.uniqurl])

    return (<>
        {add == true ?
            <Paper style={{ height: '300x' }} elevation={3}>
                <Grid container spacing={0}>
                    <Grid className="stryimg" item xs={3} sm={3}>
                        {file === "" ? (
                            <div {...getRootProps()} className="w-100">
                                <input {...getInputProps()} className="w-100" />
                                <img
                                    src={Gallery}
                                    className="w-100 uploadhere"
                                    className="w-100"
                                />
                            </div>
                        ) : filetype === "png" ||
                            filetype === "jpg" ||
                            filetype === "jpeg" ? (
                            <img src={file} className="w-100 story-image" />
                        ) : (
                            <div {...getRootProps()} className="w-100">
                                <input {...getInputProps()} className="w-100" />
                                <video src={file} className="w-100  story-image" />
                            </div>
                        )}
                        {isError === true && file === "" ? (
                            <span className="error">please add valid image</span>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid className="stryimg" item xs={8} sm={9}>
                        <TextField
                            className="w-100"
                            label="Event Name"
                            variant='filled'
                            onChange={(e) => {
                                setsubname(e.target.value);
                            }}
                            value={subname}
                            error={isError === true && subname === "" ? true : false}
                        />

                        <form noValidate>
                            <TextField
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"

                                variant='filled'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    setdatetime(e.target.value);
                                }}
                                value={datetime} />
                        </form>

                        <TextField
                            className="w-100 "
                            label="Event description"
                            variant='filled'
                            onChange={(e) => {
                                setdescription(e.target.value);
                            }}
                            value={description}
                            error={
                                isError === true && description === "" ? true : false
                            }
                        />
                        <IconButton onClick={() => {
                            save();
                        }}
                        >
                            <CheckCircleOutlineIcon color="success" />
                        </IconButton>
                        <IconButton
                        >
                            <DeleteForeverIcon color="error" fontSize={"large"} onClick={() => { setadd(false) }} />
                        </IconButton>
                    </Grid>

                </Grid>
            </Paper> :
            add == false && subStory.length === 0 ? <img src={AlbumsNone} className="blank-album" /> : <>
            </>}
        {subStory.map((eve, index) => (
            edit === true && index === currentedited ?
                <Paper style={{ height: '300x' }} elevation={3}>
                    <Grid container spacing={0}>
                        <Grid className="stryimg" item xs={3} sm={3}>
                            <div {...getRootProps()} className="w-100">
                                <input {...getInputProps()} className="w-100" />
                                {eve.filetype === "png" ||
                                    eve.filetype === "jpg" ||
                                    eve.filetype === "jpeg" ? (
                                    <img
                                        src={eve.file === undefined ? " " : eve.file}
                                        className="w-100 story-image"
                                    />
                                ) : (
                                    <video
                                        src={eve.file === undefined ? " " : eve.file}
                                        className="w-100 story-image"
                                    />
                                )}
                                {isError === true && file === "" ? (
                                    <span className="error">please add valid image</span>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Grid>
                        <Grid className="stryimg" item xs={9} sm={9}>
                            <TextField
                                className="w-100"
                                label="Event Name"
                                variant='filled'
                                onChange={(e) => {
                                    setsubname(e.target.value);
                                }}
                                value={subname}
                                error={isError === true && subname === "" ? true : false}
                            />

                            <form noValidate>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"

                                    variant='filled'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        setdatetime(e.target.value);
                                    }}
                                    value={datetime} />
                            </form>
                            <TextField
                                className="w-100"
                                label="Event description"
                                variant='filled'
                                onChange={(e) => {
                                    setdescription(e.target.value);
                                }}
                                value={description}
                                error={
                                    isError === true && description === "" ? true : false
                                }
                            />
                            <IconButton
                                onClick={() => {
                                    saveedit();
                                }}
                            >
                                <CheckCircleOutlineIcon color="success" />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    Deletesingle(index);
                                }}
                            >
                                <DeleteForeverIcon color="error" fontSize={"large"} />
                            </IconButton>
                        </Grid>

                    </Grid>
                </Paper> :
                <Paper style={{ height: '300x' }} elevation={3}>
                    <Grid container spacing={0}>
                        <Grid className="stryimg" item xs={5} sm={3}>
                            {eve.filetype === "png" ||
                                eve.filetype === "jpg" ||
                                eve.filetype === "jpeg" ? (
                                <img
                                    src={eve.file === undefined ? " " : eve.file}
                                    className="w-100  story-image"
                                />
                            ) : (
                                <video
                                    src={eve.file === undefined ? " " : eve.file}
                                    className="w-100  story-image"
                                />)}
                        </Grid>
                        <Grid className="p-5px" item xs={7} sm={9}>
                            <h2 className="m-0 t-blue">{eve.Name !== undefined && eve.Name.length > 0 ? eve.Name : ''}</h2>
                            <p className="m-0"> {eve.description !== undefined && eve.description.length > 0 ? eve.description : ''}</p>
                            {eve.datetime !== undefined && eve.datetime.length > 0 ?
                                <Dateformatter Date={eve.datetime.split("T")[0] + " " + eve.datetime.split("T")[1]} /> : <></>}

                            <Grid item xs={12} >
                                <IconButton
                                    onClick={async () => {
                                        setedit(true);
                                        setadd(false);
                                        Delete();
                                        await setcurrentedited(index);
                                        await settoedit(index);
                                    }}
                                    style={{ borderRadius: '100%', }}
                                >
                                    <CreateIcon
                                        color="inherit"

                                        style={{ color: "green" }}
                                    />
                                </IconButton>

                                <IconButton
                                    onClick={() => {
                                        Deletesingle(index);
                                    }}
                                >
                                    <DeleteForeverIcon color="error" />
                                </IconButton>
                            </Grid>

                        </Grid>

                    </Grid>
                </Paper>))}


        {add === true ? <></> :
            <AddCircleRoundedIcon
                fontSize="large"
                className="add-button bottom"
                onClick={() => {
                    Delete();
                    setcurrentedited("");
                    setedit(false);
                    setadd(true);
                }}
            />}

    </>
    )
}
