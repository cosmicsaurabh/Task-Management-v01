import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="bar-container">
      <div className="search-container">
        <label className="label">Search:</label>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          size="5"
        />
      </div>
      <div className="sort-container">
        <label className="label">Sort By:</label>
        <select className="sort-select">
          <option value="recent">Recent</option>
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="description">Description</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
