import { Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/Navigation'
import { useMovie } from '../../hooks/useMovie'
import { MovieHeader } from '../../components/movie/MovieHeader'

interface Props extends StackScreenProps<RootStackParams, 'Details'>{}

export const DetailsScreen = ({ route }: Props) => {

  const { movieId } = route.params
  //  const { movieId } = useRoute().params
  const { isLoading, movie } = useMovie(movieId)

  if (isLoading) {
    return <Text>Loading</Text>
  }

  return (
    <View>
      <MovieHeader
        poster={ movie!.poster }
        originalTitle={ movie!.originalTitle }
        title={ movie!.title }
      />
    </View>
  )
}
