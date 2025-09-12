// app/api/test-db/route.js

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// This function handles GET requests to the /api/test-db endpoint.
export async function GET() {
  // Initialize the Supabase client within the server-side environment.
  // Note: We use process.env here directly.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // Perform a simple query to fetch the first provider.
    // This is a lightweight way to confirm we can read from the database.
    const { data, error } = await supabase
      .from('providers')
      .select('name')
      .limit(1);

    // If there was an error during the query...
    if (error) {
      throw error; // This will be caught by the catch block
    }

    // If the query was successful...
    return NextResponse.json({ 
      message: "✅ Supabase connection successful!",
      data: data 
    });

  } catch (error) {
    // If any part of the process fails...
    console.error("Supabase connection error:", error);
    return NextResponse.json({ 
      message: "❌ Supabase connection failed.",
      error: error.message 
    }, { status: 500 }); // Return a 500 server error status
  }
}