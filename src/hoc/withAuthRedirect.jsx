import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

const mstp = (state) => {
    return {
        isAuth: state.auth.isAuth,
        authInProgress: state.auth.authInProgress
    }
}


const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {

        render() {
            
            if (!this.props.isAuth && !this.props.authInProgress) { return <Redirect to='/login'/>};

            return <Component {...this.props}/>;
        }

    }

    return connect(mstp,{})(RedirectComponent);
}

export default withAuthRedirect;

