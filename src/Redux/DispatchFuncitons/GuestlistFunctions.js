import {
    SAVEGUEST, CLEARGUESTLIST
} from "../Actions/GuestListActions";
import axios from "axios";
export function saveguest(DATA) {
    return (dispatch) => {
        axios
            .post(url + "event/ListallGuest",)
            .then((res) => {
                dispatch({
                    type: SAVEGUEST,
                    payload: res.data.allGuest,
                });
            });
    };
}