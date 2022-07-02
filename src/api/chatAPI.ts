import {StatusType} from "../redux/chat-reducer";

const subscribers = {
    'messages-received': [] as NewMessagesSubscribersType[],
    'status-changed': [] as StatusChangedSubscribersType[]
}
let ws: WebSocket

type eventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
    NotifySubcribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e) => {
    let newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages))
};
const openHandler = (e) => {
    NotifySubcribersAboutStatus('ready')
};
const errorHandler = (e) => {
    NotifySubcribersAboutStatus('error')
    console.log('RESTART PAGE')
};

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const NotifySubcribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}


function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    NotifySubcribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}

export const ChatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: eventsNamesType, callback: NewMessagesSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unSubscribe(eventName: eventsNamesType, callback: NewMessagesSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    send(message: string) {
        ws?.send(message)
    }
}

type NewMessagesSubscribersType = (message: ChatMessageType[]) => void
type StatusChangedSubscribersType = (status: StatusType) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}