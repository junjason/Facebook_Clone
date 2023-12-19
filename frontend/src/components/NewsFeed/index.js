import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import Posts from './Posts';
import NewStatus from '../NewStatus';
import './NewsFeed.css';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.post_ids?.map((post_id) => state.posts[post_id]));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
        <div id="home-page-main">
            <NewStatus />
            <div className="news-feed-infinite-scroll-container">
                {posts && <Posts posts={posts}/>}
            </div>
        </div>
    </>
  );
};

export default NewsFeed;
