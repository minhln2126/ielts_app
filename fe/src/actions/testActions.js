import { testService } from "../services/testServices";
import { constants as c } from "../constants";
import { showStatus } from "../helper";
import { appActions } from "./appActions";

function getTestById(id) {
  return (dispatch) => {
    testService.getTestById(id).then((res) => {
      if (res.doc) dispatch(success(res.doc));
      else dispatch(failure());
    });
  };
  function success(test) {
    return { type: c.GET_TEST_SUCCESS, test };
  }
  function failure(msg) {
    return { type: c.GET_TEST_FAILURE };
  }
}

function getTest(query) {
  return (dispatch) => {
    testService.getTest(query).then((res) => {
      if (res.doc) dispatch(success(res.doc, res.totalPage));
      else dispatch(failure(res.message));
    });
  };
  function success(tests, totalPage) {
    return { type: c.GET_TESTS_SUCCESS, tests, totalPage };
  }
  function failure(message) {
    return { type: c.GET_TESTS_FAILURE, message };
  }
}

function addTest(test) {
  return (dispatch) => {
    testService.addTest(test).then((res) => {
      if (res.status === "success") {
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, "Thêm test thành công!", {
            status: c.SUCCESS,
            willReload: true,
          })
        );
        dispatch(success());
      } else {
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.message, {
            status: c.FAILURE,
            willReload: false,
          })
        );
        dispatch(failure());
      }
    });
  };
  function success() {
    return { type: c.ADD_TEST_SUCCESS };
  }
  function failure(message) {
    return { type: c.ADD_TEST_FAILURE, message };
  }
}

function deleteTest(id) {
  return (dispatch) => {
    testService.deleteTest(id).then((res) => {
      if (res.status === "success") {
        dispatch(success());
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, "Xóa test thành công!", {
            status: c.SUCCESS,
            willReload: true,
          })
        );
      } else {
        dispatch(failure(res.message));
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.message, {
            status: c.FAILURE,
            willReload: false,
          })
        );
      }
    });
  };
  function success() {
    return { type: c.DELETE_TEST_SUCCESS };
  }
  function failure(message) {
    return { type: c.DELETE_TEST_FAILURE, message };
  }
}

function updateTest(id, test) {
  return (dispatch) => {
    testService.updateTest(id, test).then((res) => {
      if (res.status === "success") {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Cập nhật thông tin test thành công!",
            {
              status: c.SUCCESS,
              willReload: true,
            }
          )
        );
        dispatch(success());
      } else {
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.message, {
            status: c.FAILURE,
            willReload: false,
          })
        );
        dispatch(failure());
      }
    });
  };
  function success() {
    return { type: c.UPDATE_TEST_SUCCESS };
  }
  function failure(message) {
    return { type: c.UPDATE_TEST_FAILURE };
  }
}

function answerQuestion(s, q, a) {
  return {
    type: c.ANSWER_QUESTION,
    s,
    q,
    a,
  };
}

export const testActions = {
  getTest,
  addTest,
  deleteTest,
  getTestById,
  updateTest,
  answerQuestion,
};
