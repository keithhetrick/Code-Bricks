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
      const brick: Brick = {
        content: "",
        type: action.payload.type,
        id: randomIdGenerator(),
      };

      state.data[brick.id] = brick;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.push(brick.id);
      } else {
        state.order.splice(foundIndex, 0, brick.id);
      }

      return state;
    default:
      return state;
  }
}, initialState);

const randomIdGenerator = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
