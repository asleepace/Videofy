# Videofy

A simple application for selecting a thumbail from a video.

![Simulator Screen Shot - iPhone 8 - 2022-05-10 at 22 17 59](https://user-images.githubusercontent.com/10716803/167777913-295793be-ac5f-421a-962e-a68095f5d35f.png)


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

To run the application on iOS:

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

> - What went wrong:
>   A problem occurred evaluating project ':app'.
>   Failed to apply plugin 'com.android.internal.application'.
>   Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.

run the following command

```bash
brew tap homebrew/cask-versions
brew install --cask zulu11
```

## More Resources

- [ffmpeg-kit-react-native](https://www.npmjs.com/package/ffmpeg-kit-react-native?activeTab=readme)
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [FFMPEG Exmaples](https://github.com/tanersener/ffmpeg-kit-test/blob/main/react-native/test-app-local-dependency/src/video-util.js)
