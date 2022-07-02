import React, {useEffect, useRef, useState} from "react";
import {ChatMessageType} from "../../api/chatAPI";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";




const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state:AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            stopMessagesListening()
        }
    }, [])


    return <div>
        {status === 'error' && <div>Some error occured. Please refresh page.</div>}
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    // const [autoScrollIsActive, setAutoScroll] = useState(false)
    //
    // const scrollHandler = (e) => {
    //
    // }

    // useEffect(() => {
    //     if (autoScrollIsActive) {
    //     messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    //         }
    // }, [messages])

    return <div style = {{height: '400px', overflowY: 'auto'}}>
        {messages.map((m) => <Message  message={m}/>)}
        {/*<div ref={messagesAnchorRef}></div>*/}
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {

    return <div>
        <img src = {message.photo} style={{width: '35px'}}/> <b>{message.userName}</b>
        <br/>{message.message}
        <hr />
    </div>
})

const AddMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const status = useSelector((state:AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if(!message){
            return;
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}


export default ChatPage