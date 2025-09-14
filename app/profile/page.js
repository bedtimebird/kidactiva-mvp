// app/profile/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // If no user is logged in, redirect to the login page
        router.push('/login');
        return;
      }

      setUser(session.user);

      // Fetch reminders for the logged-in user
      const { data, error } = await supabase
        .from('reminders')
        .select(`
          activity_id,
          activities ( id, title, start_date )
        `)
        .eq('user_id', session.user.id);

      if (error) {
        console.error("Error fetching reminders:", error);
      } else {
        setReminders(data);
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [router]);

  if (loading) {
    return <main className="main"><div>Loading profile...</div></main>;
  }

  return (
    <main className="main">
      <div className="profile-container">
        <h1>My Profile</h1>
        <p>Welcome, <strong>{user?.email}</strong>!</p>
        
        <h2>My Reminders</h2>
        {reminders.length > 0 ? (
          <ul className="reminders-list">
            {reminders.map(reminder => (
              <li key={reminder.activity_id}>
                <Link href={`/activity/${reminder.activities.id}`}>
                  <strong>{reminder.activities.title}</strong>
                  <br />
                  <span>Starts on: {new Date(reminder.activities.start_date).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven&apos;t set any reminders yet. Go find an activity!</p>
        )}
      </div>
    </main>
  );
}