import TopBar from './components/TopBar.jsx';
import Wordmark from './components/Wordmark.jsx';
import VideoStrip from './components/VideoStrip.jsx';
import AudioBar from './components/AudioBar.jsx';
import EmbedPlayer from './components/EmbedPlayer.jsx';
import ReleaseList from './components/ReleaseList.jsx';
import NextUp from './components/NextUp.jsx';
import LinkList from './components/LinkList.jsx';
import Footer from './components/Footer.jsx';
import RippleLayer from './components/RippleLayer.jsx';
import { CONTENT, featuredOf } from './content.js';

// The whole page renders from one generated object. `content` is a prop so
// tests can hand in variants (no now_playing, no next) without mocking.
export default function App({ content = CONTENT }) {
  const featured = featuredOf(content);
  return (
    <div className="app">
      <TopBar artist={content.artist} />
      <main>
        <section className="hero" aria-label="featured">
          <Wordmark />
          <div className="right">
            <VideoStrip track={featured} />
          </div>
          {content.now_playing?.embed
            ? <EmbedPlayer track={content.now_playing} />
            : <AudioBar track={content.now_playing} />}
        </section>
        <div className="stream">
          <ReleaseList releases={content.releases} />
          <NextUp next={content.next} />
          <LinkList items={content.links} />
        </div>
      </main>
      <Footer version={content.version} />
      <RippleLayer />
    </div>
  );
}
