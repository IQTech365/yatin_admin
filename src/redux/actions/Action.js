import ActionTypes from "./ActionTypes";
import { SignInService } from "../../services/sigin.service";
import * as UserServices from "../../services/user.service";
import * as GroupServices from "../../services/save.groups.service";

export const saveGroups = (data) => {
  return {
    type: ActionTypes.SAVE_GROUPS,
    payload: data,
  };
};

export const signInAsync = (data) => {
  return (dispatch) => {
    dispatch(signIn());
    SignInService(dispatch, data);
  };
};

//SIGIN - ACTIONS
const signIn = () => {
  return {
    type: ActionTypes.SIGN_IN_REQUESTED,
  };
};

export const signInSucceeded = (data) => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESSED,
    payload: data,
  };
};

export const signInFailed = (data) => {
  return {
    type: ActionTypes.SIGN_IN_FAILED,
    payload: data,
  };
};

// ALERT - ACTIONS
export const showAlert = (data) => {
  return {
    type: ActionTypes.SHOW_ALERT,
    payload: data,
  };
};

export const hideAlert = () => {
  return {
    type: ActionTypes.HIDE_ALERT,
  };
};

// CREATE USER - ACTIONS
export const createUserRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(createUserRequest());
    UserServices.CreateUserService(dispatch, data);
  };
};

const createUserRequest = () => {
  return {
    type: ActionTypes.CREATE_USER_REQUEST_STARTED,
  };
};

export const createUserRequestSucceeded = (data) => {
  return {
    type: ActionTypes.CREATE_USER_REQUEST_SUCCEEDED,
    payload: data,
  };
};

export const createUserRequestFailed = (data) => {
  return {
    type: ActionTypes.CREATE_USER_REQUEST_FAILED,
    payload: data,
  };
};

export const resetCreateUserRequestState = () => {
  return {
    type: ActionTypes.RESET_CREATE_USER_REQUEST_STATE,
  };
};

// GET USERs - ACTIONS
export const getUsersRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(getUsersRequest());
    UserServices.GetUsersService(dispatch, data);
  };
};

const getUsersRequest = () => {
  return {
    type: ActionTypes.GET_USERS_REQUEST_STARTED,
  };
};

export const getUsersRequestSucceeded = (data) => {
  return {
    type: ActionTypes.GET_USERS_REQUEST_SUCCEEDED,
    payload: data,
  };
};

export const getUsersRequestFailed = (data) => {
  return {
    type: ActionTypes.GET_USERS_REQUEST_FAILED,
    payload: data,
  };
};

//Upload File
export const uploadFileRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(uploadFileRequest());
    GroupServices.SaveGroupService(dispatch, data);
  }
}

export const uploadFileRequest = () => {
  return {
    type: ActionTypes.UPLOAD_FILE_REQUEST_STARTED,
  }
}

export const uploadFileRequestSucceeded = (data) => {
  return {
    type: ActionTypes.UPLOAD_FILE_REQUEST_SUCCEEDED,
    payload: data,
  }
}

export const uploadFileRequestFailed = (data) => {
  return {
    type: ActionTypes.UPLOAD_FILE_REQUEST_FAILED,
    payload: data,
  }
}

//get media by id
export const getMediaRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(getMediaRequest());
    GroupServices.GetMediaService(dispatch, data);
  }
}

export const getMediaRequest = () => {
  return {
    type: ActionTypes.GET_MEDIA_REQUEST_STARTED,
  }
}

export const getMediaSucceeded = (data) => {
  return {
    type: ActionTypes.GET_MEDIA_REQUEST_SUCCEEDED,
    payload: data,
  }
}

export const getMediaFailed = (data) => {
  return {
    type: ActionTypes.GET_USERS_REQUEST_FAILED,
    payload: data,
  }
}

//get all media
export const getAllMediaRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(getAllMediaRequest());
    GroupServices.GetALLMediaService(dispatch, data);
  }
}

export const getAllMediaRequest = () => {
  return {
    type: ActionTypes.GET_ALL_MEDIA_REQUEST_STARTED,
  }
}

export const getAllMediaSucceeded = (data) => {
  return {
    type: ActionTypes.GET_ALL_MEDIA_REQUEST_SUCCEEDED,
    payload: data,
  }
}

export const getAllMediaFailed = (data) => {
  return {
    type: ActionTypes.GET_ALL_MEDIA_REQUEST_FAILED,
    payload: data,
  }
}

//update media by id
export const updateMediaRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(getAllMediaRequest());
    GroupServices.UpdateMediaService(dispatch, data);
  }
}

export const updateMediaRequest = () => {
  return {
    type: ActionTypes.UPDATE_MEDIA_REQUEST_STARTED,
  }
}

export const updateMediaSucceeded = (data) => {
  return {
    type: ActionTypes.UPDATE_MEDIA_REQUEST_SUCCEEDED,
    payload: data,
  }
}

export const updateMediaFailed = (data) => {
  return {
    type: ActionTypes.UPDATE_MEDIA_REQUEST_FAILED,
    payload: data,
  }
}