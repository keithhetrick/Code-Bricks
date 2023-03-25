import produce from "immer";
import { ActionType } from "../action-types/";
import { Action } from "../actions/";
import { Brick } from "../brick";

interface BricksState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Brick;
  };
}

const initialState: BricksState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: BricksState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_BRICK:
      const { id, content } = action.payload;
      state.data[id].content = content;

      return;
    case ActionType.DELETE_BRICK:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);

      return;
    case ActionType.MOVE_BRICK:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return;
    case ActionType.INSERT_BRICK_BEFORE:
      return state;
    default:
      return state;
  }
});

export default reducer;
