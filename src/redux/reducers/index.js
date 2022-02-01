import { combineReducers } from "redux";
import GroupReducer from "./group.reducer";
import UserReducer from "./user.reducer";
import AlertReducer from "./alert.reducer";

const appReducer = combineReducers({
  Groups: GroupReducer,
  User: UserReducer,
  Alert: AlertReducer,
});

export default (state, action) => appReducer(state, action);
