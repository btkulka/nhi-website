# NHI Mobile Site — UI Kit

A pixel-fidelity recreation of the NHI artist site as an interactive mock. Mobile-first; the design is intentionally narrow on desktop.

## Files
| File | Role |
|---|---|
| `index.html` | The interactive mock — routes between Home, Listen, Shows, About, with a working audio bar. |
| `Primitives.jsx` | `Wordmark`, `TopNav`, `Eyebrow`, `Meta`, `Display`, button family, `TextLink`. |
| `Surfaces.jsx` | `Hero`, `ReleaseTile`, `ShowRow`, `AudioBar`, `Tracklist`, `SubscribeField`, `Footer`. |
| `Screens.jsx` | `HomeScreen`, `ListenScreen`, `ShowsScreen`, `AboutScreen` + the demo data (RELEASES, TRACKS, SHOWS). |

## Run
Open `index.html`. The frame is sized to `390 × 844` (iPhone 14/15 baseline). Resize the browser below 480px to see the full-bleed mobile experience.

## What's interactive
- Top nav routes between four screens with a black-veil page transition.
- Tracklist + tile clicks load a track into the bottom audio bar.
- Audio bar play/pause toggles a fake progress sweep (no real audio source bound — the burning-tree mp4 was missing from uploads).
- Subscribe field accepts an email and shows a quiet `received.` confirmation.

## What's intentionally not built
- Real audio playback (no media file).
- Search / archive (NHI doesn't need one yet).
- Buy / merch flow.

## Notes
- All copy is lowercase by design; data (dates, runtimes, catalog) is uppercase mono.
- Imagery is full-bleed; no card chrome anywhere — only hairlines between rows.
- One ember mark per screen, max.
