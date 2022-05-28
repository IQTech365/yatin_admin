import * as GiftActions from "../Actions/GiftActions";
const initialState = {
  //gift Categories
  getGiftCategoriesRequest: false,
  getGiftCategoriesSuccess: false,
  getGiftCategoriesFail: false,
  giftCategories: [],
  //gift
  getGiftsRequest: false,
  getGiftsSuccess: false,
  getGiftsFail: false,
  gifts: [],
};

const GiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case GiftActions.GETALL_GIFT_CATEGORIES_REQUEST:
      return {
        ...state,
        getGiftCategoriesRequest: true,
      };
    case GiftActions.GETALL_GIFT_CATEGORIES_SUCCESS:
      return {
        ...state,
        getGiftCategoriesRequest: false,
        getGiftCategoriesSuccess: true,
        getGiftCategoriesFail: false,
        giftCategories: action.payload.GiftCategories,
      };
    case GiftActions.GETALL_GIFT_CATEGORIES_FAIL:
      return {
        ...state,
        getGiftCategoriesRequest: false,
        getGiftCategoriesSuccess: false,
        getGiftCategoriesFail: true,
        giftCategories: [],
      };
    case GiftActions.GETALL_GIFT_REQUEST:
      return {
        ...state,
        getGiftsRequest: true,
      };
    case GiftActions.GETALL_GIFT_SUCCESS:
      return {
        ...state,
        getGiftsRequest: false,
        getGiftsSuccess: true,
        getGiftsFail: false,
        gifts: action.payload.Gifts,
      };
    case GiftActions.GETALL_GIFT_FAIL:
      return {
        ...state,
        getGiftsRequest: false,
        getGiftsSuccess: false,
        getGiftsFail: true,
        gifts: [],
      };
    default:
      return state;
  }
};

export default GiftReducer;
