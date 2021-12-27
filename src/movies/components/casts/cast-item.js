import React from 'react';
import './cast-item.scss';
import { Skeleton } from 'antd';

function CastItem({cast, loading}) {
    if(loading){
        return (<div className="cast-item">
        <Skeleton active loading />
        </div>)
    }
    if(cast.profile_path === null) {
        return null;
    }
    return (
        <div className="cast-item">
            <div className="cast-wapper-img">
                <img alt="cast" src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}/>
            </div>
            <div className="cast-info">
                <h3 className="cast-name">{cast.name || cast.original_name}</h3>
                <p  className="cast-movies">
                    {cast.known_for &&
                        cast.known_for.map((item,index) => (
                        <span key={index}>{item.title}{item.name}, </span>
                        ))
                    }
                </p>
            </div>
        </div>
    );
}

export default React.memo(CastItem);