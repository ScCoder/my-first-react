import React from 'react';
import s from './Messages.module.css';
import {Field,reduxForm} from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { TextArea } from '../../FormControls/FormControls';

const Message = ({ MessageItem }) => {

    return (
        <div className={s.message}>
            {MessageItem.message}
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='messageText' component={TextArea} placeholder="write message here" validate={required} />
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}

const Messages = ({ messages, AddMessage }) => {

    const onAddMassage = (values) => {

        AddMessage(values.messageText);

    }

    let messagesElements = messages.map(m => <Message MessageItem={m} />)

    return (
        <div className={s.messages}>
            {messagesElements}
            <div>
                <AddMessageReduxForm onSubmit={onAddMassage} />
            </div>
        </div>
    )
}



const AddMessageReduxForm = reduxForm({ form: 'DialogsAddMessageForm' })(AddMessageForm);



export default Messages;