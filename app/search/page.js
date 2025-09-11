// app/search/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ActivityCard from '../../components/ActivityCard';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SearchResultsPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      
      // UPDATED QUERY: This now joins the related tables.
      // It fetches all columns from 'activities' (*) and the 'name' from the related
      // 'providers', 'locations', and 'categories' tables.
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          providers ( name ),
          locations ( name ),
          categories ( name )
        `);

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

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