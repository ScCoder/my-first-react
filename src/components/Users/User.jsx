import React from 'react';
import s from './User.module.css';

const User = ({userId,name,followed,photos,followedInProgress,FollowThunk}) => {

    const OnSetFollowed = () => {
        FollowThunk(userId,!followed);
    }

    return (<div>
        <div>{name}</div>
        <div><img src={photos.large} className={s.photo} /></div>
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