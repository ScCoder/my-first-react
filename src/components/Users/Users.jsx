import React, {useState} from 'react';
import User from './User';
import {NavLink} from 'react-router-dom';
import s from './Users.module.css';

const Users = (props) => {

    let UsersElements = props.items.map(i => <User name={i.name} photos={i.photos} followed={i.followed} userId={i.id} 
        followedInProgress={props.followedInProgressUsers.includes(i.id)} FollowThunk={props.FollowThunk} history = {props.history} />);

    return (
        <div>
            <div>Всего = {props.totalCount} Текущая = {props.currentPage} Test = {props.Test} </div>
            <div><Paginator pages = {props.pages} currentPage = {props.currentPageInURL} pagesPortion = {15} /></div>

            <div>{UsersElements}</div>
        </div>
    );
}


const Paginator = ({pages, currentPage, pagesPortion = 10})=>{

    const [currentPagePortion, setPagePortion] = useState(1);

    const endIndex = currentPagePortion*pagesPortion;

    const startIndex = endIndex - pagesPortion;

    const visiblePages = pages.slice(startIndex,endIndex);

    const PaginationElements = visiblePages.map( p => <NavLink to={'/users/'+p} className={ (currentPage==p)? s.selected:s.notselected}  > {p} </NavLink> );

    const hasPrev = startIndex > 0;

    const hasNext = endIndex < pages.length;

    return (
        <div> 
            {hasPrev&&<button onClick={()=>{setPagePortion(currentPagePortion-1)}}>Prev</button>}
            {PaginationElements}
            {hasNext&&<button onClick = {()=>{setPagePortion(currentPagePortion+1)}} >Next</button>}
        </div>
    )

}


export default Users;