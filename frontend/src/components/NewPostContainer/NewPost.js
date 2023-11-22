import "./NewPost.css";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createPostThunk } from '../../store/posts';
import { getUser } from "../../store/users";

function NewPost({ closeModal }) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const { userId } = useParams();
    const user = useSelector((state) => state.users[userId]);
    const currentUser = useSelector((state) => state.session.user);

    const isCurrentUser = currentUser && user && currentUser.id === user.id;

    const placeholderText = isCurrentUser
        ? `What's on your mind, ${currentUser?.first_name}?`
        : `Write something to ${user?.first_name}...`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            body,
            author_id: currentUser.id,
            user_wall_id: user.id, 
        };

        // Dispatch the action to create a new post
        await dispatch(createPostThunk(postData, {page: "Wall"}));
        await dispatch(getUser(userId));

        // Clear the form after submission
        setBody('');

        // Close the modal
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} id="newPostContainer">
            <label>
                Create Post
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={placeholderText}
                    required
                />
            </label>
            <button type="submit">Post</button>
        </form>
    );
}

export default NewPost;
