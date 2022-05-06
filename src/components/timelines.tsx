import React from 'react'
import {Image, ScrollView, StyleSheet, TouchableHighlight} from 'react-native'
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

export const Timeline = ({items, onSelect}: TimeLineProps) => {
  const images = items.map(data => {
    const onPress = () => onSelect(data)
    return (
      <TouchableHighlight style={styles.image} onPress={onPress}>
        <Image
          source={{uri: `file://${data.path}`}}
          style={styles.image}
          key={data.name}
        />
      </TouchableHighlight>
    )
  })

  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      contentContainerStyle={styles.content}>
      {images}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    height: 60,
  },
  container: {
    padding: 16,
  },
  frame: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: 60,
    padding: 16,
  },
  image: {
    height: 60,
    width: 60,
  },
})
