/**
 * Converts a 24-hour time string (e.g., "14:30") to a 12-hour format string with AM/PM (e.g., "2:30 PM")
 * @param {string} time - The time string in 24-hour format (HH:MM)
 * @returns {string} The formatted time string in 12-hour format
 */
export function formatTime(time) {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  let h = parseInt(hour, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12; // Convert '0' to '12' for midnight
  return `${h}:${minute} ${ampm}`;
}
