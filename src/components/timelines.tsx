import React, {useEffect, useMemo} from 'react'
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
 * method for selecting a frame. Video frames are passed in via
 * the items prop which is an array of ReadDireItems.
 */

interface TimeLineProps {
  items: ReadDirItem[]
  onSelect(file: ReadDirItem): void
  selected: ReadDirItem | undefined
}

export const Timeline = ({items, selected, onSelect}: TimeLineProps) => {
  /**
   * When this component is updated with the list of video frames we want
   * to select a default image, which in this case will be the first
   * element.
   */
  useEffect(() => {
    if (!selected && items.length) {
      onSelect(items[0])
    }
  }, [items.length, selected])

  /**
   * Creates a list of clickable images that will be displayed in the scroll
   * view below, this should only be rendered when the items array changes
   * length.
   */
  const images = useMemo(() => {
    return items.map((data, index) => {
      const onPress = () => onSelect(data)
      const key = `${index}:${data.name}`
      return (
        <TouchableHighlight style={styles.image} onPress={onPress}>
          <Image
            source={{uri: `file://${data.path}`}}
            style={styles.image}
            key={key}
          />
        </TouchableHighlight>
      )
    })
  }, [items])

  /**
   * There are two ways a user can select an image, the first is by scrolling
   * the ScrollView which will trigger this method. We find the corresponding
   * array index by dividing the x offset by the width of the images.
   */
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!items.length) return
    const {x} = event.nativeEvent.contentOffset
    const imageWidth = 60
    const pos = Math.ceil(x / imageWidth)
    const end = Math.min(pos, items.length - 1)
    const idx = Math.max(0, end)
    onSelect(items[idx])
  }

  /**
   * This method renders the currently selected image frame on the ScrollView.
   * Since all of the image frames are local files we need to prepend the src
   * attribute with file:// when loading.
   */
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
        scrollEventThrottle={2}
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
    elevation: 1,
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
