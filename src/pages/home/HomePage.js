import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Player } from "video-react";
import { Row, Col, Button, Input, Image } from "antd";
import * as Actions from "../../redux/actions/Action";
import Draggable from "react-draggable";
import "./HomePage.less";
import ReactPlayer from "react-player";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const { media } = useSelector((state) => state.Groups);
  const [currentGroupIndex, seCurrentGroupIndex] = React.useState(-1);
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [groups, setGroups] = React.useState(media?.groups);
  const [mediaLink, setMediaLink] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);

  const _videoControl = () => {
    setPlaying(!playing);
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

  const _renderCurrentGroup = () => {
    if (currentGroup) {
      return (
        <>
        <Row>
          <Col md={6}>
            <div style={{backgroundColor: 'gray'}}>
            {currentGroup.inputs.map((input, index) => {
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
                    backgroundColor: "transparent",
                    color: input.color,
                    fontSize: parseInt(input.size),
                    width: `${input.text.length}ch`,
                    padding: 0,
                    top: input.position_y,
                    left: input.position_x,
                  }}
                />
              );
            })}
            </div>
          </Col>
        </Row>
        </>
      );
    }
    return null;
  };

  const _renderImage = () => {
    return (
      <Image
        width={250}
        src={media?.media_link}
        height={300}
        style={{ objectFit: "contain" }}
      />
    );
  };

  const _onSave = () => {
    //Save changes
    const data = { media_id: mediaLink, groups: groups };
    console.log("Modified Groups--", JSON.stringify(groups));
    dispatch(Actions.updateMediaRequestAsync(data));
  };

  const _renderPlayer = () => {
    return (
      <ReactPlayer
        url={media?.media_link}
        playing={playing}
        onProgress={(progress) => {
          const currentTimeInSeconds = Math.floor(progress?.playedSeconds);
          if (currentTimeInSeconds !== 0) {
            if (groups && groups.length > 0) {
              const index = groups.findIndex((el) => {
                const groupShowTime = parseInt(el.interval);
                return groupShowTime === currentTimeInSeconds;
              });
              if (index !== -1) {
                setPlaying(false);
                const currentGroupObject = groups[index];
                seCurrentGroupIndex(index);
                setCurrentGroup(currentGroupObject);
              } else {
                seCurrentGroupIndex(-1);
                setCurrentGroup(null);
              }
            }
          }
        }}
      />
    );
  };

  React.useEffect(() => {
    if (media) {
      console.log("mmmmm---", media);
      if (media.groups[0].mediaType === "image") {
        seCurrentGroupIndex(0);
        setCurrentGroup(media.groups[0]);
      }
    }
  }, [media]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Input
            onChange={(event) => {
              setMediaLink(event.target.value);
            }}
            placeholder="Enter media ID and click on Get Media"
            id="media-link"
            name="media-link"
            style={{ marginBottom: 5 }}
            autoComplete={false}
          />
          <Button
            onClick={() => {
              dispatch(
                Actions.getMediaRequestAsync({
                  id: mediaLink,
                })
              );
            }}
          >
            Get Media
          </Button>
        </Col>
      </Row>
      <Row align="middle" justify="center" typeof="">
        <Col>
          <div style={{ position: "relative" }}>
            {media?.groups[0].mediaType === "image"
              ? _renderImage()
              : _renderPlayer()}
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
                />
              );
            })}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={_videoControl}>{playing ? "Pause" : "Play"}</Button>
        </Col>
        <Col>
          <Button onClick={_onSave}>Save Changes</Button>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
