import { AddMessage,ChangeCurrentDialog } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {withRouter} from 'react-router';


let mstp = (state) => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        currentDialogId: state.dialogPage.currentDialogId
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mstp,{AddMessage,ChangeCurrentDialog}))
    (Dialogs);