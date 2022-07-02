import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sideBar: sidebarReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

type reducersType = typeof reducers;
export type AppStateType = ReturnType<reducersType>

type PropertiesTypes <T> = T extends {[key: string]: infer U} ? U : never

export type actionsType<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store















