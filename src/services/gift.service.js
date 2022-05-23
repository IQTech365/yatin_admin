import Client from "./client";
import {
  add_gift_url,
  create_gift_category_url,
  delete_gift_category_url,
  delete_gift_url,
  getall_gift_category_url,
  getall_gift_url,
  update_gift_category_url,
  update_gift_url,
} from "./api.endpoints";
import * as Actions from "../redux/actions/Action";
import * as GiftCategoryActions from "../redux/actions/gift.catgorey.action";
import * as GiftAddActions from "../redux/actions/gift.add.action";

//** Gift Categories Services ** /
export const CreateGiftCategoryService = async (dispatch, data) => {
  try {
    const response = await Client.doPost(create_gift_category_url, data);
    dispatch(GiftCategoryActions.createGiftCategorySuccess(response));
  } catch (error) {
    dispatch(GiftCategoryActions.createGiftCategoryFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const UpdateGiftCategoryService = async (dispatch, data) => {
  try {
    const response = await Client.doPut(update_gift_category_url, data);
    dispatch(GiftCategoryActions.updateGiftCategorySuccess(response));
  } catch (error) {
    dispatch(GiftCategoryActions.updateGiftCategoryFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const DeleteGiftCategoryService = async (dispatch, data) => {
  try {
    const response = await Client.doDelete(delete_gift_category_url, data);
    dispatch(GiftCategoryActions.deleteGiftCategorySuccess(response));
  } catch (error) {
    dispatch(GiftCategoryActions.deleteGiftCategoryFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const GetallGiftCategoryService = async (dispatch, data) => {
  try {
    const response = await Client.doGet(getall_gift_category_url, data);
    dispatch(GiftCategoryActions.getAllGiftCategorySuccess(response));
  } catch (error) {
    dispatch(GiftCategoryActions.getAllGiftCategoryFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

//******************************************************************** */
//Add Gift
//***************************************** */
export const AddGiftService = async (dispatch, data) => {
  try {
    const response = await Client.doPost(add_gift_url, data);
    dispatch(GiftAddActions.addGiftSuccess(response));
  } catch (error) {
    dispatch(GiftAddActions.addGiftFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const UpdateGiftService = async (dispatch, data) => {
  try {
    const response = await Client.doPut(update_gift_url, data);
    dispatch(GiftAddActions.updateGiftSuccess(response));
  } catch (error) {
    dispatch(GiftAddActions.updateGiftFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const DeleteGiftService = async (dispatch, data) => {
  try {
    const response = await Client.doDelete(delete_gift_url, data);
    dispatch(GiftAddActions.deleteGiftSuccess(response));
  } catch (error) {
    dispatch(GiftAddActions.deleteGiftFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const GetallGiftService = async (dispatch, data) => {
  try {
    const response = await Client.doGet(getall_gift_url, data);
    dispatch(GiftAddActions.getAllGiftSuccess(response));
  } catch (error) {
    dispatch(GiftAddActions.getAllGiftFail(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};
