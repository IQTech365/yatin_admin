import React from "react";
import {
  Typography,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Tag,
  Select,
  Image
} from "antd";
import { useDispatch } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import ReactPlayer from "react-player";
import { INPUT_OBJECT } from "../../utils/utils";
import { serialize } from "object-to-formdata";
import Draggable from "react-draggable";
import "./Media.less";

const MediaPage = (props) => {
  const dispatch = useDispatch();
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const [inputs, setInputs] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [interval, setInterval] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [playedSeconds, setPlayedSeconds] = React.useState(0);

  const _onCreate = (e) => {
    e.preventDefault();
    const newGroups = [...groups];
    const group = { interval: interval, inputs: inputs };
    newGroups.push(group);
    setGroups(newGroups);
  };

  const _saveGroups = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log("groups----", JSON.stringify(groups));
    formData.append("video_file", videoFilePath);
    formData.append("groups", JSON.stringify(groups));
    dispatch(Actions.uploadFileRequestAsync(formData));
  };

  const _onFileSelect = (e) => {
    setVideoFilePath(e.target.files[0]);
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

  const _onDuration = (duration) => {
    console.log("Media-Duration", duration);
    setTotalDuration(duration);
  };

  const _onProgress = (progress) => {
    console.log("Media-Progress", JSON.stringify(progress));
    setPlayedSeconds(progress?.playedSeconds);
  };

  // React.useEffect(() => {
  //   //
  // }, [playedSeconds]);

  return (
    <>
      <Row>
        <Col md={6}>
          <Typography.Title level={4}>Create New Group</Typography.Title>
        </Col>
        <Col md={6}>
          <Button onClick={_addInput} type="primary">
            Add Input
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="file"
            onChange={_onFileSelect}
            id="video_file"
            name="video_file"
            style={{ marginBottom: 5 }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {groups.map((_, index) => (
            <Tag closable onClose={() => _removeGroup(index)}>{`Group ${
              index + 1
            }`}</Tag>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          {videoFilePath && (
            <ReactPlayer
              url={URL.createObjectURL(videoFilePath)}
              playing={playing}
            />
          )}
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
      <Button
        onClick={() => {
          setPlaying(!playing);
        }}
      >
        {playing ? "Pause" : "Play"}
      </Button>
      <br></br>
      <Row>
        <Col md={12}>
          <Input
            placeholder="Enter Interval"
            onChange={(event) => _setIntervalField(event.target.value)}
            value={interval}
          />
          <Divider style={{ borderColor: "black" }} />
          <Typography.Title level={5}>Inputs</Typography.Title>
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
          <Button
            type="warning"
            onClick={_saveGroups}
            style={{ marginLeft: 5 }}
            disabled={groups.length <= 0}
          >
            Save Groups
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MediaPage;
