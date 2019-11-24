import {ProfileApi} from '../api/api';
import {stopSubmit} from 'redux-form';

export const ADD_POST = "ADD-POST";
export const DELETE_POST = "DELETE-POST";
export const STATUS_CHANGED = "STATUS_CHANGED";
export const CHANGE_PHOTOS = "CHANGE_PHOTOS";
export const CHANGE_PROFILE = "CHANGE_PROFILE";
export const PROFILE_LOADED = "PROFILE_LOADED";

export const AddPost = (text) =>({type:ADD_POST,text})

export const DeletePost = (postId) =>({type:DELETE_POST,postId})

export const ChangeStatus = (text)=>({type:STATUS_CHANGED,text})

export const ChangeProfile = (profile)=>({type:CHANGE_PROFILE,profile})

export const SetProfileLoaded = (profileLoaded) =>({type:PROFILE_LOADED,profileLoaded})

let initialState ={
    posts: [
        { id: 1, message: "Hello!", likeCount: 10 },
        { id: 2, message: "Привет реакт!", likeCount: 1000 },
        { id: 3, message: "Будем бомбить!", likeCount: 100 }
    ],
    status:null,
    profile:{
        aboutMe: null,
        contacts: {facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null,
        },
        fullName: "kdoch",
        lookingForAJob: false,
        lookingForAJobDescription: null,
        photos: {small: null, large: null},
        userId: null
    },
    profielLoaded: false
};

export const SaveStatusThunk = (status) => {
    return async (dispath) => {
        const resultCode = await ProfileApi.SaveStatus(status)
        if (resultCode == 0) {
            dispath(ChangeStatus(status));
        }
    }
}
export const GetStatusThunk = (userId) => {
    return async (dispath) => {
        const status = await ProfileApi.GetStatus(userId)
        dispath(ChangeStatus(status))
    }
}

export const GetProfileThunk = (userId) => {
    return async (dispath) => {
        dispath(SetProfileLoaded(false));
        const profile = await ProfileApi.GetProfile(userId);
        debugger;
        dispath(ChangeProfile(profile));
        dispath(SetProfileLoaded(true));
    }
}

export const SaveProfileThunk = (profile) => {
    return async (dispath,getState) => {
        
        const data = await ProfileApi.SaveProfile(profile);
        if (data.resultCode === 0){
           dispath(GetProfileThunk(getState().auth.userId));     
        }else{
            let errors = parseErrors(data);
            dispath(stopSubmit('profileData',errors));
        }
        
        
    }
}




export const SavePhoto = (photoFile) => { 
    return async (dispath,getState) => {
        const userId = getState().auth.userId;
        const resultCode = await ProfileApi.SavePhoto(photoFile);
        if (resultCode==0) {
           dispath(GetProfileThunk(userId));
        }
    }
}




const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            const maxId = state.posts.reduce( (prev, current) => {
                    return (prev.id > current.id) ? prev.id : current.id
                 },0);

            return {
                ...state,
                posts: [ ...state.posts,({id:maxId+1, message: action.text, likeCount: 0 })]
            }
        case STATUS_CHANGED:
                return {
                    ...state,
                    status: action.text
                }
        case DELETE_POST:
                    return {
                        ...state,
                        posts: state.posts.filter( (el) => { return el.id != action.postId})
                    }
        case CHANGE_PROFILE:
                    return{
                        ...state,
                        profile: action.profile
                    }
        case PROFILE_LOADED:
            return{
                ...state,
                profileLoaded: action.profileLoaded
            }
        default:

            return state;
    }
}

export default profileReducer;

function parseErrors(data) {
    const INVALID_URL_FORMAT = 'Invalid url format';
    const FIELD_IS_REQUIRED = 'field is required';
    let contactsErrors = {};
    let errors = {};
    data.messages.forEach(errorMessage => {
        if (errorMessage.indexOf(INVALID_URL_FORMAT) >= 0) {
            const contactsIndex = errorMessage.indexOf('Contacts->');
            if (contactsIndex >= 0) {
                const startNameIndex = contactsIndex + 'Contacts->'.length;
                const endNameIndex = errorMessage.indexOf(')', startNameIndex);
                const nameOfContact = errorMessage.slice(startNameIndex, endNameIndex).toLowerCase();
                contactsErrors[nameOfContact] = INVALID_URL_FORMAT;
            }
        }
        if (errorMessage.indexOf(FIELD_IS_REQUIRED) >= 0) {
            const startNameIndex = errorMessage.indexOf('(') + 1;
            const endNameIndex = errorMessage.indexOf(')', startNameIndex);
            const nameOfFieldUpperFirst = errorMessage.slice(startNameIndex, endNameIndex);
            const nameOfField = nameOfFieldUpperFirst.charAt(0).toLowerCase() + nameOfFieldUpperFirst.slice(1);
            errors[nameOfField] = FIELD_IS_REQUIRED;
        }
    });
    errors['contacts'] = contactsErrors;
    return errors;
}
