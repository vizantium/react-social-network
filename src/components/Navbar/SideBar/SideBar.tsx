import Element from "./Element/Element";
import React from "react";

const SideBar = (props) => {
    let Elements = props.state.map( n => <Element name={n.name}/>)

    return (
        <div>
            {Elements}
        </div>
    )
}

export default SideBar