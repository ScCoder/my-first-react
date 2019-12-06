import React,{useEffect} from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {LogOutThunk} from '../../redux/authReducer';
import {GetServerName} from '../../redux/yodaReducer'

const Header = (props) => {

    const OnLogOut = () =>{
        props.LogOutThunk();
    }

    useEffect(()=>{               
        props.GetServerName();         
    },[])


    return (
        <header className={s.header}>
            <div>header</div>
            <div>My server: {props.yodaServerName}</div>
            {props.isAuth
                ? <div className={s.loginName}>{props.login} id={props.userId} <button onClick ={OnLogOut}>LogOut</button> </div>
                : <NavLink to="/login" className={s.loginLink}>Login</NavLink>
            }

        </header>
    )
}

const mstp = (state) => {
    return {
        login: state.auth.login,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        yodaServerName: state.yoda.serverName
    }

}

export default connect(mstp,{LogOutThunk,GetServerName})(Header);