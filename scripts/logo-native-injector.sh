#!/usr/bin/env bash

set -e

NATIVE_ROOT="../frontend/native/app"

# Android

ANDROID_ICON_ROOT="$NATIVE_ROOT/android/app/src/main/res"
rm -rf "$ANDROID_ICON_ROOT/mipmap-hdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-mdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-xhdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-xxhdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-xxxhdpi"
cp -r ./out/native/android/* "$ANDROID_ICON_ROOT"

# iOS
IOS_ICON_ROOT="$NATIVE_ROOT/ios/byot/Images.xcassets/AppIcon.appiconset"
rm -rf "$IOS_ICON_ROOT/*"
cp -r ./out/native/ios/AppIcon.appiconset/* "$IOS_ICON_ROOT"
cp ./out/raw/byoT-full.png "$NATIVE_ROOT/src/assets"
