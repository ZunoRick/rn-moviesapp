import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMovies } from '../../hooks/useMovies'
import { PosterCarousel } from '../../components/movies/PosterCarousel'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets()
  const { isLoading, nowPlaying } = useMovies()

  if (isLoading) {
    return (<Text>Cargando...</Text>)
  }
  return (
    <ScrollView>
      <View style={{ marginTop: top + 20, marginBottom: 30 }}>
        <PosterCarousel movies={ nowPlaying }/>
      </View>
    </ScrollView>
  )
}
