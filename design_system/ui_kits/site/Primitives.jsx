// NHI mobile site — components
const { useState, useEffect, useRef } = React;

// ── Wordmark ────────────────────────────────────────────────────────────────
function Wordmark({ italic = false, size = 18, dot = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--bone)' }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--ember)' }} />}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontStyle: italic ? 'italic' : 'normal',
        fontWeight: 400,
        fontSize: size,
        letterSpacing: '-0.01em',
        lineHeight: 1
      }}>nhi</span>
    </span>
  );
}

// ── Top nav (appears on scroll) ─────────────────────────────────────────────
function TopNav({ active, onNavigate, scrolled }) {
  const items = ['listen', 'shows', 'about'];
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: scrolled ? 'rgba(10,9,8,0.72)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(120%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(120%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'background 240ms var(--ease-out), border-color 240ms var(--ease-out)',
      zIndex: 50,
    }}>
      <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
        <Wordmark italic size={18} />
      </button>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        {items.map(i => (
          <button key={i} onClick={() => onNavigate(i)} style={{
            background: 'none', border: 0, padding: 0, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: active === i ? 'var(--bone)' : 'var(--bone-4)',
            transition: 'color 240ms var(--ease-out)',
          }}>{i}</button>
        ))}
      </div>
    </div>
  );
}

// ── Eyebrow / meta primitives ───────────────────────────────────────────────
function Eyebrow({ children, ember = false, style }) {
  return <span style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: ember ? 'var(--ember)' : 'var(--bone-3)',
    lineHeight: 1,
    ...style
  }}>{children}</span>;
}

function Meta({ children, style }) {
  return <span style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.08em',
    color: 'var(--bone-3)',
    ...style
  }}>{children}</span>;
}

function Display({ children, size = 36, italic = true, color = 'var(--bone)', as: As = 'div', style }) {
  return <As style={{
    fontFamily: 'var(--font-display)',
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 300,
    fontSize: size,
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color,
    ...style
  }}>{children}</As>;
}

// ── Buttons ─────────────────────────────────────────────────────────────────
function PrimaryBtn({ children, onClick, full = false }) {
  return (
    <button onClick={onClick} style={{
      background: 'var(--bone)', color: 'var(--ink)',
      border: 0, padding: '14px 28px',
      width: full ? '100%' : 'auto',
      fontFamily: 'var(--font-body)', fontWeight: 600,
      fontSize: 13, letterSpacing: '0.08em', textTransform: 'lowercase',
      cursor: 'pointer',
      transition: 'transform 140ms var(--ease-out), opacity 240ms var(--ease-out)',
    }}
    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
    onMouseUp={e => e.currentTarget.style.transform = ''}
    onMouseLeave={e => e.currentTarget.style.transform = ''}>{children}</button>
  );
}

function GhostBtn({ children, onClick, full = false }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', color: 'var(--bone)',
      border: '1px solid var(--bone)',
      padding: '13px 27px',
      width: full ? '100%' : 'auto',
      fontFamily: 'var(--font-body)', fontWeight: 500,
      fontSize: 13, letterSpacing: '0.08em', textTransform: 'lowercase',
      cursor: 'pointer',
    }}>{children}</button>
  );
}

function TextLink({ children, ember = true }) {
  return <span style={{
    fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
    letterSpacing: '0.04em', color: 'var(--bone)',
    paddingBottom: 4,
    borderBottom: ember ? '1px solid var(--ember)' : '1px solid var(--bone-4)',
    cursor: 'pointer',
  }}>{children}</span>;
}

// Export
Object.assign(window, { Wordmark, TopNav, Eyebrow, Meta, Display, PrimaryBtn, GhostBtn, TextLink });
