import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  UpdateBrickAction,
  DeleteBrickAction,
  MoveBrickAction,
  InsertBrickAfterAction,
  Direction,
  Action,
} from "../actions";
import { BrickTypes } from "../brick";
import bundle from "../../bundler";

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

export const insertBrickAfter = (
  id: string | null,
  brickType: BrickTypes
): InsertBrickAfterAction => {
  return {
    type: ActionType.INSERT_BRICK_AFTER,
    payload: {
      id,
      type: brickType,
    },
  };
};

export const createBundle = (brickId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        brickId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        brickId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};
