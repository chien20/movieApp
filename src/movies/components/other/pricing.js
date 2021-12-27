import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-redux-multilingual';

function Pricing(props) {
    const translate = useTranslate();
    return (
        <>
            <h3 className="title-section mid">
                <Link to="">{translate('pricing')}</Link>
            </h3>
            <div className="pricing-list">
                <div className="pricing-item">
                <div className="pricing">
                    <p>{translate('basic')}</p>
                    <p className="bold">{translate('free')}</p>
                </div>
                <ul className="list">
                    <li>{translate('originals')}</li>
                    <li>{translate('swich')}</li>
                    <li>{translate('re_full_hd')}</li>
                    <li className="del">{translate('65')}</li>
                    <li className="del">{translate('tv')}</li>
                </ul>
                <div className="pricing-button">
                    <button>{translate('register')}</button>
                </div>
                </div>
                <div className="pricing-item">
                <div className="pricing">
                    <p>{translate('vip')}</p>
                    <p className="bold">$65.99 <span>/{translate('month')}</span></p>
                </div>
                <ul className="list">
                    <li>{translate('originals')}</li>
                    <li>{translate('swich')}</li>
                    <li>{translate('re_4k')}</li>
                    <li>{translate('65')}</li>
                    <li>{translate('tv')}</li>
                </ul>
                <div className="pricing-button">
                    <button>{translate('register')}</button>
                </div>
                </div>
                <div className="pricing-item">
                <div className="pricing">
                    <p>{translate('premium')}</p>
                    <p className="bold">$35.99 <span>/{translate('month')}</span></p>
                </div>
                <ul className="list">
                    <li>{translate('originals')}</li>
                    <li>{translate('swich')}</li>
                    <li>{translate('re_2k')}</li>
                    <li>{translate('65')}</li>
                    <li className="del">{translate('tv')}</li>
                </ul>
                <div className="pricing-button">
                    <button>{translate('register')}</button>
                </div>
                </div>
            </div>
        </>
    );
}

export default Pricing;