import { GeneratedVariant } from '../logo/generators/GenerateVariant';
import * as fs from 'fs';
import * as path from 'path';

export const createSvgFile = (
  root: string,
  variant: GeneratedVariant
): string => {
  const file = path.join(root, `${variant.name}.svg`);
  fs.writeFileSync(file, variant.svg.svg());
  return file;
};
