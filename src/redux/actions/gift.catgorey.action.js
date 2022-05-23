import ActionTypes from "./ActionTypes";
import * as GiftService from "../../services/gift.service";

//CREATE ACTION
export const createGiftCategoryAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CREATE_GIFT_CATEGORY_REQUEST });
    GiftService.CreateGiftCategoryService(dispatch, data);
  };
};

export const createGiftCategorySuccess = (data) => {
  return { type: ActionTypes.CREATE_GIFT_CATEGORY_SUCCESS, payload: data };
};

export const createGiftCategoryFail = (data) => {
  return { type: ActionTypes.CREATE_GIFT_CATEGORY_FAIL, payload: data };
};

//DELETE ACTION
export const deleteGiftCategoryAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_GIFT_CATEGORY_REQUEST });
    //TODO: call api here
  };
};

export const deleteGiftCategorySuccess = (data) => {
  return { type: ActionTypes.DELETE_GIFT_CATEGORY_SUCCESS, payload: data };
};

export const deleteGiftCategoryFail = (data) => {
  return { type: ActionTypes.DELETE_GIFT_CATEGORY_FAIL, payload: data };
};

//UPDATE ACTION
export const updateGiftCategoryAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_GIFT_CATEGORY_REQUEST });
    //TODO: call api here
  };
};

export const updateGiftCategorySuccess = (data) => {
  return { type: ActionTypes.UPDATE_GIFT_CATEGORY_SUCCESS, payload: data };
};

export const updateGiftCategoryFail = (data) => {
  return { type: ActionTypes.UPDATE_GIFT_CATEGORY_FAIL, payload: data };
};

//GETALL GIFT CATEGORIES ACTION
export const getAllGiftCategoryAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GETALL_GIFT_CATEGORY_REQUEST });
    GiftService.GetallGiftCategoryService(dispatch, data);
  };
};

export const getAllGiftCategorySuccess = (data) => {
  return { type: ActionTypes.GETALL_GIFT_CATEGORY_SUCCESS, payload: data };
};

export const getAllGiftCategoryFail = (data) => {
  return { type: ActionTypes.GETALL_GIFT_CATEGORY_FAIL, payload: data };
};
