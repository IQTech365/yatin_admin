import ActionTypes from "../actions/ActionTypes";

const initialState = {
  //create state
  addGiftRequest: false,
  addGiftRequestSuccess: false,
  addGiftRequestFail: false,
  //update
  updateGiftRequest: false,
  updateGiftRequestSuccess: false,
  updateGiftRequestFail: false,
  //delete
  deleteGiftRequest: false,
  deleteGiftRequestSuccess: false,
  deleteGiftRequestFail: false,
  //getall
  getallGiftRequest: false,
  getallGiftRequestSuccess: false,
  getallGiftRequestFail: false,
  gifts: [],
};

const GiftAddReducer = (state = initialState, action) => {
  switch (action.type) {
    // CREATE
    case ActionTypes.CREATE_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        addGiftRequest: true,
      };
    case ActionTypes.CREATE_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        addGiftRequest: false,
        addGiftRequestSuccess:  true,
        addGiftRequestFail: false,
      };
    case ActionTypes.CREATE_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        addGiftRequest: false,
        addGiftRequestSuccess: false,
        addGiftRequestFail: true,
      };
    //UPDATE
    case ActionTypes.UPDATE_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        updateGiftRequest: true,
      };
    case ActionTypes.UPDATE_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        updateGiftRequest: false,
        updateGiftRequestSuccess: true,
        updateGiftRequestFail: false,
      };
    case ActionTypes.UPDATE_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        updateGiftRequest: false,
        updateGiftRequestSuccess: false,
        updateGiftRequestFail: true,
      };
    //DELETE
    case ActionTypes.DELETE_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        deleteGiftRequest: true,
      };
    case ActionTypes.DELETE_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteGiftRequest: false,
        deleteGiftRequestSuccess: true,
        updateGiftRequestFail: false,
      };
    case ActionTypes.DELETE_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        deleteGiftRequest: false,
        deleteGiftRequestSuccess: false,
        updateGiftRequestFail: true,
      };
    //GETALL
    case ActionTypes.GETALL_GIFT_REQUEST:
      return {
        ...state,
        getallGiftRequest: true,
      };
    case ActionTypes.GETALL_GIFT_SUCCESS:
      return {
        ...state,
        getallGiftRequest: false,
        getallGiftRequestSuccess: true,
        gifts: action.payload.Gifts,
        getallGiftRequestFail: false,
      };
    case ActionTypes.GETALL_GIFT_FAIL:
      return {
        ...state,
        getallGiftRequest: false,
        getallGiftRequestSuccess: false,
        gifts: [],
        getallGiftRequestFail: true,
      };
    default:
      return state;
  }
};

export default GiftAddReducer;
