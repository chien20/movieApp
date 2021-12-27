import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import { DatePicker, Pagination, Result, ConfigProvider } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN';
import MasterLayoutMovie from '../../components/layout/master-layout';
import { useTranslate } from 'react-redux-multilingual';
import { api } from '../../services/api';
import ListMovies from '../../components/movie/list-movies';
import { helpers } from '../../helpers/common';
import NoData from '../../components/no-data';
import './upcoming.scss';
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';


const { RangePicker } = DatePicker;

const UpcomingMoviePage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tdate , setToDate] = useState('');
  const [fdate, setFromDate] = useState('');
  const [comingMovies, setComingMovies] = useState({});
  const [totalItems, setTotalItem] = useState(0);
  
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
  const arrTime = [fdate, tdate];

  const getUpComing = async (t1, t2, p = 1) => {
    setLoading(true);
    setPage(p);
    const fromDate = t2[0];
    const toDate = t2[1];
    const dataMovie = await api.getDataUpcomingMovie(translate('language'), fromDate, toDate, p);
    if(dataMovie.hasOwnProperty('results')){
      setComingMovies(dataMovie.results);
      setTotalItem(dataMovie.total_results);
      setFromDate(fromDate);
      setToDate(toDate);
    }
    if (fromDate === "" && toDate === "") {
      setComingMovies({})
    }
    setLoading(false);
  }


  return(
      <MasterLayoutMovie>
        <Helmet>
          <title>{translate('upcoming')}</title>
        </Helmet>
        <div className="movies-page upcoming">
          <div className="picker">
            { translate('language') === 'vi' &&
              <ConfigProvider locale={vi_VN}>
                <RangePicker onChange={(d1,d2) => getUpComing(d1,d2)}/>
              </ConfigProvider>
            }
            { translate('language') !== 'vi' &&
              <RangePicker onChange={(d1,d2) => getUpComing(d1,d2)}/>
            }
          </div>
          {
            loading && helpers.isEmptyObject(comingMovies) &&
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
            !helpers.isEmptyObject(comingMovies)
            && 
            <ListMovies
              loading={loading}
              movies={comingMovies}
            />
          }
          {
            helpers.isEmptyObject(comingMovies) && !loading && fdate === '' && tdate === '' &&
            <Result
              status="404"
              title={translate('start')}
              subTitle={translate('start_upcoming')}
              />
          }
          {
            helpers.isEmptyObject(comingMovies) && fdate !== '' && tdate !== '' &&
            <NoData/>
          }
          {
            !helpers.isEmptyObject(comingMovies)
            &&
            !loading 
            &&
            <Pagination
            itemRender={itemRender}
            current={page}
            total={totalItems}
            pageSize={20}
            showSizeChanger={false}
            onChange={ (p) => getUpComing(null, arrTime, p)}
            />
          }
        </div>
      </MasterLayoutMovie>
  )
}
export default React.memo(UpcomingMoviePage);