import React from 'react';

const ProfileInfo = (props)=> {
        return(
         <div>
            <div>
                <img src="http://www.radionetplus.ru/uploads/posts/2013-04/thumbs/1365401196_teplye-oboi-1.jpeg" width='300px'></img>
            </div>
            {!props.editMode && <div onClick={props.ActivateEditMode}> {props.status}</div> }
            {props.editMode && <textarea autoFocus={true} onBlur={props.DeactivateEditMode} onChange={props.onStatusChange} value={props.status}/> }
        </div>
        )

}

export default ProfileInfo;
