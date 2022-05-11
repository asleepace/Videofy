# Videofy

A short for video editing application

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
>   A problem occurred evaluating project ':app'.
>   Failed to apply plugin 'com.android.internal.application'.
>   Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.

run the following command

```bash
brew tap homebrew/cask-versions
brew install --cask zulu11
```

## Example Projects

- [FFMPEG Exmaples](https://github.com/tanersener/ffmpeg-kit-test/blob/main/react-native/test-app-local-dependency/src/video-util.js)
