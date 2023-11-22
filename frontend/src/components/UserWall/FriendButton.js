import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendFriendRequest } from '../../store/friendRequest';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { createFriendRequestThunk, acceptFriendRequestThunk, rejectFriendRequestThunk } from '../../store/friendRequest';
import { useEffect } from 'react';
import { getUser } from '../../store/users';
import "./FriendButton.css"

const FriendButton = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        // console.log('User:', user);
        // console.log('CurrentUser:', currentUser);
    }, [user, currentUser]);

    const handleAddFriend = async () => { 
        const friend_request = {
            requester_id: currentUser?.id,
            recipient_id: user?.id
        }

        await dispatch(createFriendRequestThunk(friend_request));
        await dispatch(getUser(userId));
    }

    const handleAcceptFriendRequest = async () => {
        await dispatch(acceptFriendRequestThunk(user?.friend_request_id[0]));
    }

    const handleRemoveFriendRequest = async () => {
        await dispatch(rejectFriendRequestThunk(user?.friend_request_id[0]));
        await dispatch(getUser(userId));
    }

    return (
        <>
            {currentUser?.id !== user?.id && user?.friend_status === "Sent" && 
                <>
                <div className="facebook-friend-btn">
                    <button disabled className="facebook-disabled-btn">Friend Request Pending</button>
                    <button onClick={handleRemoveFriendRequest}>Remove Request</button>
                </div>
                </>
            }
            {currentUser?.id !== user?.id && user?.friend_status === "False" && 
                <>
                <div className="facebook-friend-btn">
                    <button onClick={handleAddFriend}>Add Friend</button>
                </div>
                </>
            }
            {currentUser?.id !== user?.id && user?.friend_status === "Received" && 
                <>
                <div className="facebook-friend-btn">
                    <button onClick={handleAcceptFriendRequest}>Confirm Request</button>
                    <button onClick={handleRemoveFriendRequest}>Remove Request</button>
                </div>
                </>
            }
        </>
    )
};

export default FriendButton;
