// NHI mobile site — release / show / audio components
const { useState: _useS, useEffect: _useE, useRef: _useR } = React;

// ── Hero (full-bleed image with bottom scrim) ───────────────────────────────
function Hero({ image, eyebrow, title, sub, onPlay }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '9 / 14',
      overflow: 'hidden',
      background: '#0a0908',
    }}>
      <img src={image} alt="" style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', objectFit: 'cover',
        display: 'block',
      }} />
      <div style={{
        position: 'absolute', inset: 'auto 0 0 0',
        height: '60%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(10,9,8,0.4) 30%, rgba(10,9,8,0.95) 100%)',
      }} />
      <div style={{
        position: 'absolute', left: 20, right: 20, bottom: 28,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {eyebrow && <Eyebrow ember>{eyebrow}</Eyebrow>}
        <Display size={56} italic>{title}</Display>
        {sub && <Meta style={{ color: 'var(--bone-2)' }}>{sub}</Meta>}
        <div style={{ display: 'flex', gap: 14, marginTop: 8, alignItems: 'center' }}>
          <PrimaryBtn onClick={onPlay}>listen</PrimaryBtn>
          <TextLink>read more</TextLink>
        </div>
      </div>
    </div>
  );
}

// ── Release tile (image-as-card) ────────────────────────────────────────────
function ReleaseTile({ image, eyebrow, title, meta, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'relative', width: '100%', aspectRatio: '4 / 5',
      padding: 0, border: 0, overflow: 'hidden',
      background: `url(${image}) center/cover`,
      cursor: 'pointer', display: 'block',
    }}>
      <div style={{
        position: 'absolute', inset: 'auto 0 0 0', height: '55%',
        background: 'linear-gradient(180deg, transparent, rgba(10,9,8,0.95))',
      }} />
      <div style={{
        position: 'absolute', left: 14, right: 14, bottom: 14,
        display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left',
      }}>
        {eyebrow && <Eyebrow ember>{eyebrow}</Eyebrow>}
        <Display size={26} italic>{title}</Display>
        {meta && <Meta style={{ fontSize: 10 }}>{meta}</Meta>}
      </div>
    </button>
  );
}

// ── Show row ───────────────────────────────────────────────────────────────
function ShowRow({ date, venue, city, ticket, soldOut }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '78px 1fr auto',
      gap: 14, alignItems: 'baseline',
      padding: '20px 0',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <Meta style={{ letterSpacing: '0.18em', color: 'var(--bone-3)' }}>{date}</Meta>
      <div>
        <Display size={20} italic>{venue}</Display>
        <Eyebrow style={{ display: 'block', marginTop: 6 }}>{city}</Eyebrow>
      </div>
      {soldOut
        ? <Meta style={{ color: 'var(--bone-4)' }}>sold out</Meta>
        : <Meta style={{ color: 'var(--bone)' }}>tickets ↗</Meta>}
    </div>
  );
}

// ── Audio bar (fixed bottom) ───────────────────────────────────────────────
function AudioBar({ track, playing, onToggle, progress = 0.3 }) {
  if (!track) return null;
  return (
    <div style={{
      position: 'absolute',
      left: 0, right: 0, bottom: 0,
      background: 'rgba(10,9,8,0.78)',
      backdropFilter: 'blur(20px) saturate(120%)',
      WebkitBackdropFilter: 'blur(20px) saturate(120%)',
      borderTop: '1px solid var(--hairline)',
      padding: '14px 16px',
      paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
      display: 'flex', alignItems: 'center', gap: 14,
      zIndex: 40,
    }}>
      <button onClick={onToggle} aria-label={playing ? 'pause' : 'play'} style={{
        width: 36, height: 36, borderRadius: 999,
        border: '1px solid var(--bone)', background: 'transparent',
        color: 'var(--bone)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {playing
          ? <svg width="10" height="12" viewBox="0 0 10 12"><rect x="0" y="0" width="3" height="12" fill="currentColor"/><rect x="7" y="0" width="3" height="12" fill="currentColor"/></svg>
          : <svg width="10" height="12" viewBox="0 0 10 12"><path d="M0 0L10 6L0 12Z" fill="currentColor"/></svg>}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Display size={15} italic style={{ lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</Display>
        <Eyebrow style={{ display: 'block', marginTop: 6, fontSize: 9 }}>{track.artist} · {track.position} / {track.duration}</Eyebrow>
        <div style={{ height: 1, background: 'var(--hairline)', marginTop: 8, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 1, width: `${progress * 100}%`, background: 'var(--ember)' }} />
          <div style={{ position: 'absolute', left: `${progress * 100}%`, top: -2, width: 5, height: 5, borderRadius: 999, background: 'var(--ember)', transform: 'translateX(-50%)' }} />
        </div>
      </div>
    </div>
  );
}

// ── Tracklist ──────────────────────────────────────────────────────────────
function Tracklist({ tracks, activeIndex, onPlay }) {
  return (
    <div>
      {tracks.map((t, i) => (
        <button key={i} onClick={() => onPlay(i)} style={{
          width: '100%', textAlign: 'left',
          background: 'transparent', border: 0,
          padding: '14px 0', cursor: 'pointer',
          display: 'grid', gridTemplateColumns: '32px 1fr auto',
          gap: 14, alignItems: 'baseline',
          borderBottom: '1px solid var(--hairline)',
        }}>
          <Meta style={{
            letterSpacing: '0.08em',
            color: i === activeIndex ? 'var(--ember)' : 'var(--bone-3)',
          }}>{String(i + 1).padStart(2, '0')}</Meta>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Display size={18} italic color={i === activeIndex ? 'var(--bone)' : 'var(--bone-2)'}>{t.title}</Display>
            {i === activeIndex && <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--ember)' }} />}
          </span>
          <Meta style={{ color: 'var(--bone-3)', letterSpacing: '0.04em' }}>{t.duration}</Meta>
        </button>
      ))}
    </div>
  );
}

// ── Subscribe field ────────────────────────────────────────────────────────
function SubscribeField() {
  const [v, setV] = _useS('');
  const [done, setDone] = _useS(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Eyebrow>transmissions, occasional</Eyebrow>
      {done
        ? <Meta style={{ color: 'var(--ember)' }}>received.</Meta>
        : (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: '1px solid var(--hairline)', paddingBottom: 10 }}>
            <input
              value={v}
              onChange={e => setV(e.target.value)}
              placeholder="email"
              style={{
                flex: 1, background: 'transparent', border: 0, outline: 0,
                color: 'var(--bone)',
                fontFamily: 'var(--font-body)', fontWeight: 300,
                fontSize: 15, letterSpacing: '-0.01em',
              }}
            />
            <button onClick={() => v && setDone(true)} style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--bone)',
            }}>subscribe</button>
          </div>
        )}
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  const links = [['spotify', '↗'], ['apple music', '↗'], ['bandcamp', '↗'], ['instagram', '↗']];
  return (
    <div style={{ padding: '64px 20px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map(([name, glyph]) => (
          <div key={name} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '12px 0', borderBottom: '1px solid var(--hairline)',
          }}>
            <Eyebrow>{name}</Eyebrow>
            <Meta style={{ color: 'var(--bone)' }}>{glyph}</Meta>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Wordmark italic size={14} />
        <Meta style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--bone-4)', textTransform: 'uppercase' }}>austin · tx · ©2026</Meta>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, ReleaseTile, ShowRow, AudioBar, Tracklist, SubscribeField, Footer });
