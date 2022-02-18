import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Player } from "video-react";
import { Row, Col, Button, Input } from "antd";
import * as Actions from "../../redux/actions/Action";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const { data = [], mediaLink, media } = useSelector((state) => state.Groups);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = React.useState(0);
  const playerRef = React.useRef();
  const [currentGroupIndex, seCurrentGroupIndex] = React.useState(-1);
  const [videoState, setVideoState] = React.useState(null);
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [groups, setGroups] = React.useState(media?.groups);

  const _videoControl = () => {
    // if (videoState?.paused) {
    //   playerRef.current.play();
    //   setIsPlaying(true);
    // } else {
    //   playerRef.current.pause();
    //   setIsPlaying(false);
    // }
    if(isPlaying){
      playerRef.current.pause();
      setIsPlaying(false);
    }else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const _setGroupInputField = (field, value, index) => {
    console.log('CurrentIndex - ', index);
    const newGroups = JSON.parse(JSON.stringify(groups));
    const newCurrentGroup = Object.assign({}, currentGroup);
    newCurrentGroup.inputs[index][field] = value;
    setCurrentGroup(newCurrentGroup);
    newGroups[currentGroupIndex] = newCurrentGroup;
    setGroups(newGroups);
  };

  const _renderCurrentGroup = () => {
    if (currentGroup) {
      playerRef.current.pause();
      return (
        <Row>
          <Col>
            {currentGroup.inputs.map((input, index) => {
              return (
                <React.Fragment key={`input-${index}`}>
                  <Input
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
                    }}
                  />
                </React.Fragment>
              );
            })}
          </Col>
        </Row>
      );
    }
    return null;
  };

  const _onSave = () => {};

  React.useEffect(() => {
    if(media?.media_link){
      playerRef.current.subscribeToStateChange((state) => {
        setVideoState(state);
        if (videoDuration === 0) {
          setVideoDuration(state.duration);
        }
        setVideoCurrentTime(state.currentTime);
      });
    }
    dispatch(Actions.getMediaRequestAsync({media_id: "yatinapp-a7d15.appspot.com//videos/1644755224603-testfile.mp4/1644755226205725"}))
  }, []);

  React.useEffect(() => {
    const currentTimeInSeconds = Math.floor(videoCurrentTime);
    if (currentTimeInSeconds !== 0) {
      if (groups && groups.length > 0) {
        const index = groups.findIndex((el) => {
          const groupShowTime = parseInt(el.interval);
          return groupShowTime === currentTimeInSeconds;
        });
        if (index !== -1) {
          const currentGroupObject = groups[index];
          seCurrentGroupIndex(index);
          setCurrentGroup(currentGroupObject);
        } else {
          seCurrentGroupIndex(-1);
          setCurrentGroup(null);
        }
      }
    }
  }, [videoCurrentTime]);

  return (
    <>
      <Row align="middle" justify="center" typeof="">
        <Col span={24}>
          {media?.media_link && <Player
            ref={playerRef}
            // src={media?.media_link}
            width={300}
            height={200}
            // src={URL.createObjectURL(data?.mediaLink)}
            src={"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}
            
          />}
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
            {currentGroup && _renderCurrentGroup()}
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
