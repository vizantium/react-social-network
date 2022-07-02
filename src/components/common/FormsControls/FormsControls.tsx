// @ts-ignore
import React from "react";
// @ts-ignore
import s from "./FormsControls.module.css"
import {Field, WrappedFieldProps} from "redux-form";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return(
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
        <div>
                {children}
            </div>
            { hasError && <span>{error}</span> }
        </div>
            )
}

export const Textarea = (props: WrappedFieldProps) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta,  ...restProps} = props;
   return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    //const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/> </FormControl>

}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    return <div>
        <Field placeholder={placeholder} name={name}
               validators={validators}
               component={component}
            {...props}  /> {text}
    </div>
}