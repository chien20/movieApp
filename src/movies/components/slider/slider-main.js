import React from 'react';
import Slider from "react-slick";
import { useTranslate } from 'react-redux-multilingual';
import SlideList from "./slider-list";
import slugify from 'react-slugify';
import {
    StarOutlined,
    TeamOutlined,
    CalendarOutlined,
    RightCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function SlidePoster({listMovies}) {
    const slideMain = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        fade: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        initialSlide: 1,
        };

    const translate = useTranslate();

    return (
        <div className="slider">
        
            <Slider className="slide-main" {...slideMain}>
                {
                    listMovies.map((movie, index) => (
                        <div className="slide-item" key={index}>
                            <img src={`${process.env.PUBLIC_URL}/img/slide/${movie.id}.jpg`} alt={movie.title}/>
                            <div className="slide-overlay"></div>
                            <h1 className="movie-info name">{movie.title}</h1>
                            <p className="movie-info detail">
                                <StarOutlined />
                                <span className="detail-text">{movie.vote_average}</span>
                                <TeamOutlined />
                                <span className="detail-text">{movie.vote_count}</span>
                                <CalendarOutlined />
                                <span className="detail-text">{movie.release_date}</span>
                            </p>
                            <h4 className="movie-info des">{movie.overview}</h4>
                                <Link to={`/movie-detail/${slugify(movie.title)}~${movie.id}`}>
                                    <button className="movie-info read-more">
                                            <RightCircleOutlined/> {translate('read_more')}
                                    </button>
                                </Link>
                            
                        </div>
                )).slice(14,16)
                }
            </Slider>
            <SlideList listMovies={listMovies}/>
        </div>
    );
}

export default React.memo(SlidePoster);