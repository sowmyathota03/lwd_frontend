//./src/utils/formatLastActive.js
export const formatLastActive = (lastActiveAt) => {
  if (!lastActiveAt) return "Offline";

  const last = new Date(lastActiveAt);
  const now = new Date();

  const diffSeconds = Math.floor((now - last) / 1000);

  if (diffSeconds < 60) return "Active just now";

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `Active ${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Active ${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `Active ${days} day ago`;
};
