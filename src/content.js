export const LINKS = [
  { platform: 'spotify',    handle: 'nhi',                            href: 'https://open.spotify.com/artist/5FT7FmovNNObOlH1mwRWxR?si=PQnJ4LL0T2m3fSguJ8Ehuw' },
  { platform: 'soundcloud', handle: '@nhi-dj',                        href: 'https://soundcloud.com/nhi-dj' },
  { platform: 'instagram',  handle: '@nhi.wav',                       href: 'https://instagram.com/nhi.wav' },
  { platform: 'tiktok',     handle: '@nhi.wav',                       href: 'https://tiktok.com/@nhi.wav' },
  { platform: 'email',      handle: 'management@forcemajeure.vip',    href: 'mailto:management@forcemajeure.vip', label: 'management' },
];

export const NOW_PLAYING = {
  title: 'i need a forest fire',
  flipTag: 'nhi flip',
  attribution: 'james blake · bon iver',
  src: '/audio/i-need-a-forest-fire-nhi-flip.mp3',
  // hifiSrc: leave null until the lossless master is hosted (e.g. on R2).
  // The audio bar's swap logic is dormant when this is missing.
  hifiSrc: null,
  art: '/images/forest-fire-art.jpg',
  trackUrl: 'https://soundcloud.com/nhi-dj/i-need-a-forest-fire',
};
