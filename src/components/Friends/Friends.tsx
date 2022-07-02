import Paginator from '../common/Paginator/Paginator';
import Friend from "./Friend";
import React, {FC, useEffect} from "react";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, getUsers, unfollow} from "../../redux/friends-reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUserss
} from "../../redux/users-selectors";
import {useDispatch, useSelector} from 'react-redux';
import { createBrowserHistory } from "history"

type PropsType = {

}

const Friends: FC<PropsType> = (props) => {

    const users = useSelector(getUserss)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const history = createBrowserHistory()

    type PropsQuery = {term?: string, page?: string, friend?: string}

    const queryString = require('query-string')

    useEffect(() => {

        const parsed: PropsQuery = queryString.parse(history.location.search)

        let actualPage = currentPage
        let actualFilter = filter

        if(parsed.page) {actualPage = Number(parsed.page)}

        if(parsed.term) {actualFilter = {...actualFilter, term: parsed.term as string}}

        switch(parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
        debugger;
    },[])

    useEffect(() => {

        const query: PropsQuery = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: "/users",
            search:  queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    const follows = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollows = (userId: number) => {
        dispatch(unfollow(userId))
    }


    return (
        <div>

            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={10}/>
            <div>
                {users.map(u => <Friend user={u}
                                              followingInProgress={followingInProgress}
                                              unfollow={unfollows}
                                              follow={follows}
                                              key={u.id}/>)
                }
            </div>
        </div>
    )
}

export default Friends