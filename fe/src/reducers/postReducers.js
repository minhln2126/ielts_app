import { constants as c } from "../constants";
const initialState = {
  list: {
    data: [],
    status: c.LOADING,
  },
  hot: {
    data: [],
    status: c.LOADING,
  },
  info: {
    data: {},
    status: c.LOADING,
  },
  action: {
    create: {
      status: c.NONE,
      msg: "",
    },
  },
};
export function post(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        list: {
          data: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        list: {
          data: [],
          status: c.FAILURE,
        },
      };
    case c.GET_TRENDING_POSTS_SUCCESS:
      return {
        ...state,
        hot: {
          data: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_TRENDING_POSTS_FAILURE:
      return {
        ...state,
        hot: {
          data: [],
          status: c.FAILURE,
        },
      };
    case c.GET_POST_SUCCESS:
      return {
        ...state,
        info: {
          status: c.SUCCESS,
          data: action.data,
        },
      };
    case c.GET_POST_FAILURE:
      return {
        ...state,
        info: {
          status: c.FAILURE,
          data: {},
        },
      };
    case c.CREATE_NEW_POST_SUCCESS:
    case c.COMMENT_POST_SUCCESS: {
      window.location.reload();
      return {
        ...state,
        action: {
          ...state.action,
          create: {
            status: c.SUCCESS,
            msg: "Đăng bài viết thành công !",
          },
        },
      };
    }
    case c.LIKE_POST_SUCCESS:
      return {
        ...state,
        info: {
          status: c.SUCCESS,
          data: action.data,
        },
      };
    case c.LIKE_COMMENT_SUCCESS: {
      let newState = { ...state };
      newState.info.data.comments = newState.info.data.comments.map((v) => {
        if (v._id === action.data._id) return action.data;
        return v;
      });
      return newState;
    }
    case c.SEND_CREATE_POST_REQUEST:
      return {
        ...state,
        action: {
          ...state.action,
          create: {
            status: c.LOADING,
            msg: "",
          },
        },
      };
    case c.CREATE_NEW_POST_FAILURE:
      return {
        ...state,
        action: {
          ...state.action,
          create: {
            status: c.FAILURE,
            msg: action.msg,
          },
        },
      };
    default:
      return state;
  }
}
