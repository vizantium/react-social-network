import axios from "axios";
import {UserType} from "../types/types";

const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "29d31017-d035-417a-a929-88359367475a"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeWithCaptchaEnum {
    CaptchaIsRequired = 10
}

export type getUsersItems = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}