const { config } = require('dotenv');
const path = require('path');
const fs = require('fs');

module.exports = () => {
  const frontend = path.join(__dirname, '..', '..', '..');
  const frontendCommon = path.join(frontend, 'common');
  const frontendWeb = path.join(frontend, 'web');
  const frontendWebCommon = path.join(frontendWeb, 'common');

  const fileVariants = (root, ...another) => ['', '.local', `.${process.env.NODE_ENV}`, `.${process.env.NODE_ENV}.local`, ...another].map(suffix => path.join(root, `.env${suffix}`));

  const files = [
    ...fileVariants(frontendCommon, '.common'),
    ...fileVariants(frontendWeb),
    ...fileVariants(frontendWebCommon),
  ].filter(file => fs.existsSync(file));

  return files.reduce((prev, file) => ({...prev, ...config({path: file}).parsed || {}}), {});
};

