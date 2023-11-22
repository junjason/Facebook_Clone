import { useSelector } from "react-redux";
import "./FriendsContainer.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function FriendsContainer() {
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const currentUser = useSelector(state => state.session.user)
    const friends = useSelector(state => (user && user.friend_ids) ? user.friend_ids.map((friend_id) => state.users[friend_id]) : []);

    const isCurrentUserWall = currentUser && user && user.id === currentUser.id;
    const mutualFriends = isCurrentUserWall ? [] : friends?.filter(friend => currentUser?.friend_ids.includes(friend.id));
    
    const friendsText = isCurrentUserWall
        ? `${friends.length} friends`
        : `${mutualFriends.length} mutual friend${mutualFriends.length === 1 ? '' : 's'}`;

    let friends_ele = friends.map(friend =>
        <div key={friend.id} id={`friend${friend.id}`} className="friends-box-individual-friends">
            <Link to={`/user/${friend.id}`}>
                <img src={friend.profile_photo_url ? friend.profile_photo_url : "../../img/default_profile_pic.png"} alt="Profile Pic" />
            </Link>
            <span className="friend-name">{friend.first_name}</span>
            <span className="friend-name">{friend.last_name}</span>
        </div>
    )
    let friends_preview = friends_ele.slice(0, 6);

    return (
        <>
            <div id="friends-box">
                <div id="friends-box-header">
                    <h2>Friends</h2>
                    <span>{friendsText}</span>
                </div>
                <div id="friends-box-friends">
                    {friends_preview}
                </div>
            </div>
        </>
    )
}

export default FriendsContainer;
