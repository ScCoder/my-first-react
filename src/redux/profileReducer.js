import { SaveStatus, GetStatus } from "../api/api";

export const ADD_POST = "ADD-POST";
export const DELETE_POST = "DELETE-POST";
export const STATUS_CHANGED = "STATUS_CHANGED";

export const AddPost = (text) =>({type:ADD_POST,text})

export const DeletePost = (postId) =>({type:DELETE_POST,postId})

export const ChangeStatus = (text)=>({type:STATUS_CHANGED,text})

let initialState ={
    posts: [
        { id: 1, message: "Hello!", likeCount: 10 },
        { id: 2, message: "Привет реакт!", likeCount: 1000 },
        { id: 3, message: "Будем бомбить!", likeCount: 100 }
    ],
    status:null
};

export const SaveStatusThunk = (status) => {
    return async (dispath) => {
        const resultCode = await SaveStatus(status)
        if (resultCode == 0) {
            dispath(ChangeStatus(status));
        }
    }
}
export const GetStatusThunk = (userId) => {
    return async (dispath) =>{
        const status = await GetStatus(userId)
        dispath(ChangeStatus(status))
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
        default:

            return state;
    }
}

export default profileReducer;