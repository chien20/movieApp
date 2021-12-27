import React from 'react';
import HeaderMovie from './header';
import FooterMovie from './footer';
import PropTypes from 'prop-types';
import './layout.scss';
import $ from 'jquery';

$(window).on('scroll', function() {
  if ($(window).scrollTop()) {
    $('.header').addClass('header-black-scroll');
  } else {
    $('.header').removeClass('header-black-scroll');
  }
})

const MasterLayoutMovie = (props) => {
  return (
    <div className="layout">
        <HeaderMovie/>
      <div className="content_layout">
        {props.children}
      </div>
      <FooterMovie/>
    </div>
  )
}
MasterLayoutMovie.propTypes = {
  children: PropTypes.node.isRequired
}
export default React.memo(MasterLayoutMovie)