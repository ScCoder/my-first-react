import React from 'react';
import s from './NavBar.module.css'
import {NavLink} from 'react-router-dom';
import FrendsContainer from './Frends/FrendsContainer';


const NavBar = (props) =>{
    return <nav className={s.nav}>


        <div className={s.nav_item}>
        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
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

export default NavBar;