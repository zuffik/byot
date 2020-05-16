#!/bin/bash

PUBLIC_PATH="../$1/public/"

cp -r out/favicon/* "$PUBLIC_PATH"
cp out/raw/byoT-full.svg frontend/common/src/static/img/logo.svg
npx real-favicon inject out/favicon-data.json out/favicon "$PUBLIC_PATH/index.html"
mv out/favicon/index.html "$PUBLIC_PATH"
