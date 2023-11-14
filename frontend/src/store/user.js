import csrfFetch from "./csrf.js";

const GET_USER = 'users/RECEIVE_USER';
// const GET_USERS = 'users/RECEIVE_USERS';

const receiveUser = (user) => ({
    type: GET_USER,
    payload: user
})

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

// export const getUsers = () => async dispatch => {
//     let res = await csrfFetch(`/api/users`, {
//         method: 'GET'
//     });

//     let data = await res.json();
//     dispatch(receiveUsers(data));
// }

const usersReducer = (state = {}, action) => {
    let nextState = {...(Object.freeze(state))};

    switch(action.type) {
        case GET_USER:
            nextState = action.payload["user"];
            return nextState;
        // case GET_USERS:
        //     return {...nextState, ...action.payload};
        default:
            return nextState;
    }
}

export default usersReducer;