import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/main";

const initialState = {
  items: [],
};

export const favsSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    //actions
    addCharacterToFavorites: (state: any, action: PayloadAction<Character>) => {
      state.items = [...state.items, action.payload];
    },
    removeCharacterFromFavorites: (
      state: any,
      action: PayloadAction<Character>
    ) => {
      const index = state.items.findIndex(
        (favItem: Character) => favItem.id === action.payload.id
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
export const { addCharacterToFavorites, removeCharacterFromFavorites } =
  favsSlice.actions;

//Selectors - We pull information from the global store slice
export const selectItems = (state: any) => state.favorites.items;

export default favsSlice.reducer;
