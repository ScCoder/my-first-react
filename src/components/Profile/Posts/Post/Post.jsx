import React from 'react';
import s from './Post.module.css';


const Post = (props) => {

    const onDeletePost = ()=>{
        debugger;
        props.DeletePost(props.id);
    }

    return (
        <div className={s.post}>
        <div>{props.message}</div>
        <div>
            <img className={s.avatar} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlmkX_UkGaHPhax-pcVaHDch65_VFr7cwnuts6IvkemXk4hhg9A'/>
             Like {props.likeCount}
        </div>
        <div><button onClick={onDeletePost}>Удалить</button></div>
        
        </div>
    )

}

export default Post;