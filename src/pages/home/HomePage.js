import React from "react";
import { useSelector } from "react-redux";
import { Player } from "video-react";
import { Row, Col, Button, Input } from "antd";

const HomePage = (props) => {
  const { data } = useSelector((state) => state.Groups);
  const { groups, intervals } = data;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = React.useState(0);
  const playerRef = React.useRef();
  const [currentGroupIndex, seCurrentGroupIndex] = React.useState(-1);
  const [videoState, setVideoState] = React.useState(null);
  const [showGroup1, setShowGroup1] = React.useState(true);
  const [showGroup2, setShowGroup2] = React.useState(true);
  const [showGroup3, setShowGroup3] = React.useState(true);

  //group 1 inputs
  const [textG10, setTextG10] = React.useState("");
  const [textG11, setTextG11] = React.useState("");
  const [textG12, setTextG12] = React.useState("");

  //group 2 inputs
  const [textG20, setTextG20] = React.useState("");
  const [textG21, setTextG21] = React.useState("");
  const [textG22, setTextG22] = React.useState("");

  //group 3 inputs
  const [textG30, setTextG30] = React.useState("");
  const [textG31, setTextG31] = React.useState("");
  const [textG32, setTextG32] = React.useState("");

  // Group 1 Input Changes
  const _onChangeTextG10 = (value) => {
    setTextG10(value);
  };

  const _onChangeTextG11 = (value) => {
    setTextG11(value);
  };

  const _onChangeTextG12 = (value) => {
    setTextG12(value);
  };

  // Group 2 Input Changes
  const _onChangeTextG20 = (value) => {
    setTextG20(value);
  };

  const _onChangeTextG21 = (value) => {
    setTextG21(value);
  };

  const _onChangeTextG22 = (value) => {
    setTextG22(value);
  };

  // Group 3 Input Changes
  const _onChangeTextG30 = (value) => {
    setTextG30(value);
  };

  const _onChangeTextG31 = (value) => {
    setTextG31(value);
  };

  const _onChangeTextG32 = (value) => {
    setTextG32(value);
  };

  const _onChangeText1 = (event, inputCount) => {
    const { value } = event.target;
    if (currentGroupIndex === 0) {
      _onChangeTextG10(value);
    } else if (currentGroupIndex === 1) {
      _onChangeTextG20(value);
    } else if (currentGroupIndex === 2) {
      _onChangeTextG30(value);
    }
  };

  const _onChangeText2 = (event, inputCount) => {
    const { value } = event.target;
    if (currentGroupIndex === 0) {
      _onChangeTextG11(value);
    } else if (currentGroupIndex === 1) {
      _onChangeTextG21(value);
    } else if (currentGroupIndex === 2) {
      _onChangeTextG31(value);
    }
  };

  const _onChangeText3 = (event, inputCount) => {
    const { value } = event.target;
    if (currentGroupIndex === 0) {
      _onChangeTextG12(value);
    } else if (currentGroupIndex === 1) {
      _onChangeTextG22(value);
    } else if (currentGroupIndex === 2) {
      _onChangeTextG32(value);
    }
  };

  const _videoControl = () => {
    if (videoState?.paused) {
      playerRef.current.play();
      setIsPlaying(true);
    } else {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const _getInput1Text = () => {
    let text;
    if (currentGroupIndex === 0) {
      text = textG10;
    } else if (currentGroupIndex === 1) {
      text = textG20;
    } else if (currentGroupIndex === 2) {
      text = textG30;
    }
    return text;
  };

  const _getInput2Text = () => {
    let text;
    if (currentGroupIndex === 0) {
      text = textG11;
    } else if (currentGroupIndex === 1) {
      text = textG21;
    } else if (currentGroupIndex === 2) {
      text = textG31;
    }
    return text;
  };

  const _getInput3Text = () => {
    let text;
    if (currentGroupIndex === 0) {
      text = textG12;
    } else if (currentGroupIndex === 1) {
      text = textG22;
    } else if (currentGroupIndex === 2) {
      text = textG32;
    }
    return text;
  };

  const _onSave = () => {};

  const _renderGroup = (index) => {
    const group = groups[index];
    const { numberOfInputs } = group;
    const convertToInt = parseInt(numberOfInputs);
    if (convertToInt === 1) {
      if (showGroup1) {
        if (index === 0) {
          setTextG10(group.input_0);
          setTextG11(group.input_1);
          setTextG12(group.input_2);
        }
        setShowGroup1(false);
        playerRef.current.pause();
      }
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Input
            placeholder="enter text"
            value={_getInput1Text()}
            onChange={(event) => {
              _onChangeText1(event, convertToInt);
            }}
            style={{
              backgroundColor: "transparent",
              color: group?.font_color_0 || group?.input_0_color,
              fontSize: parseInt(group?.font_size_0) || group?.input_0_size,
            }}
          />
        </div>
      );
    } else if (convertToInt === 2) {
      if (showGroup2) {
        if (index === 0) {
          setTextG10(group.input_0);
          setTextG11(group.input_1);
          setTextG12(group.input_2);
        } else if (index == 1) {
          setTextG20(group.input_0);
          setTextG21(group.input_1);
          setTextG22(group.input_2);
        }
        setShowGroup2(false);
        playerRef.current.pause();
      }
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col>
              <Input
                placeholder="enter text"
                value={_getInput1Text()}
                onChange={(event) => {
                  _onChangeText1(event, convertToInt);
                }}
                style={{
                  backgroundColor: "transparent",
                  color: group?.font_color_0 || group?.input_0_color,
                  fontSize: group?.font_size_0 || group?.input_0_size,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                placeholder="enter text"
                value={_getInput2Text()}
                onChange={(event) => {
                  _onChangeText2(event, convertToInt);
                }}
                style={{
                  backgroundColor: "transparent",
                  color: group?.font_color_1 || group?.input_1_color,
                  fontSize: group?.font_size_1 || group?.input_1_size,
                }}
              />
            </Col>
          </Row>
        </div>
      );
    } else if (convertToInt === 3) {
      if (showGroup3) {
        if (index === 0) {
          setTextG10(group.input_0);
          setTextG11(group.input_1);
          setTextG12(group.input_2);
        } else if (index == 1) {
          setTextG20(group.input_0);
          setTextG21(group.input_1);
          setTextG22(group.input_2);
        } else if (index === 2) {
          setTextG30(group.input_0);
          setTextG31(group.input_1);
          setTextG32(group.input_2);
        }
        setShowGroup3(false);
        playerRef.current.pause();
      }
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col>
              <Input
                placeholder="enter text"
                value={_getInput1Text()}
                onChange={(event) => {
                  _onChangeText1(event, convertToInt);
                }}
                style={{
                  backgroundColor: "transparent",
                  color: group?.font_color_0 || group?.input_0_color,
                  fontSize: group?.font_size_0 || group?.input_0_size,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                placeholder="enter text"
                value={_getInput2Text()}
                onChange={(event) => {
                  _onChangeText2(event, convertToInt);
                }}
                style={{
                  backgroundColor: "transparent",
                  color: group?.font_color_1 || group?.input_1_color,
                  fontSize: group?.font_size_1 || group?.input_1_size,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                placeholder="enter text"
                value={_getInput3Text()}
                onChange={(event) => {
                  _onChangeText3(event, convertToInt);
                }}
                style={{
                  backgroundColor: "transparent",
                  color: group?.font_color_2 || group?.input_2_color,
                  fontSize: group?.font_size_2 || group?.input_2_size,
                }}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    playerRef.current.subscribeToStateChange((state) => {
      setVideoState(state);
      if (videoDuration === 0) {
        setVideoDuration(state.duration);
      }
      setVideoCurrentTime(state.currentTime);
    });
  }, []);

  React.useEffect(() => {
    const currentTimeInSeconds = Math.floor(videoCurrentTime);
    if (currentTimeInSeconds !== 0) {
      const index = intervals.findIndex((el) => el === currentTimeInSeconds);
      seCurrentGroupIndex(index);
    }
  }, [videoCurrentTime]);

  return (
    <>
      <Row align="middle" justify="center" typeof="">
        <Col span={24}>
          <Player
            ref={playerRef}
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {currentGroupIndex !== -1 && _renderGroup(currentGroupIndex)}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={_videoControl}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Col>
        <Col>
          <Button onClick={_onSave}>Save</Button>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
