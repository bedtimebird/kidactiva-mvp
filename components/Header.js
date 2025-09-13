// components/Header.js
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for an initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listen for auth state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup the subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="site-header">
      <Link href="/" className="logo">KidActiva</Link>
      <nav>
        {user ? (
          <>
            <Link href="/profile">My Profile</Link>
            <button onClick={handleLogout} className="logout-button">Log Out</button>
          </>
        ) : (
          <>
            <Link href="/login">Log In</Link>
          </>
        )}
      </nav>
    </header>
  );
}