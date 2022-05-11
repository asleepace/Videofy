# Videofy

A simple application for selecting a thumbail from a video.

## Prerequisites

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
