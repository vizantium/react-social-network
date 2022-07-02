import {instance, ResponseType, ResultCodesEnum, ResultCodeWithCaptchaEnum} from "./api";

type MeResponseDataType = {
     id: number, email: string, login: string
}
type LoginResponseType = {
    userId: number
}
export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodesEnum | ResultCodeWithCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}