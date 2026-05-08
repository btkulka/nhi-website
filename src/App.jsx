import TopBar from './components/TopBar.jsx';
import Wordmark from './components/Wordmark.jsx';
import VideoStrip from './components/VideoStrip.jsx';
import Tagline from './components/Tagline.jsx';
import LinkList from './components/LinkList.jsx';
import Footer from './components/Footer.jsx';
import AudioBar from './components/AudioBar.jsx';
import { LINKS, NOW_PLAYING } from './content.js';

export default function App() {
  return (
    <div className="stage">
      <TopBar />
      <main className="grid">
        <Wordmark />
        <div className="right">
          <VideoStrip />
          <Tagline />
          <LinkList items={LINKS} />
        </div>
        <Footer />
      </main>
      <AudioBar track={NOW_PLAYING} />
    </div>
  );
}
