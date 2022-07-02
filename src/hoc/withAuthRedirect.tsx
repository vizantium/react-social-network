// @ts-ignore
import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: any) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}


export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType > = (props) => {
        let {isAuth, ...restProps } = props

        if (!props.isAuth) return <Navigate to={'/login'}/>

        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(
        mapStateToPropsForRedirect,  )
    (RedirectComponent);

    return ConnectedAuthRedirectComponent

}