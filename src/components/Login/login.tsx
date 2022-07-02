import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
// @ts-ignore
import s from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} type={"password"}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> remember me
            </div>
            {captchaUrl && <img className={s.captcha} src={captchaUrl}/>}
            { captchaUrl && <div>
                <Field placeholder={"Symbols from image"} name={"captcha"}
                       component={Input}  validate={[required]}/>
                </div>
            }

            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps >({form: 'login'})(LoginForm)

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean,
    captcha: string
}

export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={"/profile/22863"}/>
    }

    return (<div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}
