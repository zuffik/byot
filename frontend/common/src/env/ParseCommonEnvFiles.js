const { config } = require('dotenv');
const path = require('path');
const fs = require('fs');

module.exports = () => {
  const frontend = path.join(__dirname, '..', '..', '..');
  const frontendCommon = path.join(frontend, 'common');
  const frontendWeb = path.join(frontend, 'web');
  const frontendWebCommon = path.join(frontendWeb, 'common');

  const fileVariants = (root) => ['', '.local', `.${process.env.NODE_ENV}`, `.${process.env.NODE_ENV}.local`].map(f => path.join(root, `.env${f}`));

  const files = [
    ...fileVariants(frontendCommon),
    ...fileVariants(frontendWeb),
    ...fileVariants(frontendWebCommon),
  ].filter(file => fs.existsSync(file));

  return files.reduce((prev, file) => ({...prev, ...config(file).parsed || {}}), {});
};

