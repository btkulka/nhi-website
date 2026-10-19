---
name: nhi-design
description: Use this skill to generate well-branded interfaces and assets for NHI — an Austin-based electronic / DJ project (and Force Majeure-affiliated brand) — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `ui_kits/site/`, `preview/`).

The brand is mobile-first, almost-monastic minimal. Black field, bone type, **one** ember-red mark per screen. Headlines are Cormorant Garamond italic; data is JetBrains Mono uppercase wide-tracked; body is Manrope light. Copy is lowercase by default. No emoji, no gradients on chrome, no rounded corners.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view. The primary visual asset is `assets/the-gamut.jpg` — never crop it. Do **not** ship Mosquera images from `assets/inspiration/` — they are mood reference only.

If working on production code, you can copy `colors_and_type.css` directly and read the rules in `README.md` to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design — a single release page, a tour announcement, a press kit, a one-off poster, etc. — ask a few questions about audience and runtime, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
