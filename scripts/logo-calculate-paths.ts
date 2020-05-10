import * as util from 'util';
// @ts-ignore
import dotize from 'dotize';
import { calculatePaths } from './src/logo/CalculatePaths';

export { calculatePaths };

if (require.main === module) {
  const paths = calculatePaths();
  console.log(dotize.convert(paths));
  console.log(util.inspect(paths, false, null, true));
}
