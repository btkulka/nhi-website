export default function TopBar({ artist }) {
  const name = artist?.name || 'nhi';
  const transmission = String(artist?.transmission ?? 0).padStart(3, '0');
  return (
    <header className="rail rail-top" role="banner">
      <div className="rail-inner">
        <span className="rail-cap left">{name} · transmission {transmission}</span>
        <span className="rail-rule" aria-hidden="true">
          <span className="rail-tick" />
        </span>
        <span className="rail-cap right">{artist?.city}</span>
      </div>
    </header>
  );
}
