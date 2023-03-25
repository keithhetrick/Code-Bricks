import { ActionType } from "../action-types";
import { BrickTypes } from "../brick";

export type Direction = "up" | "down";

export interface MoveBrickAction {
  type: ActionType.MOVE_BRICK;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteBrickAction {
  type: ActionType.DELETE_BRICK;
  payload: string;
}

export interface InsertBrickAfterAction {
  type: ActionType.INSERT_BRICK_AFTER;
  payload: {
    id: string | null;
    type: BrickTypes;
  };
}

export interface UpdateBrickAction {
  type: ActionType.UPDATE_BRICK;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    brickId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    brickId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  | MoveBrickAction
  | DeleteBrickAction
  | InsertBrickAfterAction
  | UpdateBrickAction
  | BundleStartAction
  | BundleCompleteAction;
