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

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export const App: React.FC = () => {
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

  // Load Settings from Supabase / Storage
  useEffect(() => {
    fetchInvitationSettings().then((loaded) => {
      setSettings(loaded);
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

  return (
    <div className="app-viewport">
      {/* Fixed Center Watermark Floral Background */}
      <div className="fixed-bg-center" />

      {/* Fixed Botanical Corner Artwork */}
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

      {/* Envelope / Gate Cover Modal */}
      {flags.showGateCover && (
        <GateCoverModal
          isOpen={!isGateOpen}
          onOpenInvitation={handleOpenInvitation}
          guestName={guestName}
          settings={settings}
        />
      )}

      {/* Main Single Page Invitation Flow */}
      <main className="invitation-container">
        <HeroCover guestName={guestName} settings={settings} />
        {flags.showQuote && <QuoteSection />}
        {flags.showCoupleProfile && <CoupleProfile couple={settings.couple} />}
        {flags.showEventSchedule && (
          <EventSchedule
            schedules={settings.schedules}
            liveStreamUrl={settings.liveStreamUrl}
          />
        )}
        {flags.showLoveStory && <LoveStory loveStories={settings.loveStories} />}
        {flags.showGallery && <GallerySection galleryImages={settings.galleryImages} />}
        {flags.showGift && (
          <GiftSection
            bankAccounts={settings.bankAccounts}
            onOpenRSVP={() => setRsvpModalOpen(true)}
            onShowToast={showToast}
          />
        )}
        {flags.showGuestbook && (
          <GuestbookSection
            defaultName={guestName}
            onShowToast={showToast}
          />
        )}
        {flags.showIGStoryGenerator && <IGStoryGenerator />}
        <ClosingSection combinedTitle={settings.couple.combinedTitle} />
      </main>

      {/* Floating Bottom Nav Dock (visible when invitation is unlocked) */}
      {isGateOpen && <FloatingNavbar />}

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
