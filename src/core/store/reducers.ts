import { counterSlice } from "@/modules/Counter/store";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  counter: counterSlice,
});

export default reducers;
