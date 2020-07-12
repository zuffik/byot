import { logoGenerate } from '../LogoGenerate';
import { GeneratedVariant, GenerateVariant } from './GenerateVariant';

export const generateNativeLogo: GenerateVariant = (
  strokeWidth: number,
  offset: number,
  height: number,
  gradient?: boolean
): GeneratedVariant[] => [
  {
    svg: logoGenerate(strokeWidth, offset, height, { full: true, gradient }),
    name: 'native-splash',
  },
  {
    svg: logoGenerate(strokeWidth, offset, height, {
      full: false,
      center: true,
      gradient,
    }),
    name: 'native-icon',
  },
];
