import React from 'react';
import { useTranslate } from 'react-redux-multilingual';

function NoData() {
    const translate = useTranslate();
    return (
        <div className="no-data">
            <img src={process.env.PUBLIC_URL + "/img/icons/icon-empty.svg"} alt="nodata"/>
            <p><span>{translate('nodata')}</span><br/>{translate('nodata_des')}</p>
        </div>
    );
}

export default React.memo(NoData);