import React, { lazy, Suspense } from "react";
import { useTranslate } from 'react-redux-multilingual';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { helpers } from '../helpers/common';

const Home = lazy(() => import('../pages/home/home'));
const SearchPage = lazy(() => import('../pages/search/search'));
const PopularPage = lazy(() => import('../pages/popular/popular'));
const LatestPage = lazy(() => import('../pages/latest/latest'));
const LoginPage = lazy(() => import('../pages/login/login'));
const CastsPage = lazy(() => import('../pages/casts/castsList'));
const UpcomingPage = lazy(() => import('../pages/upcoming/upcoming'));
const DetailPage = lazy(() => import('../pages/detail/detail'));
const Category = lazy(() => import('../pages/category/category'))

const PrivateRouter = ({ children, ...rest }) => {
  const auth = helpers.isAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) => auth 
              ? ( children )
              : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
            }
    />
  )
}

const IsLoginRouter = ({ children, ...rest }) => {
  const auth = helpers.isAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) => auth 
              ? (<Redirect to={{ pathname: "/", state: { from: location } }} />)
              : (children)
            }
    />
  )
}

const RouterMovie = () => {
  const translate = useTranslate();
  return (
    <Router>
      <Suspense fallback={
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
      }>
        <Switch>
          <PrivateRouter path="/" exact>
            
              <Home/>
            
          </PrivateRouter>
          <PrivateRouter path="/search">
            
              <SearchPage/>
            
          </PrivateRouter>
          <PrivateRouter path="/popular-movie">
            
              <PopularPage/>
            
          </PrivateRouter>
          <PrivateRouter path="/casts">
            
              <CastsPage/>
            
          </PrivateRouter>
          <PrivateRouter path="/category/:genre">
            
              <Category/>
            
          </PrivateRouter>
          <PrivateRouter path="/latest">
            
              <LatestPage/>
            
          </PrivateRouter>
          <PrivateRouter path="/up-coming">
            
              <UpcomingPage/>
            
          </PrivateRouter>
          <PrivateRouter path="/movie-detail/:slug~:id">
            
              <DetailPage/>
            
          </PrivateRouter>

          <IsLoginRouter path="/login">
            <LoginPage/>
          </IsLoginRouter>
        </Switch>
      </Suspense>
    </Router>
  )
}
export default React.memo(RouterMovie);