#!/usr/bin/env bash

set -e

# Android

ANDROID_ICON_ROOT="../frontend/native/app/android/app/src/main/res"
rm -rf "$ANDROID_ICON_ROOT/mipmap-hdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-mdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-xhdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-xxhdpi"
rm -rf "$ANDROID_ICON_ROOT/mipmap-xxxhdpi"

# iOS
IOS_ICON_ROOT="../frontend/native/app/ios/byot/Images.xcassets/AppIcon.appiconset"
rm -rf "$IOS_ICON_ROOT/*"
cp -r ./out/native/ios/AppIcon.appiconset/* "$IOS_ICON_ROOT"
