import React,{useEffect} from 'react';
import s from './DialogsItems.module.css';
import { NavLink } from 'react-router-dom';


const DialogItem = ({ dialog,currentDialogId }) => {


    return (
        <div className={s.dialog}>
            <img className={s.avatar} src={dialog.avatarImg} />
            <NavLink to={'/dialogs/' + dialog.id} className={currentDialogId==dialog.id? s.dialogAcive:s.dialog} >{dialog.name} </NavLink>
        </div>
    )
}


const DialogsItems = ({dialogs,currentDialogId,ChangeCurrentDialog,currentDialogInURL}) => {

    let dialogsElements = dialogs.map(d => <DialogItem dialog = {d} currentDialogId = {currentDialogId}/>)

    useEffect(()=>{
        ChangeCurrentDialog(currentDialogInURL);
    },[currentDialogInURL])
   


    return (
        <div className={s.dialogs_items}>
            {dialogsElements}
        </div>
    )
}



export default DialogsItems;