import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems, fetchTags } from "./thunks";
import { ItemData } from "../../../types/ItemData";

export type SortField = ("id" | "displayName" | "quote") & keyof ItemData;
export type SortDirection = "asc" | "dsc";
const initialState = {
  searchPhrase: "",
  sortField: "name" as SortField,
  sortDirection: "asc" as SortDirection,
  itemData: {} as { [internalItemName: string]: ItemData },
  tags: {} as any,
  showItemDescription: false,
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
    setShowItemDescription: (state, action: PayloadAction<boolean>) => {
      state.showItemDescription = action.payload;
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
