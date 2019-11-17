import Posts from './Posts';
import {AddPost,DeletePost } from '../../../redux/profileReducer';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';



const mstp = (state) => {
    return {
        posts: state.profilePage.posts,
        postText: state.profilePage.postText
    }
}

export default compose(withAuthRedirect,connect(mstp,{AddPost,DeletePost}))(Posts)