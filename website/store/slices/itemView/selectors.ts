import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../type";
import { getVisibleItems } from "./utils/visibilityFiltering";

export const getSearchPhrase = (root: RootState) => root.itemView.searchPhrase;
export const getItemData = (root: RootState) => root.itemView.itemData;
export const getTags = (root: RootState) => root.itemView.tags;
export const getSortField = (root: RootState) => root.itemView.sortField;
export const getSortDirection = (root: RootState) =>
  root.itemView.sortDirection;

export const getSearchTokens = createSelector(
  [getSearchPhrase],
  (searchPhrase) => searchPhrase.split(" ").filter((x) => Boolean(x.trim()))
);

export const getSortedItems = createSelector(
  [getItemData, getSortDirection, getSortField],
  (itemData, sortDirection, sortField) =>
    Object.entries(itemData).sort(([nameA, dataA], [nameB, dataB]) => {
      if (sortDirection === "asc")
        return dataA[sortField] > dataB[sortField] ? 1 : -1;
      else return dataA[sortField] < dataB[sortField] ? 1 : -1;
    })
);

export const getItemsWithVisibility = createSelector(
  [getSearchTokens, getTags, getSortedItems],
  (tokens, tags, sortedItems) => {
    if (!sortedItems || !tags.length) return [];
    const visible = getVisibleItems(tags, tokens);
    console.log(visible);
    // @ts-ignore
    return sortedItems.map(([key, itemData]) => ({
      // @ts-ignore
      visible: Boolean(visible === "all" || visible[key]),
      name: key,
    }));
  }
);

export const getSingleItemData = (item: string) => (root: RootState) =>
  root.itemView.itemData[item];
