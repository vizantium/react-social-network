// @ts-ignore
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import React from 'react';

export type MapHeaderPropsType = {
    isAuth: boolean
    login: string
}
export type DispatchHeaderPropsType = {
    logout: () => void
}

const Header: React.FC<MapHeaderPropsType & DispatchHeaderPropsType> = (props) => {
    return <header className={s.header}>
    <img src='https://i.pinimg.com/736x/de/a0/f3/dea0f3b7f480b1151c08db4a402a43b9.jpg' />

        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log Out</button> </div>
                : <NavLink to={'/Login'}>Login</NavLink> }
        </div>
  </header>
}

export default Header