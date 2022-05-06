import {FFmpegKit} from 'ffmpeg-kit-react-native';
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
  return `ffmpeg -i ${videoPath} -r 1 -s 1280x720 -f image2 screenshot-%03d.jpg`;
}

export function getThumbnails(videoPath: string) {
  const filePath = getFilePath(videoPath);
  console.log('loading filepath:', filePath)
  FFmpegKit.execute(
    `ffmpeg -i ${filePath} -r 1 -s 1280x720 -f image2 screenshot-%03d.jpg`,
  ).then(async session => {
    const returnCode = await session.getReturnCode();
    console.log('[ffmpeg] finished with session:', { session, returnCode })
  });
}

export function getFilePath(filePath: string) {
  FileSystem.readDir(`${FileSystem.MainBundlePath}`).then((result) => {
    console.log({ result })
  })
  return `${FileSystem.MainBundlePath}/video.mp4`;
}