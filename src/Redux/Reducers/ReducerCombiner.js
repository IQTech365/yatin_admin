import Auth from "./AuthReducer";
import { combineReducers } from "redux";
import Eventdata from "./EventReducer";
import CreateEventForm from "./CreateEventFormReducer";
import Chatdata from "./ChatReducer";
import Notifications from "./NotificatonReducer";
import CodeEvent from './CodeEventReducer'
import GuestList from './GuestListReducer'
import Templates from './TemplatesReducer'
import VideoTemplates from './VideoTemplatesReducer'
const allreducers = combineReducers({
  Auth: Auth,
  Eventdata: Eventdata,
  CreateEventForm: CreateEventForm,
  Chatdata: Chatdata,
  Notifications: Notifications,
  GuestList: GuestList,
  CodeEvent: CodeEvent,
  AllTemplates: Templates,
  VideoTemplates: VideoTemplates
});
export default allreducers;
