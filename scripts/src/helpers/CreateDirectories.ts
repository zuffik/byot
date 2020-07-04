import * as fs from 'fs';

export const createDirectories = (
  directory: string | Record<string, string | Record<string, string>>
) => {
  if (typeof directory === 'string') {
    fs.mkdirSync(directory, { recursive: true });
  } else {
    Object.values(directory).forEach((dir) => createDirectories(dir));
  }
};
