import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems, fetchTags } from "./thunks";

export type SortMode = "id" | "category" | "color";

const initialState = {
  searchPhrase: "",
  sortMode: "id" as SortMode,
  itemData: {} as any,
  tags: {} as any,
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
  extraReducers: {
    [fetchItems.fulfilled.type]: (state, action) => {
      state.itemData = action.payload;
    },
    [fetchTags.fulfilled.type]: (state, action) => {
      state.tags = action.payload;
    },
  },
});
