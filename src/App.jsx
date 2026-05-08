import TopBar from './components/TopBar.jsx';
import Wordmark from './components/Wordmark.jsx';
import VideoStrip from './components/VideoStrip.jsx';
import LinkList from './components/LinkList.jsx';
import Footer from './components/Footer.jsx';
import AudioBar from './components/AudioBar.jsx';
import RippleLayer from './components/RippleLayer.jsx';
import { LINKS, NOW_PLAYING } from './content.js';

export default function App() {
  return (
    <div className="app">
      <TopBar />
      <main className="stage">
        <div className="grid">
          <Wordmark />
          <div className="right">
            <VideoStrip />
          </div>
          <AudioBar track={NOW_PLAYING} />
          <LinkList items={LINKS} />
        </div>
      </main>
      <Footer />
      <RippleLayer />
    </div>
  );
}
