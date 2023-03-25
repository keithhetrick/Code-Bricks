import { ActionType } from "../action-types";
import {
  UpdateBrickAction,
  DeleteBrickAction,
  MoveBrickAction,
  InsertBrickBeforeAction,
  Direction,
} from "../actions";
import { BrickTypes } from "../brick";

export const updateBrick = (id: string, content: string): UpdateBrickAction => {
  return {
    type: ActionType.UPDATE_BRICK,
    payload: {
      id,
      content,
    },
  };
};

export const deleteBrick = (id: string): DeleteBrickAction => {
  return {
    type: ActionType.DELETE_BRICK,
    payload: id,
  };
};

export const moveBrick = (
  id: string,
  direction: Direction
): MoveBrickAction => {
  return {
    type: ActionType.MOVE_BRICK,
    payload: {
      id,
      direction,
    },
  };
};

export const insertBrickBefore = (
  id: string,
  brickType: BrickTypes
): InsertBrickBeforeAction => {
  return {
    type: ActionType.INSERT_BRICK_BEFORE,
    payload: {
      id,
      type: brickType,
    },
  };
};
