import { Follow, GetFollowed, GetUsers } from "../api/api";

const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING = 'IS_FETCHING';
const SET_FOLLOWED = 'SET_FOLLOWED';
const SET_FOLLOWED_IN_PROGRESS = 'SET_FOLLOWED_IN_PROGRESS';


const SetUsersActionCreator = (items,totalCount) => ({type:SET_USERS,items,totalCount});
const SetCurrentPageActionCreator = (pageid) =>({type:SET_CURRENT_PAGE,pageid});
const SetIsFetchingActionCreator = (isFetching) =>({type:IS_FETCHING,isFetching});
const SetFollowedActionCreator = (userId,followed) => ({type:SET_FOLLOWED,userId,followed});
const SetFollowedInProgressActionCreator = (userId,inProgress) => ({type:SET_FOLLOWED_IN_PROGRESS,userId,inProgress});


export const FollowThunk = (userId, follow) => {
  return async (dispath) => {
    dispath(SetFollowedInProgressActionCreator(userId, true));
    const resultCode = await Follow(userId, follow);
    if (resultCode == 0) {
      const followed = await GetFollowed(userId);
      dispath(SetFollowedActionCreator(userId, followed));
    }
    dispath(SetFollowedInProgressActionCreator(userId, false));
  }
}


export const GetUsersThunk = (currentPage, pageSize) => {
  return async (dispath) => {
    dispath(SetCurrentPageActionCreator(currentPage));
    dispath(SetIsFetchingActionCreator(true));
    const data = await GetUsers(currentPage, pageSize);
    dispath(SetUsersActionCreator(data.items, data.totalCount));
    dispath(SetIsFetchingActionCreator(false));
  }
}

let initialState = {
    items: [
        // {
        //     name: "Antonforce",
        //     id: 4992,
        //     uniqueUrlName: null,
        //     photos: {
        //       small: null,
        //       large: 'https://img13.postila.ru/resize?w=660&src=%2Fdata%2F28%2F2f%2Fd4%2Ff8%2F282fd4f8144ac9eb62121f1a9660e0af359bbd62459d8dc3682546bbe0e6b3b9.jpg'
        //     },
        //     status: null,
        //     followed: false
        //   },
        //   {
        //     name: "Scorpion",
        //     id: 4993,
        //     uniqueUrlName: null,
        //     photos: {
        //       small: null,
        //       large: 'https://i.pinimg.com/originals/c0/b7/7f/c0b77faeb2cb3e67fd1b423c4535f6c3.jpg'
        //     },
        //     status: null,
        //     followed: false
        //   }
    ],
    totalCount: 0,
    pages:[],
    pageSize:15,
    currentPage:1,
    isFetching:false,
    followedInProgressUsers:[]

};


const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USERS:

      //Генерим массив из цифр, 1,2,3... по количеству страниц
      const pagesCount = Math.ceil(action.totalCount / state.pageSize);
      let pagesNumbers = [];
      for (let i = 1; i <= pagesCount; i++) {
        pagesNumbers.push(i);
      }
      return {
        ...state,
        items: [...action.items],
        totalCount: action.totalCount,
        pages: pagesNumbers
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: Number(action.pageid)
      }
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case SET_FOLLOWED:

      const newItems = state.items.map(i => {
        if (i.id == action.userId) {
          return { ...i, followed: action.followed };
        }
        return i;
      });

      return {
        ...state,
        items: newItems
      }
    case SET_FOLLOWED_IN_PROGRESS:
      let followedInProgressCopy = [...state.followedInProgressUsers];
      if (action.inProgress) {
        followedInProgressCopy.push(action.userId)
      }
      else{
        followedInProgressCopy.splice(followedInProgressCopy.indexOf(action.userId),1);
      };
      return {
        ...state,
        followedInProgressUsers:followedInProgressCopy
      }
      
    default:
      return state;
  }
}



export default usersReducer;