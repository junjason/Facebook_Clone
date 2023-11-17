import { useSelector } from "react-redux";
import "./FriendsContainer.css"
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function FriendsContainer() {
    const {userId} = useParams();
    const user = useSelector(state => state.users[userId]);
    const users = useSelector(state => state.users);
    const friendIds = user.friends;
    let friends = {};

    friendIds.forEach(friendId => {
        if (users[friendId]) {
            friends[friendId] = users[friendId];
        }
    })

    let friends_ele = Object.values(friends).map(friend =>
        <div id={`friend`+friend.id} className="friends-box-individual-friends">
            <Link to={`/user/${friend.id}`}><img src="../../img/default_profile_pic.png"></img></Link>
            <span className="friend-name">{friend.first_name}</span>
            <span className="friend-name">{friend.last_name}</span>
        </div>
    )
    let friends_preview = friends_ele.slice(0,6);

    return (
        <>
            <div id="friends-box">
                <div id="friends-box-header">
                    <h2>Friends</h2>
                    <span>{Object.keys(friends).length}&nbsp;friends</span>
                </div>
                <div id="friends-box-friends">
                    {friends_preview}
                </div>
            </div>
        </>
    )
}

export default FriendsContainer;