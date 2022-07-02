import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import React from "react";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogData: state.messagesPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs);