import ActionTypes from "../actions/ActionTypes";
const initialState = {
  //signin user
  isSignInRequesting: false,
  signInSucceeded: false,
  signInFailed: false,
  user: null,
  signInError: null,
  isLoggedIn: false,
  //create user
  isCreateUserRequesting: false,
  createUserSucceeded: false,
  createUserFailed: false,
  createUserError: null,
  //get users
  isGetUsersRequesting: false,
  getUsersSucceeded: false,
  getUsersFailed: false,
  getUsersError: null,
  users: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    //SIGNIN - USER
    case ActionTypes.SIGN_IN_REQUESTED:
      return {
        ...state,
        isSignInRequesting: true,
      };
    case ActionTypes.SIGN_IN_SUCCESSED:
      return {
        ...state,
        isSignInRequesting: false,
        signInSucceeded: true,
        user: action.payload,
        isLoggedIn: true,
      };
    case ActionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        isSignInRequesting: false,
        signInFailed: true,
        signInError: action.error,
        isLoggedIn: false,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isSignInRequesting: false,
        signInFailed: false,
        signInError: null,
        user: null,
        isLoggedIn: false,
      };
    //CREATE - USER
    case ActionTypes.CREATE_USER_REQUEST_STARTED:
      return {
        ...state,
        isCreateUserRequesting: true,
      };
    case ActionTypes.CREATE_USER_REQUEST_SUCCEEDED:
      return {
        ...state,
        isCreateUserRequesting: false,
        createUserSucceeded: true,
        createUserFailed: false,
        createUserError: null,
      };
    case ActionTypes.CREATE_USER_REQUEST_FAILED:
      return {
        ...state,
        isCreateUserRequesting: false,
        createUserSucceeded: false,
        createUserFailed: true,
        createUserError: action.error,
      };
    case ActionTypes.RESET_CREATE_USER_REQUEST_STATE:
      return {
        ...state,
        isCreateUserRequesting: false,
        createUserSucceeded: false,
        createUserFailed: false,
        createUserError: null,
      };
    //GET - USERS
    case ActionTypes.GET_USERS_REQUEST_STARTED:
      return {
        ...state,
        isGetUsersRequesting: true,
      };
    case ActionTypes.GET_USERS_REQUEST_SUCCEEDED:
      return {
        ...state,
        isGetUsersRequesting: false,
        getUsersSucceeded: true,
        getUsersFailed: false,
        getUsersError: null,
        users: action.payload,
      };
    case ActionTypes.GET_USERS_REQUEST_FAILED:
      return {
        ...state,
        isGetUsersRequesting: false,
        getUsersSucceeded: false,
        getUsersFailed: true,
        getUsersError: action.error,
      };
    default:
      return state;
  }
};

export default UserReducer;
