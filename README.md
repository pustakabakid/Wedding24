# High-Fidelity Website Recreation: Wevitation Mildness Wedding Theme

Local recreation of the digital wedding invitation web application based on `https://www.wevitation.com/demo/mildness`.

## 📦 Project Architecture

Built with modern web technologies using strict TypeScript, React 18, and Vite:

```
Wedding/
├── public/
│   └── assets/
│       ├── audio/          # Background wedding soundtrack (romantic-wedding-soundtrack.mp3)
│       ├── images/         # Original watercolor graphics, portraits, QRIS, galleries
│       └── svg/            # Bank BCA logo, brand icons
├── src/
│   ├── components/         # GateCoverModal, HeroCover, QuoteSection, CoupleProfile,
│   │                       # EventSchedule, LoveStory, GallerySection, GiftSection,
│   │                       # GuestbookSection, IGStoryGenerator, ClosingAndFooter,
│   │                       # FloatingNavbar, FloatingControls, Modals
│   ├── data/               # Invitation configs, schedules, stories, initial wishes
│   ├── hooks/              # useCountdown, useAudioPlayer
│   ├── styles/             # tokens.css, animations.css, index.css
│   ├── types/              # TypeScript interface definitions
│   ├── App.tsx             # Root application orchestrator
│   └── main.tsx            # Application entry point
├── ASSET_MANIFEST.json     # Provenance tracking of all downloaded assets
├── ASSET_NOTES.md          # Asset details and documentation
├── RECONNAISSANCE.md       # Comprehensive breakdown of target site
├── package.json
└── vite.config.ts
```

---

## 🚀 Quick Start Commands

### 1. Installation
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Compiles TypeScript and creates optimized bundles in `dist/`.

### 4. Production Preview
```bash
npm run preview
```
Previews the production build locally.

---

## ✨ Features Implemented

1. **Gate / Envelope Screen (`Buka Undangan`)**:
   - Initial modal overlay with couple names, wedding date badge, recipient name, and CTA button.
   - Smooth unlock animation triggering background music playback.
2. **Hero Header & Real-Time Countdown**:
   - 4-column dynamic countdown counter (Hari, Jam, Menit, Detik) ticking in real time towards `28 Maret 2026 16:00:00`.
3. **Ayat / Quote Section**:
   - Surah Ar-Rum: 21 in Arabic calligraphy and Indonesian translation on glassmorphic card.
4. **Bride & Groom Profile (`Eviana Saskia & Andra Gunawan`)**:
   - Circular portraits with gold/slate borders, parental names, and Instagram handles.
5. **Event Schedule (Akad Nikah & Resepsi)**:
   - Venue info, calendar save link (`Google Calendar`), and Google Maps navigation.
   - Live stream YouTube broadcast button.
6. **Love Story Timeline**:
   - Vertical timeline with heart badges, photos with gradient fade overlay, and story texts.
7. **Synchronized Photo Gallery**:
   - Dual slider carousel with thumbnail strip, navigation controls, and lightbox zoom modal.
8. **Digital Wedding Gift / Amplop Cashless**:
   - Bank BCA account number with one-click copy to clipboard + toast feedback.
   - Interactive QRIS scan barcode preview and full-screen modal zoom.
   - External Gift Registry link.
9. **RSVP Attendance & Guestbook (Ucapan & Doa)**:
   - Attendance confirmation modal (Hadir/Tidak Hadir, Headcount selector, instant alert).
   - Interactive guest wishes form with celebratory confetti animation and `localStorage` persistence.
10. **Instagram Story Generator**:
    - High-res 9:16 layout exportable to PNG via HTML5 Canvas.
11. **Floating Navigation & Quick Actions**:
    - Glassmorphic bottom dock with active section indicator.
    - Floating rotating vinyl audio controller with play/pause.
    - Side-docked guest check-in QR code modal with seat allocation details (`VIP 1`, `A-12`).
    - Scroll to top floating action button.

---

## 🔍 Responsive Breakpoints Verified
- **Desktop (1440px / 1280px)**: Centered mobile-first canvas framed with botanical illustrations.
- **Tablet (768px - 1024px)**: Fluid padded card container with touch ergonomics.
- **Mobile (375px - 425px)**: Optimized card paddings, compact thumbnail bar, full-screen gate cover.

---

## 📌 Known Limitations
- Background audio autoplay relies on user interaction ("Buka Undangan" click) per standard modern browser autoplay policies.
- Live streaming and Gift Registry buttons link to official external placeholder endpoints.
