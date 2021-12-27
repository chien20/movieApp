import React from 'react';
import {Helmet} from "react-helmet";
import { api } from '../../services/api';
import MasterLayoutMovie from '../../components/layout/master-layout';
import { useTranslate } from 'react-redux-multilingual';
import { useState } from 'react';
import ListMovies from '../../components/movie/list-movies';
import NoData from '../../components/no-data';
import { Pagination, Input, Result } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import './search.scss';
 
const { Search } = Input;

const SearchMoviePage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  
  const translate = useTranslate();

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a><LeftOutlined/>{translate('prev')}</a>;
    }
    if (type === 'next') {
      return <a>{translate('next')}<RightOutlined/></a>;
    }
    return originalElement;
  }

  const searchMovieByKey = async (nameMovie, p = 1) => {
    if(nameMovie !== ''){
      setKeyword(nameMovie);
      setPage(p);
      setLoading(true);
      const dataMovie = await api.searchMovies(translate('language'), nameMovie, p);
      if(dataMovie.hasOwnProperty('results')){
        setMovies(dataMovie.results);
        setTotalItems(dataMovie.total_results);
      }
      setLoading(false);
    }
  }


  return(
      <MasterLayoutMovie>
        <Helmet>
          <title>{translate('search')}</title>
        </Helmet>
        <div className="movies-page search">
          <Search
            placeholder={translate('name_search')}
            enterButton={translate('find')}
            loading={loading}
            size="large"
            onSearch={val => searchMovieByKey(val)}
          />
          {
            loading && movies.length === 0 &&
            <div className="movies-page" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
              <p className="loading-text">{translate('loading')}</p>
            </div>
          }
          {
            movies.length !== 0 && !loading &&
            <ListMovies
              loading={loading}
              movies={movies}
            />
          }
          {
            movies.length === 0 && !loading && keyword !== "" &&
            <NoData/>
          }
          {
            movies.length === 0 && !loading && keyword === "" &&
            <Result
              status="404"
              title={translate('start')}
              subTitle={translate('start_search')}
              />
          }
          {
            movies.length !== 0 && !loading && 
            (<Pagination
              current={page}
              itemRender={itemRender}
              pageSize={20}
              total={totalItems}
              showSizeChanger={false}
              onChange={p => searchMovieByKey(keyword, p)}
            />)
          }
        </div>
      </MasterLayoutMovie>
  )
}
export default React.memo(SearchMoviePage);