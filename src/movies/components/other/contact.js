import React from 'react';
import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-redux-multilingual';
import {
  MailOutlined,
  FormOutlined,
} from '@ant-design/icons';

function Contact() {
  const translate = useTranslate();
    return (
        <>
            <h3 className="title-section mid">
                <Link to="">{translate('contact_us')}</Link>
              </h3>
              <div className="pricing-list contact">
                <div className="map">
                  <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.584671923504!2d105.81237521532745!3d21.009279393818055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9d0b7b6afb%3A0xb933b0036768fd55!2zMTcyYSBZw6puIEzDo25nLCBMw6FuZyBI4bqhLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1627891393301!5m2!1svi!2s"  allowfullscreen="" loading="lazy"></Iframe>
                </div>
                <div className="form">
                  <p><MailOutlined /> {translate('your_email')}</p>
                  <input className="contact-email" type="email" name="email" placeholder={translate('ex')}/>
                  <p><FormOutlined /> {translate('your_message')}</p>
                  <textarea className="contact-text" placeholder={translate('type_somthing')}/>
                  <div className="pricing-button">
                    <button>{translate('send_message')}</button>
                  </div>
                </div>
              </div>
        </>
    );
}

export default Contact;