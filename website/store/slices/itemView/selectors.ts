import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../type";

export const getSearchPhrase = (root: RootState) => root.itemView.searchPhrase;
export const getItemData = (root: RootState) => root.itemView.itemData;

export const getItemsWithVisility = createSelector(
  [getSearchPhrase, getItemData],
  (searchPhrase, itemData) => {

    //todo filtering logic
    return Object.entries(itemData).map(([key, itemData]) => ({
      // @ts-ignore
      visible: itemData.displayName.startsWith(searchPhrase),
      name: key,
    }));
  }
);

export const getSingleItemData = (item: string) => (root: RootState) =>
  root.itemView.itemData[item];