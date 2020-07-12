import { logoGenerate } from '../LogoGenerate';
import { GeneratedVariant, GenerateVariant } from './GenerateVariant';

export const generateFullLogo: GenerateVariant = (
  strokeWidth: number,
  offset: number,
  height: number,
  gradient?: boolean
): GeneratedVariant[] => [
  {
    svg: logoGenerate(strokeWidth, offset, height, { full: true, gradient }),
    name: 'full',
  },
];
