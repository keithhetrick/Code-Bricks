import { combineReducers } from "redux";
import bricksReducer from "./bricksReducer";
import bundlesReducer from "./bundlesReducer";

const reducers = combineReducers({
  bricks: bricksReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
