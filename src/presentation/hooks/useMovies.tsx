import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [upComing, setUpComing] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])

  const initialLoad = async() => {
    const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher)
    const upComingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher)
    const topRatedesPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher)
    const popularPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher)

    const [
      nowPlayingMovies,
      upComingMovies,
      topRatedesMovies,
      popularMovies,
    ]= await Promise.all([
      nowPlayingPromise,
      upComingPromise,
      topRatedesPromise,
      popularPromise,
    ])

    setNowPlaying(nowPlayingMovies)
    setUpComing(upComingMovies)
    setTopRated(topRatedesMovies)
    setPopular(popularMovies)

    setIsLoading(false)
  }

  useEffect(() => {
    initialLoad()
  }, [])

  return {
    isLoading,
    nowPlaying,
    upComing,
    topRated,
    popular
  }
}