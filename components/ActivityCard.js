// components/ActivityCard.js
"use client";

import Link from 'next/link';

export default function ActivityCard({ activity }) {
  // Handler for the external registration button
  const handleExternalLinkClick = (e) => {
    // 1. Prevent the click from triggering the parent <Link> component's navigation
    e.stopPropagation(); 
    
    // 2. Open the provider's URL in a new tab
    window.open(activity.provider_registration_url, '_blank', 'noopener,noreferrer');
  };

  return (
    // The entire card is a link to the activity detail page
    <Link href={`/activity/${activity.id}`} className="activity-card-link">
      <div className="activity-card">
        <h3>{activity.name}</h3>
        <p><strong>Provider:</strong> {activity.providers.name}</p>
        <p><strong>Location:</strong> {activity.locations.name}</p>
        <p><strong>Ages:</strong> {activity.age_min}-{activity.age_max}</p>
        <p><strong>Cost:</strong> ${activity.cost}</p>
        
        {/* This is now a button to avoid nested <a> tags */}
        <button 
          onClick={handleExternalLinkClick} 
          className="external-link-button"
        >
          Register on Provider's Site
        </button>
      </div>
    </Link>
  );
}