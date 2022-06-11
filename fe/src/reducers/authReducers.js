import { constants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));

let initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
    case constants.UPDATE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.user));
      setTimeout(() => window.location.reload(), 1000);
      return {
        user: action.user,
      };
    case constants.REGISTER_SUCCESS:
      window.location.reload();
      return {
        loggedIn: true,
        user: action.user,
      };
    case constants.LOGIN_FAILURE:
    case constants.REGISTER_FAILURE:
      return {
        message: action.message,
      };
    case constants.CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
      };
    case constants.LOGOUT:
      return {};
    default:
      return state;
  }
}
