import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchUsers } from '../../store/search';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import "./SearchBar.css"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useSelector(state => state.search);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    dispatch(getSearchUsers(inputValue));
  };

  const handleLinkClick = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.search-bar-container')) {
        setSearchQuery('');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search facebook"
        value={searchQuery}
        onChange={handleSearch}
      />
      {Object.keys(searchResults).length > 0 && searchQuery !== '' && (
        <div className="search-results-dropdown">
          <ul>
            {Object.values(searchResults).map(user => (
              <Link
                to={`/user/${user?.id}`}
                className="search-result-link"
                onClick={handleLinkClick}
                key={user?.id}
              >
                <li>
                  <img
                    src={user?.photoUrl}
                    alt={`Profile of ${user.first_name} ${user.last_name}`}
                    className="user-profile-image"
                  />
                  <span>{`${user.first_name} ${user.last_name}`}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
