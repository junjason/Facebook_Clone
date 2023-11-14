import { useState } from "react";
import "./SearchBar.css"


function SearchBar() {
    const [query, setQuery] = useState("");

    // add logic for search bar

    return (
        <>
            <div id="nav-search-bar">
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
                <input
                    className="searchBar"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={'Search Facemash'}
                ></input>
            </div>
        </>
    );
}

export default SearchBar;