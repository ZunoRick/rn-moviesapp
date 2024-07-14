import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/Navigation'
import { useMovie } from '../../hooks/useMovie'
import { MovieHeader } from '../../components/movie/MovieHeader'
import { MovieDetails } from '../../components/movie/MovieDetails'

interface Props extends StackScreenProps<RootStackParams, 'Details'>{}

export const DetailsScreen = ({ route }: Props) => {

  const { movieId } = route.params
  //  const { movieId } = useRoute().params
  const { isLoading, movie, cast } = useMovie(movieId)

  if (isLoading) {
    return <Text>Loading</Text>
  }

  return (
    <ScrollView>
      <MovieHeader
        poster={ movie!.poster }
        originalTitle={ movie!.originalTitle }
        title={ movie!.title }
      />

      <MovieDetails
        movie={ movie! }
        cast={ cast! }
      />
    </ScrollView>
  )
}
