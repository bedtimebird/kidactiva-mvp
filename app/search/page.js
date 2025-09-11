// app/search/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ActivityCard from '../../components/ActivityCard'; // Adjust path as needed

// Initialize the Supabase client
// IMPORTANT: Make sure your .env.local file is correctly set up
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SearchResultsPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // This effect runs once when the component mounts to fetch data
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      
      // Fetch all records from the 'activities' table
      const { data, error } = await supabase
        .from('activities')
        .select('*');

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []); // The empty dependency array means this runs only once

  if (loading) {
    return <div>Loading activities...</div>;
  }

  return (
    <main className="main">
      <h1 className="title">Search Results</h1>
      <div className="results-list">
        {activities.length > 0 ? (
          activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <p>No activities found.</p>
        )}
      </div>
    </main>
  );
}