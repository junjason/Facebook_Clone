import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFriendshipThunk } from '../../store/friend';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';
import "./RemoveFriendButton.css"

const RemoveFriendButton = () => {
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleRemoveFriendship = async () => {
        await dispatch(removeFriendshipThunk(user?.friendship_id.toString()));
        await dispatch(getUser(userId));
        setIsDropdownOpen(false); // Close the dropdown after removing the friend
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <>
            {currentUser?.id !== user?.id && user?.friend_status === "True" && 
                <>
                    <div className="facebook-friends-dropdown">
                        <button onClick={toggleDropdown}>Friends</button>
                        {isDropdownOpen && (
                            <div className="facebook-remove-friend-btn">
                                <button onClick={handleRemoveFriendship}>Remove Friend</button>
                            </div>
                        )}
                    </div>
                </>
            }
        </>
    );
};

export default RemoveFriendButton;
