import {useSelector} from "react-redux";
import React from "react";
import Friends from "./Friends";
import Preloader from "../common/preloader/preloader";
import {getIsFetching} from "../../redux/users-selectors";


type UserPagePropsType = {
    pageTitle: string
}

export const UserPage:React.FC <UserPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <div>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Friends/></div>
}



















