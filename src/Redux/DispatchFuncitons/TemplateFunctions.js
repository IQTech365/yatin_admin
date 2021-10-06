import axios from "axios";
import { url } from "../../Utils/Config";
import {
    GOTTEMPLATE
} from "../Actions/TemplateActions";

export function gettemplate() {
    return async (dispatch) => {
        await axios
            .post(url + "template/gettemplate")
            .then(async (res) => {
                await console.log(res);
                if (
                    res.data.status === "success"
                ) {
                    dispatch({
                        type: GOTTEMPLATE,
                        payload: res.data.Templates
                    });
                } else {

                }
            });
    }
}