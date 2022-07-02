// @ts-ignore
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from 'react';

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}



export default DialogItem;