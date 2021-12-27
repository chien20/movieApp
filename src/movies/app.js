import React from 'react';
import RouterApp from './route/route';
import translations from './translations/translations';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

let reducers = combineReducers(Object.assign({}, { Intl }));
let store = createStore(reducers, { Intl: { locale: 'en'}});

const AppMovie = () => {

  return (
      <Provider store={store}>
        <IntlProvider translations={translations}>
          <RouterApp/>
        </IntlProvider>
      </Provider>
  )
}
export default AppMovie;