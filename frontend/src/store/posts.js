import csrfFetch from "./csrf.js";

const GET_POST = 'posts/RECEIVE_POST';
const GET_POSTS = 'posts/RECEIVE_POSTS';
const UPDATE_POST = 'posts/UPDATE_POST';
const REMOVE_POST = 'posts/REMOVE_POST';

const receivePost = (post) => ({
    type: GET_POST,
    payload: post
})

const receivePosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const updatePost = (post) => ({
    type: UPDATE_POST,
    payload: post,
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    payload: postId
});

export const getPost = postId => async dispatch => {
    let res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'GET'
    });

    let data = await res.json();
    dispatch(receivePost(data));

}

export const getPosts = () => async dispatch => {
    let res = await csrfFetch(`/api/posts`, {
        method: 'GET'
    });

    let data = await res.json();
    dispatch(receivePosts(data));
}

export const updatePostThunk = (postId, updatedPostData) => async dispatch => {
    let res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPostData),
    });
  
    let data = await res.json();
    dispatch(updatePost(data));
};

export const deletePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    dispatch(removePost(postId));
}

  

const postsReducer = (state = {}, action) => {
    let nextState = {...(Object.freeze(state))};

    switch(action.type) {
        case GET_POST:
            return {...nextState, [action.payload.id]: action.payload}
        case UPDATE_POST:
            return {...nextState, [action.payload.id]: action.payload}
        case GET_POSTS:
            return {...nextState, ...action.payload};
        case REMOVE_POST:
            delete nextState[action.payload];
            return nextState;
        default:
            return nextState;
    }
}

export default postsReducer;