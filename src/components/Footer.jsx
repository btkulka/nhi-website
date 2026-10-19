import { useEffect, useState } from 'react';

const formatUTC = (d) => {
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss} utc`;
};

export default function Footer({ version }) {
  const [now, setNow] = useState(() => formatUTC(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(formatUTC(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="rail rail-bottom" role="contentinfo">
      <div className="rail-inner">
        <span className="rail-cap left mono-time">{now}</span>
        <span className="rail-rule" aria-hidden="true" />
        <span className="rail-cap right">{version ? `v${version}` : null}</span>
      </div>
    </footer>
  );
}
