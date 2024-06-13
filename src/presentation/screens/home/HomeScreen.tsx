import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMovies } from '../../hooks/useMovies'
import { PosterCarousel } from '../../components/movies/PosterCarousel'
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets()
  const { isLoading, nowPlaying, popular, topRated, upComing } = useMovies()

  if (isLoading) {
    return (<Text>Cargando...</Text>)
  }
  return (
    <ScrollView>
      <View style={{ marginTop: top + 20, marginBottom: 30 }}>
        {/* Principal */}
        <PosterCarousel movies={ nowPlaying }/>

        <HorizontalCarousel movies={ popular } title='Populares'/>

        <HorizontalCarousel movies={ topRated } title='Mejor Calificadas'/>

        <HorizontalCarousel movies={ upComing } title='Próximamente'/>
      </View>
    </ScrollView>
  )
}
