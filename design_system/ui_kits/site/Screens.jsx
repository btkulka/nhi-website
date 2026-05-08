// Screens for the NHI mobile site mock
const { useState: __uS, useEffect: __uE, useRef: __uR } = React;

const RELEASES = [
  { id: 'burning-tree', image: '../../assets/the-gamut.jpg', eyebrow: 'NEW · 04.26', title: 'burning tree', meta: 'single · 4:32' },
  { id: 'the-gamut',    image: '../../assets/inspiration/breathe.jpg', eyebrow: '2025', title: 'the gamut', meta: 'lp · 38:14' },
  { id: 'dissolve',     image: '../../assets/inspiration/dissolve.jpg', eyebrow: '2024', title: 'dissolve', meta: 'ep · 17:02' },
  { id: 'fated',        image: '../../assets/inspiration/fated.jpg', eyebrow: '2024', title: 'fated', meta: 'single · 5:21' },
];

const TRACKS = [
  { title: 'burning tree', duration: '4:32' },
  { title: 'the gamut', duration: '5:18' },
  { title: 'dissolve', duration: '3:47' },
  { title: 'innerbloom (rework)', duration: '6:04' },
  { title: 'fated', duration: '5:21' },
];

const SHOWS = [
  { date: '04.18.26', venue: 'at the rosewood', city: 'austin · tx' },
  { date: '05.04.26', venue: 'empire control room', city: 'austin · tx', soldOut: true },
  { date: '05.30.26', venue: 'the parish', city: 'austin · tx' },
  { date: '06.21.26', venue: 'marfa myths', city: 'marfa · tx' },
  { date: '07.12.26', venue: 'mohawk', city: 'austin · tx' },
];

// ── Home ───────────────────────────────────────────────────────────────────
function HomeScreen({ onPlay }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: 120 }}>
      <Hero
        image="../../assets/the-gamut.jpg"
        eyebrow="NEW · 04.26"
        title="burning tree"
        sub="single · out now · 4:32"
        onPlay={() => onPlay(0)}
      />
      <div style={{ padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Eyebrow>recent</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {RELEASES.slice(0, 4).map((r, i) => (
            <ReleaseTile key={r.id} {...r} onClick={() => onPlay(i)} />
          ))}
        </div>
      </div>
      <div style={{ padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Eyebrow>shows</Eyebrow>
        <div>
          {SHOWS.slice(0, 3).map((s, i) => <ShowRow key={i} {...s} />)}
        </div>
        <TextLink ember={false}>all shows →</TextLink>
      </div>
      <div style={{ padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
        <Display size={40} italic>the signal precedes the song.</Display>
        <Meta style={{ maxWidth: 320, color: 'var(--bone-3)', lineHeight: 1.7, letterSpacing: '0.04em', fontSize: 12 }}>
          a recording project from austin, tx. patient music for patient listeners — released without warning, on its own clock.
        </Meta>
      </div>
      <div style={{ padding: '48px 20px 0' }}><SubscribeField /></div>
      <Footer />
    </div>
  );
}

// ── Listen / release detail ────────────────────────────────────────────────
function ListenScreen({ activeIndex, onPlay }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: 120 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
        <img src="../../assets/the-gamut.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '40%', background: 'linear-gradient(180deg, transparent, rgba(10,9,8,0.92))' }} />
      </div>
      <div style={{ padding: '32px 20px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Eyebrow ember>LP · 2025</Eyebrow>
        <Display size={48} italic>the gamut</Display>
        <Meta>nhi · 8 tracks · 38:14</Meta>
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          <PrimaryBtn onClick={() => onPlay(0)}>play</PrimaryBtn>
          <GhostBtn>save</GhostBtn>
        </div>
      </div>
      <div style={{ padding: '40px 20px 0' }}>
        <Tracklist tracks={TRACKS} activeIndex={activeIndex} onPlay={onPlay} />
      </div>
      <div style={{ padding: '40px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Eyebrow>credits</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 10, columnGap: 14 }}>
          <Meta>written</Meta><Meta style={{ color: 'var(--bone-2)' }}>nhi</Meta>
          <Meta>mixed</Meta><Meta style={{ color: 'var(--bone-2)' }}>nhi · austin, tx</Meta>
          <Meta>mastered</Meta><Meta style={{ color: 'var(--bone-2)' }}>—</Meta>
          <Meta>artwork</Meta><Meta style={{ color: 'var(--bone-2)' }}>the gamut</Meta>
          <Meta>label</Meta><Meta style={{ color: 'var(--bone-2)' }}>force majeure</Meta>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── Shows ──────────────────────────────────────────────────────────────────
function ShowsScreen() {
  return (
    <div style={{ paddingTop: 96, paddingBottom: 120, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Eyebrow>shows · 2026</Eyebrow>
        <Display size={56} italic>elsewhere.</Display>
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        {SHOWS.map((s, i) => <ShowRow key={i} {...s} />)}
      </div>
      <Footer />
    </div>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function AboutScreen() {
  return (
    <div style={{ paddingTop: 96, paddingBottom: 120 }}>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Eyebrow>about</Eyebrow>
        <Display size={48} italic>a recording<br/>project.</Display>
        <p style={{ color: 'var(--bone-2)', fontSize: 16, lineHeight: 1.7, fontWeight: 300, margin: 0, maxWidth: 360 }}>
          nhi is the work of an austin-based artist. the project is also majority-held by force majeure. patient, image-led, instrumental — released without warning, on its own clock.
        </p>
        <p style={{ color: 'var(--bone-3)', fontSize: 14, lineHeight: 1.75, fontWeight: 300, margin: 0, maxWidth: 360 }}>
          the signal precedes the song. the song precedes the sleeve. the sleeve precedes nothing.
        </p>
      </div>
      <div style={{ padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Eyebrow>contact</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 12, columnGap: 14 }}>
          <Meta>booking</Meta><Meta style={{ color: 'var(--bone)' }}>booking@nhi.audio</Meta>
          <Meta>press</Meta><Meta style={{ color: 'var(--bone)' }}>press@nhi.audio</Meta>
          <Meta>label</Meta><Meta style={{ color: 'var(--bone)' }}>force majeure</Meta>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Object.assign(window, { HomeScreen, ListenScreen, ShowsScreen, AboutScreen, RELEASES, TRACKS, SHOWS });
