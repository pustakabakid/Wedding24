import React, { useState, useEffect } from 'react';
import { INVITATION_CONFIG } from './data/invitationData';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { GateCoverModal } from './components/GateCoverModal';
import { HeroCover } from './components/HeroCover';
import { QuoteSection } from './components/QuoteSection';
import { CoupleProfile } from './components/CoupleProfile';
import { EventSchedule } from './components/EventSchedule';
import { LoveStory } from './components/LoveStory';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { GuestbookSection } from './components/GuestbookSection';
import { IGStoryGenerator } from './components/IGStoryGenerator';
import { ClosingSection } from './components/ClosingAndFooter';
import { FloatingNavbar } from './components/FloatingNavbar';
import { FloatingControls } from './components/FloatingControls';
import { RSVPModal, MusicInfoModal } from './components/Modals';

import { fetchInvitationSettings, DEFAULT_SETTINGS } from './lib/supabaseService';
import { FullInvitationSettings } from './types';
import './themes/themeStyles.css';
import './themes/fireflyAnimation.css';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export const App: React.FC = () => {
  const resolveInvitationKey = (): string => {
    const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    const searchParams = new URLSearchParams(window.location.search);
    const queryInv = searchParams.get('invitation') || searchParams.get('type') || searchParams.get('inv');

    if (queryInv) return queryInv.toLowerCase();
    if (path.includes('andra') || path.includes('groom') || path.includes('pria')) return 'groom';
    if (path.includes('via') || path.includes('bride') || path.includes('wanita')) return 'bride';
    return 'bride'; // Default fallback
  };

  const [invitationId, setInvitationId] = useState<string>(resolveInvitationKey());
  const [settings, setSettings] = useState<FullInvitationSettings>(DEFAULT_SETTINGS);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [guestName, setGuestName] = useState<string>('Lia');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Modals state
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [musicModalOpen, setMusicModalOpen] = useState(false);

  // Background audio player hook
  const { isPlaying, play, toggle } = useAudioPlayer(settings.audioUrl || INVITATION_CONFIG.audioUrl);

  // Smooth Momentum Scrolling & GSAP ScrollTrigger
  const { scrollTo } = useScrollAnimation(isGateOpen);

  // Load Settings from Supabase / Storage based on invitation context
  useEffect(() => {
    const activeKey = resolveInvitationKey();
    setInvitationId(activeKey);
    fetchInvitationSettings(activeKey).then((loaded) => {
      setSettings(loaded);
      
      // Update Tab title to match both bride & groom nicknames
      const brideNick = loaded.couple?.bride?.nickname || 'Via';
      const groomNick = loaded.couple?.groom?.nickname || 'Andra';
      if (activeKey === 'groom' || loaded.invitation_type === 'groom') {
        document.title = `${groomNick} & ${brideNick}`;
      } else {
        document.title = `${brideNick} & ${groomNick}`;
      }

      if (!loaded.featureFlags.showGateCover) {
        setIsGateOpen(true);
      }
    });
  }, []);

  // Extract query params (e.g. ?to=NamaTamu)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('u');
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const newToast: ToastItem = {
      id: Date.now().toString(),
      message,
      type
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const handleOpenInvitation = () => {
    setIsGateOpen(true);
    if (settings.featureFlags.showMusic) {
      play(); // Start background music
    }
    showToast(`Selamat datang di undangan ${settings.couple.combinedTitle}!`, 'success');
  };

  const flags = settings.featureFlags;
  const currentTheme = settings.theme_id || 'classic-card';

  return (
    <div className={`app-viewport theme-${currentTheme}`}>
      {/* Fixed Center Watermark Floral Background */}
      <div className="fixed-bg-center" />

      {/* Fixed Botanical Corner Artwork — Classic theme only */}
      {flags.showBotanicalCorners !== false && currentTheme === 'classic-card' && (
        <>
          <img
            src="/assets/images/corner-top-left.png"
            alt="Top Left Botanical"
            className="fixed-corner-tl"
          />
          <img
            src="/assets/images/corner-bottom-right.png"
            alt="Bottom Right Botanical"
            className="fixed-corner-br"
          />
        </>
      )}

      {/* Envelope / Gate Cover Modal */}
      {flags.showGateCover && (
        <GateCoverModal
          isOpen={!isGateOpen}
          onOpenInvitation={handleOpenInvitation}
          guestName={guestName}
          settings={settings}
        />
      )}

      {/* ─── Authentic Wevitation Firefly Ambient Particles ─── */}
      {(currentTheme === 'timeless-snapshot' || currentTheme === 'elegant-light') && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <li className="firefly" />
          <li className="firefly" />
          <li className="firefly" />
          <li className="firefly" />
          <li className="firefly" />
          <li className="firefly" />
        </ul>
      )}

      {/* ─── Desktop Left Cinematic Backdrop (Wevitation Signature Split Screen) ─── */}
      <div
        className="desktop-backdrop"
        style={{
          backgroundImage: `url(${settings.galleryImages?.[0]?.src || settings.couple?.bride?.avatar || '/assets/images/gallery-1.jpg'})`
        }}
      >
        <div className="desktop-backdrop-overlay">
          <div style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '13px', fontWeight: 600, opacity: 0.85, marginBottom: '12px', color: '#FFFFFF' }}>
            The Wedding of
          </div>
          <h1
            className="font-title"
            style={{
              fontSize: '56px',
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              marginBottom: '16px'
            }}
          >
            {settings.couple?.combinedTitle || INVITATION_CONFIG.couple.combinedTitle}
          </h1>
          <div style={{ fontSize: '15px', letterSpacing: '2px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
            {settings.formattedDate || INVITATION_CONFIG.formattedDate}
          </div>
        </div>
      </div>

      {/* Main Single Page Invitation Flow */}
      <main className="invitation-container">
        <HeroCover guestName={guestName} settings={settings} />
        {flags.showQuote && <QuoteSection />}
        {flags.showCoupleProfile && (
          <CoupleProfile
            couple={settings.couple}
            flags={flags}
            invitationType={settings.invitation_type || invitationId}
            themeId={currentTheme}
          />
        )}
        {flags.showEventSchedule && (
          <EventSchedule
            schedules={settings.schedules}
            liveStreamUrl={settings.liveStreamUrl}
            combinedTitle={settings.couple.combinedTitle}
            flags={flags}
            themeId={currentTheme}
          />
        )}
        {flags.showLoveStory && (
          <LoveStory
            loveStories={settings.loveStories}
            themeId={currentTheme}
          />
        )}
        {flags.showGallery && <GallerySection galleryImages={settings.galleryImages} />}
        {flags.showGift && (
          <GiftSection
            bankAccounts={settings.bankAccounts}
            flags={flags}
            onOpenRSVP={() => setRsvpModalOpen(true)}
            onShowToast={showToast}
          />
        )}
        {flags.showGuestbook && (
          <GuestbookSection
            defaultName={guestName}
            invitationId={invitationId}
            flags={flags}
            onShowToast={showToast}
          />
        )}
        {flags.showIGStoryGenerator && <IGStoryGenerator settings={settings} />}
        <ClosingSection combinedTitle={settings.couple.combinedTitle} />
      </main>

      {/* Floating Bottom Nav Dock (visible when invitation is unlocked) */}
      {isGateOpen && flags.showFloatingNav !== false && <FloatingNavbar />}

      {/* Floating Action Buttons */}
      {isGateOpen && flags.showMusic && (
        <FloatingControls
          isPlaying={isPlaying}
          onToggleMusic={toggle}
          onOpenMusicModal={() => setMusicModalOpen(true)}
        />
      )}

      {/* Interactive Modals */}
      <RSVPModal
        isOpen={rsvpModalOpen}
        onClose={() => setRsvpModalOpen(false)}
        guestName={guestName}
        invitationId={invitationId}
        onShowToast={showToast}
      />

      <MusicInfoModal
        isOpen={musicModalOpen}
        onClose={() => setMusicModalOpen(false)}
        isPlaying={isPlaying}
        onTogglePlay={toggle}
      />

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};
