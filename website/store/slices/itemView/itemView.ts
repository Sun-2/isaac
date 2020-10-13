import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems, fetchTags } from "./thunks";

export type SortField = "id" | "displayName" | "quote";
export type SortDirection = "asc" | "dsc";
const initialState = {
  searchPhrase: "",
  sortField: "id" as SortField,
  sortDirection: "asc" as SortDirection,
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
    setSortMode: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
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
