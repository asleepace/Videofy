import React from 'react'
import {ActivityIndicator, Image, StyleSheet} from 'react-native'
import {ReadDirItem} from 'react-native-fs'

interface SelectedProps {
  selected: ReadDirItem | undefined
}

/**
 * Displays a large image preview of a given selected item, or if there is
 * no selected item will display a loading indicator.
 */
export const Selected = ({selected}: SelectedProps) => {
  if (!selected) return <ActivityIndicator size={'small'} color={'black'} />
  const uri = `file://${selected?.path}`
  return <Image source={{uri}} style={styles.mainImage} resizeMode={'cover'} />
}

const styles = StyleSheet.create({
  mainImage: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    height: 400,
    width: 240,
  },
})
