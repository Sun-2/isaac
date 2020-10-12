import { configureStore } from "@reduxjs/toolkit";
import { itemView } from "./slices/itemView/itemView";

export const store = configureStore({
  reducer: {
    [itemView.name]: itemView.reducer,
  },
});
