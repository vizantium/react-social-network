// @ts-ignore
import s from "./Friends.module.css";
// @ts-ignore
import userPhoto from "../../assets/images/22-220721_circled-user-male-type-user-colorful-icon-png.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
// @ts-ignore
import React from "react";

type PropsType = {
    user: UserType;
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void

}

let Friend: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <span>
                <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.locations.country'}</div>
                            <div>{'user.locations.city'}</div>
                        </span>
                    </span>
        </div>)
}

export default Friend