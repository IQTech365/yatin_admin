import ActionTypes from "./ActionTypes";
import * as GiftService from "../../services/gift.service";

//ADD ACTION
export const addGiftAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_GIFT_REQUEST });
    GiftService.AddGiftService(dispatch, data);
  };
};

export const addGiftSuccess = (data) => {
  return { type: ActionTypes.ADD_GIFT_SUCCESS, payload: data };
};

export const addGiftFail = (data) => {
  return { type: ActionTypes.ADD_GIFT_FAIL, payload: data };
};

//DELETE ACTION
export const deleteGiftAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_GIFT_REQUEST });
    //TODO: call api here
  };
};

export const deleteGiftSuccess = (data) => {
  return { type: ActionTypes.DELETE_GIFT_SUCCESS, payload: data };
};

export const deleteGiftFail = (data) => {
  return { type: ActionTypes.DELETE_GIFT_FAIL, payload: data };
};

//UPDATE ACTION
export const updateGiftAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_GIFT_REQUEST });
    //TODO: call api here
  };
};

export const updateGiftSuccess = (data) => {
  return { type: ActionTypes.UPDATE_GIFT_SUCCESS, payload: data };
};

export const updateGiftFail = (data) => {
  return { type: ActionTypes.UPDATE_GIFT_FAIL, payload: data };
};

//GETALL GIFT ACTION
export const getAllGiftAsync = (data) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GETALL_GIFT_REQUEST });
    GiftService.GetallGiftService(dispatch, data);
  };
};

export const getAllGiftSuccess = (data) => {
  return { type: ActionTypes.GETALL_GIFT_SUCCESS, payload: data };
};

export const getAllGiftFail = (data) => {
  return { type: ActionTypes.GETALL_GIFT_FAIL, payload: data };
};
