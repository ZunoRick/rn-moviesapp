import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { DBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";


export const moviesTopRatedUseCase = async ( fetcher: HttpAdapter ):Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<DBMoviesResponse>('/top_rated')
    
    return topRated.results.map( MovieMapper.fromMovieDBResultToEntity ) 
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - topRated')
  }
}