// @ts-ignore
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
//import {addMessageActionCreator, messageChangeActionCreator} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {initialStateType} from "../../redux/dialogs-reducer";
import React from "react";

type OwnPropsType = {
    dialogData: initialStateType
    Send: (messageText:string) => void

}
type NewMessageFormType = {
    newMessageText: string
}


const Dialogs: React.FC<OwnPropsType> = (props) => {

    let state = props.dialogData

    let addNewMessage = (values: NewMessageFormType) => {
        props.Send(values.newMessageText)
    }

    let messagesElements = state.messagesData.map(m => <Message message={m.message} key={m.id}/>)

    let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_item}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);

type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength50]}
                       name={"newMessageText"}
                       placeholder={"Enter your name"}></Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormType>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;