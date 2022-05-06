import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import FileSystem from 'react-native-fs';
/**
 * FFMPEG Utilities
 * Utilities commands
 */

/**
 * Generates thumnails at regular intervals
 * https://ottverse.com/thumbnails-screenshots-using-ffmpeg/
 * @returns a string command to pass into ffmpeg
 */
export function generateThumbnails(videoPath: string) {
  return `-i ${videoPath} -vf "select='not(mod(t,5))'" -vsync vfr ${FileSystem.TemporaryDirectoryPath}/output_%04d.jpg`
}

export async function getThumbnails() {
  const filePath = getFilePath()
  const commands = generateThumbnails(filePath)
  console.log('loading filepath:', commands)

  const session = await FFmpegKit.execute(commands)
  const returnCode = await session.getReturnCode()
  const output = await FileSystem.readDir(FileSystem.TemporaryDirectoryPath)

  console.log(output)

  if (ReturnCode.isSuccess(returnCode)) {
    console.log('success!')
  } else if (ReturnCode.isCancel(returnCode)) {
    console.log('cancelled')
  } else {
    console.log('error')
  }

  return output

  // FFmpegKit.execute(commands).then(async session => {
  //   const returnCode = await session.getReturnCode()
  //   const output = await session.getOutput()
  //   console.log('[ffmpeg] finished with session:', { session, returnCode, output })
  //   printFiles()

  //   if (ReturnCode.isSuccess(returnCode)) {
  //     console.log('success!')
  //   } else if (ReturnCode.isCancel(returnCode)) {
  //     console.log('cancelled')
  //   } else {
  //     console.log('error')
  //   }
  // });
}

export function getFilePath() {
  return `${FileSystem.MainBundlePath}/video.mp4`
}

function printFiles() {
  FileSystem.readDir(`${FileSystem.TemporaryDirectoryPath}`).then((result) => {
    console.log({ result })
  })
}