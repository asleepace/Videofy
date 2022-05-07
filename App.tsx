/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react'
import {Image, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {ReadDirItem} from 'react-native-fs'
import {Timeline} from './src/components/timelines'
import {getThumbnails} from './src/utils'

const App = () => {
  const [files, setFiles] = useState<ReadDirItem[]>([])
  const [selected, setSelected] = useState<ReadDirItem>()

  useEffect(() => {
    getThumbnails().then(data => setFiles(data))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Image
        source={{uri: selected?.path}}
        style={styles.mainImage}
        resizeMode={'cover'}
      />
      <Timeline selected={selected} items={files} onSelect={setSelected} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mainImage: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    height: 400,
    width: 240,
  },
})

export default App
