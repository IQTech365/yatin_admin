import * as GiftActions from "../Actions/GiftActions";
import axios from "axios";
import { url } from "../../Utils/Config";

export const getAllGiftCategoriesService = (dispatch, data) => {
  const URL = `https://mobility-be.herokuapp.com/api/v1/getall-gift-category`;
  axios
    .get(URL)
    .then((response) => {
      console.log("getAllGiftCategoriesService-response-", response);
      dispatch(GiftActions.getAllGiftCategoriesSuccess(response.data))
    })
    .catch((error) => {
      console.log("getAllGiftCategoriesService-error-", error);
    });
};

export const getAllGiftsService = (dispatch, data) => {
  const URL = `https://mobility-be.herokuapp.com/api/v1/getall-gift`;
  axios
    .get(URL)
    .then((response) => {
      console.log("getAllGiftsService-response-", response);
      dispatch(GiftActions.getAllGiftSuccess(response.data))
    })
    .catch((error) => {
      console.log("getAllGiftsService-error-", error);
    });
};