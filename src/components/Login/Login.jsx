import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { Input } from '../FormControls/FormControls';
import { minLengthValidatorCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import {LoginThunk} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';

const minLength5 = minLengthValidatorCreator(5);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="login" placeholder='Login' component={Input} validate = {[required]} />
            </div>
            <div>
                <Field type = 'Password' placeholder='Password' component={Input} name='password' validate = {[required,minLength5]} />
            </div>
            <div>
                <Field type={'checkbox'} component='input' name='rememberMe' />Remember me
            </div>
            <div>
                <button>Login</button>
            </div>

        </form>

    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({isAuth,LoginThunk}) => {

    const onLogin = (values) =>{

        LoginThunk(values.login,values.password,values.rememberMe);
        
    }


    return (
        <div> 
            {(isAuth) && <Redirect to='/profile'/> }
            
            <div>   
                <h1>LOGIN {!isAuth && 'NOT'} {isAuth && 'TRUE'} </h1>
            </div>
            <div>
                <LoginReduxForm onSubmit={onLogin}/>
            </div>
        </div>
    )

}

const mstp = (state) =>{
    return {isAuth: state.auth.isAuth};
}

export default connect(mstp,{LoginThunk})(Login);