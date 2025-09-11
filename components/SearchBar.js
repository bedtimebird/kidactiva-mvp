"use client";

import React, { useState } from 'react';

// This is the main search bar component for the homepage.
export default function SearchBar() {
  // State to hold the user's selections
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [dateRange, setDateRange] = useState('');

  // This function will be called when the user clicks the "Search" button.
  // For now, it just logs the selections. Later, it will navigate
  // to the search results page with these parameters.
  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    console.log({ location, age, dateRange });
    // TODO: Implement navigation to the search results page
  };

  return (
    <form onSubmit={handleSearch} className="search-bar-form">
      {/* Location Dropdown */}
      <select value={location} onChange={(e) => setLocation(e.target.value)} required>
        <option value="" disabled>Location</option>
        <option value="downtown">Downtown</option>
        <option value="north_east">North East</option>
        <option value="south_east">South East</option>
        <option value="north_west">North West</option>
        <option value="south_west">South West</option>
      </select>

      {/* Child's Age Dropdown */}
      <select value={age} onChange={(e) => setAge(e.target.value)} required>
        <option value="" disabled>Child's Age</option>
        <option value="3-5">3-5 Years</option>
        <option value="6-8">6-8 Years</option>
        <option value="9-12">9-12 Years</option>
        <option value="13+">13+ Years</option>
      </select>

      {/* Date Range Dropdown */}
      <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} required>
        <option value="" disabled>Date Range</option>
        <option value="currently_registering">Currently Registering</option>
        <option value="summer">Summer</option>
        <option value="fall">Fall</option>
        <option value="winter">Winter</option>
        <option value="spring">Spring</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}