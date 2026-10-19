import { formatDate } from '../content.js';

// One mono line about what is coming. Renders nothing when the dashboard
// has no scheduled release.
export default function NextUp({ next }) {
  if (!next || !next.title) return null;
  const line = ['next', next.title, formatDate(next.date)].filter(Boolean).join(' · ');
  return <p className="next">{line}</p>;
}
