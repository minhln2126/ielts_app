import { constants as c } from "../constants";

const initialState = {
  popup: {
    type: c.NONE,
    msg: "Thêm test thành công!",
    additionalInfo: {
      status: c.NONE,
    },
  },
  popupType: "",
  status: c.LOADING,
  home: {
    status: c.LOADING,
    data: {},
  },
};

export function application(state = initialState, action) {
  switch (action.type) {
    case c.CHANGE_POPUP:
      return {
        ...state,
        popup: {
          type: action.popupType,
          msg: action.msg,
          additionalInfo: action.additionalInfo,
        },
      };
    case c.POPUP_PROFILE:
      return {
        ...state,
        popupType: "profile",
      };
    case c.POPUP_FORGOTPASS:
      return {
        ...state,
        popupType: "forgotpass",
      };
    case c.POPUP_LOGIN:
      return {
        ...state,
        popupType: "login",
      };
    case c.LOGIN_SUCCESS:
    case c.REGISTER_SUCCESS:
      return {
        ...state,
        popupType: "",
      };
    case c.HIDE_POPUP:
      return {
        ...state,
        popupType: "",
      };
    case c.GET_HOME_SUCCESS:
      return {
        ...state,
        home: {
          data: { ...action.data },
          status: c.SUCCESS,
        },
      };
    case c.GET_HOME_FAILURE:
    case c.GET_ADMIN_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
      };
    case c.GET_ADMIN_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        adminInfo: action.info,
      };
    default:
      return state;
  }
}
