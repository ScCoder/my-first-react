import { Auth } from '../api/api';
import {stopSubmit} from 'redux-form';


const SET_USER_ID = 'SET_USER_ID';
const AUTH_IN_PROGRESS = 'AUTH_IN_PROGRESS';
const SET_IS_INIT = 'SET_IS_INIT';
const GET_CAPTCHA_OK = 'GET_CAPTCHA_OK';

const setAuthUser = (userId, email, login, isAuth = true) => ({ type: SET_USER_ID, data: { userId, email, login },isAuth });
const setAuthInProgress = (value) => ({type: AUTH_IN_PROGRESS, value:value});
const setIsInit = () => ({type:SET_IS_INIT});
const setCapthaURL = (captchaUrl) => ({type:GET_CAPTCHA_OK,captchaUrl});

export const AuthUserThunk = () => {
  return async (dispatch) => {
    dispatch(setAuthInProgress(true));
    const data = await Auth.GetUserAuth();
    if (data.resultCode == 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUser(id, email, login));
    }
    dispatch(setIsInit());
    dispatch(setAuthInProgress(false));
  }
}

export const LoginThunk = (email, password, rememberMe,captcha) => {
  return async (dispatch) => {
    const data = await Auth.Login(email, password, rememberMe,captcha);
    if (data.resultCode === 0) {
      dispatch(AuthUserThunk());
    }else{
      if (data.resultCode === 10){
        dispatch(GetCapthaUrl());
      }
      dispatch(stopSubmit('login',{_error:data.messages[0]}));
    }
  }
}

export const LogOutThunk = () => {
  return async (dispatch) => {
    const resultCode = await Auth.LogOut();
    if (resultCode === 0) {
      dispatch(setAuthUser(null, null, null, false));
    }
  }
}

export const GetCapthaUrl = () =>{
  return async (dispatch) => {
    const url = await Auth.GetCaptchaUrl();    
    dispatch(setCapthaURL(url))    
  }
}




let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    authInProgress:true,
    isInit: false,
    captchaUrl: null
};


const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
        captchaUrl: null
      }
    case AUTH_IN_PROGRESS:
        return {
          ...state,
          authInProgress: action.value
        }
    case SET_IS_INIT:
        return {
          ...state,
          isInit: true
        }
    case GET_CAPTCHA_OK:
          return {
            ...state,
            captchaUrl: action.captchaUrl
          }

    default:
      return state;
  }
}



export default authReducer;