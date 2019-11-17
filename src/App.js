import React, {useEffect,Suspense} from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';


import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Preloader from './components/Common/Preloader';
import {connect} from 'react-redux';
import {AuthUserThunk} from './redux/authReducer';
import {store} from './redux/reduxStore';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import withSuspense from './hoc/withSuspense';


const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer'));

const UsersContainer = React.lazy( () => import('./components/Users/UsersContainer'));



const App = (props) => {
  
  useEffect(()=>{

    if (!props.isInit) {
    props.AuthUserThunk();
    }
    
  },[props.isInit])


  return (
    <div>
    {!props.isInit && <Preloader/>}
    {props.isInit && <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className="app-wrapper-content">
        <Route path='/profile' render = {() => <Profile/>}/>
        <Route path='/dialogs/:currentDialogInURL?' render = {withSuspense(DialogsContainer)}/>
        <Route path='/users/:currentPageInURL?' render = {withSuspense(() => <UsersContainer Test={'XXX'}/>)}/>     
        <Route path='/login' render = {() => <Login/>}/>

      </div>
    </div>}
    </div>
  );
}

const mstp = (state)=>{
  return {
  isInit: state.auth.isInit
  }

}

const AppCompnent = connect(mstp,{AuthUserThunk})(App);

const AppSamuraiJS = () => {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <AppCompnent/>
          </Provider>
      </BrowserRouter>
  )
}  


export default AppSamuraiJS;
