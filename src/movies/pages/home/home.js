import React from 'react';
import {Helmet} from "react-helmet";
import { useState, useEffect } from 'react';
import { useTranslate } from 'react-redux-multilingual';
import { api } from '../../services/api';
import MasterLayoutMovie from '../../components/layout/master-layout';
import SlidePoster from '../../components/slider/slider-main';
import PopularMoviePage from '../popular/popular';
import LatestPage from '../latest/latest';
import Category from '../category/category';
import CastsList from '../casts/castsList';
import Pricing from '../../components/other/pricing';
import Team from '../../components/other/team';
import Contact from '../../components/other/contact';
import { Link } from 'react-router-dom';
import { BackTop } from 'antd';
import {
  UpCircleOutlined,
} from '@ant-design/icons';
import './home.scss';



function Home() {
    const [loading, setLoading] = useState(false);
    const [bestMovies, setBestMovies] = useState([]);
    
    const translate = useTranslate();

    useEffect(() => {
        const getBestMovies = async () => {
          setLoading(true);
          const dataMovie = await api.bestMovies(translate('language'));
          if(dataMovie){
            setBestMovies(dataMovie.results);
          }
          setLoading(false);
        }
        getBestMovies();
    },[translate]);


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
      <div className="home">
        <MasterLayoutMovie>
          <SlidePoster listMovies={bestMovies}/>
            <div className="movies-section">
              <h3 className="title-section">
                <Link to="/popular-movie">{translate('popular')}</Link>
              </h3>
              <div className="list-movies-home">
                <PopularMoviePage helmetHome={'Home'}/>
              </div>
            </div>
            <div className="movies-section">
              <h3 className="title-section">
                <Link to="/latest">{translate('latest')}</Link>
              </h3>
              <div className="list-movies-home">
                <LatestPage helmetHome={'Home'}/>
              </div>
            </div>
            <div className="movies-section home-banner mid">
              <p>VS</p>
              <img className="banner-left" src={process.env.PUBLIC_URL + "/img/king-left.jpg"} alt="king"/>
              <img className="banner-right" src={process.env.PUBLIC_URL + "/img/god-right.jpg"} alt="god"/>
            </div>
            <div className="movies-section">
              <h3 className="title-section">
                <Link to="/category/878">{translate('science')}</Link>
              </h3>
              <div className="list-movies-home">
                <Category helmetHome={'Home'} genre={878}/>
              </div>
            </div>
            <div className="movies-section">
              <h3 className="title-section">
                <Link to="/category/28">{translate('action')}</Link>
              </h3>
              <div className="list-movies-home">
                <Category helmetHome={'Home'} genre={28}/>
              </div>
            </div>
            <div className="movies-section home-banner">
              <img src={process.env.PUBLIC_URL + "/img/avg-banner.jpg"} alt="transformer"/>
            </div>
            <div className="movies-section">
              <h3 className="title-section">
                <Link to="/casts">{translate('cast')}</Link>
              </h3>
              <div className="list-movies-home">
                <CastsList helmetHome={'Home'}/>
              </div>
            </div>
            <div className="movies-section">
              <Pricing/>
            </div>
            <div className="movies-section">
              <Team/>
            </div>
            <div className="movies-section">
              <Contact/>
            </div>
        </MasterLayoutMovie>
        <BackTop>
          <div className="back-top"><UpCircleOutlined /></div>
        </BackTop>
        <Helmet>
          <title>{translate('home')}</title>
        </Helmet>
      </div>
    );
}

export default React.memo(Home);