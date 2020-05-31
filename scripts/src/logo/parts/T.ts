import { ElementResult, Line, Point } from '../Defs';

export interface PathT {
  line: Line;
  arc: {
    radius: number;
    start: Point;
    end: Point;
  };
}

export const calculateT = (
  baseOffset: number,
  strokeWidth: number,
  r: number,
  height: number
): ElementResult<PathT> => {
  const radius = (r * Math.PI) / 2;
  const lineTop: Point = [
    baseOffset + strokeWidth / 2,
    height / 4 + strokeWidth / 2,
  ];
  const line: Line = {
    start: lineTop,
    end: [lineTop[0], height - strokeWidth / 2],
  };
  const arcStart: Point = [lineTop[0] - radius, lineTop[1] - strokeWidth / 2];
  const arcEnd: Point = [lineTop[0] + radius, lineTop[1] - strokeWidth / 2];
  return [
    {
      line,
      arc: {
        radius: radius * 2,
        start: arcStart,
        end: arcEnd,
      },
    },
    arcEnd[0] + strokeWidth / 2,
  ];
};
