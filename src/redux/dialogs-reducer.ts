import {actionsType} from "./redux-store";

type MessageType = {
    id: number,
    message: string
}
type DialogsType = {
    id: number,
    name: string
}

let initialState =  {
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'what are you doing'},
        {id: 4, message: 'Hello'},
        {id: 5, message: 'Goodbye'},
        {id: 6, message: 'Hi'}
    ] as Array <MessageType>,
        dialogsData: [
        {id: 1, name: 'Dmitrii'},
        {id: 2, name: 'Alexandr'},
        {id: 3, name: 'Alexey'},
        {id: 4, name: 'Iurii'},
        {id: 5, name: 'Ilya'},
        {id: 6, name: 'Valera'}
    ] as Array <DialogsType>
}

export type initialStateType = typeof initialState

type ActionType = actionsType<typeof actions>

const dialogsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type){
        case 'ADD_MESSAGE': {
            let body = action.newMessageText
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 7,message: body }]
            }
        }
        default:
            return state
    }

};

export const actions = {
    addMessageActionCreator: (newMessageText: string) => ({ type: 'ADD_MESSAGE', newMessageText} as const)
}


export default  dialogsReducer;