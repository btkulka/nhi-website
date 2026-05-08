export default function TopBar() {
  return (
    <header className="topbar">
      <a className="gamut-mark" href="/" aria-label="nhi — home">
        <img src="/the-gamut.jpg" alt="" />
      </a>
      <div className="broadcast">
        <span className="dot" aria-hidden="true" />
        <span>broadcasting</span>
      </div>
    </header>
  );
}
