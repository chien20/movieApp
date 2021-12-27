import React from 'react';
import PropTypes from 'prop-types';
import MoviesItem from './movie-item';
import './list-movies.scss';


const ListMovies = (props) => {
    return (
      <div className="list-movies">
        {props.movies.filter((item) => (
             item.poster_path !== null         //check loại bỏ những film k có poster
          )).map((item, index) => (
          <div key={index} className="movie-item-wapper">
            <MoviesItem loading={props.loading} movie={item} key={index}/>
          </div>
        ))}
      </div>
  )
}
ListMovies.propTypes = {
  loading: PropTypes.bool.isRequired,
  movies: PropTypes.array.isRequired
}
export default React.memo(ListMovies);