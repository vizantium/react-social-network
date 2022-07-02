import {getUsersItems, instance} from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<getUsersItems>(`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data);
    },
    deleteFollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data) as Promise<ResponseType>
    },
    Follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}