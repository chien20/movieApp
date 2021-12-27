import React from 'react';
import { Pagination} from 'antd';
import { useTranslate } from 'react-redux-multilingual';
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

const PaginationMovies = (props) => {
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

  return( 
    <Pagination
      itemRender={itemRender}
      pageSize={20}
      current={props.currentPage}
      total={props.totalItems}
      showSizeChanger={false}
      onChange={ p => props.change(p)}
    />
  )
}
export default React.memo(PaginationMovies);