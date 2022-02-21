import ActionTypes from "../actions/ActionTypes";
const initialState = {
  data: [],
  media: null,
  allMedia: [],
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_GROUPS:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.GET_MEDIA_REQUEST_SUCCEEDED:
      return {
        ...state,
        media: action.payload,
      };
    case ActionTypes.GET_ALL_MEDIA_REQUEST_SUCCEEDED:
      return {
        ...state,
        allMedia: action.payload,
      };
    default:
      return state;
  }
};

export default GroupReducer;
