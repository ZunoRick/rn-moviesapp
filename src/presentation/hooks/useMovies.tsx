import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [upComing, setUpComing] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])

  const initialLoad = async() => {
    const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher)
    const upComingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher)
    const topRatedesPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher)
    const popularPromise = UseCases.popularUseCase(movieDBFetcher)

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
    popular,

    // Metodos
    popularNextPage: async() => {
      popularPageNumber++
      const popularMovies = await UseCases.popularUseCase(movieDBFetcher, {
        page: popularPageNumber
      })

      setPopular(prev => [...prev, ...popularMovies])
    },
  }
}