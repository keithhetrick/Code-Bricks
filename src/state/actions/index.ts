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

export interface InsertBrickBeforeAction {
  type: ActionType.INSERT_BRICK_BEFORE;
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

export type Action =
  | MoveBrickAction
  | DeleteBrickAction
  | InsertBrickBeforeAction
  | UpdateBrickAction;
