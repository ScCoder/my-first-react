import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {ChangeStatus,SaveStatusThunk,GetStatusThunk} from '../../../redux/profileReducer';
import ProfileInfo from './ProfileInfo';


// class ProfileInfoContainer extends React.Component {

//     componentDidMount(){
        
//         this.props.GetStatusThunk(this.props.userId);
//     }

//     componentDidUpdate(prevProps){
//         if (this.props.userId != prevProps.userId) {
//             this.props.GetStatusThunk(this.props.userId);
//         }
//     }

//     state = {
//         editMode:false
//     }


//     ActivateEditMode=()=>{
//         this.setState({editMode:true});
//     }

//     DeactivateEditMode=()=>{
//         this.setState({editMode:false});
//         this.props.SaveStatusThunk(this.props.status);
//     }

//     onStatusChange=(e)=>{
//         this.props.ChangeStatus(e.target.value);
//     }


//     render() {
//         return (
//             <div>
                

//                 <ProfileInfo status={this.props.status} editMode={this.state.editMode} ActivateEditMode={this.ActivateEditMode}
//                     DeactivateEditMode={this.DeactivateEditMode} onStatusChange={this.onStatusChange} />

//             </div>
//         )

//     }

// }


const ProfileInfoContainer = ({userId,...props}) => {

    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{    
        props.GetStatusThunk(userId); 
    },[userId])

    const ActivateEditMode = () => {
        setEditMode(true);
    }

    const DeactivateEditMode = () => {
        setEditMode(false);
        props.SaveStatusThunk(props.status);
    }

    const onStatusChange = (e) => {
        props.ChangeStatus(e.target.value);
    }

    return (
        <div>
            {props.status && <ProfileInfo status={props.status} editMode={editMode} ActivateEditMode={ActivateEditMode}
                DeactivateEditMode={DeactivateEditMode} onStatusChange={onStatusChange} />}

        </div>
    )

}

const mstp = (state)=>{
    return {
        status: state.profilePage.status,
        userId: state.auth.userId
    }
}

export default connect(mstp,{ChangeStatus,SaveStatusThunk,GetStatusThunk})(ProfileInfoContainer);
