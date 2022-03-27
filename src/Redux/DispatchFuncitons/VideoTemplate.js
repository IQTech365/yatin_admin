import axios from "axios";
import { url } from "../../Utils/Config";
import {
    GOTVIDEOTEMPLATE
} from "../Actions/TemplateActions";

export function getVideotemplate() {
    return async (dispatch) => {
        await axios
            .get('https://yatin-backend.herokuapp.com/api/v1/get-media-all')
            .then(async (res) => {
                dispatch({
                    type: GOTVIDEOTEMPLATE,
                    payload: res.data
                });
            });
    }
}