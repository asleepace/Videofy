/**
 * Videofy
 * Colin Teahan
 *
 * Generates a selectable list of thumbnails which can be selected.
 * @format
 */

import React, {useEffect, useState} from 'react'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {ReadDirItem} from 'react-native-fs'
import {Selected, Timeline} from './src/components'
import {getThumbnails} from './src/utils'

const App = () => {
  /**
   * files holds the generated array of thumnail items from the video and
   * selected is the currently selected thumbnail.
   */
  const [files, setFiles] = useState<ReadDirItem[]>([])
  const [selected, setSelected] = useState<ReadDirItem>()

  /**
   * When this component is first rendered generate a list of thumnbails
   * and update the state.
   */
  useEffect(() => {
    getThumbnails({path: 'video.mp4', time: 1})
      .then(data => setFiles(data))
      .catch(error => console.warn({error}))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Selected selected={selected} />
      <Timeline selected={selected} items={files} onSelect={setSelected} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default App
