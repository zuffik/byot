import { G, Svg } from '@svgdotjs/svg.js';
import { CalculatedPaths } from '../CalculatePaths';

export abstract class Variant {
  protected constructor(
    public readonly width: number,
    public readonly height: number
  ) {}

  public abstract generate(
    svg: Svg,
    root: G,
    paths: CalculatedPaths,
    baseAttrs?: object,
    options?: object
  ): void;
}
