import { combineReducers } from "redux";
import GroupReducer from "./group.reducer";
import UserReducer from "./user.reducer";
import AlertReducer from "./alert.reducer";
import GiftAddReducer from "./gift.add.reducer";
import GiftCategoryReducer from "./gift.category.reducer";

const appReducer = combineReducers({
  Groups: GroupReducer,
  User: UserReducer,
  Alert: AlertReducer,
  GiftAdd: GiftAddReducer,
  GiftCategory: GiftCategoryReducer,
});

export default (state, action) => appReducer(state, action);
