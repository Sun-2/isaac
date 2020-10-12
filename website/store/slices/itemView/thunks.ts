import {createAsyncThunk} from "@reduxjs/toolkit";
import firestore from "../../../firestore";

export const fetchItems = createAsyncThunk(
  "fetch-items",
  async (_, thunkApi) => {
    const coll = await firestore.collection("items-batch").get();
    const items = {} as any;
    coll.forEach((qds) => Object.assign(items, qds.data()));

    return items;
  }
);