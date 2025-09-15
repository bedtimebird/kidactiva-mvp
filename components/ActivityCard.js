// components/ActivityCard.js
import Link from 'next/link';

export default function ActivityCard({ activity }) {
  if (!activity) {
    return null;
  }
  
  // Use optional chaining (?.) to safely access nested properties.
  // Use the nullish coalescing operator (??) to provide a default value.
  const providerName = activity.providers?.name ?? 'Provider N/A';
  const locationName = activity.locations?.name ?? 'Location N/A';
  const activityTitle = activity.title ?? 'Untitled Activity';


  return (
    <Link href={`/activity/${activity.id}`} className="activity-card-link">
      <div className="activity-card">
        <h3>{activityTitle}</h3>
        <p><strong>Provider:</strong> {providerName}</p>
        <p><strong>Location:</strong> {locationName}</p>
        <p><strong>Ages:</strong> {activity.age_min}-{activity.age_max}</p>
        <p><strong>Cost:</strong> ${activity.cost}</p>
        
        <a 
          href={activity.provider_registration_url} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} 
        >
          Register on Provider's Site
        </a>
      </div>
    </Link>
  );
}