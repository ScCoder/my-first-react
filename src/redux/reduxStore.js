import { createStore, combineReducers,applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import navBarReducer from "./navBarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {reducer as formReducer} from 'redux-form';


let redusers = combineReducers(
    {
        dialogPage:dialogsReducer,
        profilePage:profileReducer,
        navBar:navBarReducer,
        usersPage:usersReducer,
        auth: authReducer,
        form: formReducer
    }
)


export let store = createStore(redusers,applyMiddleware(thunkMiddleware));

