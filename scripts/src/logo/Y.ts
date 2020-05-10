import { ElementResult, Line, Point } from './Defs';

export interface PathY {
  line: Line;
  arc: {
    radius: number;
    start: Point;
    end: Point;
  };
}

export const calculateY = (
  baseOffset: number,
  strokeWidth: number,
  height: number,
  radius: number,
  totalHeight: number
): ElementResult<PathY> => {
  const goldenRatio = 99194853094755497 / 61305790721611591;
  const r = radius * goldenRatio;
  const arcStart: Point = [
    baseOffset + strokeWidth / 2,
    height / 2 + strokeWidth / 2,
  ];
  const arcEnd: Point = [
    baseOffset + height / 3 - strokeWidth / 2,
    height - strokeWidth / 2,
  ];
  const arcWidth = arcEnd[0] + strokeWidth;
  return [
    {
      line: {
        start: [arcWidth, height / 2 + strokeWidth / 2],
        end: [arcWidth, totalHeight - strokeWidth / 2],
      },
      arc: {
        radius: r,
        start: arcStart,
        end: arcEnd,
      },
    },
    arcWidth + strokeWidth / 2,
  ];
};
