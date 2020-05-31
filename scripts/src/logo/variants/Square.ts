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
    withBg: boolean = false
  ): void {
    const { arc } = paths.b;
    const scale = withBg ? 0.75 : 1;
    const xAdd =
      this.width / 2 - ((arc.middle[0] - paths.b.line.start[0]) / 2) * scale;
    const yAdd = (this.height - this.height * scale) / 2;
    root.add(
      svg
        .path([
          ['M', paths.b.line.start[0], paths.b.line.start[1]] as LineCommand,
          ['L', paths.b.line.end[0], paths.b.line.end[1]] as LineCommand,
          ['M', arc.start[0], arc.start[1]] as LineCommand,
          [
            'A',
            paths.general.circleRadius,
            paths.general.circleRadius,
            0,
            0,
            1,
            arc.middle[0],
            arc.middle[1],
          ],
          [
            'A',
            paths.general.circleRadius,
            paths.general.circleRadius,
            0,
            0,
            1,
            arc.end[0],
            arc.end[1],
          ],
        ])
        .attr({
          ...baseAttrs,
          style: `transform: scale(${scale}) translate(${xAdd}, ${yAdd}); transform-origin: center;`,
        })
    );
  }
}
