import { configureStore } from "@reduxjs/toolkit";
import favReducer from "../slices/favSlice";

//GLOBAL STORE SETUP
export const store = configureStore({
  reducer: {
    favorites: favReducer,
  },
});
