"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ActivityCard from '../components/ActivityCard';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          providers ( name ),
          locations ( name )
        `);

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        // Shuffle the activities for a random display
        const shuffled = data.sort(() => 0.5 - Math.random());
        setActivities(shuffled);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

  return (
    <main className="main">
      <div className="hero-section">
        <h1 className="title">
          Find Your Child's Next Adventure in Vancouver
        </h1>
        <p className="subtitle">
          Search for camps, classes, and workshops all in one place.
        </p>
      </div>

      {loading ? (
        <div>Loading activities...</div>
      ) : (
        <>
          <div className="featured-activities">
            <h2>Featured Activities</h2>
            <div className="activity-grid featured">
              {activities.slice(0, 4).map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          <div className="more-activities">
            <h2>More Activities</h2>
            <div className="activity-grid">
              {activities.slice(4, 22).map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}