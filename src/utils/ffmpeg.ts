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

interface ThumbnailConfig {
  time: number // the duration between thumbnails
  path: string // the video file name
}

/**
 * This method takes a path to a local video file as well as a time (duration)
 * to generate thumbails at an interval. It will return an array of thumbnails
 * once finished.
 */
export async function getThumbnails({time, path}: ThumbnailConfig) {
  const filePath = await getFilePath(path)
  const commands = getCommandFFMPEG(filePath, time)
  const session = await FFmpegKit.execute(commands)
  const returnCode = await session.getReturnCode()
  const output = await FileSystem.readDir(OUTPUT_DIRECTORY)

  if (ReturnCode.isSuccess(returnCode)) {
    console.log('success!')
  } else if (ReturnCode.isCancel(returnCode)) {
    console.log('cancelled')
  } else {
    // TODO: throw error to parent
    console.log('error')
  }

  return output
}

/**
 * This code is specific to ffmpeg the main thing to note here is the videoPath
 * to generate the thumbnails, the time which is the interval at which we create
 * new thumbnails and the output directory to where they are saved. More info:
 * https://ottverse.com/thumbnails-screenshots-using-ffmpeg/
 * @returns a string command to pass into ffmpeg
 */
function getCommandFFMPEG(videoPath: string, time: number) {
  return `-i ${videoPath} -vf "select='not(mod(t,${time}))'" -vsync vfr ${OUTPUT_DIRECTORY}/output_%04d.jpg`
}

/**
 * The file path for the static video file. In a real project we would
 * generally be loading media from the users camera or video library,
 * but for the sake of this assignment we will load a local file.
 */
async function getFilePath(fileName: string) {
  if (Platform.OS === 'android') {
    await copyVideoAndroid(fileName)
    return `${FileSystem.DocumentDirectoryPath}/${fileName}`
  } else {
    return `${FileSystem.MainBundlePath}/${fileName}`
  }
}

/**
 * Android is a bit quirky with local video files, so we need to copy
 * the local video from assets over to the document directory first.
 */
function copyVideoAndroid(filePath: string) {
  const copyPath = `${FileSystem.DocumentDirectoryPath}/${filePath}`
  return FileSystem.copyFileAssets(filePath, copyPath)
}
