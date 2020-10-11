import { configureStore } from "@reduxjs/toolkit";
import { itemView } from "./slices/itemView";

export const store = configureStore({
  reducer: {
    [itemView.name]: itemView.reducer,
  },
});
