export const formatNoticePeriod = (days) => {
  if (days == null) return "";

  if (days >= 30) {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  }

  return `${days} day${days > 1 ? "s" : ""}`;
};
