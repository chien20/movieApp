import React from 'react';
import Slider from "react-slick";
import MovieItem from "../movie/movie-item";

function SlideList({listMovies}) {
    const slideList = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        speed: 500,
        slidesToShow: 5,
        pauseOnHover: true,
        swipeToSlide: true,
        responsive: [
            {
              breakpoint: 1140,
              settings: {
                slidesToShow: 4,
              }
            },
            {
                breakpoint: 760,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                }
            },
        ]
        };

    return (
        <Slider className="slide-list" {...slideList}>
            {
                listMovies.map((movie, index) => (
                    <MovieItem movie={movie} key={index}/>
            ))
            }
        </Slider>
    );
}

export default React.memo(SlideList);