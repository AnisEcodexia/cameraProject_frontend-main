import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";

export default combineReducers({
  reducer: {
    counter: counterReducer
  }
});
