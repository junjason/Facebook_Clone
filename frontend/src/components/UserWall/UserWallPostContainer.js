import "./UserWallPostContainer.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import { getUsers } from "../../store/users";
import { useEffect } from "react";
import { getPosts } from "../../store/posts";
import * as sessionActions from "../../store/session"

function UserWallPostContainer() {
    const {userId} = useParams();
    const user = useSelector(state => state.users[userId]);
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sessionActions.restoreSession());
        dispatch(getPosts());
        dispatch(getUsers());
    },[]) 

    const selectedPosts = user.wall_posts
    .map(postId => posts[postId])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <>
            <div id="posts-header">
                <h2>Posts</h2>
            </div>
            {
                selectedPosts.map(post =>
                    <div className="user-wall-post">
                        <div className="user-wall-post-author">
                            <Link to={`/user/${post?.author_id}`}><img src="../../img/default_profile_pic.png"/></Link>
                            <span>{users[post?.author_id]?.first_name}&nbsp;{users[post?.author_id]?.last_name}</span>
                        </div>
                        <div className="user-wall-post-content">
                            {post?.body}
                        </div>
                        <br></br>
                        {/* likes go here */}
                        <br></br>
                        {/* comments go here */}
                    </div>
                )
            }
        </>
    )
}

export default UserWallPostContainer;