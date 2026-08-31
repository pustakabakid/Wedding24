import { ScheduleItem, TimelineStory, BankAccount, GuestWish } from '../types';

export const INVITATION_CONFIG = {
  couple: {
    groom: {
      name: 'Andra Gunawan',
      nickname: 'Andra',
      parents: 'Putra Bapak Arya Gunawan & Ibu Djenar Widiati',
      avatar: '/assets/images/groom-andra.jpg',
      instagram: 'wevitation',
      instagramUrl: 'https://instagram.com/wevitation'
    },
    bride: {
      name: 'Eviana Saskia',
      nickname: 'Via',
      parents: 'Putri Bapak Danang Hendra & Ibu Siti Laela',
      avatar: '/assets/images/bride-eviana.jpg',
      instagram: 'wevitation',
      instagramUrl: 'https://instagram.com/wevitation'
    },
    combinedTitle: 'Via & Andra'
  },
  weddingDate: '2026-09-21T16:00:00+07:00',
  dayName: 'Senin',
  dateNumber: '21',
  monthName: 'September',
  year: '2026',
  formattedDate: 'Senin, 21 September 2026',
  formattedDateShort: '21 • 09 • 2026',
  defaultGuest: 'Lia',
  audioUrl: '/assets/audio/romantic-wedding-soundtrack.mp3',
  liveStreamUrl: 'https://youtube.com/wevitation',
  giftRegistryUrl: 'https://wegiftry.com/cinta-rangga-gift-registry'
};

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    date: 'Senin, 21 September 2026',
    time: '16:00 - 17:00',
    venue: 'Maximo Resto & Garden',
    address: 'Jl. Dr. Setiabudi No. 378',
    calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=+Eviana+Saskia+%26+Andra+Gunawan&details=Maximo+Resto+%26+Garden&dates=20260921T090000.0Z/20260921T100000.0Z&location=https://maps.app.goo.gl/vwB5zqwGS2P4cPaY9',
    mapsUrl: 'https://maps.app.goo.gl/vwB5zqwGS2P4cPaY9?g_st=ipc'
  },
  {
    id: 'resepsi',
    title: 'Resepsi',
    date: 'Senin, 21 September 2026',
    time: '18:30 - 20:30',
    venue: 'Maximo Resto & Garden',
    address: 'Jl. Dr. Setiabudi No. 378',
    calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=+Eviana+Saskia+%26+Andra+Gunawan&details=Maximo+Resto+%26+Garden&dates=20260921T113000.0Z/20260921T133000.0Z&location=https://maps.app.goo.gl/vwB5zqwGS2P4cPaY9',
    mapsUrl: 'https://maps.app.goo.gl/vwB5zqwGS2P4cPaY9?g_st=ipc'
  }
];

export const LOVE_STORIES: TimelineStory[] = [
  {
    id: 'pertemuan',
    title: 'Pertemuan Pertama',
    image: '/assets/images/story-first-meet.jpg',
    description: 'Pertama kali kami bertemu saat menjadi anggota sebuah organisasi di kampus. Kebetulan kami berada di divisi yang sama, yang menjadikan kami lebih akrab. Dari diskusi yang serius hingga tawa lepas karena lelucon yang garing, momen-momen itu perlahan menumbuhkan benih cinta yang tak terduga di antara kami.'
  },
  {
    id: 'lamaran',
    title: 'Lamaran',
    image: '/assets/images/story-proposal.jpg',
    description: 'Walaupun kami sempat menjalani hubungan jarak jauh selama 2 tahun terakhir, namun hal itu bukan menjadi halangan untuk hubungan kami. Justru kami menjadi semakin yakin satu sama lain. Oleh karena itu kami memutuskan untuk menjalin hubungan lebih serius.'
  }
];

export const GALLERY_IMAGES = [
  { id: '1', src: '/assets/images/gallery-1.jpg', alt: 'Pre-wedding moments 1' },
  { id: '2', src: '/assets/images/gallery-2.jpg', alt: 'Pre-wedding moments 2' },
  { id: '3', src: '/assets/images/gallery-3.jpg', alt: 'Pre-wedding moments 3' },
  { id: '4', src: '/assets/images/gallery-4.jpg', alt: 'Pre-wedding moments 4' }
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bankName: 'Bank BCA',
    accountHolder: 'Eviana Saskia',
    accountNumber: '12345678',
    logo: '/assets/svg/bca-logo.svg',
    qrisImage: '/assets/images/qris-bca.jpg'
  }
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w1',
    name: 'Lia',
    comment: 'Happy wedding Via & Andra ❤️',
    timestamp: 'Jumat, 07 November 2025 00:30:37'
  },
  {
    id: 'w2',
    name: 'Dimas & Anisa',
    comment: 'Selamat menempuh hidup baru Via & Andra! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Aamiin.',
    timestamp: 'Sabtu, 08 November 2025 14:15:20'
  },
  {
    id: 'w3',
    name: 'Rian Pratama',
    comment: 'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fi khair. Lancar sampai hari H ya!',
    timestamp: 'Minggu, 09 November 2025 09:45:10'
  }
];
