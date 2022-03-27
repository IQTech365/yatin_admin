import Client from "./client";
import { save_groups_URL, get_media_URL, get_all_media_URL, update_media_URL } from "./api.endpoints";
import * as Actions from "../redux/DispatchFuncitons/VideoTemplate";

export const SaveGroupService = async (dispatch, data) => {
  try {
    const response = await Client.doPost(save_groups_URL, data, true);
    dispatch(Actions.uploadFileRequestSucceeded(response));
    dispatch(Actions.showAlert({ message: "Group successfully created.", type: "success" }));
  } catch (error) {
    dispatch(Actions.uploadFileRequestFailed({ error: error }));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const GetMediaService = async (dispatch, data) => {
  try {
    const response = await Client.doGet(get_media_URL, data, null);
    dispatch(Actions.getMediaSucceeded(response));
  } catch (error) {
    dispatch(Actions.getMediaFailed({ error: error }));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const GetALLMediaService = async (dispatch, data) => {
  try {
    const response = await Client.doGet(get_all_media_URL, null, null);
    dispatch(Actions.getAllMediaSucceeded(response));
  } catch (error) {
    dispatch(Actions.getAllMediaFailed({ error: error }));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const UpdateMediaService = async (dispatch, data) => {
  const { media_id, groups } = data;
  try {
    // const update_URL = update_media_URL.replace('{media_id}', media_id);
    const response = await Client.doPost(update_media_URL, data, null);
    dispatch(Actions.updateMediaSucceeded(response));
  } catch (error) {
    dispatch(Actions.updateMediaFailed({ error: error }));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};