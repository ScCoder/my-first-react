import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { Input } from '../FormControls/FormControls';
import { minLengthValidatorCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import {LoginThunk} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';
import Error from '../Common/Error';
import { tsPropertySignature } from '@babel/types';

const minLength5 = minLengthValidatorCreator(5);

const LoginForm = ({handleSubmit,error,captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Error error = {error} />
            <div>
                <Field name="login" placeholder='Login' component={Input} validate = {[required]} />
            </div>
            <div>
                <Field name='password' type = 'Password' placeholder='Password' component={Input}  validate = {[required,minLength5]} />
            </div>
            <div>
                <Field name='rememberMe' type={'checkbox'} component='input'  />Remember me
            </div>
            <div>
            {captchaUrl&& <img src={captchaUrl}/>}
            {captchaUrl&& <Field name='captcha' placeholder='Input symbols' component={Input}  validate = {[required]} />}
            </div>
            <div>
                <button>Login</button>
            </div>

        </form>

    )
}




const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({isAuth,LoginThunk,currentUserId,captchaUrl}) => {

    const onLogin = (values) =>{

        LoginThunk(values.login,values.password,values.rememberMe,values.captcha);
        
    }


    return (
        <div> 
            {(isAuth) && <Redirect to={'/profile/'+currentUserId}/> }
            
            <div>   
                <h1>LOGIN {!isAuth && 'NOT'} {isAuth && 'TRUE'} </h1>
            </div>
            <div>
                <LoginReduxForm onSubmit={onLogin} captchaUrl={captchaUrl}/>
            </div>
        </div>
    )

}

const mstp = (state) =>{
    return {
        isAuth: state.auth.isAuth,
        currentUserId: state.auth.userId,
        captchaUrl: state.auth.captchaUrl
    };
}

export default connect(mstp,{LoginThunk})(Login);