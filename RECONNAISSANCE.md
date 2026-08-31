# Reconnaissance & System Analysis: Wevitation Mildness Theme

**Target URL:** `https://www.wevitation.com/demo/mildness`  
**Site Type:** Single-Page Digital Wedding Invitation Web Application  
**Couple:** Eviana Saskia (Via) & Andra Gunawan (Andra)  
**Guest Name Target:** Lia  
**Event Date:** Sabtu, 28 Maret 2026

---

## 1. Section-by-Section Breakdown

| Order | Section ID | Title / Content | Purpose & Description |
|---|---|---|---|
| 0 | `#modalInvitation` | **Cover / Gate Screen (Buka Undangan)** | Fullscreen modal overlay acting as the envelope/gate. Features decorative corners, watercolor florals, couple names, date badge, recipient name ("Kepada: Lia"), and button `[Buka Undangan]`. Clicking unlocks the site, dismisses modal, and starts background music playback. |
| 1 | `#cover` | **Hero / Main Title & Countdown** | Top section containing title "Undangan Pernikahan", "Via & Andra", wedding date "Sabtu, 28 • 03 • 2026", 4-unit dynamic countdown timer (Hari, Jam, Menit, Detik), and recipient badge. |
| 2 | `#quote` | **Holy Scripture / Quote Section** | Arabic verse & Indonesian translation of Surah Ar-Rum: 21 in italic styling on translucent card with subtle shadow and border radius. |
| 3 | `#detail` / `#bride` | **Bride & Groom Profile Section** | "Kami mohon do'a & restunya atas pernikahan kami", circular avatar with gold/blue border and shadow for Eviana Saskia (Putri Danang Hendra & Siti Laela) + Instagram button `@wevitation`, ampersand divider `&`, and circular avatar for Andra Gunawan (Putra Arya Gunawan & Djenar Widiati) + Instagram button. |
| 4 | `#schedule` | **Event Agenda / Schedule** | "Acara" card detailing: <br>1. **Akad Nikah** (16:00 - 17:00 at Maximo Resto & Garden) + `[Simpan Tanggal]` (Google Calendar template URL) + `[Navigasi Map]` (Google Maps). <br>Dashed separator line. <br>2. **Resepsi** (18:30 - 20:30 at Maximo Resto & Garden) + `[Simpan Tanggal]` + `[Navigasi Map]`. <br>3. **Live Streaming** subcard with YouTube broadcast button. |
| 5 | `#lovestory` | **Love Story / Timeline** | "Kisah Cinta" vertical timeline with heart icon markers: <br>- *Pertemuan Pertama*: Campus organization encounter story with photo & gradient fade overlay. <br>- *Lamaran*: Long distance relationship journey & proposal story with photo. |
| 6 | `#gallery` | **Photo Gallery & Slider** | "Galeri" heading with dual synchronized Splide slider: thumbnail navigation strip + main photo display, and zoomable / previewable pictures. |
| 7 | `#gift` | **RSVP Action & Digital Wedding Gift** | - RSVP modal trigger button `[Konfirmasi Kehadiran]` with icon.<br>- "Kado" cashless gift details: Bank BCA (Rekening: 12345678 a.n. Eviana Saskia) with `[Copy]` button and QRIS code image.<br>- "Daftar Kado" Gift registry button linking to `wegiftry.com`. |
| 8 | `#wish` | **Guestbook & Wishes (Ucapan & Doa)** | Interactive form with Name input, Message textarea, `[Kirim Ucapan]` submit button, scrollable feed of previous guest wishes with timestamp and avatar styling. |
| 9 | `#ig-story-title` / `#ig-story-area` | **Instagram Story Template Generator** | 9:16 aspect ratio printable card with canvas rendering + `[Download Template IG Story]` html2canvas capture button. |
| 10 | `#closing` | **Closing & Gratitude** | "Atas kehadiran saudara/(i) & Do'a restunya, kami ucapkan terimakasih", "Hormat Kami", "Via & Andra". |
| 11 | `#footer` | **Footer & Attribution** | "Via & Andra E-Invitation - Made with ❤ somewhere in the world - Powered by Wevitation", modal trigger for credits & support. |
| Fixed | `#navbar` | **Bottom Floating Dock** | Bottom sticky navigation bar with rounded pill buttons linking to `#cover-section`, `#detail-section`, `#gallery-section`, `#gift-section`, `#wish-section`. |
| Fixed | Top/Bottom Decor | **Corner Florals & Watercolors** | Fixed top-left and bottom-right corner botanical illustrations (`corner-1.png`, `corner-2.png`), watercolor splashes (`watercolor-3.png`, `watercolor-4.png`), and center watermarked floral pattern (`flower-1.png`). |
| Fixed | Floating Tools | **Side QR & Scroll-to-Top** | Side vertical rotated button for guest check-in QR modal (`#modalQR`) and `#kt_scrolltop` floating action button. |
| Modal | `#modalMusic` | **Music Player Modal** | Information and audio playback control for background music. |
| Modal | `#modalRSVP` | **RSVP Attendance Modal** | Radio / button selection (Hadir / Tidak Hadir) with number of guests input, instant feedback alert and status saving. |

---

## 2. Component Inventory

1. **GateScreenModal (`#modalInvitation`)**: Initial modal envelope with zoom-in card animation and audio auto-trigger on dismiss.
2. **AudioController (`#modalMusic` & background `<audio>`)**: Looping romantic wedding soundtrack with floating toggle and modal controls.
3. **FloatingNavbar (`#navbar`)**: Glassmorphic / clean bottom navigation dock with active section tracking.
4. **CountdownTimer (`#countdown`)**: 4-column badge counter calculating remaining days, hours, minutes, and seconds until `2026-03-28 16:00:00`.
5. **CoupleProfileCard (`#detail`)**: Groom & Bride portraits with gold/slate border, parents names, and direct social handles.
6. **ScheduleCard (`#schedule`)**: Event cards with calendar integration (`.ics` / Google Calendar intent) and Google Maps links.
7. **TimelineItem (`#lovestory`)**: Vertical timeline node with svg heart badge, image cover card, and story narrative.
8. **GalleryCarousel (`#gallery`)**: Synchronized thumbnail and main gallery viewport with responsive image sizing.
9. **BankGiftCard (`#gift`)**: Bank logo, account number with one-click copy to clipboard + toast feedback, and QRIS scanner preview.
10. **RSVPModal (`#modalRSVP`)**: Interactive attendance modal with headcount selector and immediate confirmation alerts.
11. **GuestbookForm (`#wish`)**: Real-time comment submission with local storage persistence and formatted date tags.
12. **IGStoryModal (`#ig-story-area`)**: 9:16 layout exportable to PNG.
13. **CheckinQRModal (`#modalQR`)**: Guest personal check-in QR code modal with toggleable Check-in / Check-out states.
14. **ScrollTopButton (`#kt_scrolltop`)**: Smooth scrolling helper appearing after downward scroll.

---

## 3. Visual Tokens & Design System

### Color Palette
- **Primary Brand (`--bs-primary`):** `#4B6B99` (Elegant Slate Blue)
- **Primary Hover (`--bs-primary-hover`):** `#5d7697`
- **Primary Light / Tint (`--bs-primary-light`):** `#d6e1f1` (Soft ice blue for badges/cards/form inputs)
- **Secondary (`--bs-secondary`):** `#BC97C9` (Soft Lilac / Lavender)
- **Secondary Hover (`--bs-secondary-hover`):** `#b49dbd`
- **Secondary Light (`--bs-secondary-light`):** `#f2dcfa`
- **Card Background:** `rgba(255, 255, 255, 0.82)` with backdrop-filter blur
- **Page Background:** Fixed watercolor botanicals with neutral `#FFFFFF` / soft ivory base
- **Text Dark:** `#2B2B2B` / `#1E293B`
- **Heart Accent:** `#e25555`

### Typography Hierarchy
- **Heading / Script Font:** `'Great Vibes', cursive`
  - Hero Couple Names: `32px - 42px`
  - Section Headings ("Undangan Pernikahan", "Acara", "Galeri", "Kado", "Ucapan & Doa"): `28px - 32px`
- **Body & Content Font:** `'Philosopher', 'Baskervville', sans-serif`
  - Body Text: `14px` (`--font3`)
  - Subtitles / Subheadings: `28px` / `20px` (`--font2`)
  - Captions & Meta: `12px` / `10px` (`--font4`)
- **Arabic Typography:** Traditional Arabic Naskh font for Surah Ar-Rum.

### Elevation & Borders
- **Card Border Radius:** `30px` for transparent section cards, `12px` for inner elements.
- **Card Shadow:** `0px 0px 20px 0px rgba(0, 0, 0, 0.12)`
- **Avatar Border:** `7px solid #4B6B99` with circular shadow.
- **Dashed Separators:** `1px dashed #4B6B99`

---

## 4. Responsive Behavior Inventory

| Viewport | Container Width | Layout Adjustments |
|---|---|---|
| **Desktop (> 1200px)** | Max 600px centered mobile-first canvas | Content rendered in elegant phone/tablet card frame with fixed corner botanical illustrations on widescreen margins. |
| **Tablet (768px - 1024px)** | 100% with padding | Preserves balanced card padding (`py-20 px-10`), smooth centered columns. |
| **Mobile (375px - 425px)** | 100% fluid | Full-width cards with `margin: 40px 12px`, thumbnail slider shrinks to `66px x 38px`, bottom dock fits 5 icons comfortably. |
