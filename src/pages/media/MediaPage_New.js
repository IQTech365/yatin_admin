import React from "react";
import {
  Typography,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Select,
  Image,
  Modal,
} from "antd";
import { useDispatch } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import ReactPlayer from "react-player";
import { INPUT_OBJECT, GROUP_OBJECT } from "../../utils/utils";
import { serialize } from "object-to-formdata";
import Draggable from "react-draggable";
import "./Media.less";

const MediaPageNew = (props) => {
  const dispatch = useDispatch();
  const [media, setMedia] = React.useState(null);
  const [inputs, setInputs] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [interval, setInterval] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [mediaType, setMediaType] = React.useState("video");
  const [numberOfGroups, setNumberOfGroups] = React.useState(1);
  const [activeGroupIndex, setActiveGroupIndex] = React.useState(0);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const _onCreate = (e) => {
    e.preventDefault();
    const newGroups = [...groups];
    const group = {
      interval: mediaType === "video" ? interval : 0,
      inputs: inputs,
      category: category,
      mediaType: mediaType,
    };
    newGroups.push(group);
    setGroups(newGroups);
    _resetForm();
  };

  const _resetForm = () => {
    setInputs([]);
    setInterval(null);
  };

  const _saveGroups = (e) => {
    console.log("groups----", JSON.stringify(groups));
    if (groups.length < numberOfGroups && mediaType === "video") {
      setShowConfirmModal(true);
    } else {
      let formData = new FormData();
      formData.append("video_file", media);
      formData.append("groups", JSON.stringify(groups));
      formData.append("mediaType", mediaType);
      dispatch(Actions.uploadFileRequestAsync(formData));
    }
  };

  const _onFileSelect = (e) => {
    const mediaFile = e.target.files[0];
    setMedia(e.target.files[0]);
    if (mediaFile.type.includes("video")) {
      setMediaType("video");
    } else if (mediaFile.type.includes("image")) {
      setMediaType("image");
    }
  };

  const _addInput = (e) => {
    setInputs([...inputs, Object.assign({}, INPUT_OBJECT)]);
  };

  const _removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const _setInputField = (field, value, index = null) => {
    const newInputs = JSON.parse(JSON.stringify(inputs));
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const _setInputFieldPosition = (data, index) => {
    const positionX = data.x.toFixed(0);
    const positionY = data.y.toFixed(0);
    const newInputs = JSON.parse(JSON.stringify(inputs));
    newInputs[index]["position_x"] = positionX;
    newInputs[index]["position_y"] = positionY;
    setInputs(newInputs);
  };

  const _setIntervalField = (value) => {
    setInterval(value);
  };

  const _removeGroup = (index) => {
    const newGroups = JSON.parse(JSON.stringify(groups));
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const _renderVideoPlayer = () => {
    if (!media) return null;
    return <ReactPlayer url={URL.createObjectURL(media)} playing={playing} />;
  };

  const _renderImage = () => {
    if (!media) return null;
    return (
      <Image
        width={250}
        src={URL.createObjectURL(media)}
        height={300}
        style={{ objectFit: "contain" }}
      />
    );
  };

  // Add Temp Group
  const _addTempGroup = () => {
    if (numberOfGroups < 4) {
      setNumberOfGroups(numberOfGroups + 1);
    }
    // setTempGroups([...tempGroups, Object.assign({}, GROUP_OBJECT)]);
  };

  const _removeTempGroup = () => {
    if (numberOfGroups > 1) {
      setNumberOfGroups(numberOfGroups - 1);
    }
  };

  const _handleOk = () => {
    setShowConfirmModal(false);
    let formData = new FormData();
    console.log("groups----", JSON.stringify(groups));
    formData.append("video_file", media);
    formData.append("groups", JSON.stringify(groups));
    dispatch(Actions.uploadFileRequestAsync(formData));
  };

  const _handleCancel = () => {
    setShowConfirmModal(false);
  };

  const _renderAddRemoveGroupButtons = () => {
    return (
      <React.Fragment>
        <Typography.Title level={5} style={{ display: "inline" }}>
          {`Number of Groups `}
        </Typography.Title>
        <Button onClick={_removeTempGroup} type="primary">
          -
        </Button>
        {` ${numberOfGroups} `}
        <Button onClick={_addTempGroup} type="primary">
          +
        </Button>
      </React.Fragment>
    );
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Typography.Title level={4}>Create Group</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Select
            style={{ marginBottom: 5, width: "100%" }}
            onChange={(value) => {
              setCategory(value);
            }}
            placeholder="Select Category"
          >
            <Select.Option value={"Wedding"}>Wedding</Select.Option>
            <Select.Option value={"Birthday"}>Birthday</Select.Option>
            <Select.Option value={"Events"}>Events</Select.Option>
          </Select>
        </Col>
        <Col md={12}>
          {mediaType === "video" && _renderAddRemoveGroupButtons()}
          <Button
            type="warning"
            onClick={_saveGroups}
            style={{ marginLeft: 5 }}
            disabled={groups.length <= 0}
          >
            Save Groups
          </Button>
        </Col>

        <Divider dashed plain style={{ borderColor: "green" }} />
      </Row>
      <Row>
        <Col>
          {mediaType === "video" &&
            Array.from(Array(numberOfGroups).keys()).map((groupObj, index) => {
              const isActive = activeGroupIndex === index;
              return (
                <div
                  style={{ marginRight: 10, display: "inline" }}
                  key={`group-${index}`}
                >
                  <Button
                    onClick={() => {
                      setActiveGroupIndex(index);
                    }}
                    type={isActive ? "primary" : "default"}
                  >
                    {`Group: ${index + 1}`}
                  </Button>
                </div>
              );
            })}
        </Col>
        <Divider dashed plain style={{ borderColor: "green" }} />
      </Row>
      {!media && (
        <Row>
          <Col md={12}>
            <div
              style={{ width: "100%", height: 250, backgroundColor: "#F6F6F6" }}
            >
              <img src="AddImage.svg" style={{ width: "100%", height: 250 }} />
              <Input
                type="file"
                onChange={_onFileSelect}
                id="video_file"
                name="video_file"
                style={{ marginBottom: 5 }}
                className="input-select"
              />
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {mediaType === "video" ? _renderVideoPlayer() : _renderImage()}
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {inputs &&
              inputs.map((input, index) => {
                return (
                  <Draggable
                    onDrag={(e, data) => {
                      _setInputFieldPosition(data, index);
                    }}
                  >
                    <div
                      key={index}
                      style={{
                        color: input.color,
                        fontSize: `${input.size}px`,
                      }}
                      className="font-link"
                    >
                      {input.text}
                    </div>
                  </Draggable>
                );
              })}
          </div>
        </Col>
      </Row>
      {media && mediaType === "video" && (
        <Button
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? "Pause" : "Play"}
        </Button>
      )}
      <br></br>
      <Row>
        <Col md={12}>
          {mediaType === "video" && (
            <Input
              placeholder="Enter Interval"
              onChange={(event) => _setIntervalField(event.target.value)}
              value={interval}
            />
          )}
          <Divider style={{ borderColor: "black" }} />
          <Typography.Title level={5}>Inputs</Typography.Title>
          <Button
            onClick={_addInput}
            type="primary"
            style={{ marginBottom: 10, marginRight: 10 }}
          >
            Add Input
          </Button>
          {inputs.map((input, index) => (
            <React.Fragment key={`input-${index}`}>
              <Input
                value={input.text}
                placeholder="Enter text"
                required
                id={`text-${index}`}
                name={`text-${index}`}
                style={{ marginBottom: 5 }}
                key={index}
                onChange={(event) =>
                  _setInputField(`text`, event.target.value, index)
                }
              />
              <Select
                id={`size-${index}`}
                name={`size-${index}`}
                style={{ marginBottom: 5, width: "100%" }}
                onChange={(value) => _setInputField(`size`, value, index)}
                placeholder="Size"
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={15}>15</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={25}>25</Select.Option>
                <Select.Option value={30}>30</Select.Option>
                <Select.Option value={35}>35</Select.Option>
                <Select.Option value={40}>40</Select.Option>
              </Select>
              <Input
                placeholder="Enter color e.g. #FF0000"
                value={input.color}
                required
                id={`color-${index}`}
                name={`color-${index}`}
                style={{ marginBottom: 5 }}
                onChange={(event) =>
                  _setInputField(`color`, event.target.value, index)
                }
              />
              {inputs.length > 0 && (
                <Row>
                  <Button
                    onClick={() => {
                      _removeInput(index);
                    }}
                    type="danger"
                  >
                    Remove
                  </Button>
                  <Divider dashed plain style={{ borderColor: "green" }} />
                </Row>
              )}
            </React.Fragment>
          ))}
          <Button type="primary" onClick={_onCreate}>
            Create
          </Button>
        </Col>
      </Row>
      <Modal
        title="Alert"
        visible={showConfirmModal}
        onOk={_handleOk}
        onCancel={_handleCancel}
      >
        <p>Number of Groups Created is less then the Groups Count.</p>
      </Modal>
    </>
  );
};

export default MediaPageNew;
