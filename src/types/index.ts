export interface FeatureFlags {
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
  name: string;
  phone: string;
  slug: string;
  custom_note?: string;
  is_sent: boolean;
  sent_at?: string;
  created_at?: string;
}

export interface FullInvitationSettings {
  id?: string;
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
