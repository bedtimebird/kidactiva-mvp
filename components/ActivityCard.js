// components/ActivityCard.js

// This component displays a summary of a single activity using the new schema.
export default function ActivityCard({ activity }) {
  if (!activity) {
    return null;
  }

  // The provider name is now nested inside a 'providers' object after our join.
  const providerName = activity.providers ? activity.providers.name : 'N/A';

  return (
    <div className="activity-card">
      {/* Changed 'name' to 'title' */}
      <h3>{activity.title}</h3> 
      <p><strong>Provider:</strong> {providerName}</p>
      <p><strong>Ages:</strong> {activity.age_min} - {activity.age_max}</p>
      <p><strong>Cost:</strong> ${activity.cost}</p>
      
      {/* Changed 'provider_website_url' to 'provider_registration_url' */}
      <a href={activity.provider_registration_url} target="_blank" rel="noopener noreferrer">
        Register on Provider's Site
      </a>
    </div>
  );
}