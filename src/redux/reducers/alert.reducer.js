import ActionTypes from "../actions/ActionTypes";

const initialState = {
  show: false,
  text: null,
  type: null,
};

const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      return {
        ...state,
        show: true,
        text: action.payload.message,
        type: action.payload.type,
      };
    case ActionTypes.HIDE_ALERT:
      return {
        ...state,
        show: false,
        text: null,
        type: null,
      };
    default:
      return state;
  }
};

export default AlertReducer;
