import React, { useState } from "react";
import Header from "../Helpers/Header/Header";
import {
  Tabs,
  Tab,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { IoIosArrowBack } from "react-icons/io";
import history from "../../Utils/History";
import AmazonIcon from "../../Assets/amazon.png";
import * as GiftActions from "../../Redux/Actions/GiftActions";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { UpdateRecommendedGifts } from "../../Redux/DispatchFuncitons/Eventfunctions";

const BuyGift = (props) => {
  const dispatch = useDispatch();
  const { giftCategories, gifts } = useSelector((state) => state.Gift);
  const { isHost = false, eventID } = props.location.state;
  const [tabIndex, setTabIndex] = useState(0);
  const [recommendedGifts, setRecommendedGifts] = useState([]);

  console.log("giftCategories--", giftCategories);
  console.log("gifts--", gifts);

  React.useEffect(() => {
    dispatch(GiftActions.getAllGiftCategoriesAsync({}));
    dispatch(GiftActions.getAllGiftsAsync({}));
  }, []);

  const _handleTabIndexChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const _handleAddRecommendedGift = (index) => {
    const selectedGift = gifts[index];
    const _recommendedGiftsCopy = recommendedGifts;
    const isAlreadyExist = _recommendedGiftsCopy.some(
      (recommendedGift) => recommendedGift._id === selectedGift._id
    );
    if (isAlreadyExist) {
      _recommendedGiftsCopy.splice(index, 1);
    } else {
      _recommendedGiftsCopy.push(selectedGift);
    }
    setRecommendedGifts(_recommendedGiftsCopy);
  };

  const _renderTabs = () => {
    return (
      <Tabs
        variant="fullWidth"
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={_handleTabIndexChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Recommended" />
        <Tab label="All" />
      </Tabs>
    );
  };

  const _renderMessageForHost = () => {
    return (
      <Typography
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        Please add Gift(s) you want to recommed to your Guest!
      </Typography>
    );
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Header className="desktop-only" />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        style={{
          marginTop: 30,
          marginRight: 10,
          marginLeft: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          startIcon={<IoIosArrowBack size={32} />}
          onClick={() => {
            history.goBack();
          }}
        >
          <Typography variant="h5">
            {isHost ? "Add Gift" : "Buy Gift"}
          </Typography>
        </Button>
        {isHost && <Button
          disableElevation
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            console.log("RecommendedGifts--", recommendedGifts);
            dispatch(UpdateRecommendedGifts(eventID, recommendedGifts));
          }}
        >
          Save
        </Button>}
      </Grid>
      <Grid item xs={12} md={12}>
        {isHost ? _renderMessageForHost() : _renderTabs()}
      </Grid>
      {gifts.map((gift, index) => {
        return (
          <Grid item xs={6} md={6} key={index}>
            <a href={!isHost && gift.gift_text_url} target="_blank">
              <div
                style={{
                  backgroundColor: "#F5F5F5",
                  width: 165,
                  margin: 10,
                  padding: 10,
                  cursor: "pointer",
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  border="0"
                  src={gift.gift_image_url}
                  style={{ width: 145, height: 100 }}
                />
                <p
                  style={{ overflow: "hidden", width: 150, marginTop: 10 }}
                >{`${gift.gift_text.substring(0, 30)}...`}</p>
                {isHost && (
                  <IconButton
                    onClick={() => {
                      _handleAddRecommendedGift(index);
                    }}
                  >
                    <AddCircleOutlineIcon style={{ width: 40, height: 40 }} />
                  </IconButton>
                )}
              </div>
            </a>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BuyGift;
