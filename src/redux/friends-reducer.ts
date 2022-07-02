import {updateObjectInArray} from "../utils/object-helpers";
import {PhotosType, UserType} from "../types/types";
import {Dispatch} from "redux";
import {actionsType, AppStateType, BaseThunkType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/usersAPI";



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

export type initialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
            }
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USER_COUNT':
            return {...state, totalUsersCount: action.count}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case "SET_FILTER":
            return {...state, filter: action.payload}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
};

type ActionsType = actionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USER_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

type GetStateType = () => AppStateType
type ThunkType = BaseThunkType<ActionsType>

export const getUsers = (page:number, pageSize:number, filter: FilterType): ThunkType => {
    return async (dispatch, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
        ;
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionsType> , userId:number, apiMethod, actionCreator: (userId:number) =>
    ActionsType) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId:number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.Follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId:number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export type FilterType = typeof initialState.filter
export default userReducer;