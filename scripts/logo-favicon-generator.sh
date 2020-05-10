#!/bin/bash

./logo-generator.sh
rm -rf ./out/favicon
npx real-favicon generate ./src/favicon/generator-info.json ./out/favicon-data.json ./out/favicon
