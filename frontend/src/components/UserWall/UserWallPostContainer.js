import "./UserWallPostContainer.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { format, parseISO } from 'date-fns';
import { updatePostThunk, deletePost } from "../../store/posts";
import { getUser } from "../../store/users";


function UserWallPostContainer() {
    const { userId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    const user = useSelector((state) => state.users[userId]);
    // const posts = useSelector((state) => state.posts?.post_ids?.map((post_id) => state.posts[post_id]));
    const allPosts = useSelector((state) => user?.wall_posts_ids?.map((wall_post_id) => state.posts[wall_post_id]));
    
    const [visiblePosts, setVisiblePosts] = useState(10); // Initially show 10 posts
    const contentRef = useRef(null);

    const [editedBody, setEditedBody] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const dispatch = useDispatch();

    const handleEdit = (postId, currentBody) => {
        setEditingPostId(postId);
        setEditedBody(currentBody);
    };

    const handleSave = async (postId) => {
        await dispatch(updatePostThunk(postId, { body: editedBody }));
        setEditingPostId(null);
    };

    const handleRemove = async (postId) => {
        await dispatch(deletePost(postId, {page: "Wall"}));
        await dispatch(getUser(userId));
    };


    useEffect(() => {
        const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            // When scrolling to the bottom, increment the number of visible posts
            setVisiblePosts((prev) => prev + 10);
        }
        };

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // useEffect(() => {
    //     // Refetch posts when allPosts changes
    //     dispatch(getUser(userId));
    // }, [dispatch);

    // debugger;

    // useEffect(() => {
    // }, [])
    // debugger;
    // console.log(allPosts);
    return (
        <>
        <div id="posts-header">
            <h2>Posts</h2>
        </div>
        <div id="user-wall-post-container">
        {allPosts?.slice(0, visiblePosts).map((post) => {
            if (post) 
            return (
            <div className="user-wall-post" key={post?.id}>
                <div className="user-wall-post-author">
                    <Link to={`/user/${post?.author_id}`}>
                        <img src={post?.author.profile_photo_url} alt={`Profile of ${post?.author.first_name} ${post?.author.last_name}`} />
                    </Link>
                    <span>{post?.author.first_name}&nbsp;{post?.author.last_name}</span>
                </div>
                <div className="user-wall-post-timestamp">
                    <span>{format(parseISO(post?.created_at), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="user-wall-post-content">{post?.body}</div>
                <br></br>
                {/* Conditionally render Edit and Remove buttons */}
                {currentUser && currentUser?.id === post?.author_id && (
                    <span className="userWallPostsRemoveEdit">
                        {editingPostId === post?.id ? (
                            <>
                                <textarea
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                                />
                                <button onClick={() => handleSave(post?.id)}>Save</button>
                            </>
                            ) : (
                            <>
                                <button onClick={() => handleEdit(post?.id, post?.body)}>Edit</button>
                                <button onClick={() => handleRemove(post?.id)}>Remove</button>
                            </>
                        )}
                    </span>
                )}
                <br></br>
                {/* likes go here */}
                <br></br>
                {/* comments go here */}
            </div>
        )})}
        </div>
        <div ref={contentRef}></div>
        </>
    );
}

export default UserWallPostContainer;