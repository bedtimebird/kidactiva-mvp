// components/ActivityCard.js
import Link from 'next/link'; // Import the Link component

// This component displays a summary of a single activity using the new schema.
export default function ActivityCard({ activity }) {
  if (!activity) {
    return null;
  }
  
  const providerName = activity.providers ? activity.providers.name : 'N/A';

  return (
    // Wrap the entire card content in a Link component
    <Link href={`/activity/${activity.id}`} className="activity-card-link">
      <div className="activity-card">
        <h3>{activity.title}</h3>
        <p><strong>Provider:</strong> {providerName}</p>
        <p><strong>Ages:</strong> {activity.age_min} - {activity.age_max}</p>
        <p><strong>Cost:</strong> ${activity.cost}</p>
        {/* We keep the external link here too, for users who know what they want */}
        <a 
          href={activity.provider_registration_url} 
          target="_blank" 
          rel="noopener noreferrer"
          // Stop the click from navigating to the detail page if the user clicks the register link
          onClick={(e) => e.stopPropagation()} 
        >
          Register on Provider's Site
        </a>
      </div>
    </Link>
  );
}