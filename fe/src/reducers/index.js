import { combineReducers } from "redux";

import { authentication } from "./authReducers";
import { application } from "./appReducers";
import { test } from "./testReducers";
import { post } from "./postReducers";

const rootReducer = combineReducers({
  authentication,
  application,
  test,
  post,
});

export default rootReducer;
