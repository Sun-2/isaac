import {initialState as itemViewInitialState} from "./slices/itemView/itemView";

export interface RootState {
  itemView: typeof itemViewInitialState
}