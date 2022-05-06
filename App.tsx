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
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'
import {ReadDirItem} from 'react-native-fs'
import {Colors, Header} from 'react-native/Libraries/NewAppScreen'
import {getThumbnails} from './src/utils'

const App = () => {
  const [files, setFiles] = useState<ReadDirItem[]>([])

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  useEffect(() => {
    getThumbnails().then(data => setFiles(data))
  }, [])

  console.log({files})

  const images = files.map(data => {
    console.log(data)
    return (
      <Image
        source={{uri: `file://${data.path}`}}
        style={styles.image}
        key={data.name}
      />
    )
  })

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={styles.frame}>{images}</View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  frame: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 16,
  },
  image: {
    height: 40,
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
})

export default App
