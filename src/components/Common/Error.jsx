import React from 'react';
import s from './Error.module.css';

const Error = ({error})=>{
    return(
        <div>
            {error&&<div className={s.Error}>{error}</div>}
        </div>
    )
}

export default Error;