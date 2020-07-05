import { logoGenerate } from '../LogoGenerate';
import { GeneratedVariant, GenerateVariant } from './GenerateVariant';

export const generateNativeLogo: GenerateVariant = (
  strokeWidth: number,
  offset: number,
  height: number
): GeneratedVariant[] => [
  {
    svg: logoGenerate(strokeWidth, offset, height, { full: true }),
    name: 'native-splash',
  },
  {
    svg: logoGenerate(strokeWidth, offset, height, {
      full: false,
      center: true,
    }),
    name: 'native-icon',
  },
];
