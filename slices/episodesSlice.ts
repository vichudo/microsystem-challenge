import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Episode } from "../types/main";

const initialState = {
  items: [],
};

export const favsSliceEpisodes = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    //actions
    addEpisodeToFavorites: (state: any, action: PayloadAction<Episode>) => {
      state.items = [...state.items, action.payload];
    },
    removeEpisodeFromFavorites: (
      state: any,
      action: PayloadAction<Episode>
    ) => {
      const index = state.items.findIndex(
        (favItem: Episode) => favItem.id === action.payload.id
      );
      let newFavs = [...state.items];

      if (index >= 0) {
        //remove it
        newFavs.splice(index, 1);
      } else {
        console.warn("Can't remove because it's not in the list of favorites");
      }
      state.items = newFavs;
    },
  },
});

//Exporting actions (will allow us to dispatch actions)
export const { addEpisodeToFavorites, removeEpisodeFromFavorites } =
  favsSliceEpisodes.actions;

//Selectors - How we pull information from the global store slice
export const selectEpisodes = (state: any) => state.episodes.items;

export default favsSliceEpisodes.reducer;
