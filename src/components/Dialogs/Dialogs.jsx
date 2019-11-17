import React from 'react';
import s from './Dialogs.module.css';
import Messages from './Messages/Messages';
import DialogsItems from './DialogsItems/DialogsItems';


const Dialogs = ({ dialogs, currentDialogId,ChangeCurrentDialog, messages, AddMessage,...props }) => {

    return (
        <div className={s.dialogs}>
            <DialogsItems dialogs={dialogs} currentDialogId={currentDialogId} ChangeCurrentDialog = {ChangeCurrentDialog} currentDialogInURL = {props.match.params.currentDialogInURL}/>
            <Messages messages={messages} AddMessage={AddMessage} />
        </div>
    )
}

export default Dialogs;