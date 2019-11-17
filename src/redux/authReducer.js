import { Auth } from "../api/api";

const SET_USER_ID = 'SET_USER_ID';
const AUTH_IN_PROGRESS = 'AUTH_IN_PROGRESS';
const SET_IS_INIT = 'SET_IS_INIT';

const setAuthUser = (userId, email, login, isAuth = true) => ({ type: SET_USER_ID, data: { userId, email, login },isAuth });
const setAuthInProgress = (value) => ({type: AUTH_IN_PROGRESS, value:value});
const setIsInit = () => ({type:SET_IS_INIT});


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

export const LoginThunk = (email, password, rememberMe) => {
  return async (dispatch) => {
    const resultCode = await Auth.Login(email, password, rememberMe);
    if (resultCode === 0) {
      dispatch(AuthUserThunk());
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




let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    authInProgress:true,
    isInit: false
};


const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_ID:
      debugger;
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth
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

    default:
      return state;
  }
}



export default authReducer;