import React, { useRef, useState } from 'react';
import { Instagram, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { INVITATION_CONFIG } from '../data/invitationData';

export const IGStoryGenerator: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customWish, setCustomWish] = useState('Happy wedding Via & Andra! ✨');

  const handleDownload = async () => {
    if (!storyRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(storyRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      });

      const link = document.createElement('a');
      link.download = `Via-Andra-IGStory.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export IG Story:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="card-transparant" style={{ marginTop: '32px' }}>
      <h2 className="font-title text-primary text-size-title mb-2">Instagram Stories</h2>
      <p className="text-size-caption text-muted mb-6">
        Ayo bagikan momen bahagia ini ke Instagram Story kamu. Download template IG Story dibawah ini dan posting di Instagram kamu!
      </p>

      {/* Hidden/Offscreen 9:16 Story Canvas Container */}
      <div style={{ overflow: 'hidden', height: '0px', position: 'relative' }}>
        <div
          ref={storyRef}
          style={{
            width: '380px',
            height: '675px',
            background: 'linear-gradient(180deg, #d6e1f1 0%, #ffffff 100%)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px 24px',
            fontFamily: 'var(--font-body)',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Couple Photo Header */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src="/assets/images/igstory-background.png"
              alt="Story"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)'
              }}
            />
          </div>

          {/* Story Body Content */}
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <h1
              className="font-title text-primary"
              style={{ fontSize: '36px', margin: 0, lineHeight: 1.1 }}
            >
              {INVITATION_CONFIG.couple.combinedTitle}
            </h1>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--bs-primary)',
                letterSpacing: '2px',
                marginTop: '4px'
              }}
            >
              {INVITATION_CONFIG.formattedDateShort}
            </div>

            {/* Wishes Box */}
            <div
              style={{
                background: 'rgba(75, 107, 153, 0.1)',
                border: '1px solid rgba(75, 107, 153, 0.25)',
                borderRadius: '12px',
                padding: '12px 14px',
                marginTop: '14px',
                fontSize: '13px',
                color: '#333'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--bs-primary)' }}>
                Wishes & Prayers:
              </div>
              <div style={{ fontStyle: 'italic', marginTop: '2px' }}>"{customWish}"</div>
            </div>
          </div>

          {/* Footer Branding */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--bs-primary)',
              fontWeight: 600,
              borderTop: '1px solid rgba(75,107,153,0.2)',
              paddingTop: '10px'
            }}
          >
            <span>www.wevitation.com</span>
            <span>@wevitation</span>
          </div>
        </div>
      </div>

      {/* Interactive Input for Story Wish */}
      <div style={{ marginBottom: '16px', textAlign: 'left' }}>
        <label
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '4px'
          }}
        >
          Kustomisasi Ucapan untuk IG Story:
        </label>
        <input
          type="text"
          value={customWish}
          onChange={(e) => setCustomWish(e.target.value)}
          className="form-control"
          placeholder="Tulis ucapan singkat Anda..."
        />
      </div>

      {/* Download Action Button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 6px 20px rgba(75, 107, 153, 0.25)'
        }}
      >
        <Instagram size={28} />
        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            {isGenerating ? 'Memproses gambar...' : 'Download Template'}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800 }}>Instagram Story</div>
        </div>
      </button>
    </section>
  );
};
