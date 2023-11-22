import csrfFetch from "./csrf.js";
// import { GET_USER } from "./users.js";
// import { SET_CURRENT_USER } from "./session.js";
import { receiveUser } from "./users.js";

// export const SEND_FRIEND_REQUEST = 'friend_request/SEND_FRIEND_REQUEST';
// export const ACCEPT_FRIEND_REQUEST = 'friend_request/ACCEPT_FRIEND_REQUEST';
// export const REJECT_FRIEND_REQUEST = 'friend_request/REJECT_FRIEND_REQUEST';

// action creators
// export const sendFriendRequest = (friendRequest) => ({
//   type: SEND_FRIEND_REQUEST,
//   payload: friendRequest,
// });

// export const acceptFriendRequest = (friendRequestId) => ({
//   type: ACCEPT_FRIEND_REQUEST,
//   payload: friendRequestId
// });

// export const rejectFriendRequest = (friendRequestId) => ({
//   type: REJECT_FRIEND_REQUEST,
//   payload: friendRequestId
// });

export const createFriendRequestThunk = (friendRequestData) => async (dispatch) => {
    const res = await csrfFetch(`/api/friend_requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendRequestData),
    });
    return res;
};

export const acceptFriendRequestThunk = (friendRequestId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friend_requests/${friendRequestId}`, {
        method: 'PATCH'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data));
    }
    return res;
}

export const rejectFriendRequestThunk = (friendRequestId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friend_requests/${friendRequestId}`, {
        method: 'DELETE'
    })
    return res;
}


// const friendRequestsReducer = (state = {}, action) => {
//     let nextState = {...(Object.freeze(state))};

//     switch (action.type) {
//         case SET_CURRENT_USER:
//             return {...nextState, ...action.payload.friend_requests};
//         case GET_USER:
//             return {...nextState, ...action.payload.friend_requests};
//         case SEND_FRIEND_REQUEST:
//             return { ...nextState, [action.payload.id]: action.payload };
//         case ACCEPT_FRIEND_REQUEST:
//             delete nextState[action.payload];
//             return nextState;
//         case REJECT_FRIEND_REQUEST:
//             delete nextState[action.payload];
//             return nextState;
//         default:
//             return state;
//     }
// };

// export default friendRequestsReducer;