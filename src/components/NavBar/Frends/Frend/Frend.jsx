import React from 'react';
import s from './Frend.module.css'



const Frend = (props) => {
    return (
        <div>
    
           <img className={s.avatar} src={props.state.avatarImg} alt={props.state.name}/>  
           {props.state.name}
    
        </div>
    )
    
    }
    

export default Frend;