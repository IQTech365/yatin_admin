import ActionTypes from "../actions/ActionTypes";

const initialState = {
  //create state
  createGiftCategoryRequest: false,
  createGiftCategorySuccess: false,
  createGiftCategoryFail: false,
  //update
  updateGiftCategoryRequest: false,
  updateGiftCategorySuccess: false,
  updateGidtCategoryFail: false,
  //delete
  deleteGiftCategoryRequest: false,
  deleteGiftCategorySuccess: false,
  deleteGiftCategoryFail: false,
  //getall
  getallGiftCategoryRequest: false,
  getallGiftCategorySuccess: false,
  getallGistCategoryFail: false,
  giftCategories: [],
};

const GiftCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // CREATE
    case ActionTypes.CREATE_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        createGiftCategoryRequest: true,
      };
    case ActionTypes.CREATE_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        createGiftCategoryRequest: false,
        createGiftCategorySuccess:  true,
        createGiftCategoryFail: false,
      };
    case ActionTypes.CREATE_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        createGiftCategoryRequest: false,
        createGiftCategorySuccess: false,
        createGiftCategoryFail: true,
      };
    //UPDATE
    case ActionTypes.UPDATE_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        updateGiftCategoryRequest: true,
      };
    case ActionTypes.UPDATE_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        updateGiftCategoryRequest: false,
        updateGiftCategorySuccess: true,
        updateGidtCategoryFail: false,
      };
    case ActionTypes.UPDATE_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        updateGiftCategoryRequest: false,
        updateGiftCategorySuccess: false,
        updateGidtCategoryFail: true,
      };
    //DELETE
    case ActionTypes.DELETE_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        deleteGiftCategoryRequest: true,
      };
    case ActionTypes.DELETE_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        updateGiftCategoryRequest: false,
        deleteGiftCategorySuccess: true,
        updateGidtCategoryFail: false,
      };
    case ActionTypes.DELETE_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        updateGiftCategoryRequest: false,
        deleteGiftCategorySuccess: false,
        updateGidtCategoryFail: true,
      };
    //GETALL
    case ActionTypes.GETALL_GIFT_CATEGORY_REQUEST:
      return {
        ...state,
        getallGiftCategoryRequest: true,
      };
    case ActionTypes.GETALL_GIFT_CATEGORY_SUCCESS:
      return {
        ...state,
        getallGiftCategoryRequest: false,
        getallGiftCategorySuccess: true,
        giftCategories: action.payload.GiftCategories,
        getallGistCategoryFail: false,
      };
    case ActionTypes.GETALL_GIFT_CATEGORY_FAIL:
      return {
        ...state,
        getallGiftCategoryRequest: false,
        getallGiftCategorySuccess: false,
        giftCategories: [],
        getallGistCategoryFail: true,
      };
    default:
      return state;
  }
};

export default GiftCategoryReducer;
