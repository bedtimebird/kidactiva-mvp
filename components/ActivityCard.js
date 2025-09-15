// components/ActivityCard.js
import Link from 'next/link';

export default function ActivityCard({ activity }) {
  if (!activity) {
    return null;
  }
  
  const providerName = activity.providers?.name ?? 'Provider N/A';
  const locationName = activity.locations?.name ?? 'Location N/A';
  const activityTitle = activity.title ?? 'Untitled Activity';
  const categoryIcon = activity.categories?.icon_url; 

  return (
    <div className="activity-card">
      <Link href={`/activity/${activity.id}`} className="activity-title-link">
        <h3>
          {categoryIcon && <img src={categoryIcon} alt={activity.categories.name} className="category-icon" />}
          {activityTitle}
        </h3>
      </Link>
      
      <p><strong>Provider:</strong> {providerName}</p>
      <p><strong>Location:</strong> {locationName}</p>
      <p><strong>Ages:</strong> {activity.age_min}-{activity.age_max}</p>
      <p><strong>Cost:</strong> ${activity.cost}</p>
      
      <a 
        href={activity.provider_registration_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="register-link"
      >
        Register on Provider&apos;s Site
      </a>
    </div>
  );
}