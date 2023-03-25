import { combineReducers } from "redux";
import bricksReducer from "./bricksReducer";

const reducers = combineReducers({
  bricks: bricksReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
