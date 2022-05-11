import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native'
import {Platform} from 'react-native'
import FileSystem from 'react-native-fs'

/**
 * FFMPEG Utilities
 * Utilities commands
 *
 * The OUTPUT_DIRECTORY is where all of the screen captures will be saved and read from,
 * becuase of how react-native-fs works on android this needs to be the documents
 * directory: https://www.npmjs.com/package/react-native-fs#usage-android
 */
const OUTPUT_DIRECTORY = FileSystem.DocumentDirectoryPath

/**
 * Generates thumnails at regular intervals
 * https://ottverse.com/thumbnails-screenshots-using-ffmpeg/
 * @returns a string command to pass into ffmpeg
 */
export function generateThumbnails(videoPath: string) {
  return `-i ${videoPath} -vf "select='not(mod(t,5))'" -vsync vfr ${OUTPUT_DIRECTORY}/output_%04d.jpg`
}

export async function getThumbnails() {
  const filePath = await getFilePath()
  const commands = generateThumbnails(filePath)
  console.log('loading filepath:', commands)

  const session = await FFmpegKit.execute(commands)
  const returnCode = await session.getReturnCode()
  const output = await FileSystem.readDir(OUTPUT_DIRECTORY)

  console.log({output})

  if (ReturnCode.isSuccess(returnCode)) {
    console.log('success!')
  } else if (ReturnCode.isCancel(returnCode)) {
    console.log('cancelled')
  } else {
    console.log('error')
  }

  return output
}

/**
 * The file path for the static video file. In a real project we would
 * generally be loading media from the users camera or video library,
 * but for the sake of this assignment we will load a local file.
 */
export async function getFilePath() {
  if (Platform.OS === 'android') {
    await copyVideoAndroid()
    return `${FileSystem.DocumentDirectoryPath}/video.mp4`
  }
  return `${FileSystem.MainBundlePath}/video.mp4`
}

/**
 * Android is a bit quirky with local video files, so we need to copy
 * the local video from assets over to the document directory first.
 */
function copyVideoAndroid() {
  return FileSystem.copyFileAssets(
    'video.mp4',
    `${FileSystem.DocumentDirectoryPath}/video.mp4`,
  )
}
