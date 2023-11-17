import csrfFetch from "./csrf.js";

const GET_USER = 'users/RECEIVE_USER';
const GET_USERS = 'users/RECEIVE_USERS';
const UPDATE_USER = 'users/UPDATE_USER';

const receiveUser = (user) => ({
    type: GET_USER,
    payload: user
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
});

const receiveUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

export const getUser = userId => async dispatch => {
    let res = await csrfFetch(`/api/users/${userId}`, {
        method: 'GET'
    });

    let data = await res.json();
    dispatch(receiveUser(data));

}

export const getUsers = () => async dispatch => {
    let res = await csrfFetch(`/api/users`, {
        method: 'GET'
    });

    let data = await res.json();
    dispatch(receiveUsers(data));
}

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
            return {...nextState, [action.payload["user"].id]: action.payload["user"]}
        case UPDATE_USER:
            return {...nextState, [action.payload["user"].id]: action.payload["user"]}
        case GET_USERS:
            return {...nextState, ...action.payload};
        default:
            return nextState;
    }
}

export default usersReducer;