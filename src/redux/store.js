import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";



export const store = {
    _state : {
        dialogPage: {

            dialogs: [
                { name: 'Dima', id: 1, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Any', id: 2, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi1wDDX23hD2Uq0bTevlE65BBk2Fm21KeK5hoE6DwP0ZvmiNQs" },
                { name: 'Ivan', id: 3, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Sasha', id: 4, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Dima', id: 1, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Any', id: 2, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Ivan', id: 3, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Sasha', id: 4, avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" }
            ],

            messages: [
                { message: 'By!!' },
                { message: 'Cool!!' },
                { message: 'Very good!!' },
                { message: 'Very cool!!' }
            ],
            messageText: ''
        }
        , profilePage: {
            posts: [
                { message: "Hello!", likeCount: 10 },
                { message: "Привет реакт!", likeCount: 1000 },
                { message: "Будем бомбить!", likeCount: 100 }
            ],
            postText: ''
        },
        navBar: {
            frends: [
                { name: 'Dima', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Sasha', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
                { name: 'Vova', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" }
            ]

        }
    },
    _callSubscriber(state){
        //будет переопределена
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    
    getState(){
        return this._state;

    },

    dispatch(action){

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
        this._callSubscriber(this._state);
    }



}
