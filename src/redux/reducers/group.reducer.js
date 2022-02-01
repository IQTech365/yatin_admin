import ActionTypes from "../actions/ActionTypes";
const initialState = {
  data: [],
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_GROUPS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default GroupReducer;
