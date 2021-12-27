import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-redux-multilingual';

function Team() {
  const translate = useTranslate();
    return (
        <>
            <h3 className="title-section mid">
                <Link to="">{translate('team')}</Link>
              </h3>
              <div className="teams">
                <div className="team">
                  <div className="team-wapper">
                    <img src={process.env.PUBLIC_URL + "/img/team/cap.jpg"} alt="cap"/>
                  </div>
                  <h4>{translate('captain')}</h4>
                  <p>{translate('ceo')}</p>
                </div>
                <div className="team">
                  <div className="team-wapper">
                    <img src={process.env.PUBLIC_URL + "/img/team/thor.jpg"} alt="thor"/>
                  </div>
                  <h4>{translate('thor')}</h4>
                  <p>{translate('ceo')}</p>
                </div>
                <div className="team">
                  <div className="team-wapper">
                    <img src={process.env.PUBLIC_URL + "/img/team/iron.jpg"} alt="iron"/>
                  </div>
                  <h4>{translate('iron')}</h4>
                  <p>{translate('ceo')}</p>
                </div>
                <div className="team">
                  <div className="team-wapper">
                    <img src={process.env.PUBLIC_URL + "/img/team/doc.jpeg"} alt="doc"/>
                  </div>
                  <h4>{translate('doctor')}</h4>
                  <p>{translate('ceo')}</p>
                </div>
              </div>
        </>
    );
}

export default Team;