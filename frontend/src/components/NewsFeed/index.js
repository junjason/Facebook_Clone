import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import Posts from './Posts';
import NewStatus from '../NewStatus';
import './NewsFeed.css';

const NewsFeed = () => {
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  const posts = useSelector((state) => state.posts?.post_ids?.map((post_id) => state.posts[post_id]));
  // debugger;
  const [visiblePosts, setVisiblePosts] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
          setVisiblePosts((prev) => prev + 20);
          setIsLoading(false);

          if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      }, 1000);
    }
  };

  useEffect(() => {
    dispatch(getPosts());
    document.addEventListener('scroll', handleScroll);

    return () => {
        document.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, isLoading]);

  return (
    <>
        <div id="home-page-main">
            <NewStatus />
            <div className="news-feed-infinite-scroll-container">
                {posts && <Posts posts={posts} visiblePosts={visiblePosts} contentRef={contentRef} />}
            </div>
        </div>
    </>
  );
};

export default NewsFeed;
