import React from 'react';
import './movie-item.scss';
import slugify from 'react-slugify';
import { Skeleton, Progress } from 'antd';
import {
    StarOutlined,
    TeamOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function MovieItem({movie, loading}) {
    if(loading){
        return (<div className="movie-item">
        <Skeleton active loading />
        </div>)
      }
    return (
        <div className="movie-item">
            <Link to={`/movie-detail/${slugify(movie.title)}~${movie.id}`}>
                    <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <div className="movie-info">
                        <h3 className="movie-name">{movie.title}</h3>
                        <p className="movie-detail">
                            <StarOutlined />
                            <span className="detail-text">{movie.vote_average}</span>
                            <TeamOutlined />
                            <span className="detail-text">{movie.vote_count}</span>
                            <CalendarOutlined />
                            <span className="detail-text">{movie.release_date}</span>
                        </p>
                    </div>
                    <Progress
                        type="circle"
                        width="40px"
                        strokeLinecap="square"
                        strokeWidth="8"
                        format={percent => `${percent}%`}
                        strokeColor={{
                        '0%': '#FE9900',
                        '50%': '#1890ff',
                        '100%': '#11c757'
                        }}
                        trailColor="#3d3c3c"
                        percent={Math.round((movie.vote_count/movie.popularity)*100)}  //làm tròn 
                    />
            </Link>
        </div>
    );
}

export default React.memo(MovieItem);