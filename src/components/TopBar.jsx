export default function TopBar() {
  return (
    <header className="rail rail-top" role="banner">
      <div className="rail-inner">
        <span className="rail-cap left">nhi · transmission 001</span>
        <span className="rail-rule" aria-hidden="true">
          <span className="rail-tick" />
        </span>
        <span className="rail-cap right">austin · tx</span>
      </div>
    </header>
  );
}
