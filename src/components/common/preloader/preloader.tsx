// @ts-ignore
import s from "../../Friends/Friends.module.css";
// @ts-ignore
import spinner from "../../../assets/images/spinner.svg";
import React from "react";



let Preloader:React.FC = (props) => {
    return <div><img  className={s.svg} src={spinner}/></div>
}

export default Preloader