import jwt from 'jsonwebtoken';
const KEY_TOKEN = 'reactjs2011B';

const saveToken = (token) => {
  if(token !== null && token !== ''){
    // luu vao local Storage
    localStorage.setItem('token_login', token);
  }
}

const removeToken = () => {
  localStorage.removeItem('token_login');
}

const getTokenFromLocalStorage  = () => {
  const token = localStorage.getItem('token_login');
  return token;
}

const decodeTokenLocalStorage = () => {
  let token = getTokenFromLocalStorage();
  let decodeToken = null;
  if(token !== null && token !== ''){
    decodeToken = jwt.verify(token, KEY_TOKEN);
  }
  return decodeToken;
}

const isEmptyObject = (obj) => {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

const isAuthenticated = () => {
  let token = decodeTokenLocalStorage();
  if(token!==null && token !==''){
    return true;
  }
  return false;
}

export const helpers = {
  isAuthenticated,
  saveToken,
  removeToken,
  decodeTokenLocalStorage,
  isEmptyObject
}