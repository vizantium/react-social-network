// @ts-ignore
import {maxLengthCreator, required} from "../../../utils/validators/validators.ts";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
// @ts-ignore
import {Textarea} from "../../common/FormsControls/FormsControls.tsx";


type PropsType = {

}

export type AddPostFormsValuesType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm: React.FC<InjectedFormProps<AddPostFormsValuesType, PropsType> & PropsType> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={"NewPostText"} placeholder={"Post message"}
                   validate={[required, maxLength10]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>)
}

export default reduxForm<AddPostFormsValuesType, PropsType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)