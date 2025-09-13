// app/auth-error/page.js
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <main className="main">
      <div className="confirmation-container">
        <h1>❌ Oops! Something went wrong.</h1>
        <p>Your confirmation link may have expired or been used already.</p>
        <p>Please try setting the reminder again.</p>
        <Link href="/" className="cta-button primary">
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}