import fs from 'fs';
import { rimrafAsync } from './RimrafAsync';

export const recreateDirectory = async (directory: string) => {
  if (fs.existsSync(directory)) {
    if (!fs.lstatSync(directory).isDirectory()) {
      throw new Error(`'${directory}' is not a directory.`);
    }
    await rimrafAsync(directory);
  }
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};
