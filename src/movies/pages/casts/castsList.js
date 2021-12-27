import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import { useTranslate } from 'react-redux-multilingual';
import MasterLayoutMovie from '../../components/layout/master-layout';
import PaginationMovies from '../../components/movie/pagination';
import CastItem from '../../components/casts/cast-item';
import { api } from '../../services/api';
import './castsList.scss';

function CastsList({helmetHome}) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [castsList, setCastsList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    
    const translate = useTranslate();

    useEffect(() => {
        const getCastsList = async () => {
          setLoading(true);
          const dataCastsList = await api.castsList(translate('language'), page);
          if(dataCastsList){
            setCastsList(dataCastsList.results);
            setTotalItems(dataCastsList.total_results);
          }
          setLoading(false);
        }
        getCastsList();
      },[translate, page]);
    
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
                <title>{translate('cast')}</title>
            </Helmet>
            { helmetHome &&
              <Helmet>
                <title>{translate('home')}</title>
              </Helmet>
            }
            <div className="movies-page casts">
                <div className="casts-list">
                    {
                    castsList.map((item, index) => (
                        <CastItem key={index} cast={item} loading={loading}/>
                    ))
                    }
                </div>
                { 
                castsList.length > 0 && !loading && <PaginationMovies totalItems={totalItems} currentPage={page} change={changePaging} />
                }
            </div>
        </MasterLayoutMovie>
    )
}

export default React.memo(CastsList);