import {stopSubmit} from "redux-form";
import {PhotosType, PostDataType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {actionsType, BaseThunkType} from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
    postData: [
        {id: 1, message: 'Hello, how are you?', likesCount: 15},
        {id: 2, message: 'Its my first post', likesCount: 20},
        {id: 3, message: 'Its my second post', likesCount: 23},
        {id: 4, message: 'I learn React', likesCount: 27}
    ] as Array<PostDataType> ,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ''
}

export type initialStateType = typeof initialState;
type ActionType = actionsType<typeof actions>
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>

const profileReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type){
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.NewPostText,
                likesCount: 3
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            };
        }
        case DELETE_POST: {
            return {
                ...state, postData: state.postData.filter(p => p.id != action.postId )
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos:action.photos }
            }
        }
        default:
            return state
    }
};

export const actions = {
    addPostActionCreator: (NewPostText:string) => ({ type: ADD_POST, NewPostText} as const ),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile} as const),
    setStatus: (status:string) => ({ type: SET_STATUS, status} as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(response.data));
    ;
}
export const getStatus = (userId: number): ThunkType => async (dispatch) =>  {
    let response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(response.data));
    ;
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0){
        dispatch(actions.setStatus(status))}
    ;
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0){
         dispatch(actions.savePhotoSuccess(response.data.data.photos))
        }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    // @ts-ignore
    let userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0){
            if (userId != null) {
                dispatch(getUserProfile(userId))
            } else {
                throw new Error("UserId can t be null")
            }
        } else {
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0])
        }
}

export default profileReducer;
