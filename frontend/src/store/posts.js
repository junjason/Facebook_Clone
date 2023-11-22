import csrfFetch from "./csrf.js";
import { GET_USER } from "./users.js";
import { receiveUser } from "./users.js";

export const GET_POSTS = 'posts/RECEIVE_POSTS';
export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const UPDATE_POST = 'posts/UPDATE_POST';
export const REMOVE_POST = 'posts/REMOVE_POST';
export const CREATE_POST = 'posts/CREATE_POST';

// const createPost = (post) => ({
//   type: CREATE_POST,
//   payload: post,
// });

const updatePost = (post) => ({
    type: UPDATE_POST,
    payload: post
})

const receivePosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const receivePost = (post, page) => ({
    type: RECEIVE_POST,
    payload: post,
    page 
});

const removePost = (post, page) => ({
    type: REMOVE_POST,
    payload: post,
    page
});





export const getPosts = (existingPostIds = []) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts?existingPostIds=${existingPostIds.join(',')}`, {
        method: 'GET',
    });
  
    const data = await res.json();
    dispatch(receivePosts(data));
};  

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

export const createPostThunk = (postData, page) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
  
    const data = await res.json();
    dispatch(receivePost(data, page));
};



export const deletePost = (postId, page) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    dispatch(removePost(data, page));
}

  

const postsReducer = (state = {}, action) => {
    let nextState = {...(Object.freeze(state))};

    switch(action.type) {
        case RECEIVE_POST:
            // debugger;
            const post_ids = nextState.post_ids;
            let new_post_ids;
            if (action.page.page === "NewsFeed" && post_ids) {
                new_post_ids = [action.payload.id, ...post_ids];
            } else {
                new_post_ids = post_ids;
            }
            return {...nextState, [action.payload.id]: action.payload, post_ids: new_post_ids};
        case UPDATE_POST:
            return {...nextState, [action.payload.id]: action.payload};
        case GET_POSTS:
            nextState = { ...nextState, ...action.payload.posts };
            return nextState;
        case REMOVE_POST:
            const remove_post_ids = nextState.post_ids;
            let remove_new_post_ids;
            if (action.page.page === "NewsFeed" && remove_post_ids) {
                remove_new_post_ids = [...remove_post_ids].filter(ele => ele !== action.payload.id);
            }
            delete nextState[action.payload.id];
            return {...nextState, post_ids: remove_new_post_ids};
        case GET_USER: 
            nextState = {};
            return {...nextState, ...action.payload.posts};
        default:
            return nextState;
    }
}

export default postsReducer;