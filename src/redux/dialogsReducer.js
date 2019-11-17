
export const ADD_MESSAGE = "ADD-MESSAGE";
export const CHANGE_CURRENT_DIALOG = "CHANGE_CURRENT_DIALOG";

export const AddMessage = (text) => ({type:ADD_MESSAGE,text});

export const ChangeCurrentDialog = (id) => ({type:CHANGE_CURRENT_DIALOG,id});


let initialState = {

    dialogs: [
        { id: 1, name: 'Dima', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
        { id: 2, name: 'Any', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi1wDDX23hD2Uq0bTevlE65BBk2Fm21KeK5hoE6DwP0ZvmiNQs" },
        { id: 3, name: 'Ivan', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
        { id: 4, name: 'Sasha', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
        { id: 5, name: 'Dima', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
        { id: 6, name: 'Any', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
    ],

    messages: [
        { message: 'By!!' },
        { message: 'Cool!!' },
        { message: 'Very good!!' },
        { message: 'Very cool!!' }
    ],

    dalogMessages: [
        {
            dialogId: 1, messages: [
                { message: 'By!!' },
                { message: 'Cool!!' },
                { message: 'Very good!!' },
                { message: 'Very cool!!' }
            ]
        },

        {
            dialogId: 2, messages: [
                { message: '2!!' },
                { message: '2222l!!' },
                { message: '2222 good!!' },
                { message: '2222 cool!!' }
            ]
        },

        {
            dialogId: 3, messages: [
                { message: '333!!' },
                { message: '333l!!' },
                { message: '3333 good!!' },
                { message: '33333 cool!!' }
            ]
        },
        {
            dialogId: 4, messages: [
                { message: 'By!!' },
                { message: 'Cool!!' },
                { message: 'Very good!!' },
                { message: 'Very cool!!' }
            ]
        },

        {
            dialogId: 5, messages: [
                { message: '2!!' },
                { message: '2222l!!' },
                { message: '2222 good!!' },
                { message: '2222 cool!!' }
            ]
        },

        {
            dialogId: 6, messages: [
                { message: '333!!' },
                { message: '333l!!' },
                { message: '3333 good!!' },
                { message: '33333 cool!!' }
            ]
        },

    ],

    currentDialogId: 1
};


const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_MESSAGE:

            const newMessages = [...state.messages, ({ message: action.text })];
                            
            return {
                ...state,
                messages: newMessages,
                dalogMessages: getNewDialogsMessages(state, newMessages)                
            }
        case CHANGE_CURRENT_DIALOG:

            return {
                ...state,
                messages: getCurrentMessages(state, action),
                currentDialogId: action.id
            }
        default:
            return state;
    }
}

export default dialogsReducer;

function getCurrentMessages(state, action) {
    return [...state.dalogMessages].find(x => x.dialogId == action.id).messages;
}

function getNewDialogsMessages(state, newMessages) {
    return state.dalogMessages.map(o => {
        if (o.dialogId == state.currentDialogId) {
            return { dialogId: state.currentDialogId, messages: newMessages };
        }
        return o;
    });
}
