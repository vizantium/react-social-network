import React from 'react'
// @ts-ignore
import s from './Element.module.css'

const Element = (props) => {
    return(
        <div className={s.elem}>
            <div className={s.circle}></div>
            <div className={s.names}>{props.name}</div>
        </div>
    )
}

export default Element