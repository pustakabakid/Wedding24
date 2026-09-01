export type InvitationType = 'bride' | 'groom' | 'general';

export interface WeddingRecord {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface FeatureFlags {
  // 1. Seksi Utama Undangan
  showGateCover: boolean;
  showCountdown: boolean;
  showQuote: boolean;
  showCoupleProfile: boolean;
  showEventSchedule: boolean;
  showLoveStory: boolean;
  showGallery: boolean;
  showGift: boolean;
  showGuestbook: boolean;
  showIGStoryGenerator: boolean;
  showMusic: boolean;

  // 2. Tombol Aksi Jadwal & Lokasi
  showGoogleCal?: boolean;
  showAppleCal?: boolean;
  showGoogleMaps?: boolean;
  showWaze?: boolean;
  showLiveStream?: boolean;

  // 3. Info & Sosial Mempelai
  showBrideInstagram?: boolean;
  showGroomInstagram?: boolean;
  showParentsInfo?: boolean;

  // 4. Kado & Amplop Digital
  showBankTransfer?: boolean;
  showQrisCode?: boolean;

  // 5. Interaksi Buku Tamu & RSVP
  showRsvpButton?: boolean;
  showWishLikes?: boolean;

  // 6. Tampilan Mengambang & Ornamen
  showFloatingNav?: boolean;
  showBotanicalCorners?: boolean;
}

export interface PersonInfo {
  name: string;
  nickname: string;
  parents: string;
  avatar: string;
  instagram: string;
  instagramUrl: string;
}

export interface CoupleInfo {
  groom: PersonInfo;
  bride: PersonInfo;
  combinedTitle: string;
}

export interface GuestWish {
  id: string;
  invitation_id?: string;
  name: string;
  comment: string;
  attending?: boolean;
  attendance_status?: 'hadir' | 'ragu' | 'tidak';
  likes_count?: number;
  timestamp?: string;
  created_at?: string;
}

export interface RSVPResponse {
  name: string;
  invitation_id?: string;
  attending: boolean;
  peopleCount: number;
  timestamp: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  calendarUrl: string;
  mapsUrl: string;
}

export interface TimelineStory {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export interface BankAccount {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  logo: string;
  qrisImage?: string;
}

export interface GuestItem {
  id: string;
  invitation_id?: string;
  name: string;
  phone: string;
  slug: string;
  custom_note?: string;
  is_sent: boolean;
  sent_at?: string;
  created_at?: string;
}

export type ThemeId = 'classic-card' | 'timeless-snapshot' | 'elegant-light' | 'photovit';

export interface FullInvitationSettings {
  id?: string;
  wedding_id?: string;
  invitation_type?: InvitationType;
  theme_id?: ThemeId;
  name?: string;
  slug?: string;
  couple: CoupleInfo;
  weddingDate: string;
  dayName: string;
  dateNumber?: string;
  monthName?: string;
  year?: string;
  formattedDate: string;
  formattedDateShort: string;
  defaultGuest: string;
  audioUrl: string;
  liveStreamUrl?: string;
  schedules: ScheduleItem[];
  loveStories: TimelineStory[];
  bankAccounts: BankAccount[];
  galleryImages: GalleryItem[];
  featureFlags: FeatureFlags;
  invitationUrl?: string;
  waTemplate?: string;
}
