import Client from "./client";
import { create_user_URL, get_users_URL } from "./api.endpoints";
import * as Actions from "../redux/DispatchFuncitons/VideoTemplate";

export const CreateUserService = async (dispatch, data) => {
  try {
    const response = await Client.doPost(create_user_URL, data);
    dispatch(Actions.createUserRequestSucceeded(response));
  } catch (error) {
    dispatch(Actions.createUserRequestFailed({ error: error }));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};

export const GetUsersService = async (dispatch, data) => {
  try {
    const response = await Client.doGet(get_users_URL, data);
    dispatch(Actions.getUsersRequestSucceeded(response?.users));
  } catch (error) {
    dispatch(Actions.getUsersRequestFailed(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};
