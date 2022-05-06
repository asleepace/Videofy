import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ReadDirItem} from 'react-native-fs'
/**
 * Timeline
 * This component displays a time line of images as well as a
 * method for selecting a frame
 */

interface TimeLineProps {
  items: ReadDirItem[]
  onSelect(file: ReadDirItem): void
}

export const Timeline = (props: TimeLineProps) => {
  const [index, setIndex] = useState(0)

  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
})
