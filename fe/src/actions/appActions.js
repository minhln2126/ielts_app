import { appServices } from "../services/appServices";
import { constants as c } from "../constants";
function getHomeInfo() {
  return (dispatch) => {
    appServices.getHomeInfo().then((res) => {
      if (res.status === "success") dispatch(success(res.data));
      else dispatch(failure(res.message));
    });
  };
  function success(data) {
    return { type: c.GET_HOME_SUCCESS, data };
  }
  function failure(message) {
    return { type: c.GET_HOME_FAILURE, message };
  }
}
function getAdminInfo() {
  return (dispatch) => {
    appServices.getAdminInfo().then((res) => {
      if (res.status === "success") dispatch(success(res));
      else dispatch(failure(res.message));
    });
  };

  function success(info) {
    return { type: c.GET_ADMIN_SUCCESS, info };
  }
  function failure(message) {
    return { type: c.GET_ADMIN_FAILURE, message };
  }
}
function changePopup(popupType, msg = "", additionalInfo = {}) {
  return { type: c.CHANGE_POPUP, popupType, msg, additionalInfo };
}
function hidePopup() {
  return { type: c.HIDE_POPUP };
}
export const appActions = {
  changePopup,
  hidePopup,
  getHomeInfo,
  getAdminInfo,
};
