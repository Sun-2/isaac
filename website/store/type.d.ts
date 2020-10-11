import {initialState as itemViewInitialState} from "./slices/itemView";

export interface RootState {
  itemView: typeof itemViewInitialState
}