import csrfFetch from "./csrf.js";
import { RECEIVE_POST, REMOVE_POST } from "./posts.js";

export const GET_USER = 'users/RECEIVE_USER';
// export const GET_USERS = 'users/RECEIVE_USERS';
export const UPDATE_USER = 'users/UPDATE_USER';


export const receiveUser = (user) => ({
    type: GET_USER,
    payload: user
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
});

// const receiveUsers = (users) => ({
//     type: GET_USERS,
//     payload: users
// })

export const getUser = userId => async dispatch => {
    let res = await csrfFetch(`/api/users/${userId}`, {
        method: 'GET'
    });

    let data = await res.json();
    dispatch(receiveUser(data));
}

// export const getSearchUsers = (searchQuery = '') => async (dispatch) => {
//     const res = await csrfFetch(`/api/users?search=${encodeURIComponent(searchQuery)}`, {
//       method: 'GET',
//     });
  
//     const data = await res.json();
//     dispatch(receiveUsers(data));
// };

export const updateUserThunk = (userId, updatedUserData) => async dispatch => {
    let res = await csrfFetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
    });
  
    let data = await res.json();
    dispatch(updateUser(data));
};
  

const usersReducer = (state = {}, action) => {
    let nextState = {...(Object.freeze(state))};

    switch(action.type) {
        case GET_USER:
            return {...nextState, ...action.payload.users};
        case UPDATE_USER:
            return {...nextState, ...action.payload.users};
        // case GET_USERS:
        //     return {...nextState, ...action.payload.users};
        case RECEIVE_POST:
            if (action.page.page === "Wall") {
                const user = nextState[action.payload.user_wall_id];
                const post_ids = [...user.wall_posts_ids];
                const newUser = {
                    ...user,
                    wall_posts_ids: [action.payload.id, ...post_ids]
                };

                return {...nextState, ...newUser };
            }
            else {
                return {...nextState};
            }
        case REMOVE_POST:
            if (action.page.page === "Wall") {
                const re_user = nextState[action.payload.user_wall_id];
                const re_post_ids = [...re_user.wall_posts_ids];
                const re_newUser = {
                    ...re_user,
                    wall_posts_ids: re_post_ids.filter(ele => ele !== action.payload.id)
                };

                return {...nextState, ...re_newUser };
            } else {
                return {...nextState};
            }
        default:
            return nextState;
    }
}

export default usersReducer;