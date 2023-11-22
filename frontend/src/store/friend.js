import csrfFetch from "./csrf";

export const removeFriendshipThunk = (friendshipId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/${friendshipId}`, {
      method: 'DELETE',
    });
  
    return res;
};