import { logoGenerate } from '../LogoGenerate';
import { GeneratedVariant, GenerateVariant } from './GenerateVariant';

export const generateFaviconLogo: GenerateVariant = (
  strokeWidth: number,
  offset: number,
  height: number,
  gradient?: boolean
): GeneratedVariant[] => [
  {
    svg: logoGenerate(strokeWidth, offset, height, {
      full: false,
      bg: false,
      gradient,
    }),
    name: 'favicon-no-bg',
  },
  {
    svg: logoGenerate(strokeWidth, offset, height, {
      full: false,
      bg: true,
      gradient,
    }),
    name: 'favicon-with-bg',
  },
];
