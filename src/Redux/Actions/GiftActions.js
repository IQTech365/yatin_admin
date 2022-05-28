import * as GiftService from "../DispatchFuncitons/Giftfunctions";

export const GETALL_GIFT_CATEGORIES_REQUEST = "GETALL_GIFT_CATEGORIES_REQUEST";
export const GETALL_GIFT_CATEGORIES_SUCCESS = "GETALL_GIFT_CATEGORIES_SUCCESS";
export const GETALL_GIFT_CATEGORIES_FAIL = "GETALL_GIFT_CATEGORIES_FAIL";

export const GETALL_GIFT_REQUEST = "GETALL_GIFT_REQUEST";
export const GETALL_GIFT_SUCCESS = "GETALL_GIFT_SUCCESS";
export const GETALL_GIFT_FAIL = "GETALL_GIFT_FAIL";

export const getAllGiftCategoriesAsync = (data) => {
  return (dispatch) => {
    dispatch({
      type: GETALL_GIFT_CATEGORIES_REQUEST,
      payload: data,
    });
    GiftService.getAllGiftCategoriesService(dispatch, data);
  };
};

export const getAllGiftCategoriesSuccess = (data) => {
  return {
    type: GETALL_GIFT_CATEGORIES_SUCCESS,
    payload: data,
  };
};

export const getAllGiftCategoriesFail = (data) => {
  return {
    type: GETALL_GIFT_CATEGORIES_FAIL,
    payload: data,
  };
};

export const getAllGiftsAsync = (data) => {
  return (dispatch) => {
    dispatch({
      type: GETALL_GIFT_REQUEST,
      payload: data,
    });
    GiftService.getAllGiftsService(dispatch, data);
  };
};

export const getAllGiftSuccess = (data) => {
  return {
    type: GETALL_GIFT_SUCCESS,
    payload: data,
  };
};

export const getAllGiftFail = (data) => {
  return {
    type: GETALL_GIFT_FAIL,
    payload: data,
  };
};
