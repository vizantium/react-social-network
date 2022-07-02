// @ts-ignore
import React from "react";

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void,

}

type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component {
    props: PropsType

    state: StateType = {
        editMode: false,
        // @ts-ignore
        status: this.props.status
    }

    activateEditMode = () => {
        // @ts-ignore
        this.setState({
            editMode: true,
        })
    }
    deactivateEditMode = () => {
        // @ts-ignore
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        // @ts-ignore
        this.setState({
            status: e.currentTarget.value
        });

    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status){
            // @ts-ignore
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
       return (
           <div>
               {!this.state.editMode &&
               <div>
                   <span onDoubleClick={this.activateEditMode}>{this.props.status || "-----"}</span>
               </div>
               }
               {this.state.editMode &&
               <div>
                   <input onChange={this.onStatusChange} autoFocus={true}
                          onBlur={this.deactivateEditMode} value={this.state.status}></input>
               </div>
               }
           </div>
       )
   }
}

export default ProfileStatus