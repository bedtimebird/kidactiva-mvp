// app/reminder-confirmed/page.js
import Link from 'next/link';

export default function ReminderConfirmedPage() {
  return (
    <main className="main">
      <div className="confirmation-container">
        <h1>✅ You&apos;re All Set!</h1>
        <p>Your reminder has been successfully saved.</p>
        <p>We&apos;ll send you an email before registration opens.</p>
        <Link href="/" className="cta-button primary">
          Find More Activities
        </Link>
      </div>
    </main>
  );
}