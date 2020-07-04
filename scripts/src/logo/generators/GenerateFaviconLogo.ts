import { logoGenerate } from '../LogoGenerate';
import { GeneratedVariant, GenerateVariant } from './GenerateVariant';

export const generateFaviconLogo: GenerateVariant = (
  strokeWidth: number,
  offset: number,
  height: number
): GeneratedVariant[] => [
  {
    svg: logoGenerate(strokeWidth, offset, height, { full: false, bg: false }),
    name: 'favicon-no-bg',
  },
  {
    svg: logoGenerate(strokeWidth, offset, height, { full: false, bg: true }),
    name: 'favicon-with-bg',
  },
];
