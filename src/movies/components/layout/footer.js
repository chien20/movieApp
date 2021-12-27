import React from 'react';
import { Link } from "react-router-dom";
import { useTranslate } from 'react-redux-multilingual';
import {
  FacebookOutlined,
  GithubOutlined,
  YoutubeOutlined,
  InstagramOutlined
} from '@ant-design/icons';

const FooterMovie = () => {
  const translate = useTranslate();
  return (
    <>
    <div className="footer">
      <div className="footer_item left">
        <div className="logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/img/logo/logo.png"} alt="logo"/>
          </Link>
        </div>
        <h3>{translate('wellcome_footer')}</h3>
        <div className="icon">
          <a href="https://www.facebook.com/chienlucier">
            <FacebookOutlined/>
          </a>
          <a href="https://github.com/chien20">
            <GithubOutlined/>
          </a>
          <a href="https://www.instagram.com/ch.ien1012">
            <InstagramOutlined/>
          </a>
          <a href="https://youtube.com">
            <YoutubeOutlined/>
          </a>
        </div>
      </div>
      <div className="footer_item mid">
        <ul>
          <li>{translate('help_center')}</li>
          <li>{translate('jobs')}</li>
          <li>{translate('cookie_options')}</li>
          <li>{translate('policy')}</li>
          <li>{translate('terms')}</li>
        </ul>
        <ul>
          <li>{translate('frequently')}</li>
          <li>{translate('investor')}</li>
          <li>{translate('privacy')}</li>
          <li>{translate('speed')}</li>
          <li>{translate('contact_us')}</li>
        </ul>
      </div>
      <div className="footer_item right">
        <img src={process.env.PUBLIC_URL + "/img/footer/app-store.png"} alt="appstore"/>
        <img src={process.env.PUBLIC_URL + "/img/footer/google-play.png"} alt="googleplay"/>
      </div>
    </div>
    <div className="coppy_right">
      <p>{translate('copyright')} <span>@Chien</span> - 2021</p>
    </div>
    </>
  )
}
export default React.memo(FooterMovie);