#!/usr/bin/env bash

set -e

rm -rf out/native
mkdir out/native
curl --upload-file ./out/raw/byoT-favicon-with-bg.png \
    --output output-file \
    https://makeappicon.com/make/all
if [[ ! -f output-file || $(file -b --mime-type output-file) == "text/plain" || $(file -b --mime-type output-file) == "inode/x-empty" ]]
then
    printf "\nThere was a problem processing image"
    cat output-file
    printf "\n"
    printf "\n"
    rm output-file
    exit 1
fi
unzip -d ./out/native output-file
rm output-file
