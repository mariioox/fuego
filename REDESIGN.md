# Fuego redesign spec

Implement this redesign in the existing Vite + React 19 + Tailwind v4 project. Keep the current architecture (features/, core/, pages/), the cart context, the sneaker registry, the newsletter API and the theme hook. Change the look, copy and motion. Do not add new dependencies unless listed here.

Goal: a minimal, high-end, "glassy" sneaker store in the style of Apple, SSENSE and Aimé Leon Dore. Quiet type, lots of space, frosted glass for floating UI, orange used only as a small accent.

---

## 1. Global rules

1. **No terminal / hacker styling anywhere.** Remove all `SNAKE_CASE` UI text, `//` prefixes and monospace labels: `VIEW_SPECIMEN`, `SPEC_COLOR_INDEX`, `SELECT_SIZE`, `ADD_TO_CART`, `COLLECTION_INDEX // 2026`, `Full_Archive`, `RAFFLE_ACTIVE // GIVEAWAY`, `COMMUNICATING...`, `// SECURE_CONNECTION_REQUIRED.`, `// ACCESS_GRANTED. CHECK_INBOX.`, `Verified // NG-Ops Active`, `Mission Archive // 001`, etc. Replace with normal sentence-case English (copy is given below).
2. **Sentence case everywhere.** No `uppercase` class on headings, buttons, labels or product names. No `italic`. Remove `font-black` / `font-[950]`.
3. **Fonts:** body = Inter (already self-hosted). Headings and the logo = **Inter Tight** (weights 500, 600, 700). Add it via Google Fonts in `index.html`, or self-host a woff2 like Inter. Stop using Geist Mono for UI text; it can be removed.
4. **Remove:** the white screen-flicker overlay (`#flicker-overlay`, `.trigger-flicker`, `screen-glitch` keyframes) and the click sound (`useSound`, `/sounds/click.mp3`) from Hero and Newsletter. Remove the hero corner brackets (`Hero.css`). Remove `glowPulse` and `iconNudge` on the mobile catalogue button.
5. **Orange (`#FD6200`) is an accent only:** the logo flame, the bag count badge, small 6px status dots, the giveaway "Join the list" button and the footer wordmark flame. Text on orange is `#0B0B0C` (white on orange fails contrast). Everything else is black/white/grey.
6. **Corner radius: exactly three values, used consistently.**
   - Surfaces (product image tiles, cards, images, panels, modals, cart drawer): **16px**
   - Controls (buttons, inputs, selects, filter chips, icon buttons): **12px**
   - The floating nav bar and the archive toolbar: **20px**
   - Only true dots and the bag count badge stay fully round.
7. **Motion is light and slow:** 200–800ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Respect `prefers-reduced-motion: reduce`: show everything immediately with no transitions.

## 2. Design tokens (`src/index.css`)

Replace the current `:root` / `[data-theme="dark"]` tokens with these (keep the `data-theme` attribute mechanism and `useTheme`). Fix the current `--bg: #f8f8f8ec` (it has an alpha channel by mistake).

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` (page) | `#F4F4F2` | `#0B0B0C` |
| `--text` (ink) | `#0B0B0C` | `#F4F4F2` |
| `--muted` (secondary text) | `#5F5F65` | `#9D9DA4` |
| `--line` (borders) | `rgba(11,11,12,0.08)` | `rgba(255,255,255,0.09)` |
| `--card` | `#FFFFFF` | `#151517` |
| `--tile` (product image bg) | `#EBEAE6` | `#E9E8E5` (stays light in dark mode) |
| `--chip-bg` | `rgba(11,11,12,0.04)` | `rgba(255,255,255,0.06)` |
| `--glass` | `rgba(255,255,255,0.62)` | `rgba(28,28,31,0.58)` |
| `--glass-line` | `rgba(255,255,255,0.8)` | `rgba(255,255,255,0.10)` |
| `--glass-shadow` | `inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(11,11,12,0.06)` | `inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35)` |
| `--glass-shadow-up` (nav after scrolling) | `inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 40px rgba(11,11,12,0.14)` | `inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 44px rgba(0,0,0,0.6)` |
| `--btn-bg` (primary button) | `#0B0B0C` | `#F4F4F2` |
| `--btn-ink` | `#FFFFFF` | `#0B0B0C` |
| `--panel` (newsletter block) | `#0B0B0C` | `#161618` |
| `--orange` | `#FD6200` | `#FD6200` |

Add radius tokens to `@theme` so Tailwind generates `rounded-surface`, `rounded-control`, `rounded-nav`:

```css
@theme {
  --radius-surface: 16px;
  --radius-control: 12px;
  --radius-nav: 20px;
  --font-display: "Inter Tight", "Inter", ui-sans-serif, system-ui, sans-serif;
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  /* map the colour tokens above to --color-* so bg-tile, text-muted, border-line, bg-glass etc. work */
}
```

Add a reusable glass utility:

```css
.glass {
  background: var(--glass);
  border: 1px solid var(--glass-line);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
}
```

Body: `background: var(--bg); color: var(--text); transition: background .4s ease, color .4s ease;`

Type scale (desktop → mobile via `clamp`):
- Hero h1: `clamp(48px, 6.4vw, 96px)`, Inter Tight 600, line-height 0.98, letter-spacing -0.045em
- Page h1 (archive): `clamp(44px, 5.6vw, 80px)`, same style
- Section h2: `clamp(32px, 3.6vw, 48px)`, Inter Tight 600, letter-spacing -0.035em, line-height 1
- Large h2 (about / newsletter): `clamp(36px, 4.4vw, 60px)`, letter-spacing -0.04em
- Body: 15–18px Inter, line-height 1.55, secondary text in `--muted`
- Small labels: 13px Inter 500, `--muted`

Layout: content max-width **1240px**, side padding `clamp(16px, 3vw, 32px)`. Section vertical spacing `clamp(64px, 8vw, 128px)`.

## 3. Navbar (`src/features/ui/Navbar.tsx` + `src/layouts/MainLayout.tsx`)

- **Sticky must work:** in `MainLayout`, wrap the navbar in a div with `position: sticky; top: 0; z-index: 60; padding-top: 12px;` as a direct child of the page root. Do not put `sticky` on an element whose parent is only as tall as the nav itself (that is why it currently doesn't stick properly). Remove the old full-width bar, its `border-b` and `bg-bg`.
- Bar: centred, `max-width: 1120px`, `height: 72px`, `rounded-nav`, `.glass`, padding `0 12px 0 26px`, horizontal margin 16px on small screens.
- After the page scrolls more than 8px, switch `box-shadow` to `--glass-shadow-up` (scroll listener, passive; transition 0.4s).
- Left: logo. "FUEG" in Inter Tight 700, 21px, letter-spacing 0.06em, followed by the orange flame icon (18px, filled orange), acting as the "O". Links to `/`.
- Centre: links "Home" (`/`) and "Shop all" (`/catalogue`), 15px Inter 500, gap 32px. The current page's link is `--text`, the other is `--muted`. Set `aria-current="page"`. On narrow screens the centre links may hide (give the container a fixed height with `overflow: hidden` and `flex-wrap: wrap`, so links that don't fit wrap out of view).
- Right, each 48×48 `rounded-control`:
  - search icon linking to `/catalogue`
  - theme toggle (sun/moon). The icon rotates from -40deg to 0 when switching (0.5s).
  - WhatsApp link (`https://wa.me/message/MNPXIERXZVHPK1`)
  - bag button: solid `--btn-bg` with a `--btn-ink` icon, opens the cart drawer
- Bag badge: orange circle, min 18px, `#0B0B0C` 11px text, 2px border in `--bg`, top-right. When the count increases it pops: scale 1.3 for 220ms with a springy easing `cubic-bezier(0.34,1.56,0.64,1)`, then back to 1.
- Remove the Instagram icon from the nav (it's in the footer).

## 4. Homepage (`src/pages/Home.tsx`)

Section order: Hero → Trust cards → Brand row → New in → About → Newsletter → Footer.

### 4.1 Hero (`Hero.tsx`), replace the 3-slide carousel

- Two-column flex-wrap layout (each column `flex: 1 1 440px`), gap `clamp(32px, 4vw, 56px)`, top padding `clamp(40px, 6vw, 88px)`. Stacks on phones.
- Left column, top to bottom (gap 24px):
  1. Eyebrow chip: 32px tall, `rounded-control`, `--chip-bg`, 1px `--line` border, 13px `--muted`. A 6px orange dot, then "Lagos · Verified authentic".
  2. h1: "Rare pairs,<br>sourced right."
  3. Paragraph (18px, `--muted`, max-width 440px): "Nike, Jordan, adidas, New Balance and more. Every pair checked by hand and delivered across Nigeria."
  4. Buttons (52px tall, `rounded-control`, 15px Inter 500, gap 10px):
     - Primary: "Shop the archive" + right arrow, `--btn-bg` / `--btn-ink`, links to `/catalogue`. On hover the arrow moves 4px right.
     - Secondary: "Order on WhatsApp", `.glass`-style background with `--line` border, links to WhatsApp.
- Right column: an image frame with `aspect-ratio: 7 / 5.4`, `rounded-surface`, `overflow: hidden`, `--tile` background, showing `Hero3.jpeg` with `object-fit: cover`.
  - On load the image eases from `scale(1.08)` to `scale(1)` over 2.2s.
  - Floating glass card over the image at bottom-left, 16px inset, max-width 360px, `rounded-surface`, light glass (`rgba(255,255,255,0.6)`, white 75% border, blur 22px). It contains two lines, "Giveaway" (12px `#4B4B50`) and "Win a new Nike Air Force 1" (15px 600, `#0B0B0C`), plus a 44px black `rounded-control` arrow button on the right. The whole card links to `#newsletter`.
- Load animation: the eyebrow, h1, paragraph and buttons fade in and rise 18px with delays 0 / 80 / 160 / 240ms. The image follows at 120ms and the giveaway card at 520ms.
- Note: the hero photos are only ~735px wide and look soft on large screens. Use a sharper image (2000px+) when available.

### 4.2 Trust cards

- Grid `repeat(auto-fit, minmax(240px, 1fr))`, gap 16px.
- Each card: `--card` background, 1px `--line` border, `rounded-surface`, padding 24px, flex row, gap 16px. It has a 44px round icon well (`--chip-bg`) holding a 20px stroke icon, then the title (15px 600) and text (14px `--muted`).
  1. Shield-check icon. "Verified authentic". "Every pair is checked by hand before it ships."
  2. Truck icon. "Delivered nationwide". "From Lagos to anywhere in Nigeria."
  3. Chat bubble icon. "Order in a chat". "Size help and orders on WhatsApp."
- Reveal on scroll, staggered 0 / 90 / 180ms.

### 4.3 Brand row

A centred flex-wrap row of plain text (no logos): Nike · Jordan · adidas · New Balance · Puma · Timberland · ASICS · Converse. Inter Tight 500, `clamp(18px, 2vw, 24px)`, `--muted`, gap `12px 40px`. Fades in on scroll.

### 4.4 New in (replaces `ShopIcons.tsx`)

- Header row (flex, space-between, aligned to the bottom):
  - h2 "New in"
  - a 44px `rounded-control` button "View the full archive →" with `--card` background and `--line` border, linking to `/catalogue`. The arrow nudges 4px on hover.
- Brand filter chips below it: All, Nike, Jordan, adidas, New Balance, Puma, Timberland, ASICS. Each is 40px tall, `rounded-control`, padding `0 18px`, 14px 500, with `aria-pressed`.
  - Inactive: `.glass`-style background, `--line` border, `--text` text.
  - Active: `--text` background and border, `--bg` text.
  - Transition background/colour 0.25s.
- Grid: `grid-template-columns: repeat(auto-fill, minmax(max(160px, calc((100% - 60px) / 4)), 1fr)); gap: 32px 20px;`. This gives 4 columns on desktop and 2 on phones.
- Show 8 featured sneakers from `SNEAKER_REGISTRY` using the new `SneakerCard` (section 6), filtered by the active chip.
- Cards reveal on scroll, staggered 70ms each, starting at 120ms.

### 4.5 About (`About.tsx`)

- Two columns, flex-wrap, each `flex: 1 1 380px`, gap `clamp(32px, 5vw, 72px)`, vertically centred.
- Left: `Hero1.jpeg` in a `rounded-surface` frame with `aspect-ratio: 4 / 5` and `object-fit: cover`.
- Right, gap 20px:
  - "About Fuego" (13px `--muted`)
  - h2 "Curated,<br>not crowded."
  - paragraph (17px `--muted`, max-width 460px): "We're an independent team of sneakerheads in Lagos. We hand-pick every pair, check it ourselves, and only list what we'd wear."
  - a 44px `rounded-control` "Follow on Instagram →" button (`--card` background, `--line` border)
- Delete the "+234 / 100% / NG / ∞" stats block.
- Reveal: image at 0ms, text at 140ms.

### 4.6 Newsletter (`Newsletter.tsx`)

Keep the `subscribeEmail` logic and states; remove the flicker and sound.

- One panel: `--panel` background, `rounded-surface`, padding `clamp(28px, 5vw, 64px)`, flex-wrap space-between, gap 40px. Text is `#F4F4F2` and secondary text is `#A1A1A8`. The panel is dark in both themes.
- Left column:
  - a 6px orange dot + "Giveaway" (13px)
  - h2 "Win a new pair of<br>Air Force 1s."
  - paragraph "Join the list for early drops, restocks and the giveaway draw."
- Right column, a form with max-width 480px:
  - a visible `<label>` "Email address" (13px)
  - a row with the input and the button
    - Input: 52px tall, `rounded-control`, `rgba(255,255,255,0.06)` background, `rgba(255,255,255,0.18)` border, placeholder "you@example.com".
    - Button: 52px tall, `rounded-control`, orange background, `#0B0B0C` 15px 600 text "Join the list". Loading: "Joining…".
  - Status messages, normal sentence case, in an `aria-live` region:
    - success: "You're in. Watch your inbox for the next drop."
    - error: "Something went wrong. Please try again."
- Reveals on scroll.

## 5. Footer (`src/features/ui/Footer.tsx`)

- Top border 1px `--line`. Content max-width 1240px. Top padding `clamp(80px, 9vw, 128px)` above the border, then 40px.
- Row 1 (flex-wrap, space-between, gap `40px 48px`):
  1. Left block, max-width 380px:
     - Tagline in Inter Tight 600, 24px, letter-spacing -0.025em: "Rare pairs, sourced right. Delivered across Nigeria."
     - A status chip below it: 40px tall, `rounded-control`, glass, 13px. It has an 8px green dot `#22C55E`, the text "Open for orders", and then, in `--muted`, "· Lagos 14:09". The time is live, using `Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' })` and updating every 15s.
     - The dot gently pulses: its box-shadow alternates every 1.6s between `0 0 0 6px rgba(34,197,94,0.18)` and none, with a 1.1s transition.
  2. Two link columns, gap 72px, each with a 13px `--muted` heading and 15px links (gap 12px):
     - "Shop": Shop all (`/catalogue`), New in (`/#new-in`), Giveaway (`/#newsletter`)
     - "Contact": WhatsApp, Instagram (`https://www.instagram.com/fuego.heat`), TikTok (`https://www.tiktok.com/@fuego_heatng`), X (`https://x.com/fuego_heatng`)
  3. A 44px `rounded-control` glass "Back to top ↑" button that scrolls smoothly to the top.
- Row 2: a giant wordmark, `aria-hidden`, centred, margin-top `clamp(56px, 7vw, 96px)`. "FUEG" in Inter Tight 700, `font-size: clamp(88px, 21vw, 320px)`, letter-spacing -0.06em, line-height 0.78, colour `--text`. It is followed by the orange flame SVG at `0.72em` square as the "O".
  - The flame "breathes": it alternates every 1.6s between `scale(1)` and `scale(1.03, 1.05)`, with `transform-origin: 50% 100%` and a 1.6s ease-in-out transition.
- Row 3: a 1px `--line` top border, padding 24px 0 36px, 13px `--muted`, space-between: "© 2026 Fuego. Every pair verified authentic." and "Built in Lagos". Use `new Date().getFullYear()` for the year.
- Turn off the pulse and the flame animation under reduced motion.

## 6. Sneaker card (`SneakerCard.tsx` + `SneakerCard.css`)

Keep the existing behaviour (click opens `SpecimenModal`, quick-add with a size picker, `addItem`). Change the look:

- No outer card box or border. It's a flex column with gap 14px.
- Image tile: `aspect-ratio: 1/1`, `rounded-surface`, `--tile` background, `overflow: hidden`. The image has `object-fit: contain`, `padding: 10%`, `mix-blend-mode: multiply` (so the white product photo backgrounds blend into the tile), and it fades in on load.
- **Hover** (desktop): the image goes to `scale(1.05) translateY(-4px) rotate(-2deg)` over 0.7s with soft easing, and the add button scales to 1.06. Remove the current `scale(1.3) rotate(-3deg)`, the dark overlay and the "VIEW_SPECIMEN" text.
- Add button: bottom-right of the tile with a 12px inset, 44×44, `rounded-control`, light glass (`rgba(255,255,255,0.55)`, white 80% border, blur 16px), with a black plus icon. It opens the size picker.
  - After adding to the bag the button turns solid black with a white check icon for 1.4s, then reverts.
  - The `aria-label` changes to "{name} added to bag".
- Size picker popover: covers the tile, `--card` background, `rounded-surface`.
  - Heading "Select size" (13px `--muted`).
  - Size buttons (40px, `rounded-control`, selected = `--text` background with `--bg` text).
  - Primary "Add to bag" button (44px `rounded-control`, `--btn-bg`).
- Text under the tile (padding 0 4px, gap 4px):
  - brand, 13px `--muted`, sentence case ("adidas", "New Balance")
  - name, 15px Inter 500, line-height 1.35
  - price, 15px 600, formatted `₦35,000`
  - Remove the uppercase, the italic price and the internal borders.
- Remove the status tag, or restyle it as a small glass chip (`rounded-control`, 12px) top-left, only for SOLD_OUT.
- Scroll-in: opacity 0 → 1 and translateY 18px → 0 over 0.8s, with a per-card delay (stagger).

## 7. Full archive page (`/catalogue`, `ArchiveHeader.tsx`, `ArchiveContainer.tsx`)

- Breadcrumb: "Home / Shop all" (13px `--muted`, current item in `--text`, `aria-current="page"`).
- Title row (flex-wrap, space-between, aligned to the bottom): h1 "The archive" and a live count on the right, "20 pairs" (15px `--muted`, singular "pair").
- Toolbar (NOT sticky): margin-top 32px, padding 8px, `rounded-nav`, `.glass`, flex-wrap, gap 8px. It contains:
  - A search field: a `<label>` wrapping a search icon and an input. 44px tall, `rounded-control`, `--card` background, `--line` border, `flex: 1 1 260px`. Placeholder "Search Samba, Jordan 4, 9060…". Add a visually-hidden label "Search the archive".
  - A sort select: 44px, `rounded-control`, `--card` background, `appearance: none` with a custom chevron. Options: "Sort: Featured", "Price: low to high", "Price: high to low". Add a visually-hidden label "Sort by".
- Brand chips (same style as the homepage, plus "Converse"), margin `20px 0 32px`. Drop the colour swatch filter, or move it into a small "More filters" glass popover. It must not be a row of square boxes.
- Grid: same as the homepage. Search matches brand + name, case-insensitive.
- Empty state: a `--card` panel, `rounded-surface`, centred, padding 72px 24px. It has:
  - h2 "No pairs match that yet"
  - text "Tell us the shoe and your size, and we'll source it for you."
  - buttons "Ask on WhatsApp" (primary) and "Clear filters" (outline, which resets the search, brand and sort)
- Page load: the breadcrumb, title, toolbar and chips fade up at 0 / 80 / 160 / 220ms. Cards stagger in from 280ms, 60ms apart, capped after 12 cards.
- Same nav (with "Shop all" active) and footer.

## 8. Other components

- **CartDrawer:** a `rounded-surface` panel with 12px margin from the screen edges and `.glass` styling (or `--card`). Its controls use `rounded-control`. Replace any terminal copy with sentence case ("Your bag", "Checkout on WhatsApp", "Remove").
- **SpecimenModal:** `rounded-surface`, `--card` background, image on a `--tile` background with `mix-blend-mode: multiply`, sentence-case copy, `rounded-control` buttons.
- **MobileCatalogueButton:** keep it as a calm 48px `rounded-control` glass button "Shop all". No pulsing or nudging. Or remove it, since the nav now has "Shop all".
- **StatusBadge, Button, SectionHeader:** update to the new radius, case and type rules.

## 9. Scroll reveal hook

Create `src/core/hooks/useReveal.ts`:
- It returns `[ref, shown]`.
- It uses an `IntersectionObserver` with `threshold: 0.12` and disconnects after the first intersection.
- `shown` is immediately `true` when `prefers-reduced-motion: reduce` matches or `IntersectionObserver` is missing.
- Apply it with an inline style or a utility: `opacity: shown ? 1 : 0; transform: shown ? 'translateY(0)' : 'translateY(18px)'; transition: opacity .8s var(--ease-soft) {delay}ms, transform .8s var(--ease-soft) {delay}ms`.

## 10. Bugs to fix while you're in there

1. The domain is misspelled **`feugo-heat.vercel.app`**; it should be **`fuego-heat.vercel.app`**. Fix every occurrence: the canonical and og/twitter URLs in `index.html`, all JSON-LD in `src/pages/Home.tsx` and `src/pages/Catalogue.tsx`, `SEO.tsx` defaults, `public/sitemap.xml` and `public/robots.txt`. Grep for `feugo` and replace all.
2. The `--bg` token had an alpha channel (`#f8f8f8ec`). Use the solid values above.
3. In `src/features/archive/data/sneakers/misc.ts`, the Timberland 6" Black and Wheat boots are each listed twice with the same SKU (`TB010073-009`, `TB010061-713`) at different prices (₦40,000 and ₦60,000). Leave the data as is but add a `// TODO: duplicate SKU, confirm correct price` comment on each.
4. Keep accessibility:
   - icon-only buttons have an `aria-label`
   - focus-visible outlines stay (2px `--text` outline, 2px offset, matching the control radius)
   - text contrast is at least 4.5:1
   - touch targets are at least 44px

## 11. Definition of done

- `pnpm build` and `pnpm test` pass. Update existing tests whose text expectations changed (`Newsletter.test.tsx`, `ArchiveContainer.test.tsx`, `CartContext.test.tsx`) to the new copy.
- Light and dark mode both look right, and the theme toggle still persists via `localStorage`.
- On a phone (390px wide):
  - the hero stacks
  - the product grid is 2 columns
  - the nav fits and stays sticky
  - nothing scrolls horizontally
- No uppercase/monospace terminal text remains. No radius values outside 16 / 12 / 20px are left, except dots and the badge.
