import { Variant } from './Variant';
import { CalculatedPaths } from '../CalculatePaths';
import { G, LineCommand, Svg } from '@svgdotjs/svg.js';

export class Square extends Variant {
  constructor(width: number, height: number) {
    super(height, height);
  }

  generate(
    svg: Svg,
    root: G,
    paths: CalculatedPaths,
    baseAttrs: object = {},
    {
      withBg = false,
      center = false,
    }: {
      withBg?: boolean;
      center?: boolean;
    } = {}
  ): void {
    const { arc } = paths.b;
    const xAdd = center
      ? this.width / 2 - Math.abs(arc.middle[0] - paths.b.line.start[0])
      : 0;
    root.add(
      svg
        .path([
          [
            'M',
            xAdd + paths.b.line.start[0],
            paths.b.line.start[1],
          ] as LineCommand,
          ['L', xAdd + paths.b.line.end[0], paths.b.line.end[1]] as LineCommand,
          ['M', xAdd + arc.start[0], arc.start[1]] as LineCommand,
          [
            'A',
            paths.general.circleRadius,
            paths.general.circleRadius,
            0,
            0,
            1,
            xAdd + arc.middle[0],
            arc.middle[1],
          ],
          [
            'A',
            paths.general.circleRadius,
            paths.general.circleRadius,
            0,
            0,
            1,
            xAdd + arc.end[0],
            arc.end[1],
          ],
        ])
        .attr({
          ...baseAttrs,
        })
    );
  }
}
