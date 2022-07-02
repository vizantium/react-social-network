// @ts-ignore
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {


    const classes = s.item + ' ' + s.settings;
    const friends = s.item + ' ' + s.friends;
    return <nav className={s.nav}>
        <div className={`${s.item} ${s.active}`}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to="/profile" >Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to="/dialogs">Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to="/chat">Chat</NavLink>
        </div>
        <div className={s.item}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to={"/news"}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to={"/music"}>Music</NavLink>
        </div>
        <div className={classes}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to={"/settings"}>Settings</NavLink>
        </div>
        <div className={friends}>
            <NavLink className={(navData) => navData.isActive ? s.active : s.item} to={"/users"}>Users</NavLink>
            {/*<SideBar state={props.state}/>*/}
        </div>
    </nav>
}

export default Navbar