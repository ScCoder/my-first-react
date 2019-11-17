import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {LogOutThunk} from '../../redux/authReducer';

const Header = (props) => {

    const OnLogOut = () =>{
        props.LogOutThunk();
    }

    return (
        <header className={s.header}>
            <div>header</div>
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
        isAuth: state.auth.isAuth
    }

}

export default connect(mstp,{LogOutThunk})(Header);