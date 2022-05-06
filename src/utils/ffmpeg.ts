import {FFmpegKit} from 'ffmpeg-kit-react-native';
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
  FFmpegKit.execute(
    `ffmpeg -i ${videoPath} -r 1 -s 1280x720 -f image2 screenshot-%03d.jpg`,
  ).then(async session => {
    const returnCode = await session.getReturnCode();
    console.log('[ffmpeg] finished with session:', { session, returnCode })
  });
}
