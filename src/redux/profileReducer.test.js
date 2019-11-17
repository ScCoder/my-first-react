import profileReducer, { AddPost,DeletePost } from './profileReducer';

let state ={
    posts: [
        { id: 1, message: "Hello!", likeCount: 10 },
        { id: 2, message: "Привет реакт!", likeCount: 1000 },
        { id: 3, message: "Будем бомбить!", likeCount: 100 }
    ],
    status:null
};


it('post adding correct', () => {

    const action = AddPost('Test 1');

    const newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(4);
    
});

it('post adding text correct', () => {

    const TEST_MESSAGE = 'Test message';

    const action = AddPost(TEST_MESSAGE);

    const newState = profileReducer(state,action);

    expect(newState.posts[3].message).toBe(TEST_MESSAGE);
    
});
  

it('post deleting correct', () => {

    const action = DeletePost(2);

    const newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(2);
    
});
  
