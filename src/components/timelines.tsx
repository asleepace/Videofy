import React from 'react'
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import {ReadDirItem} from 'react-native-fs'
/**
 * Timeline
 * This component displays a time line of images as well as a
 * method for selecting a frame
 */

interface TimeLineProps {
  items: ReadDirItem[]
  onSelect(file: ReadDirItem): void
  selected: ReadDirItem
}

export const Timeline = ({items, selected, onSelect}: TimeLineProps) => {
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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = parseInt(event.nativeEvent.contentOffset.x / 60)
    onSelect(items[index])
  }

  const SelectedFrame = () => (
    <Image
      source={{uri: `file://${selected?.path}`}}
      style={styles.selectedFrame}
      key={selected?.name}
    />
  )

  return (
    <View style={styles.row}>
      <SelectedFrame />
      <ScrollView
        horizontal={true}
        style={styles.container}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}>
        {images}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedFrame: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 2,
    zIndex: 100,
    height: 80,
    width: 60,
    left: 16,
    top: 8,
  },
  content: {
    flexDirection: 'row',
    height: 60,
  },
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
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
