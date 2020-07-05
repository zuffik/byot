import { LineCommand, Svg, G } from '@svgdotjs/svg.js';
import { Variant } from './Variant';
import { CalculatedPaths } from '../CalculatePaths';

export class Full extends Variant {
  constructor(width: number, height: number) {
    super(width, height);
  }

  generate(
    svg: Svg,
    root: G,
    paths: CalculatedPaths,
    baseAttrs: object = {},
    {
      withBg = false,
    }: {
      withBg?: boolean;
    } = {}
  ): void {
    root.add(svg.line([paths.b.line.start, paths.b.line.end]).attr(baseAttrs));
    const { arc } = paths.b;
    root.add(
      svg
        .path([
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
        .attr(baseAttrs)
    );
    root.add(
      svg
        .line(
          paths.y.line.start[0],
          paths.y.line.start[1],
          paths.y.line.end[0],
          paths.y.line.end[1]
        )
        .attr(baseAttrs)
    );
    root.add(
      svg
        .path([
          ['M', paths.y.arc.start[0], paths.y.arc.start[1]] as LineCommand,
          [
            'A',
            paths.y.arc.radius,
            paths.y.arc.radius,
            0,
            0,
            0,
            paths.y.arc.end[0],
            paths.y.arc.end[1],
          ],
        ])
        .attr(baseAttrs)
    );
    root.add(
      svg
        .line(
          paths.t.line.start[0],
          paths.t.line.start[1],
          paths.t.line.end[0],
          paths.t.line.end[1]
        )
        .attr(baseAttrs)
    );
    root.add(
      svg
        .path([
          ['M', paths.t.arc.start[0], paths.t.arc.start[1]] as LineCommand,
          [
            'A',
            paths.t.arc.radius,
            paths.t.arc.radius,
            0,
            0,
            1,
            paths.t.arc.end[0],
            paths.t.arc.end[1],
          ],
        ])
        .attr(baseAttrs)
    );

    root.add(
      svg.circle().attr({
        ...baseAttrs,
        r: paths.general.circleRadius,
        cx: paths.o.circle.center[0],
        cy: paths.o.circle.center[1],
      })
    );
  }
}
