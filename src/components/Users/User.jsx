import React from 'react';
import s from './User.module.css';

const User = ({userId,name,followed,photos,followedInProgress,FollowThunk,history}) => {

    const OnSetFollowed = () => {
        FollowThunk(userId,!followed);
    }

    const OnImageclicked = () => {
        history.push("/profile/"+userId);
    }

    return (<div>
        <div>{name}</div>
        <div><img src={photos.large} className={s.photo} onClick = {OnImageclicked} /></div>
        <div>
            {
                followed
                    ? (<button onClick={OnSetFollowed} disabled={followedInProgress}>UnFollow</button>)
                    : (<button onClick={OnSetFollowed} disabled={followedInProgress}>Follow</button>)
            }
        </div>
    </div>)
}

export default User;