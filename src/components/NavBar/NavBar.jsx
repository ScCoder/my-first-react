import React from 'react';
import s from './NavBar.module.css'
import {NavLink} from 'react-router-dom';
import FrendsContainer from './Frends/FrendsContainer';
import {connect} from 'react-redux';


const NavBar = ({currentUserId}) =>{
    return <nav className={s.nav}>

        <div className={s.nav_item}>
        <NavLink to={"/profile/"+currentUserId} activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.nav_item}>
        <NavLink to="/dialogs/1" activeClassName={s.active}>Dialogs</NavLink>
        </div>
        <div className={s.nav_item}>
        <NavLink to="/users/1" activeClassName={s.active}>Users</NavLink>
        </div>
        <div className={s.nav_item}>
        <a href="www.vk.ru">vk</a>
        </div>
        <div className={s.nav_item}>
        <a href="http:\\www.habrahabr.ru">habrahabr</a>
        </div>

        <FrendsContainer/>

        </nav>
}

const mstp = (state) =>{
    return {
        currentUserId: state.auth.userId
    }
}

export default connect(mstp,{})(NavBar);