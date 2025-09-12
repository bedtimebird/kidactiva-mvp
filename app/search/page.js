"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import ActivityCard from '../../components/ActivityCard';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The main component that reads URL params and fetches data.
function SearchResults() {
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);

      // Get search parameters from the URL.
      const location = searchParams.get('location');
      const age = searchParams.get('age');
      // const dateRange = searchParams.get('dateRange'); // We'll add this filter later for simplicity.

      // Start building the Supabase query.
      let query = supabase
        .from('activities')
        .select(`
          *,
          providers ( name ),
          locations ( name )
        `);

      // ## FILTERING LOGIC ##

      // 1. Filter by location
      if (location) {
        // We need to query the joined table's column.
        // Assuming your locations table has a 'name' column that matches the search param.
        // This requires an RPC or a view if direct joining filter is complex.
        // For simplicity, let's assume a direct column 'location_name' exists for now.
        // A better approach would be to filter on the foreign key after getting the location id.
        // Let's adjust to filter on the 'name' from the joined 'locations' table.
        // The correct syntax for filtering on a joined table is using the foreign table name in the filter.
         query = query.ilike('locations.name', `%${location}%`);
      }

      // 2. Filter by age
      if (age) {
        if (age.includes('+')) {
          const minAge = parseInt(age.replace('+', ''), 10);
          query = query.gte('age_max', minAge); // Find activities where the max age is at least the minimum required.
        } else {
          const [minAge, maxAge] = age.split('-').map(Number);
          // The activity's age range must overlap with the selected age range.
          query = query.lte('age_min', maxAge).gte('age_max', minAge);
        }
      }
      
      // Execute the final query.
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching filtered activities:', error);
      } else {
        setActivities(data);
      }
      setLoading(false);
    };

    fetchActivities();
  }, [searchParams]); // Re-run the effect if the search parameters change.

  if (loading) {
    return <div>Loading activities...</div>;
  }

  return (
    <div className="results-list">
      {activities.length > 0 ? (
        activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      ) : (
        <p>No activities found matching your criteria.</p>
      )}
    </div>
  );
}

// This is the main page component that wraps our results in a Suspense boundary.
// This is required by Next.js when using useSearchParams.
export default function SearchResultsPage() {
  return (
    <main className="main">
      <h1 className="title">Search Results</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}