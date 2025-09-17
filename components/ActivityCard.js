import Link from 'next/link';

export default function ActivityCard({ activity }) {
  if (!activity) {
    return null;
  }
  
  const providerName = activity.providers?.name ?? 'Provider N/A';
  const locationName = activity.locations?.name ?? 'Location N/A';
  const activityTitle = activity.title ?? 'Untitled Activity';
  const categoryIcon = activity.sub_categories?.icon_url; // Corrected from categories

  return (
    <div className="activity-card">
      {categoryIcon && <img src={categoryIcon} alt="" className="activity-card-icon" />}
      <Link href={`/activity/${activity.id}`} className="activity-title-link">
        <h3>{activityTitle}</h3>
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
