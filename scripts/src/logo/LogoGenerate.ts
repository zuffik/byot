// @ts-ignore
import { registerWindow, SVG, Svg } from '@svgdotjs/svg.js';
// @ts-ignore
import { createSVGWindow } from 'svgdom';
import { calculatePaths } from './CalculatePaths';
import theme from '../../../common/theme/theme';
import { Variant } from './variants/Variant';
import { Full } from './variants/Full';
import { Square } from './variants/Square';

export const logoGenerate = (
  strokeWidth = 64,
  offset: number = 16,
  height: number = 320,
  {
    full = true,
    bg = false,
    roundedBg = true,
    center = false,
    gradient: withGradient = true,
  }: {
    full?: boolean;
    bg?: boolean;
    roundedBg?: boolean;
    center?: boolean;
    gradient?: boolean;
  }
): Svg => {
  type Variants = 'full' | 'square';
  const variants: {
    [V in Variants]: { new (width: number, height: number): Variant };
  } = {
    full: Full,
    square: Square,
  };
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
  const width = full ? paths.general.width : paths.general.height;
  const h = paths.general.height;
  const svg: Svg = (SVG(document.documentElement) as Svg)
    .viewbox({
      x: 0,
      y: 0,
      width,
      height: h,
    })
    .size(width, h);

  // gradient
  const defs = svg.defs();
  let stroke: string;
  if (withGradient) {
    const gradient = svg.gradient('linear').attr({
      id: 'gradient-root',
      x1: '0',
      y1: '0',
      x2: '100%',
      y2: '0',
      gradientUnits: 'userSpaceOnUse',
      gradientTransform: `rotate(${180 - themeGradient.angle})`,
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
    stroke = `url(#${gradient.attr('id')})`;
  } else {
    stroke = theme.colors.primary;
  }

  const baseAttrs = {
    'stroke-linecap': 'round',
    'stroke-width': strokeWidth,
    fill: 'none',
  };

  const root = svg.group().attr({
    stroke,
    id: 'root',
  });
  if (!full && bg) {
    // noinspection JSSuspiciousNameCombination
    let background = svg
      .rect(paths.general.height, paths.general.height)
      .fill(bg ? theme.colors.light : 'none')
      .stroke('none');
    if (roundedBg) {
      background = background.radius(paths.general.borderRadius);
    }
    root.add(background);
  }

  const Variant = full ? variants.full : variants.square;
  const variant = new Variant(paths.general.width, paths.general.height);
  variant.generate(svg, root, paths, baseAttrs, {
    withBg: bg,
    center,
  });

  svg.add(root);
  return svg;
};
