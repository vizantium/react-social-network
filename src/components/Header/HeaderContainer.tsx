
import {Component} from "react";
import Header, {DispatchHeaderPropsType, MapHeaderPropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import React from "react";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends Component<MapHeaderPropsType & DispatchHeaderPropsType> {
    render () {
        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    logout: () => {}
});
export default connect<MapHeaderPropsType, DispatchHeaderPropsType, {}, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);