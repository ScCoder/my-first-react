import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import {GetUsersThunk,FollowThunk} from '../../redux/usersReducer';
import Preloader from '../Common/Preloader';
import {withRouter} from 'react-router';
import withAuthRedirect from '../../hoc/withAuthRedirect';




class UsersContainer extends React.Component {

    componentDidMount() {

        this.props.GetUsersThunk(this.props.match.params.currentPageInURL,this.props.pageSize);

    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params.currentPageInURL != prevProps.match.params.currentPageInURL) {
            this.props.GetUsersThunk(this.props.match.params.currentPageInURL,this.props.pageSize);
        }

    }

    render() {
        return <div>
        {this.props.isFetching ? <Preloader/>: null }    
        <Users items={this.props.items} totalCount={this.props.totalCount} 
            pages={this.props.pages} currentPage={this.props.currentPage} 
            currentPageInURL = {this.props.match.params.currentPageInURL}
            followedInProgressUsers = {this.props.followedInProgressUsers}
            FollowThunk = {this.props.FollowThunk} Test = {this.props.Test}
            />
        </div>
    }
}


const mstp = (state) =>{
    return {
       items:state.usersPage.items,
       totalCount:state.usersPage.totalCount,
       pages:state.usersPage.pages,
       currentPage: state.usersPage.currentPage,
       pageSize:state.usersPage.pageSize,
       isFetching:state.usersPage.isFetching,
       followedInProgressUsers:state.usersPage.followedInProgressUsers          
    }
}

const mdtp = (dispatch) =>{
    return {
        FollowThunk: (userId, follow) => {
            dispatch(FollowThunk(userId, follow))
        },
        GetUsersThunk:(currentPage, pageSize) =>{
            dispatch(GetUsersThunk(currentPage, pageSize))
        }

    }
}

export default connect(mstp,{FollowThunk,GetUsersThunk})(withAuthRedirect(withRouter(UsersContainer)));