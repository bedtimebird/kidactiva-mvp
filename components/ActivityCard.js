// components/ActivityCard.js

// This component displays a summary of a single activity.
export default function ActivityCard({ activity }) {
  // Basic validation to prevent errors if activity data is missing
  if (!activity) {
    return null;
  }

  return (
    <div className="activity-card">
      <h3>{activity.name}</h3>
      <p><strong>Provider:</strong> {activity.provider_name}</p>
      <p><strong>Ages:</strong> {activity.age_min} - {activity.age_max}</p>
      <p><strong>Cost:</strong> ${activity.cost}</p>
      <a href={activity.provider_website_url} target="_blank" rel="noopener noreferrer">
        Register on Provider's Site
      </a>
    </div>
  );
}