// app/activity/[id]/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ActivityDetailPage() {
  const { id } = useParams(); // Get the 'id' from the URL
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Don't fetch if the id isn't available yet

    const fetchActivity = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          providers ( name )
        `)
        .eq('id', id) // Filter to the specific ID from the URL
        .single();   // Expect only one result

      if (error) {
        console.error('Error fetching activity details:', error);
      } else {
        setActivity(data);
      }
      setLoading(false);
    };

    fetchActivity();
  }, [id]); // Re-run when the id from the URL changes

  if (loading) {
    return <main className="main"><div>Loading...</div></main>;
  }

  if (!activity) {
    return <main className="main"><div>Activity not found.</div></main>;
  }
  
  // Format dates for display
  const formattedStartDate = new Date(activity.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedEndDate = new Date(activity.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main className="main">
      <div className="activity-detail-container">
        <h1>{activity.title}</h1>
        <h2>by {activity.providers.name}</h2>
        
        <p className="activity-description">{activity.description}</p>

        {/* --- Key Info Block --- */}
        <div className="key-info-block">
          <h3>Details</h3>
          <p><strong>Ages:</strong> {activity.age_min} - {activity.age_max} years</p>
          <p><strong>Dates:</strong> {formattedStartDate} to {formattedEndDate}</p>
          <p><strong>Schedule:</strong> {activity.schedule_details}</p>
          <p><strong>Cost:</strong> ${activity.cost}</p>
          <p><strong>Location:</strong> {activity.address}</p>
        </div>

        {/* --- Primary Call-to-Action --- */}
        <a href={activity.provider_registration_url} target="_blank" rel="noopener noreferrer" className="cta-button primary">
          Register on Provider's Site
        </a>
        
        {/* --- Secondary CTA (The MVP Hook) --- */}
        <div className="reminder-form">
          <h3>Never Miss a Deadline!</h3>
          <p>Enter your email to get a reminder before registration closes.</p>
          {/* We will build this component in the next sprint */}
          <input type="email" placeholder="Enter your email" />
          <button className="cta-button secondary">Get Registration Reminder</button>
        </div>

        {/* --- Embedded Map (Placeholder) --- */}
        <div className="map-placeholder">
          {/* Map functionality will be added in a future version. */}
          <p>Map of {activity.address} will be here.</p>
        </div>
      </div>
    </main>
  );
}