import {ChatAPI, ChatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";
import {actionsType, BaseThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";


export type StatusType = 'pending' | 'ready' | 'error';
let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState
type ActionsType = actionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
            case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({type: 'MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) =>
        ({type: 'STATUS_CHANGED', payload: {status}} as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null){
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const newStatusChanging = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null){
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.start()
    ChatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    ChatAPI.subscribe('status-changed', newStatusChanging(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.unSubscribe('messages-received', newMessageHandlerCreator(dispatch))
    ChatAPI.unSubscribe('status-changed', newStatusChanging(dispatch))
    ChatAPI.stop()
}
export const sendMessage = (message:string): ThunkType => async (dispatch) => {
    ChatAPI.send(message)
}


export default chatReducer