// @ts-ignore
import React from 'react'
// @ts-ignore
import {actions} from "../../../redux/profile-reducer.ts";
// @ts-ignore
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts.tsx";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (NewPostText) => {
            dispatch(actions.addPostActionCreator(NewPostText))
        }
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer