export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);

  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'agora';
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} h`;
  if (days < 7) return `${days} dias`;
  if (weeks < 4) return `${weeks} sem`;
  if (months < 12) return `${months} mês${months > 1 ? 'es' : ''}`;
  return `${years} ano${years > 1 ? 's' : ''}`;
}