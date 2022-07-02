// @ts-ignore
import React from 'react'
// @ts-ignore
import s from './Post.module.css'
import {PostDataType} from "../../../../types/types";


type PropsType = {
    message: string
    likeCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
        <div className={s.item}>
          <img className='imgr' src='https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg'/>
          { props.message }
          <div>
            <span>like {props.likeCount}</span>
          </div>
        </div>
  )
}

export default Post