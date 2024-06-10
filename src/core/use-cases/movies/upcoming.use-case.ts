import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { DBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const moviesUpcomingUseCase = async( fetcher: HttpAdapter ):Promise <Movie[]> => {
  try {
    const upComing = await fetcher.get<DBMoviesResponse>('/upcoming')
    return upComing.results.map( MovieMapper.fromMovieDBResultToEntity ) 
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching movies - Upcoming");
  }
}