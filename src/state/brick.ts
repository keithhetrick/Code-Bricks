export type BrickTypes = "code" | "text";
export interface Brick {
  id: string;
  type: "code" | "text";
  content: string;
}
