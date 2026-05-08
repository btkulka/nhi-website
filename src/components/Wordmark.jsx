export default function Wordmark() {
  return (
    <div className="stack" aria-label="nhi">
      <div className="letter" style={{ '--phase': '0s' }} data-spark>n</div>
      <div className="letter red" style={{ '--phase': '-2.4s' }} data-spark>h</div>
      <div className="letter" style={{ '--phase': '-4.8s' }} data-spark>i</div>
    </div>
  );
}
