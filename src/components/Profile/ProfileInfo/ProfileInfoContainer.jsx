import React , {useEffect} from 'react';
import { connect } from 'react-redux';
import {compose } from 'redux';
import {ChangeStatus,SaveStatusThunk,GetStatusThunk,GetProfileThunk,SaveProfileThunk,SavePhoto} from '../../../redux/profileReducer';
import ProfileInfo from './ProfileInfo';
import {withRouter} from 'react-router-dom';


const ProfileInfoContainer = ({currentUserId,profileLoaded,...props}) => {

    const userIdInURL = props.match.params.userIdInURL;
   
    useEffect(()=>{               
        props.GetProfileThunk(userIdInURL);  
        window.scrollTo(0,0);              
    },[userIdInURL])

    return (
        <div>
            {profileLoaded&&<ProfileInfo userIdInURL = {userIdInURL} isCurrentUser = {userIdInURL == currentUserId} {...props}/>}
        </div>
    )

}

const mstp = (state)=>{
    return {
        status: state.profilePage.status,
        currentUserId: state.auth.userId,
        profile: state.profilePage.profile,
        profileLoaded: state.profilePage.profileLoaded
    }
}

export default compose(
    connect(mstp,{ChangeStatus,SaveStatusThunk,GetStatusThunk,GetProfileThunk,SaveProfileThunk,SavePhoto}),
    withRouter
    )
    (ProfileInfoContainer)

