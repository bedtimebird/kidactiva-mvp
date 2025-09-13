// app/login/page.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to the profile page on successful login
      router.push('/profile');
    }
  };
  
  // A helper for users who signed up via magic link and don't have a password yet
  const handlePasswordReset = async () => {
     if (!email) {
        setError("Please enter your email address to reset password.");
        return;
     }
     setError('');
     const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
     });
     if (error) setError(error.message);
     else alert("Check your email for a password reset link!");
  };

  return (
    <main className="main">
      <div className="auth-form-container">
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="cta-button primary">Log In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
            First time logging in or forgot your password? 
            <button onClick={handlePasswordReset} className="link-button">Set a password</button>
        </p>
      </div>
    </main>
  );
}