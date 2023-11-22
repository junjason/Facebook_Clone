import csrfFetch from "./csrf.js";

export const GET_USERS = 'users/RECEIVE_USERS';

const receiveUsers = (users) => ({
    type: GET_USERS,
    payload: users
})


export const getSearchUsers = (searchQuery = '') => async (dispatch) => {
    if (!searchQuery.trim()) {
      // Handle the case where searchQuery is empty
      return;
    }
  
    const res = await csrfFetch(`/api/users/search?search=${encodeURIComponent(searchQuery)}`, {
      method: 'GET',
    });
  
    const data = await res.json();
    dispatch(receiveUsers(data));
};
  

const searchReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_USERS:
            return {...action.payload.users};
        default:
            return state;
    }
}

export default searchReducer;