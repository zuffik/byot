import { calculateB, PathB } from './parts/B';
import { calculateY, PathY } from './parts/Y';
import { calculateO, PathO } from './parts/O';
import { calculateT, PathT } from './parts/T';

export interface CalculatedPaths {
  general: {
    height: number;
    width: number;
    strokeWidth: number;
    borderRadius: number;
    circleRadius: number;
  };
  b: PathB;
  y: PathY;
  o: PathO;
  t: PathT;
}
export const calculatePaths = (
  strokeWidth = 64,
  offset: number = 16,
  height: number = 320,
  baseLine: number = height
): CalculatedPaths => {
  const r = baseLine / 4 - strokeWidth / 2;
  const angle = Math.PI / 6;

  const [b, e1] = calculateB(strokeWidth, baseLine, offset, r, angle);
  const [y, e2] = calculateY(e1 + offset, strokeWidth, baseLine, r, height);
  const [o, e3] = calculateO(e2 + offset, strokeWidth, baseLine, r);
  const [t, e4] = calculateT(e3 + offset, strokeWidth, r, baseLine);
  const width = e4;
  return {
    general: {
      height,
      width,
      strokeWidth,
      borderRadius: strokeWidth / 2,
      circleRadius: r,
    },
    b,
    y,
    o,
    t,
  };
};
