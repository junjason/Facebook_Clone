import csrfFetch from "./csrf.js";

const GET_USER = 'users/RECEIVE_USER';

const receiveUser = (user) => ({
    type: GET_USER,
    payload: user
})

export const getUser = userId => async dispatch => {
    let res = await csrfFetch(`/api/users/${userId}`, {
        method: 'GET'
    });

    let data = await res.json();
    dispatch(receiveUser(data));
}

const usersReducer = (state = {}, action) => {
    const nextState = {...(Object.freeze(state))};

    switch(action.type) {
        case GET_USER:
            nextState[action.payload["user"].id] = action.payload["user"];
            return nextState;
        default:
            return nextState;
    }
}

export default usersReducer;