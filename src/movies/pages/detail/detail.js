import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import ReactPlayer from "react-player/lazy";
import { Image, Tabs, Progress, Popover, Result } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslate } from 'react-redux-multilingual';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.min.css';
import MasterLayoutMovie from '../../components/layout/master-layout';
import CastItem from '../../components/casts/cast-item';
import Category from '../category/category';
import { api } from '../../services/api';
import { helpers } from '../../helpers/common';
import './detail.scss';
import {
  CalendarOutlined,
  HistoryOutlined,
  HeartOutlined,
  BookOutlined,
  StarOutlined,
  PlayCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const DetailMovie = () => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailMovie, setDetailMovie] = useState({});
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [trailer, setTrailer] = useState({})
  const { id } = useParams();
  
  const translate = useTranslate();

  const scrollToMore = <p className="scroll-to-more">{translate('scroll')}</p>
  const linkHomePage = <div>{translate('view_home_page')}</div>

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const dataMovie = await api.getDetailMovieById(translate('language'), id);
      const dataCasts = await api.getCastsMovieById(translate('language'), id);
      const dataReviews = await api.getReviewsMovieById(translate('language'), id);
      const dataKeywords = await api.getKeywordsMovieById(id);

      if(!helpers.isEmptyObject(dataMovie)){
        setDetailMovie(dataMovie);
        setCasts(dataCasts.cast);
        setReviews(dataReviews.results);
        setKeywords(dataKeywords.keywords);

        if (dataMovie.videos.results.length === 0) {
          setTrailer({id: "1", key: "xhjXxGDoKUQ"});
        } else {
          if (dataMovie.videos.results.find((v) => v.type === "Trailer") === undefined) {
            setTrailer(dataMovie.videos.results[0]);
          } else {
            setTrailer(dataMovie.videos.results.find((v) => v.type === "Trailer"));
          }
        }
      }
      setLoading(false);
    }
    getData();
  }, [translate, id])
  
  
  if(loading || helpers.isEmptyObject(detailMovie)) {
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
    <div className="detail">
      <MasterLayoutMovie>
        <Helmet>
          <title>{detailMovie.title}</title>
        </Helmet>
        <div className="detail-page">
          <div className="backdrop">
            <img className="backdrop_img" src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${detailMovie.backdrop_path}`} alt="backdrop_path"/>
            <div className="backdrop_overlay"></div>
            <div className="backdrop_content">
              <Image src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`} alt={detailMovie.poster_path}/>
              <div className="backdrop_info">
                <h1 className="original_title">{detailMovie.title} <span>({detailMovie.release_date.substring(0, 4)})</span></h1>
                <p className="date_time_start">
                  <span className="start"><StarOutlined />{detailMovie.vote_average}</span>
                  <span className="time"><HistoryOutlined/>{(detailMovie.runtime - detailMovie.runtime%60)/60}{translate('h')} {detailMovie.runtime%60}{translate('m')}</span>  
                  <span className="date"><CalendarOutlined/>{detailMovie.release_date} (
                    {detailMovie.production_countries.map((item, index) => (
                      <>
                      <span className="countrie" key={index}>{item.iso_3166_1}</span>
                      </>
                    ))}
                  )</span>
                </p>
                <p className="genres">
                  {detailMovie.genres.map((item, index) => (
                    <span key={index}>{item.name}</span>
                  ))}
                </p>
                <p className="score">
                  <Progress
                      type="circle"
                      width="60px"
                      strokeLinecap="square"
                      strokeWidth="10"
                      format={percent => `${percent}%`}
                      strokeColor={{
                      '0%': '#FE9900',
                      '50%': '#1890ff',
                      '100%': '#11c757'
                      }}
                      trailColor="#3d3c3c"
                      percent={Math.round((detailMovie.vote_count/detailMovie.popularity)*100)}  //làm tròn 
                  />
                  <span className="user_score">{translate('movie')}<br/>{translate('score')}</span>
                  <span className="icon_score"><HeartOutlined /></span>
                  <span className="icon_score"><BookOutlined /></span>
                  <span className="icon_score"><StarOutlined /></span>
                  <span className="trailer" onClick={()=> setOpen(true)}><PlayCircleOutlined /> <span>{translate('play_trailer')}</span></span>
                </p>
                <p className="tagline">{detailMovie.tagline}</p>
                <div className="overview">
                  <h4>{translate('overview')}</h4>
                  <p>{detailMovie.overview}</p>
                </div>
                <p className="other">
                  <span className="vote_count">{translate('vote_count')}:<span>{detailMovie.vote_count}</span></span>
                  <span className="popularity">{translate('popularity')}:<span>{parseInt(detailMovie.popularity)}</span></span>
                  <span className="languages">{translate('languages')}:
                    {detailMovie.spoken_languages.map((item, index) => (
                      <span key={index}>{item.english_name}</span>
                    ))}
                  </span>
                </p>
              </div>
            </div>
            {
              <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailer.key} onClose={() => setOpen(false)} />
            }
          </div>
          <div className="detail-container">
            <div className="detail-left">
              <div className="left_section">
                <h3 className="section_title">{translate('billed_cast')}</h3>
                <div className="list-casts">
                  {casts.map((item, index) => (
                    <CastItem cast={item} key={index}/>
                  )).slice(0,15)}
                  {casts.length == 0 &&
                  <Result
                    status="404"
                    title={translate('no_casts')}
                  />}
                </div>
              </div>
              <div className="left_section">
                <h3 className="section_title">{translate('videos')}</h3>
                <Tabs className="tabs-videos" defaultActiveKey="1" tabBarExtraContent={scrollToMore}>
                  <TabPane tab={translate('teasers')} key="1">
                    {detailMovie.videos.results.filter((v) => v.type === "Teaser").map((item, index) => (
                        <ReactPlayer key={index} url={`https://www.youtube.com/watch?v=${item.key}`}/>
                      )).slice(0,6)}
                      {detailMovie.videos.results.filter((v) => v.type === "Teaser").length === 0 && 
                      <Result
                      status="404"
                      title={translate('no_teasers')}
                      />}
                  </TabPane>
                  <TabPane tab={translate('trailers')} key="2">
                    {detailMovie.videos.results.filter((v) => v.type === "Trailer").map((item, index) => (
                      <ReactPlayer key={index} url={`https://www.youtube.com/watch?v=${item.key}`}/>
                    )).slice(0,6)}
                    {detailMovie.videos.results.filter((v) => v.type === "Trailer").length === 0 && 
                      <Result
                      status="404"
                      title={translate('no_trailers')}
                      />}
                  </TabPane>
                  <TabPane tab={translate('others')} key="3">
                    {detailMovie.videos.results.filter((v) => v.type !== "Trailer" && v.type !== "Teaser").map((item, index) => (
                        <ReactPlayer key={index} url={`https://www.youtube.com/watch?v=${item.key}`}/>
                      )).slice(0,6)}
                      {detailMovie.videos.results.filter((v) => v.type !== "Trailer" && v.type !== "Teaser").length === 0 && 
                      <Result
                      status="404"
                      title={translate('no_other')}
                      />}
                  </TabPane>
                </Tabs>
              </div>
              <div className="left_section">
                <h3 className="section_title">{translate('images')}</h3>
                <Tabs className="tabs-imgs" defaultActiveKey="1">
                  <TabPane tab={translate('backdrops')} key="1">
                    {detailMovie.images.backdrops.map((item, index) => (
                      <Image key={index} src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt="img"/>
                    )).slice(0,6)}
                      {detailMovie.images.backdrops.length === 0 && 
                      <Result
                      status="404"
                      title={translate('no_backdrops')}
                      />}
                  </TabPane>
                  <TabPane tab={translate('posters')} key="2">
                    {detailMovie.images.posters.map((item, index) => (
                      <Image key={index} src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt="img"/>
                    )).slice(0,6)}
                      {detailMovie.images.posters.length === 0 && 
                      <Result
                      status="404"
                      title={translate('no_posters')}
                      />}
                  </TabPane>
                  <TabPane tab={translate('logos')} key="3">
                    {detailMovie.images.logos.map((item, index) => (
                      <Image key={index} src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt="img"/>
                      )).slice(0,6)}
                      {detailMovie.images.logos.length === 0 && 
                      <Result
                      status="404"
                      title={translate('no_logos')}
                      />}
                  </TabPane>
                </Tabs>
              </div>
            </div>
            <div className="detail-right">
              <div className="right_section social">
                <FacebookOutlined />
                <InstagramOutlined />
                <TwitterOutlined />
                <Popover content={linkHomePage}>
                  <a target="_blank" rel="noreferrer" href={detailMovie.homepage}><LinkOutlined /></a>
                </Popover>
              </div>
              <div className="right_section status">
                <h4 className="section_title">{translate('status')}</h4>
                <p className="section_des">{detailMovie.status}</p>
              </div>
              <div className="right_section budget">
                <h4 className="section_title">{translate('budget')}</h4>
                <p className="section_des">${detailMovie.budget}</p>
              </div>
              <div className="right_section revenue">
                <h4 className="section_title">{translate('revenue')}</h4>
                <p className="section_des">${detailMovie.revenue}</p>
              </div>
              <div className="right_section big production_companies">
                <h4 className="section_title">{translate('companies')}</h4>
                {detailMovie.production_companies.filter((item) => (item.logo_path !== null)).map((item, index) => (
                  <div key={index} className="company">
                    <img src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} alt="company"/>
                    <p className="section_des">{item.name} ({item.origin_country})</p>
                  </div>
                )).slice(0,2)}
              </div>
              <div className="right_section big keywords">
                <h4 className="section_title">{translate('keywords')}</h4>
                <div className="list-key">
                  {
                    keywords.map((item, index) => (
                      <p key={index}>{item.name}</p>
                    ))
                  }
                  {keywords.length == 0 && 
                  <p>{translate('no_keywords')}</p>
                  }
                </div>
              </div>
              <div className="right_section big content_score">
                <h4 className="section_title">{translate('content_score')}</h4>
                <p>{detailMovie.vote_average * 10}</p>
                {detailMovie.vote_average >= 7.0 &&
                  <span>{translate('yes')}</span>}
                {detailMovie.vote_average < 7.0 &&
                <span>{translate('need_to')}</span>}
              </div>
              <div className="right_section big contributors">
                <h4 className="section_title">{translate('contributors')}</h4>
                <div className="contributor">
                  <img src={process.env.PUBLIC_URL + "/img/team/cap.jpg"} alt="cap"/>
                  <div>
                    <p>820</p>
                    <span>{translate('captain')}</span>
                  </div>
                </div>
                <div className="contributor">
                  <img src={process.env.PUBLIC_URL + "/img/team/thor.jpg"} alt="thor"/>
                  <div>
                    <p>784</p>
                    <span>{translate('thor')}</span>
                  </div>
                </div>
                <div className="contributor">
                  <img src={process.env.PUBLIC_URL + "/img/team/iron.jpg"} alt="iron"/>
                  <div>
                    <p>609</p>
                    <span>{translate('iron')}</span>
                  </div>
                </div>
                <div className="contributor">
                  <img src={process.env.PUBLIC_URL + "/img/team/doc.jpeg"} alt="doc"/>
                  <div>
                    <p>576</p>
                    <span>{translate('doctor')}</span>
                  </div>
                </div>
              </div>
              <div className="right_section big popular_trend">
                <h4 className="section_title">{translate('trend')}</h4>
                <img src={process.env.PUBLIC_URL + "/img/trend.svg"} alt="trend"/>
              </div>
            </div>
          </div>
          <div className="reviews">
            <h3 className="section_title">{translate('reviews')}</h3>
            <div className="list-reviews">
              {reviews.map((item, index) => (
                <div key={index} className="review">
                  {
                        item.author_details.avatar_path != null && `${item.author_details.avatar_path}`.indexOf("https") == -1 &&
                        <img src={`https://image.tmdb.org/t/p/w500/${item.author_details.avatar_path}`} alt=""/>
                  }
                  {
                    `${item.author_details.avatar_path}`.indexOf("https") != -1 &&
                        <img src={`${item.author_details.avatar_path}`.substr(1,200)} alt=""/>
                  }
                  {
                    item.author_details.avatar_path == null &&
                    <img
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt=""
                    />
                  }
                  <div className="review_info">
                    <h4 className="name">{item.author}</h4>
                    <p className="time">{item.updated_at.substr(0,19).replace('T', ' / ')}</p>
                    <p className="content">{item.content}</p>
                  </div>
                </div>))}
                {reviews.length == 0 && 
                  <Result
                  status="404"
                  title={translate('no_reviews')}
                  />
                }
            </div>
          </div>
          <div className="recommen">
            <h3 className="section_title">{translate('recommen')}</h3>
            <Tabs className="tabs-recommen" defaultActiveKey="0" tabBarExtraContent={scrollToMore}>
              {detailMovie.genres.map((item, index) => (
                <TabPane tab={item.name} key={index}>
                    <Category helmetDetail={'detail'} genre={item.id}/>
                </TabPane>
              ))}
              {detailMovie.genres.length === 0 && 
              <TabPane tab={translate('recommen_not_found')} key="0">
                <Result
                status="404"
                title={translate('no_recommen')}
                />
              </TabPane>}
            </Tabs>
          </div>
        </div>
      </MasterLayoutMovie>
    </div>
  )
}

export default React.memo(DetailMovie);