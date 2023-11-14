import { useSelector } from "react-redux";
import "./FriendsContainer.css"
import { useHistory, Link } from "react-router-dom";

function FriendsContainer() {
    const user = useSelector(state => state.user);


    let friends = Object.values(user.friends).map(friend =>
        <div id={`friend`+friend.id} className="friends-box-individual-friends">
            <Link to={`/user/${friend.id}`}><img src="../../img/default_profile_pic.png"></img></Link>
        </div>
    )
    friends = friends.slice(0,6);

    return (
        <>
            <div id="friends-box">
                <div id="friends-box-header">
                    <h2>Friends</h2>
                    <span>{Object.keys(user.friends).length}&nbsp;friends</span>
                </div>
                <div id="friends-box-friends">
                    {friends}
                </div>
            </div>
        </>
    )
}

export default FriendsContainer;