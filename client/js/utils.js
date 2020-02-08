/* eslint-disable no-unused-vars */

// liveserver
const baseUrl = 'http://127.0.0.1:3000/api/v1';
const getCookie = (ckname) => {
  const name = `${ckname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieStringArray = decodedCookie.split(';');

  for (let i = 0; i < cookieStringArray.length; i + 1) {
    let cookieString = cookieStringArray[i];
    while (cookieString.charAt(0) === ' ') {
      cookieString = cookieString.substring(1);
    }
    if (cookieString.indexOf(name) === 0) {
      return cookieString.substring(name.length, cookieString.length);
    }
  }
  return '';
};

const checkCookie = (ckname) => {
  const cookieName = getCookie(ckname);
  if (cookieName !== '') {
    return true;
  }
  return false;
};

const setCookie = (ckname, ckvalue, exdays) => {
  const date = new Date();
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${ckname}=${ckvalue};${expires};path=/`;
};
