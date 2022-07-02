import React, {useState} from "react";
// @ts-ignore
import s from "./Paginator.module.css";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (p) => void,
    portionSize: number
}

let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
    }

    let portionCount = Math.ceil( pagesCount / portionSize );
    let [portionNumber, setPortionNumber] = useState<null | number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize


    return (
        <div>
            { portionNumber > 1 &&
                <button onClick={ () => { setPortionNumber(portionNumber - 1 )}}>PREV</button> }
            { pages
                .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                .map((p) => {
                    return <span className={s.num}
                        onClick={(e) => {onPageChanged(p)}}>
                        {p}
                    </span>
                })
            }
            { portionCount > portionNumber &&
            <button onClick={ () => { setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
    )
}

export default Paginator