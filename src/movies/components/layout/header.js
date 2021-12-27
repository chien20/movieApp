import React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {Menu, Drawer} from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslate, IntlActions } from 'react-redux-multilingual';
import { Link, useLocation, useHistory } from "react-router-dom";
import { helpers } from '../../helpers/common';
import {
  CaretDownOutlined,
  AlignLeftOutlined,
  CaretRightOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const HeaderMovie = () => {
  const [genres, setGenres] = useState([]);
  const history = useHistory();
  const { pathname } = useLocation(); 
  const info = helpers.decodeTokenLocalStorage();
  const [current, setCurrent] = useState(pathname);
  const username = info !== null ? info['username'] : null;

  const translate = useTranslate();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  

  useEffect(() => {
    const getGenres = async () => {
      const dataGenres = await api.genres(translate('language'));
      setGenres(dataGenres.genres);
    }
    getGenres();
  },[translate]);

  const logoutUser = () => {
    helpers.removeToken();
    history.push('/login');
  };


  const handleClickMenu = (e) => {
    setCurrent(e.key);
    console.log(e.key)
  };


  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showChildrenDrawer = (e) => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };


  return(
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/img/logo/logo.png"} alt="logo"/>
          </Link>
        </div>
        <Menu onClick={handleClickMenu} selectedKeys={current} className="mid_menu" mode="horizontal">
          <Menu.Item key="/">
            <Link to="/">{translate('home')}</Link>
          </Menu.Item>
          <Menu.Item key="/popular-movie">
            <Link to="/popular-movie">{translate('popular')}</Link>
          </Menu.Item>
          <Menu.Item key="/latest">
            <Link to="/latest">{translate('latest')}</Link>
          </Menu.Item>
          <SubMenu popupClassName="submenu-custom category" key="/category" title={<span>{translate('category')}  <CaretDownOutlined /></span>}>
            {
              genres?.map((item) => (
              <Menu.Item className="custom-item category" key={`/category/${item.id}`}>
                <Link to={`/category/${item.id}`}>{item.name}</Link>
              </Menu.Item>
              ))
            }
          </SubMenu>
          <Menu.Item key="/casts">
            <Link to="/casts">{translate('cast')}</Link>
          </Menu.Item>
          <Menu.Item key="/search">
            <Link to="/search">{translate('search')}</Link>
          </Menu.Item>
          <Menu.Item key="/up-coming">
            <Link to="/up-coming">{translate('upcoming')}</Link>
          </Menu.Item>
          <Menu.Item className="languages">
            {
              translate('language') === 'en-US' &&
              <p className="language" onClick={() => dispatch(IntlActions.setLocale('vi'))}>Vietnamese</p>
            }
            {
              translate('language') === 'vi' &&
              <p  className="language" onClick={() => dispatch(IntlActions.setLocale('en'))}>English</p>
            }
            </Menu.Item>
          {
            info === null 
            &&
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          }
          {
            info !== null &&
            <SubMenu popupClassName="submenu-custom" key="user" title={<span className="name_user">{translate('hello')} <span className="name">{ username }</span> <CaretDownOutlined /></span>}>
              <Menu.Item className="custom-item" key="logout" onClick={() => logoutUser()}>
                <Link to="">{translate('logout')}</Link>
              </Menu.Item>
            </SubMenu>
          }
          
        </Menu>
      </div>
      <div className="header mobile">
        <AlignLeftOutlined onClick={showDrawer}/>
        <div className="logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/img/logo/logo.png"} alt="logo"/>
          </Link>
        </div>
          <div className="languages">
            {
              translate('language') === 'en-US' &&
              <p className="language" onClick={() => dispatch(IntlActions.setLocale('vi'))}>Vietnamese</p>
            }
            {
              translate('language') === 'vi' &&
              <p  className="language" onClick={() => dispatch(IntlActions.setLocale('en'))}>English</p>
            }
          </div>
      </div>
      <Drawer
        placement="left"
        width="70%"
        height="100%"
        push={false}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu onClick={handleClickMenu} selectedKeys={[current]} mode="inline" theme="dark">
          {
            info === null 
            &&
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          }
          {
            info !== null &&
              <Menu.Item key="logout">
                <div className="user">
                  <p className="name_user">{translate('hello')} <span className="name">{username}</span></p>  
                  <p  onClick={() => logoutUser()} to="">{translate('logout')}</p>
                </div>
              </Menu.Item>
          }
          <Menu.Item key="/">
            <Link to="/">{translate('home')}</Link>
          </Menu.Item>
          <Menu.Item key="/popular-movie">
            <Link to="/popular-movie">{translate('popular')}</Link>
          </Menu.Item>
          <Menu.Item key="/latest">
            <Link to="/latest">{translate('latest')}</Link>
          </Menu.Item>
          <Menu.Item onClick={showChildrenDrawer} key="/category">
            <span>{translate('category')}  <CaretRightOutlined /></span>
          </Menu.Item>
          <Menu.Item key="/casts">
            <Link to="/casts">{translate('cast')}</Link>
          </Menu.Item>
          <Menu.Item key="/search">
            <Link to="/search">{translate('search')}</Link>
          </Menu.Item>
          <Menu.Item key="/up-coming">
            <Link to="/up-coming">{translate('upcoming')}</Link>
          </Menu.Item>
        </Menu>
        <Drawer
            placement="right"
            width="70%"
            height="100%"
            closable={false}
            onClose={onChildrenDrawerClose}
            visible={childrenDrawer}
          >
            <Menu className="category-menu" onClick={handleClickMenu} selectedKeys={pathname} mode="inline" theme="dark">
              {
                genres.map((item) => (
                <Menu.Item key={`/category/${item.id}`}>
                  <Link to={`/category/${item.id}`}>{item.name}</Link>
                </Menu.Item>
                ))
              }
            </Menu>
          </Drawer>
      </Drawer>
    </>
  )
} 
export default React.memo(HeaderMovie);