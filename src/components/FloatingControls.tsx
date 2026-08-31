import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUp } from 'lucide-react';

interface FloatingControlsProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  onOpenMusicModal: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  isPlaying,
  onToggleMusic,
  onOpenMusicModal
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Minimalist Floating Music Toggle */}
      <button
        onClick={onToggleMusic}
        onContextMenu={(e) => {
          e.preventDefault();
          onOpenMusicModal();
        }}
        className={`music-toggle-btn ${isPlaying ? 'is-playing' : 'is-muted'}`}
        title={isPlaying ? 'Musik Menyala (Klik untuk Pause)' : 'Musik Mati (Klik untuk Play)'}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <Volume2 size={18} strokeWidth={1.8} className="music-icon-pulse" />
        ) : (
          <VolumeX size={18} strokeWidth={1.8} />
        )}
      </button>

      {/* Scroll to Top Floating Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        title="Kembali ke atas"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};
