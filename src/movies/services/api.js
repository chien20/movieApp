import jwt from 'jsonwebtoken';
import axios from 'axios';
const KEY_TOKEN = 'reactjs2011B';
 

const genres = async (language = 'en-US') => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data : [];
  return result;
}

const castsList = async (language = 'en-US', page = 1) => {
  const url = `https://api.themoviedb.org/3/person/popular?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}&page=${page}`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data : [];
  return result;
}

//14 film 
const bestMovies = async (language = 'en-US') => {
  const urlMovie = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}&sort_by=vote_average.desc&vote_count.gte=20000`;
  const response = await axios.get(urlMovie);
  const result = response.status === 200 ? response.data : [];
  return result;
}

const categoryMovies = async (language = 'en-US', genre, page = 1) => {
  const urlMovie = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&with_genres=${genre}&language=${language}&sort_by=popularity.desc&page=${page}`;
  const response = await axios.get(urlMovie);
  const result = response.status === 200 ? response.data : [];
  return result;
}

const searchMovies = async (language = 'en-US', keyword = '', page = 1) => {
  const urlMovie = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}&page=${page}`;
  const response = await axios.get(urlMovie);
  const result = response.status === 200 ? response.data : [];
  return result;
} 

const popularityMovies = async (language = 'en-US', page = 1) => {
  const urlMovie = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&sort_by=popularity.desc&language=${language}&page=${page}`;
  const response = await axios.get(urlMovie);
  const result = response.status === 200 ? response.data : [];
  return result;
} 

const latestMovies = async (language = 'en-US', page = 1) => {
  const urlMovie = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&sort_by=popularity.desc&sort_by=primary_release_date.desc&language=${language}&page=${page}`;
  const response = await axios.get(urlMovie);
  const result = response.status === 200 ? response.data : [];
  return result;
} 

const getDataUpcomingMovie = async (language = 'en-US', gte, lte, page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&sort_by=popularity.desc&primary_release_date.gte=${gte}&primary_release_date.lte=${lte}&language=${language}&page=${page}`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data: {};
  return result;
} 

const getDetailMovieById = async (language = 'en-US', id) => {
  const url =  `https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}&append_to_response=videos,images&include_image_language=vi,en&include_video_language=vi,en`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data: {};
  return result;
}

const getCastsMovieById = async (language = 'en-US', id) => {
  const url =  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data: {};
  return result;
}

const getReviewsMovieById = async (language = 'en-US', id) => {
  const url =  `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=${language}`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data: {};
  return result;
}

const getKeywordsMovieById = async (id) => {
  const url =  `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d`;
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data: {};
  return result;
}

const checkUserLogin = (user, pass) => {
  let token = null;
  if(user === 'admin' && pass === '123'){
    // ma hoa thong tin cua user va gui ve cho phia client
    token = jwt.sign({
      id: 1,
      username: user,
      email: 'admin@gmail.com',
      phone: '0367639978',
      address: 'Ha Noi'
    },KEY_TOKEN);
    return token;
  }
  return token;
}


export const api = {
  genres,
  castsList,
  bestMovies,
  searchMovies,
  popularityMovies,
  getDetailMovieById,
  checkUserLogin,
  getDataUpcomingMovie,
  categoryMovies,
  latestMovies,
  getCastsMovieById,
  getReviewsMovieById,
  getKeywordsMovieById,
}