import rimraf from 'rimraf';

export const rimrafAsync = async (dir: string) =>
  await new Promise((res, rej) => {
    rimraf(dir, (e) => {
      if (e) rej(e);
      else res();
    });
  });
