import { Svg } from '@svgdotjs/svg.js';

export type GeneratedVariant = {
  svg: Svg;
  name: string;
};

export type GenerateVariant = (
  strokeWidth: number,
  offset: number,
  height: number,
  gradient?: boolean
) => GeneratedVariant[];
