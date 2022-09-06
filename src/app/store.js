import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../features/ListSlice";

export const store = configureStore({
  reducer: {
    lists: listReducer,
  },
});
