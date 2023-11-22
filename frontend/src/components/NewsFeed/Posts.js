import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostThunk, deletePost } from '../../store/posts';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import "./Posts.css"

const Posts = ({ posts, visiblePosts, contentRef }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const postsToRender = posts?.slice(0, visiblePosts);
  // debugger;

  const [editedBody, setEditedBody] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);

  const handleEdit = (postId, currentBody) => {
    setEditingPostId(postId);
    setEditedBody(currentBody);
  };

  const handleSave = (postId) => {
    dispatch(updatePostThunk(postId, { body: editedBody }));
    setEditingPostId(null);
  };

  const handleRemove = (postId) => {
    dispatch(deletePost(postId, {page: "NewsFeed"}));
  };

  return (
    <>
      <div ref={contentRef}></div>
      {postsToRender.map((post) => (
        <div key={post?.id} className="news-feed-post-container">
            <h3>
                <Link to={`/user/${post?.author_id}`}>
                {post?.author?.profile_photo_url && (
                    <img
                        src={post?.author?.profile_photo_url}
                        alt={`${post?.author?.first_name} ${post?.author?.last_name}`}
                        className="profile-photo"
                    />
                    )}
                    {post?.author?.first_name} {post?.author?.last_name}
                </Link>
                {post?.author?.id !== post?.user_wall?.id ? (
                <>
                    &nbsp;
                    <i className="fa-solid fa-caret-right"></i>
                    &nbsp;
                    <Link to={`/user/${post?.user_wall_id}`}>
                        {post?.user_wall?.profile_photo_url && (
                        <img
                            src={post?.user_wall?.profile_photo_url}
                            alt={`${post?.user_wall?.first_name} ${post?.user_wall?.last_name}`}
                            className="profile-photo"
                        />
                        )}
                        {post?.user_wall?.first_name} {post?.user_wall?.last_name}
                    </Link>
                </>
                ) : (
                <></>
                )}
            </h3>
            <p>{format(parseISO(post?.created_at), 'MMMM dd, yyyy')}</p>
            <p>{post?.body}</p>
            {currentUser && currentUser.id === post?.author_id && (
                <span>
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
        </div>
      ))}
    </>
  );
};

export default Posts;