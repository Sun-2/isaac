import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../type";

export type SortMode = "id" | "category" | "color";

const initialState = {
  searchPhrase: "",
  sortMode: "id" as SortMode,
};

export const itemView = createSlice({
  name: "itemView",
  initialState,
  reducers: {
    setSearchPhrase: (state, action: PayloadAction<string>) => {
      state.searchPhrase = action.payload;
    },
    setSortMode: (state, action: PayloadAction<SortMode>) => {
      state.sortMode = action.payload;
    },
  },
});

export const getSearchPhrase = (root: RootState) => root.itemView.searchPhrase;

export const getVisibleItems = createSelector(
  [getSearchPhrase],
  (searchPhrase) => {
    return ["item-name"];
  }
);