export default function Footer() {
  const today = new Date();
  const stamp = `${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}.${today.getFullYear()}`;
  return (
    <div className="footer">
      <span>{stamp}</span>
      <span>mmxxvi</span>
    </div>
  );
}
