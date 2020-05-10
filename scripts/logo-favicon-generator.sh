#!/bin/bash

yarn logo:generate -V both -o ./out/raw -S 56 -O 8 -p
rm -rf ./out/favicon
npx real-favicon generate ./src/favicon/generator-info.json ./out/favicon-data.json ./out/favicon
