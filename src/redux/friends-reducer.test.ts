import userReducer, {actions, initialStateType} from "./friends-reducer";
import {UserType} from "../types/types";

let state: initialStateType
//
// beforeEach(() => {
//     state = {
//         users: [
//             {id: 0, followed: false, name: 'alexandr', status:'status', photos: {large: null, small: null}},
//             {id: 1, followed: false, name: 'alexandr1', status:'status', photos: {large: null, small: null}},
//             {id: 2, followed: true, name: 'alexandr2', status:'status', photos: {large: null, small: null}},
//             {id: 3, followed: true, name: 'alexandr3', status:'status', photos: {large: null, small: null}}
//         ] as Array<UserType>,
//         pageSize: 5,
//         totalUsersCount: 1,
//         currentPage: 1,
//         isFetching: false,
//         followingInProgress: [] as Array<number>,
//         filter: {
//             term: ''
//         }
//     }
// })

test("follow success", () =>{

    const newState = userReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success", () =>{

    const newState = userReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()

})