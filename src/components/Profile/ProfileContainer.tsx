// @ts-ignore
import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (text: string) => void,
    savePhoto: (file) => void,
    saveProfile: (profile: ProfileType) => void
}

type PathParamsType = {
    userId: any,
    router: any
}


type PropsType = MapPropsType & DispatchPropsType & PathParamsType;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }


    componentDidMount() {

        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType, snapshot: PropsType) {
        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
    connect<MapPropsType, DispatchPropsType,{}, AppStateType>
    (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}))
(withRouter(ProfileContainer))
