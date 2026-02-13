// utils/timeAgo.js
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date; // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years + (years === 1 ? " year ago" : " years ago");
  if (months > 0) return months + (months === 1 ? " month ago" : " months ago");
  if (days > 0) return days + (days === 1 ? " day ago" : " days ago");
  if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
  if (minutes > 0) return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  return "Just now";
}
