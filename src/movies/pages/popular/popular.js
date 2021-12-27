import React from 'react';
import {Helmet} from "react-helmet";
import MasterLayoutMovie from '../../components/layout/master-layout';
import { useState, useEffect } from 'react';
import { useTranslate } from 'react-redux-multilingual';
import ListMovies from '../../components/movie/list-movies';
import PaginationMovies from '../../components/movie/pagination';
import { api } from '../../services/api';


const PopularMoviePage = ({helmetHome}) => {
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const translate = useTranslate();


  useEffect(() => {
    const getDataFromApi = async () => {
      setLoading(true);
      const dataMovie = await api.popularityMovies(translate('language'), page);
      if(dataMovie){
        setPopularMovie(dataMovie.results);
        setTotalItems(dataMovie.total_results);
      }
      setLoading(false);
    } 
    getDataFromApi();
  },[page, translate]);

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
          <title>{translate('popular')}</title>
        </Helmet>
        { helmetHome &&
              <Helmet>
                <title>{translate('home')}</title>
              </Helmet>
        }
        <div className="movies-page popular">
          <ListMovies
            loading={loading}
            movies={popularMovies}
          />
          { 
            popularMovies.length > 0 && !loading && <PaginationMovies totalItems={totalItems} currentPage={page} change={changePaging} />
          }
        </div>
      </MasterLayoutMovie>
  )
}
export default React.memo(PopularMoviePage);