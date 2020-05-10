export type Point = [number, number];

export interface BreakPoint {
  point: Point;
}

export interface Line {
  start: Point;
  end: Point;
}
export type ElementResult<T> = [T, number];
