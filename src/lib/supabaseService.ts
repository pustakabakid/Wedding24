import { getSupabaseClient } from './supabase';
import { FullInvitationSettings, GuestItem, GuestWish, InvitationType } from '../types';
import { INVITATION_CONFIG, SCHEDULE_DATA, LOVE_STORIES, BANK_ACCOUNTS, GALLERY_IMAGES, INITIAL_WISHES } from '../data/invitationData';

export const DEFAULT_SETTINGS: FullInvitationSettings = {
  id: 'bride',
  wedding_id: 'default',
  invitation_type: 'bride',
  name: 'Undangan Mempelai Wanita (Via)',
  slug: 'via',
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
    showMusic: true,
    showGoogleCal: true,
    showAppleCal: true,
    showGoogleMaps: true,
    showWaze: true,
    showLiveStream: true,
    showBrideInstagram: true,
    showGroomInstagram: true,
    showParentsInfo: true,
    showBankTransfer: true,
    showQrisCode: true,
    showRsvpButton: true,
    showWishLikes: true,
    showFloatingNav: true,
    showBotanicalCorners: true
  }
};

/**
 * 1. SETTINGS OPERATIONS (Multi-Invitation Aware)
 */
export async function fetchInvitationSettings(invitationSlugOrId = 'bride'): Promise<FullInvitationSettings> {
  const targetKey = invitationSlugOrId.toLowerCase().trim();
  const storageKey = `wedding_settings_${targetKey}`;
  const supabase = getSupabaseClient();

  if (!supabase) {
    const local = localStorage.getItem(storageKey) || localStorage.getItem('wedding_settings_data');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          featureFlags: { ...DEFAULT_SETTINGS.featureFlags, ...(parsed.featureFlags || {}) }
        };
      } catch (e) {}
    }
    return DEFAULT_SETTINGS;
  }

  try {
    // 1. Try querying by id or slug
    let query = supabase.from('invitation_settings').select('*');
    if (targetKey === 'bride' || targetKey === 'via' || targetKey === 'wanita') {
      query = query.or('id.eq.bride,slug.eq.via,id.eq.default');
    } else if (targetKey === 'groom' || targetKey === 'andra' || targetKey === 'pria') {
      query = query.or('id.eq.groom,slug.eq.andra');
    } else {
      query = query.or(`id.eq.${targetKey},slug.eq.${targetKey}`);
    }

    const { data: list, error } = await query.limit(1);

    const data = list && list.length > 0 ? list[0] : null;

    if (error || !data) {
      // Fallback: try querying 'default' or 'bride'
      const { data: fallbackData } = await supabase
        .from('invitation_settings')
        .select('*')
        .or('id.eq.bride,id.eq.default')
        .limit(1);

      const resolved = fallbackData && fallbackData.length > 0 ? fallbackData[0] : null;
      if (!resolved) {
        const local = localStorage.getItem('wedding_settings_data');
        return local ? JSON.parse(local) : DEFAULT_SETTINGS;
      }
      return mapDbRowToSettings(resolved);
    }

    const settings = mapDbRowToSettings(data);
    localStorage.setItem(storageKey, JSON.stringify(settings));
    return settings;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return DEFAULT_SETTINGS;
  }
}

function mapDbRowToSettings(data: any): FullInvitationSettings {
  return {
    id: data.id || 'bride',
    wedding_id: data.wedding_id || 'default',
    invitation_type: (data.invitation_type as InvitationType) || (data.id === 'groom' ? 'groom' : 'bride'),
    name: data.name || (data.id === 'groom' ? 'Undangan Mempelai Pria' : 'Undangan Mempelai Wanita'),
    slug: data.slug || (data.id === 'groom' ? 'andra' : 'via'),
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
    featureFlags: { ...DEFAULT_SETTINGS.featureFlags, ...(data.feature_flags || {}) },
    invitationUrl: data.invitation_url || '',
    waTemplate: data.wa_template || ''
  };
}

export async function saveInvitationSettings(
  settings: FullInvitationSettings,
  invitationId = 'bride'
): Promise<{ success: boolean; error?: string }> {
  const storageKey = `wedding_settings_${invitationId}`;
  localStorage.setItem(storageKey, JSON.stringify(settings));
  localStorage.setItem('wedding_settings_data', JSON.stringify(settings));

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true };
  }

  try {
    const payload = {
      id: invitationId,
      wedding_id: 'default',
      invitation_type: invitationId === 'groom' ? 'groom' : 'bride',
      name: settings.name || (invitationId === 'groom' ? 'Undangan Mempelai Pria (Andra)' : 'Undangan Mempelai Wanita (Via)'),
      slug: settings.slug || (invitationId === 'groom' ? 'andra' : 'via'),
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
      invitation_url: settings.invitationUrl || '',
      wa_template: settings.waTemplate || '',
      updated_at: new Date().toISOString()
    };

    let { data: updatedRows, error } = await supabase
      .from('invitation_settings')
      .update(payload)
      .eq('id', invitationId)
      .select();

    if (!error && (!updatedRows || updatedRows.length === 0)) {
      const insertRes = await supabase.from('invitation_settings').insert(payload);
      error = insertRes.error;
    }

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
    return { url: URL.createObjectURL(file) };
  }

  const bucket = 'wedding-media';

  try {
    if (oldPublicUrl && oldPublicUrl.includes(`/storage/v1/object/public/${bucket}/`)) {
      const oldPath = oldPublicUrl.split(`/storage/v1/object/public/${bucket}/`)[1];
      if (oldPath) {
        await supabase.storage.from(bucket).remove([oldPath]);
      }
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { url: null, error: err?.message || 'Upload error' };
  }
}

/**
 * 3. GUEST MANAGEMENT (Isolated by Invitation ID)
 */
export async function fetchGuests(invitationId?: string): Promise<GuestItem[]> {
  const supabase = getSupabaseClient();
  const storageKey = invitationId ? `wedding_guests_${invitationId}` : 'wedding_guests_data';

  if (!supabase) {
    const local = localStorage.getItem(storageKey);
    return local ? JSON.parse(local) : [];
  }

  try {
    let query = supabase.from('guests').select('*').order('created_at', { ascending: false });
    if (invitationId && invitationId !== 'all') {
      query = query.eq('invitation_id', invitationId);
    }

    const { data, error } = await query;
    if (error || !data) {
      const local = localStorage.getItem(storageKey);
      return local ? JSON.parse(local) : [];
    }

    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (err) {
    return [];
  }
}

export async function upsertGuest(guest: Partial<GuestItem>, invitationId = 'bride'): Promise<{ success: boolean; guest?: GuestItem; error?: string }> {
  const supabase = getSupabaseClient();
  const newGuest: GuestItem = {
    id: guest.id || Date.now().toString(),
    invitation_id: guest.invitation_id || invitationId,
    name: guest.name || '',
    phone: guest.phone || '',
    slug: encodeURIComponent(guest.name || ''),
    custom_note: guest.custom_note || '',
    is_sent: guest.is_sent || false,
    sent_at: guest.sent_at || undefined,
    created_at: guest.created_at || new Date().toISOString()
  };

  const storageKey = `wedding_guests_${newGuest.invitation_id}`;
  const existing = await fetchGuests(newGuest.invitation_id);
  const updated = guest.id
    ? existing.map(g => g.id === guest.id ? newGuest : g)
    : [newGuest, ...existing];
  localStorage.setItem(storageKey, JSON.stringify(updated));

  if (!supabase) {
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

export async function deleteGuest(id: string, invitationId = 'bride'): Promise<boolean> {
  const storageKey = `wedding_guests_${invitationId}`;
  const existing = await fetchGuests(invitationId);
  const filtered = existing.filter(g => g.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(filtered));

  const supabase = getSupabaseClient();
  if (!supabase) return true;

  const { error } = await supabase.from('guests').delete().eq('id', id);
  return !error;
}

/**
 * 4. WISHES & RSVP (Isolated by Invitation ID)
 */
export async function fetchWishes(invitationId?: string): Promise<GuestWish[]> {
  const supabase = getSupabaseClient();
  const storageKey = invitationId ? `wedding_wishes_${invitationId}` : 'wedding_guest_wishes';

  if (!supabase) {
    const local = localStorage.getItem(storageKey) || localStorage.getItem('wedding_guest_wishes');
    return local ? JSON.parse(local) : INITIAL_WISHES;
  }

  try {
    let query = supabase.from('wishes').select('*').order('created_at', { ascending: false });
    if (invitationId && invitationId !== 'all') {
      query = query.eq('invitation_id', invitationId);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      const local = localStorage.getItem(storageKey);
      return local ? JSON.parse(local) : INITIAL_WISHES;
    }

    return data.map(item => ({
      id: item.id,
      invitation_id: item.invitation_id || 'bride',
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
  attendanceStatus: 'hadir' | 'ragu' | 'tidak' = 'hadir',
  invitationId = 'bride'
): Promise<boolean> {
  const supabase = getSupabaseClient();
  const newWish: GuestWish = {
    id: Date.now().toString(),
    invitation_id: invitationId,
    name,
    comment,
    attending: attendanceStatus === 'hadir',
    attendance_status: attendanceStatus,
    likes_count: 0,
    timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })
  };

  const storageKey = `wedding_wishes_${invitationId}`;
  const local = localStorage.getItem(storageKey);
  const list = local ? JSON.parse(local) : [];
  localStorage.setItem(storageKey, JSON.stringify([newWish, ...list]));

  if (!supabase) return true;

  try {
    const { error } = await supabase.from('wishes').insert({
      invitation_id: invitationId,
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
  
  if (supabase) {
    try {
      await supabase.from('wishes').update({ likes_count: newLikes }).eq('id', id);
    } catch (e) {}
  }

  return newLikes;
}
