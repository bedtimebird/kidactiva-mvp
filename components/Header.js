// components/Header.js
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import SearchBar from './SearchBar'; // Import the SearchBar

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // No need to redirect here, the onAuthStateChange listener will update the UI
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <Link href="/" className="logo">KidActiva</Link>
      </div>
      
      <div className="header-center">
        <SearchBar /> {/* The SearchBar is now in the middle */}
      </div>

      <div className="header-right">
        <nav>
          {user ? (
            <>
              <Link href="/profile">My Profile</Link>
              <button onClick={handleLogout} className="logout-button">Log Out</button>
            </>
          ) : (
            <Link href="/login" className='login-button'>Log In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}