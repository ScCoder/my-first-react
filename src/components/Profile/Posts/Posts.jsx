import React from 'react';
import Post from './Post/Post';
import s from './Posts.module.css';
import {Field,reduxForm} from 'redux-form';
import { required, maxLengthValidatorCreator } from '../../../utils/validators/validators';
import { TextArea } from '../../FormControls/FormControls';

const Posts = ({posts,AddPost,DeletePost}) => {

    let PostElements = posts.map( p => <Post key={p.id} message={p.message} likeCount={p.likeCount} id = {p.id} DeletePost = {DeletePost} /> )

    let onAddPost = (values) => {
        AddPost(values.postText);
    }

    return (
        <div className={s.posts}>
            <AddPostReduxForm onSubmit={onAddPost}/>
        <div>    
            {PostElements}
        </div>
        </div>
    )

}

const maxLength15 = maxLengthValidatorCreator(15);

const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='postText' component = {TextArea} placeholder='write text here' validate = {[required,maxLength15]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({form:'PostsAddPostForm'})(AddPostForm);

export default Posts;