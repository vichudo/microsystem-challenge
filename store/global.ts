import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { configureStore } from "@reduxjs/toolkit";
import favReducer from "../slices/favSlice";
import episodesReducer from "../slices/episodesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedFavsReducer = persistReducer(persistConfig, favReducer);
const persistedEpisodes = persistReducer(persistConfig, episodesReducer);

export const store = configureStore({
  reducer: {
    favorites: persistedFavsReducer,
    episodes: persistedEpisodes,
  },
});

export const persistor = persistStore(store);
