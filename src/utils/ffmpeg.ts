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
  return `-i ${videoPath} -vf "select='not(mod(t,5))'" -vsync vfr output_%04d.jpg`
}

export function getThumbnails(videoPath: string) {
  const filePath = getFilePath(videoPath);
  const commands = generateThumbnails(filePath)
  console.log('loading filepath:', commands)
  FFmpegKit.execute(commands).then(async session => {
    const returnCode = await session.getReturnCode()
    console.log('[ffmpeg] finished with session:', { session, returnCode })
    printFiles()

    if (ReturnCode.isSuccess(returnCode)) {
      console.log('success!')
    } else if (ReturnCode.isCancel(returnCode)) {
      console.log('cancelled')
    } else {
      console.log('error')
    }
  });
}

export function getFilePath(filePath: string) {
  return `${FileSystem.MainBundlePath}/video.mp4`;
}

function printFiles() {
  FileSystem.readDir(`${FileSystem.MainBundlePath}`).then((result) => {
    console.log({ result })
  })
}