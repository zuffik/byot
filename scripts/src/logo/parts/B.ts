import { Line, ElementResult, Point } from '../Defs';

export interface PathB {
  line: Line;
  arc: {
    start: Point;
    middle: Point;
    end: Point;
  };
}

export const calculateB = (
  strokeWidth: number,
  height: number,
  offset: number,
  radius: number,
  angle: number
): ElementResult<PathB> => {
  const line: [Point, Point] = [
    [strokeWidth / 2, strokeWidth / 2],
    [strokeWidth / 2, height - strokeWidth / 2],
  ];
  const lineEnds = strokeWidth;

  const r = radius;
  const [cx, cy]: Point = [
    lineEnds + r * Math.sin(angle) + strokeWidth / 2,
    height / 2 + height / 4,
  ];
  const As: Point = [
    cx + r * Math.cos(angle + Math.PI / 2),
    cy - r * Math.sin(angle + Math.PI / 2),
  ];
  const Ae: Point = [
    cx + r * Math.cos(angle + Math.PI / 2),
    cy - r * Math.sin(Math.PI * (3 / 2) - angle),
  ];

  return [
    {
      line: {
        start: line[0],
        end: line[1],
      },
      arc: {
        start: As,
        middle: [cx + r, cy],
        end: Ae,
      },
    },
    cx + r + strokeWidth / 2,
  ];
};
