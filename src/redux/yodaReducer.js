import { Yoda } from '../api/yodaApi';

let initialState = {
  serverName: null,
};

const SET_SERVER_NAME = 'scorp/yodaReducer/SET_SERVER_NAME';

const setServerName = (serverName) =>({type:SET_SERVER_NAME, serverName});



export const GetServerName = () =>{
  return async (dispatch) => {
    const data = await Yoda.GetServerName();
    if (data.resultCode===0){
        dispatch(setServerName(data.serverName));
    }
  }
}

const yodaReducer = (state = initialState,action) => {

    switch (action.type){
      case SET_SERVER_NAME:
        return {
          ...state,
          serverName: action.serverName
        }
      default:
        return state
    }
}

export default yodaReducer;

