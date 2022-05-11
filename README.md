# Videofy

A simple application for selecting a thumbail from a video. The video is statically bundled with the application and thumbnails are generated on the fly using [ffmpeg](https://ffmpeg.org/). The user interface is extremely basic and essentially loads the generated thumbnails into a scrollable list, where each image can either be tapped or dragged through the reticle.

![E20B59E6-D012-4E11-85F6-64913E5F7945](https://user-images.githubusercontent.com/10716803/167780377-825f07ea-a420-4eca-83c7-b0710ddc4d26.GIF)


## Prerequisites

Make sure you are using the new react-native development environment [outlined here](https://reactnative.dev/docs/next/environment-setup) along with the following:

| Software       | Version |
| -------------- | :-----: |
| Node           | 14.17.0 |
| Yarn           | 1.22.17 |
| Xcode          | 13.3.1  |
| Ruby           |  2.7.3  |
| CocoaPods      | 1.11.3  |
| React Native   | 0.68.1  |
| Android Studio |  7.0.4  |
| Java (openjdk) | 11.0.15 |

## Installation

Download and install the repository by running the following:

```bash
git clone https://github.com/asleepace/Videofy.git
cd ./Videofy/
yarn
cd ./ios/ && pod install && cd ..
```

## Getting Started

Start the packager by running the following command in the project root directory:

```bash
yarn start
```

To run the application on iOS (if this fails see Troubleshooting below), the first time you may need to build from XCode directly.

```bash
npx react-native run-ios
```

To run the application on Android:

```bash
npx react-native run-android
```

## Project Structure

The application loads a local static video file which is then used in conjunction with [ffmpeg](https://ffmpeg.org/) to render a list of selectable thumbnails.

- `App.tsx` contains the application
  - `./src/components` contains visual elements
  - `./src/utils` contains business logic

## Troubleshooting

<b>1. The iOS project fails when running `npx react-native run-ios` with the following error</b>

> error Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65

[Check out this S/O post for the issue above](https://stackoverflow.com/a/57286808/4326715)

<b>2. The Android project fails to build when running `npx react-native run-android` with the following error</b>

> - What went wrong:
>   Execution failed for task ':app:mergeDebugNativeLibs'.
>   A failure occurred while executing com.android.build.gradle.internal.tasks.MergeNativeLibsTask$MergeNativeLibsTaskWorkAction
>   2 files found with path 'lib/arm64-v8a/libc++\_shared.so' from inputs

add this in your `node_module/ffmpeg-kit-react-native/android/build.gradle`

```gradle
android{
  packagingOptions {
      pickFirst 'lib/x86/libc++_shared.so'
      pickFirst 'lib/x86_64/libc++_shared.so'
      pickFirst 'lib/armeabi-v7a/libc++_shared.so'
      pickFirst 'lib/arm64-v8a/libc++_shared.so'
  }
  rootProject.ext.ffmpegKitPackage = "video"
}
```

<b>3. The Android project fails to build becuase of the wrong Java version</b>

> - What went wrong:
>   A problem occurred evaluating project ':app'.
>   Failed to apply plugin 'com.android.internal.application'.
>   Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.

run the following command

```bash
brew tap homebrew/cask-versions
brew install --cask zulu11
```

You will also need to update your `PATH` with the following:

```
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```

## More Resources

- [ffmpeg-kit-react-native](https://www.npmjs.com/package/ffmpeg-kit-react-native?activeTab=readme)
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [FFMPEG Exmaples](https://github.com/tanersener/ffmpeg-kit-test/blob/main/react-native/test-app-local-dependency/src/video-util.js)
