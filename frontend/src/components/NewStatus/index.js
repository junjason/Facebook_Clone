import "./NewStatus.css";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk } from '../../store/posts';

const NewStatus = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
        // Handle user not logged in (optional)
        console.error('User not logged in');
        return;
        }

        const postData = {
            body,
            author_id: currentUser.id,
            user_wall_id: currentUser.id, // Assuming user is posting on their own wall
        };

        dispatch(createPostThunk(postData, {page: "NewsFeed"}));
        // Clear the input after submitting
        setBody('');
    };

    return (
        <div id="new-status-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default NewStatus;
