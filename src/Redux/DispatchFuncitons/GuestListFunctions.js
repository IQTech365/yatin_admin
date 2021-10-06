import axios from "axios";
import { url } from "../../Utils/Config";
import {
    GOTGUEST
} from "../Actions/GuestActions";

export function getlist() {
    return async (dispatch) => {
        await axios
            .post(url + "event/ListallGuest")
            .then(async (res) => {
                await console.log(res);
                if (
                    res.data.status === "success"
                ) {
                    console.log(res.data);
                    dispatch({
                        type: GOTGUEST,
                        payload: res.data.availableGuest
                    });
                } else {

                }
            });
    }
}