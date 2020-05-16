// @ts-ignore
import { LineCommand, registerWindow, SVG, Svg } from '@svgdotjs/svg.js';
// @ts-ignore
import { createSVGWindow } from 'svgdom';
import { calculatePaths } from './CalculatePaths';
import theme from '../../../common/theme/theme';

export const logoGenerate = (
  strokeWidth = 64,
  offset: number = 16,
  height: number = 320,
  full: boolean = true,
  bg: boolean = false
): string => {
  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);
  const themeGradient = theme.colors.gradient;
  const paths = calculatePaths(
    strokeWidth,
    offset,
    full ? height * 1.5 : height,
    height
  );
  const svg: Svg = (SVG(document.documentElement) as Svg).size(
    full ? paths.general.width : paths.general.height,
    paths.general.height
  );

  // gradient
  const defs = svg.defs();
  const gradient = svg.gradient('linear').attr({
    id: 'gradient-root',
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '100%',
    gradientUnits: 'userSpaceOnUse',
    gradientTransform: `rotate(${themeGradient.angle})`,
  });
  gradient.add(
    svg.element('stop').attr({
      offset: `${themeGradient.start.position}%`,
      'stop-color': themeGradient.start.color,
    })
  );
  gradient.add(
    svg.element('stop').attr({
      offset: `${themeGradient.end.position}%`,
      'stop-color': themeGradient.end.color,
    })
  );
  defs.add(gradient);
  svg.add(defs);
  const baseAttrs = {
    'stroke-linecap': 'round',
    'stroke-width': strokeWidth,
    fill: 'none',
  };

  const root = svg.group().attr({
    stroke: `url(#${gradient.attr('id')})`,
    id: 'root',
  });
  if (!full && bg) {
    // noinspection JSSuspiciousNameCombination
    root.add(
      svg
        .rect(paths.general.height, paths.general.height)
        .radius(paths.general.borderRadius)
        .fill(theme.colors.light)
        .stroke('none')
    );
  }
  const bGroup = svg.group().attr({
    id: 'b',
  });
  bGroup.add(svg.line([paths.b.line.start, paths.b.line.end]).attr(baseAttrs));
  const { arc } = paths.b;
  bGroup.add(
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
  root.add(bGroup);

  if (full) {
    const yGroup = svg.group().attr({ id: 'y' });
    yGroup.add(
      svg
        .line(
          paths.y.line.start[0],
          paths.y.line.start[1],
          paths.y.line.end[0],
          paths.y.line.end[1]
        )
        .attr(baseAttrs)
    );
    yGroup.add(
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
    root.add(yGroup);

    const oGroup = svg.group().attr({ id: 'o' });
    oGroup.add(
      svg.circle().attr({
        ...baseAttrs,
        r: paths.general.circleRadius,
        cx: paths.o.circle.center[0],
        cy: paths.o.circle.center[1],
      })
    );
    root.add(oGroup);

    const tGroup = svg.group().attr({ id: 't' });
    tGroup.add(
      svg
        .line(
          paths.t.line.start[0],
          paths.t.line.start[1],
          paths.t.line.end[0],
          paths.t.line.end[1]
        )
        .attr(baseAttrs)
    );
    tGroup.add(
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
    root.add(tGroup);
  }

  svg.add(root);
  return svg.svg();
};
