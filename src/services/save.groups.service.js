import Client from "./client";
import { save_groups_URL, get_media_URL } from "./api.endpoints";
import * as Actions from "../redux/actions/Action";

export const SaveGroupService = async (dispatch, data) => {
  try {
    const response = await Client.doPost(save_groups_URL, data, true);
    dispatch(Actions.uploadFileRequestSucceeded(response));
  } catch (error) {
    dispatch(Actions.uploadFileRequestFailed({error: error}));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const GetMediaService = async (dispatch, data) => {
  try {
    const response = await Client.doGet(get_media_URL, null, data);
    dispatch(Actions.getMediaSucceeded(response));
  } catch (error) {
    dispatch(Actions.getMediaFailed({error: error}));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};