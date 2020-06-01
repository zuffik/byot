#!/bin/bash

set -e

rm -rf ./out/favicon
npx real-favicon generate ./src/favicon/generator-info.json ./out/favicon-data.json ./out/favicon
cp out/raw/byoT-full.svg ../frontend/common/src/static/img/logo.svg

