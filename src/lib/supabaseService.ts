import { getSupabaseClient } from './supabase';
import { FullInvitationSettings, GuestItem, GuestWish } from '../types';
import { INVITATION_CONFIG, SCHEDULE_DATA, LOVE_STORIES, BANK_ACCOUNTS, GALLERY_IMAGES, INITIAL_WISHES } from '../data/invitationData';

export const DEFAULT_SETTINGS: FullInvitationSettings = {
  couple: INVITATION_CONFIG.couple,
  weddingDate: INVITATION_CONFIG.weddingDate,
  dayName: INVITATION_CONFIG.dayName,
  formattedDate: INVITATION_CONFIG.formattedDate,
  formattedDateShort: INVITATION_CONFIG.formattedDateShort,
  defaultGuest: INVITATION_CONFIG.defaultGuest,
  audioUrl: INVITATION_CONFIG.audioUrl,
  liveStreamUrl: INVITATION_CONFIG.liveStreamUrl,
  schedules: SCHEDULE_DATA,
  loveStories: LOVE_STORIES,
  bankAccounts: BANK_ACCOUNTS,
  galleryImages: GALLERY_IMAGES,
  featureFlags: {
    showGateCover: true,
    showCountdown: true,
    showQuote: true,
    showCoupleProfile: true,
    showEventSchedule: true,
    showLoveStory: true,
    showGallery: true,
    showGift: true,
    showGuestbook: true,
    showIGStoryGenerator: true,
    showMusic: true
  }
};

/**
 * 1. SETTINGS OPERATIONS
 */
export async function fetchInvitationSettings(): Promise<FullInvitationSettings> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const local = localStorage.getItem('wedding_settings_data');
    return local ? JSON.parse(local) : DEFAULT_SETTINGS;
  }

  try {
    const { data, error } = await supabase
      .from('invitation_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error || !data) {
      console.warn('Could not fetch settings from Supabase, fallback to default:', error?.message);
      const local = localStorage.getItem('wedding_settings_data');
      return local ? JSON.parse(local) : DEFAULT_SETTINGS;
    }

    const settings: FullInvitationSettings = {
      couple: data.couple || DEFAULT_SETTINGS.couple,
      weddingDate: data.wedding_date || DEFAULT_SETTINGS.weddingDate,
      dayName: data.day_name || DEFAULT_SETTINGS.dayName,
      formattedDate: data.formatted_date || DEFAULT_SETTINGS.formattedDate,
      formattedDateShort: data.formatted_date_short || DEFAULT_SETTINGS.formattedDateShort,
      defaultGuest: data.default_guest || DEFAULT_SETTINGS.defaultGuest,
      audioUrl: data.audio_url || DEFAULT_SETTINGS.audioUrl,
      liveStreamUrl: data.live_stream_url || DEFAULT_SETTINGS.liveStreamUrl,
      schedules: data.schedules || DEFAULT_SETTINGS.schedules,
      loveStories: data.love_stories || DEFAULT_SETTINGS.loveStories,
      bankAccounts: data.bank_accounts || DEFAULT_SETTINGS.bankAccounts,
      galleryImages: data.gallery_images || DEFAULT_SETTINGS.galleryImages,
      featureFlags: data.feature_flags || DEFAULT_SETTINGS.featureFlags
    };

    localStorage.setItem('wedding_settings_data', JSON.stringify(settings));
    return settings;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return DEFAULT_SETTINGS;
  }
}

export async function saveInvitationSettings(settings: FullInvitationSettings): Promise<{ success: boolean; error?: string }> {
  localStorage.setItem('wedding_settings_data', JSON.stringify(settings));

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true };
  }

  try {
    const payload = {
      id: 'default',
      couple: settings.couple,
      wedding_date: settings.weddingDate,
      day_name: settings.dayName,
      formatted_date: settings.formattedDate,
      formatted_date_short: settings.formattedDateShort,
      default_guest: settings.defaultGuest,
      audio_url: settings.audioUrl,
      live_stream_url: settings.liveStreamUrl,
      schedules: settings.schedules,
      love_stories: settings.loveStories,
      bank_accounts: settings.bankAccounts,
      gallery_images: settings.galleryImages,
      feature_flags: settings.featureFlags,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('invitation_settings')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

/**
 * 2. SMART STORAGE REPLACEMENT (Deletes previous file to save storage quota)
 */
export async function uploadAndReplaceMedia(
  file: File,
  folder: 'avatars' | 'stories' | 'gallery' | 'qris' | 'audio',
  oldPublicUrl?: string
): Promise<{ url: string | null; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    // If no Supabase connection, generate a local blob URL for preview
    return { url: URL.createObjectURL(file) };
  }

  const bucket = 'wedding-media';

  // 1. Delete old file if present inside Supabase storage
  if (oldPublicUrl && oldPublicUrl.includes('/storage/v1/object/public/wedding-media/')) {
    try {
      const parts = oldPublicUrl.split('/storage/v1/object/public/wedding-media/');
      if (parts.length > 1) {
        const oldFilePath = parts[1];
        await supabase.storage.from(bucket).remove([oldFilePath]);
      }
    } catch (cleanupErr) {
      console.warn('Could not remove previous file from storage:', cleanupErr);
    }
  }

  // 2. Upload new file
  try {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanFileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(cleanFileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(cleanFileName);
    return { url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { url: null, error: err?.message || 'Failed to upload media' };
  }
}

/**
 * 3. GUEST MANAGEMENT (Penerima Undangan)
 */
export async function fetchGuests(): Promise<GuestItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const local = localStorage.getItem('wedding_guests_data');
    return local ? JSON.parse(local) : [];
  }

  try {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      const local = localStorage.getItem('wedding_guests_data');
      return local ? JSON.parse(local) : [];
    }

    localStorage.setItem('wedding_guests_data', JSON.stringify(data));
    return data;
  } catch (err) {
    console.error('Error fetching guests:', err);
    return [];
  }
}

export async function saveGuest(guest: Omit<GuestItem, 'id'> & { id?: string }): Promise<{ success: boolean; guest?: GuestItem; error?: string }> {
  const supabase = getSupabaseClient();
  const newGuest: GuestItem = {
    id: guest.id || Date.now().toString(),
    name: guest.name,
    phone: guest.phone,
    slug: guest.slug || encodeURIComponent(guest.name),
    custom_note: guest.custom_note,
    is_sent: guest.is_sent || false,
    sent_at: guest.sent_at,
    created_at: new Date().toISOString()
  };

  if (!supabase) {
    const existing = await fetchGuests();
    const updated = guest.id
      ? existing.map(g => g.id === guest.id ? newGuest : g)
      : [newGuest, ...existing];
    localStorage.setItem('wedding_guests_data', JSON.stringify(updated));
    return { success: true, guest: newGuest };
  }

  try {
    const { data, error } = await supabase
      .from('guests')
      .upsert(newGuest)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, guest: data };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

export async function deleteGuest(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const existing = await fetchGuests();
    const filtered = existing.filter(g => g.id !== id);
    localStorage.setItem('wedding_guests_data', JSON.stringify(filtered));
    return true;
  }

  const { error } = await supabase.from('guests').delete().eq('id', id);
  return !error;
}

/**
 * 4. WISHES / GUESTBOOK
 */
export async function fetchWishes(): Promise<GuestWish[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const local = localStorage.getItem('wedding_guest_wishes');
    return local ? JSON.parse(local) : INITIAL_WISHES;
  }

  try {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('wedding_guest_wishes');
      return local ? JSON.parse(local) : INITIAL_WISHES;
    }

    return data.map(item => ({
      id: item.id,
      name: item.name,
      comment: item.comment,
      attending: item.attending,
      attendance_status: item.attendance_status || (item.attending ? 'hadir' : 'tidak'),
      likes_count: item.likes_count || 0,
      timestamp: new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })
    }));
  } catch (err) {
    return INITIAL_WISHES;
  }
}

export async function submitWish(
  name: string,
  comment: string,
  attendanceStatus: 'hadir' | 'ragu' | 'tidak' = 'hadir'
): Promise<boolean> {
  const supabase = getSupabaseClient();
  const newWish: GuestWish = {
    id: Date.now().toString(),
    name,
    comment,
    attending: attendanceStatus === 'hadir',
    attendance_status: attendanceStatus,
    likes_count: 0,
    timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })
  };

  const local = localStorage.getItem('wedding_guest_wishes');
  const list = local ? JSON.parse(local) : INITIAL_WISHES;
  localStorage.setItem('wedding_guest_wishes', JSON.stringify([newWish, ...list]));

  if (!supabase) return true;

  try {
    const { error } = await supabase.from('wishes').insert({
      name,
      comment,
      attending: attendanceStatus === 'hadir',
      attendance_status: attendanceStatus,
      likes_count: 0
    });
    return !error;
  } catch (err) {
    return false;
  }
}

export async function likeWish(id: string, currentLikes = 0): Promise<number> {
  const newLikes = currentLikes + 1;
  const supabase = getSupabaseClient();
  
  // Local storage cache update
  const local = localStorage.getItem('wedding_guest_wishes');
  if (local) {
    try {
      const list: GuestWish[] = JSON.parse(local);
      const updated = list.map(w => w.id === id ? { ...w, likes_count: newLikes } : w);
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch (e) {}
  }

  if (supabase) {
    try {
      await supabase.from('wishes').update({ likes_count: newLikes }).eq('id', id);
    } catch (e) {}
  }

  return newLikes;
}
