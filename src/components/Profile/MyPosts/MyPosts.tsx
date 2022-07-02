// @ts-ignore
import s from './MyPosts.module.css'
// @ts-ignore
import Post from './Post/Post.tsx'
// @ts-ignore
import React from 'react'
import handleSubmit from "redux-form/lib/handleSubmit";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
// @ts-ignore
import {maxLengthCreator, required} from "../../../utils/validators/validators.ts";
// @ts-ignore
import {Textarea} from "../../common/FormsControls/FormsControls.tsx";
// @ts-ignore
import AddNewPostForm, {AddPostFormsValuesType} from "./AddNewPost.tsx";
import {PostDataType} from "../../../types/types";

export type MapPropsType = {
    postData: Array<PostDataType>
}
export type DispatchPropsType = {
    addPost: (newPostText : string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let addPost = (values: AddPostFormsValuesType) => {
        props.addPost(values.NewPostText);
    }

    let postsElement = props.postData.map(p => <Post key={p.id} message={p.message} likeCount={p.likesCount}/>)

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostForm onSubmit={addPost}/>
        <div className={s.posts}>
            {postsElement}
        </div>
    </div>
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized