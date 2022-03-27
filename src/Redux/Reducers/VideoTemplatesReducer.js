import { act } from "react-dom/test-utils";

const initialState = [];

const VideoTemplates = (state = initialState, action) => {
    switch (action.type) {
        case "GOTVIDEOTEMPLATE":
            return action.payload
        // console.log(action.payload);
        // let finallist = [];
        // for (let i = 0; i < action.payload.length; i++) {
        //     finallist[action.payload[i].Phone] = { Name: action.payload[i].Name, Pic: action.payload[i].Pic };
        // }
        // console.log(finallist);
        // //   state = finallist;
        // return { ...state, listdata: finallist }

        default:
            return state
    }
}
export default VideoTemplates;