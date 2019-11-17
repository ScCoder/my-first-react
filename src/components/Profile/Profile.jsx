import React from 'react';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';



const Profile = (props) =>{
    return  <div>
        <ProfileInfoContainer/>
        <PostsContainer/>
    </div>
}

export default Profile;