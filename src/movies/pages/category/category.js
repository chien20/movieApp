import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import { useParams } from 'react-router-dom';
import { useTranslate } from 'react-redux-multilingual';
import MasterLayoutMovie from '../../components/layout/master-layout';
import ListMovies from '../../components/movie/list-movies';
import PaginationMovies from '../../components/movie/pagination';
import { api } from '../../services/api';

const Category = (props) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [nameGenre, setNameGenre] = useState({});
  const [page, setPage] = useState(1);
  const { genre } = useParams();

  const genreHome = props.genre;

  const translate = useTranslate();

  useEffect(() => {
    if (!genreHome) {
      const getData = async () => {
        setLoading(true);
        const dataMovie = await api.categoryMovies(translate('language'), genre, page);
        const dataGenres = await api.genres(translate('language'));
        if(dataMovie){
          setMovies(dataMovie.results);
          setTotalItems(dataMovie.total_results);
        }
        setNameGenre(dataGenres.genres.find((item) => item.id == genre));
        setLoading(false);
      }
      getData();
    }
  }, [genreHome, translate, genre, page]);


  useEffect(() => {
    if (genreHome) {
    const getData = async () => {
      setLoading(true);
      const dataMovie = await api.categoryMovies(translate('language'), genreHome, page);
      const dataGenres = await api.genres(translate('language'));
      if(dataMovie){
        setMovies(dataMovie.results);
        setTotalItems(dataMovie.total_results);
      }
      setNameGenre(dataGenres.genres.find((item) => item.id == genreHome));
      setLoading(false);
    }
    getData();
    }
  }, [translate, genreHome, page]);

  const changePaging = (p = 1) => {
    setPage(p);
  }

  if(loading) {
    return (
      <div id="app-loading">
        <div className="lds-css ng-scope">
          <div className="lds-pacman">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="loading-text">{translate('loading')}</div>
      </div>
    )
  }


  return (
      <MasterLayoutMovie>
        <Helmet>
          <title>{nameGenre && !props.helmetDetail && nameGenre.name}</title>
        </Helmet>
        { props.helmetHome &&
              <Helmet>
                <title>{translate('home')}</title>
              </Helmet>
        }
        <div className="movies-page category">
          <ListMovies
            loading={loading}
            movies={movies}
          />
          { 
              movies.length > 0 && !loading && <PaginationMovies totalItems={totalItems} currentPage={page} change={changePaging} />
          }
        </div>
      </MasterLayoutMovie>
  )
}

export default React.memo(Category);