import { ElementResult, Line, Point } from './Defs';

export interface PathO {
  circle: {
    center: Point;
  };
}

export const calculateO = (
  baseOffset: number,
  strokeWidth: number,
  height: number,
  radius: number
): ElementResult<PathO> => {
  const cx = baseOffset + strokeWidth / 2 + radius;
  return [
    {
      circle: {
        center: [cx, height / 2 + height / 4],
      },
    },
    cx + radius + strokeWidth / 2,
  ];
};
