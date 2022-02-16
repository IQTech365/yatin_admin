import React from "react";
import { Typography, Input, Button, Row, Col, Divider, Tag } from "antd";
import { useDispatch } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import ReactPlayer from "react-player";
import { INPUT_OBJECT } from "../../utils/utils";
import { serialize } from "object-to-formdata";

const MediaPage = (props) => {
  const dispatch = useDispatch();
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const [inputs, setInputs] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [interval, setInterval] = React.useState(null);

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
    formData.append("video_file", videoFilePath);
    formData.append("groups", JSON.stringify(groups));
    // groups.forEach((data,i) =>{
    //   formData.append(`groups[${i}]`, data)
    // })
    // const myObject = {
    //   video_file: videoFilePath,
    //   groups: groups,
    // };
    // const formData = serialize(myObject);
    dispatch(Actions.uploadFileRequestAsync(formData));
    // dispatch(Actions.saveGroups({groups, mediaLink: videoFilePath}));
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

  const _setIntervalField = (value) => {
    setInterval(value);
  };

  const _removeGroup = (index) => {
    const newGroups = JSON.parse(JSON.stringify(groups));
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

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
      {videoFilePath && (
        <ReactPlayer
          // url={URL.createObjectURL(videoFilePath)}
          url="https://storage.googleapis.com/download/storage/v1/b/yatinapp-a7d15.appspot.com/o/%2Fvideos%2F1644673436337-testfile.mp4?generation=1644673437615058&alt=media"
          width="50%"
          height="50%"
          controls={true}
        />
      )}
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
              <Input
                placeholder="Enter size"
                value={input.size}
                required
                id={`size-${index}`}
                name={`size-${index}`}
                style={{ marginBottom: 5 }}
                onChange={(event) =>
                  _setInputField(`size`, event.target.value, index)
                }
              />
              <Input
                placeholder="Enter color"
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
