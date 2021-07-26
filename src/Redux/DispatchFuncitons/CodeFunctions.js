import axios from "axios";
import { url } from "../../Utils/Config";
import { ADDCODEDEVENT, DELETECODEDEVENT } from "../Actions/CodeAction";
import history from "../../Utils/History";
export function addEvent(Code, Maincode) {
    return (dispatch) => {
        dispatch({ type: ADDCODEDEVENT, payload: { Code: Code, Maincode: Maincode } });
    };
}
export function deleteEvent() {
    return (dispatch) => {
        dispatch({ type: DELETECODEDEVENT });
    };
}