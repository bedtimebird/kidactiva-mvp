// components/SearchBar.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function SearchBar() {
  const router = useRouter(); // Initialize the router
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [dateRange, setDateRange] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build the query string from the state
    const queryParams = new URLSearchParams({
      location,
      age,
      dateRange,
    }).toString();

    // Navigate to the search page with the query parameters
    router.push(`/search?${queryParams}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar-form">
      {/* Location Dropdown */}
      <select value={location} onChange={(e) => setLocation(e.target.value)} required>
        <option value="" disabled>Location</option>
        <option value="Downtown">Downtown</option>
        <option value="North East">North East</option>
        <option value="South East">South East</option>
        <option value="North West">North West</option>
        <option value="South West">South West</option>
        <option value="Richmond">Richmond</option>
      </select>

      {/* Child's Age Dropdown */}
      <select value={age} onChange={(e) => setAge(e.target.value)} required>
        <option value="" disabled>Child&apos;s Age</option>
        <option value="3-5">3-5 Years</option>
        <option value="6-8">6-8 Years</option>
        <option value="9-12">9-12 Years</option>
        <option value="13+">13+ Years</option>
      </select>

      {/* Date Range Dropdown */}
      <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} required>
        <option value="" disabled>Date Range</option>
        <option value="summer">Summer</option>
        <option value="fall">Fall</option>
        <option value="winter">Winter</option>
        <option value="spring">Spring</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}