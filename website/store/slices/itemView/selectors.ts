import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../type";
import {getVisibleItems} from "./utils/visibilityFiltering";

export const getSearchPhrase = (root: RootState) => root.itemView.searchPhrase;
export const getItemData = (root: RootState) => root.itemView.itemData;
export const getTags = (root: RootState) => root.itemView.tags;

export const getItemsWithVisility = createSelector(
  [getSearchPhrase, getItemData, getTags],
  (searchPhrase, itemData, tags) => {
    if (!itemData || !tags.length) return [];
    //todo filtering logic
    const visible = getVisibleItems(tags, itemData, searchPhrase);

    return Object.entries(itemData).map(([key, itemData]) => ({
      // @ts-ignore
      visible: Boolean(visible === "all" || visible[key]),
      name: key,
    }));
  }
);

export const getSingleItemData = (item: string) => (root: RootState) =>
  root.itemView.itemData[item];
