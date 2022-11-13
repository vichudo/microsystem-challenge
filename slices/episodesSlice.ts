import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const favsSliceEpisodes = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    //actions
    addToFavorites: (state: any, action: any) => {
      state.items = [...state.items, action.payload];
    },
    removeFromFavorites: (state: any, action: any) => {
      const index = state.items.findIndex(
        (favItem: any) => favItem.id === action.payload.id
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
export const { addToFavorites, removeFromFavorites } =
  favsSliceEpisodes.actions;

//Selectors - How we pull information from the global store slice
export const selectItems = (state: any) => state.episodes.items;

export default favsSliceEpisodes.reducer;
