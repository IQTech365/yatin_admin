const initialState = []
const GuestList = (state = initialState, action) => {
    switch (action.type) {
        case "SAVEGUEST":
            return action.payload;

        case "CLEARGUESTLIST":
            return [];

        default:
            return state;
    }
}
export default GuestList;