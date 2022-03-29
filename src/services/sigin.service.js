import Client from "./client";
import { signin_URL } from "./api.endpoints";
import * as Actions from "../redux/DispatchFuncitons/VideoTemplate";

export const SignInService = async (dispatch, data) => {
  try {
    const response = await Client.doPost(signin_URL, data);
    dispatch(Actions.signInSucceeded(response));
  } catch (error) {
    dispatch(Actions.signInFailed(error));
    const alertData = { message: error.toString(), type: "error" };
    dispatch(Actions.showAlert(alertData));
  }
};
