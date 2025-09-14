// components/ReminderForm.js
"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ReminderForm({ activityId }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleReminder = async (e) => {
    e.preventDefault();
    setError('');

    // This single Supabase function handles both sign-up and sign-in.
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // This URL is where the user will be sent back to after clicking the magic link.
        // We are passing the activityId along so we can create the reminder after they confirm.
        emailRedirectTo: `${window.location.origin}/api/auth/confirm?activity_id=${activityId}`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="reminder-form">
        <h3>Check your inbox!</h3>
        <p>We&apos;ve sent a confirmation link to <strong>{email}</strong>. Click the link to set your reminder.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleReminder} className="reminder-form">
      <h3>Never Miss a Deadline!</h3>
      <p>Enter your email to get a reminder before registration closes.</p>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="cta-button secondary">
        Get Registration Reminder
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
