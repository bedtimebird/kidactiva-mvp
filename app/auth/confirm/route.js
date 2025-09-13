/ app/api/auth/confirm/route.js

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const activity_id = requestUrl.searchParams.get('activity_id');

  if (code && activity_id) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange the code for a valid user session.
    const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('Session exchange error:', sessionError.message);
      // Redirect to an error page if the token is invalid or expired
      return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
    }

    if (session) {
      const user_id = session.user.id;

      // Best practice: Check if a reminder already exists to avoid duplicates.
      const { data: existingReminder, error: checkError } = await supabase
        .from('reminders')
        .select('id')
        .eq('user_id', user_id)
        .eq('activity_id', activity_id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking for existing reminder:', checkError.message);
        return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
      }

      // If no reminder exists, create one.
      if (!existingReminder) {
        const { error: insertError } = await supabase
          .from('reminders')
          .insert({ user_id: user_id, activity_id: activity_id });

        if (insertError) {
          console.error('Error creating reminder:', insertError.message);
          return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
        }
      }
    }
    
    // Redirect the user to a success page after the reminder is set.
    return NextResponse.redirect(`${requestUrl.origin}/reminder-confirmed`);
  }

  // Redirect if the code is missing
  return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
}