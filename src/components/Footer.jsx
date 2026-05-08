import { useEffect, useState } from 'react';

const formatUTC = (d) => {
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss} utc`;
};

export default function Footer() {
  const [now, setNow] = useState(() => formatUTC(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(formatUTC(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="rail rail-bottom" role="contentinfo">
      <div className="rail-inner">
        <span className="rail-cap left mono-time">{now}</span>
        <span className="rail-rule" aria-hidden="true">
          <a
            className="fm-mark"
            href="https://www.forcemajeure.vip"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="force majeure"
            data-spark
          >
            <img src="/images/fm-mark.png" alt="" />
          </a>
        </span>
        <span className="rail-cap right">v0.1</span>
      </div>
    </footer>
  );
}
