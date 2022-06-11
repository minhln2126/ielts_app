import { userService } from "../services/userServices";
import { constants } from "../constants";
import { appActions } from "./appActions";
function login(email, password) {
  return (dispatch) => {
    userService.login(email, password).then((res) => {
      if (res.user) {
        dispatch(success(res.user));
        dispatch(
          appActions.changePopup(constants.POPUP_LOGIN, "", {
            status: constants.SUCCESS,
          })
        );
      } else {
        dispatch(failure(res.message));
        dispatch(
          appActions.changePopup(constants.POPUP_LOGIN, res.message, {
            status: constants.FAILURE,
          })
        );
      }
    });
  };
  function success(user) {
    return { type: constants.LOGIN_SUCCESS, user };
  }
  function failure(message) {
    return { type: constants.LOGIN_FAILURE, message };
  }
}
function register(name, email, password) {
  return (dispatch) => {
    userService.register(name, email, password).then((res) => {
      if (res.user) dispatch(success(res.user));
      else dispatch(failure(res.message));
    });
  };

  function success(user) {
    return { type: constants.REGISTER_SUCCESS, user };
  }
  function failure(message) {
    return { type: constants.REGISTER_FAILURE, message };
  }
}
function logout() {
  userService.logout();
  return (dispatch) => {
    dispatch({ type: constants.LOGOUT });
  };
}
function update(id, info) {
  return (dispatch) => {
    userService.update(id, info).then((res) => {
      if (res.status === "success")
        dispatch(
          appActions.changePopup(
            constants.MESSAGE_POPUP,
            "Cập nhật thông tin người dùng thành công!",
            {
              status: constants.SUCCESS,
              willReload: true,
            }
          )
        );
      else
        dispatch(
          appActions.changePopup(constants.MESSAGE_POPUP, res.message, {
            status: constants.FAILURE,
            willReload: false,
          })
        );
    });
  };
}
function addOne(user) {
  return (dispatch) => {
    userService.addOne(user).then((res) => {
      if (res.status === "success")
        dispatch(
          appActions.changePopup(
            constants.MESSAGE_POPUP,
            "Thêm người dùng thành công!",
            {
              status: constants.SUCCESS,
              willReload: true,
            }
          )
        );
      else
        dispatch(
          appActions.changePopup(constants.MESSAGE_POPUP, res.message, {
            status: constants.FAILURE,
            willReload: false,
          })
        );
    });
  };
}
export const userActions = {
  login,
  logout,
  register,
  update,
  addOne,
};
