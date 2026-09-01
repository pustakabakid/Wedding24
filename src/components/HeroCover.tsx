import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { INVITATION_CONFIG } from '../data/invitationData';
import { FullInvitationSettings } from '../types';

interface HeroCoverProps {
  guestName: string;
  settings?: FullInvitationSettings;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ guestName, settings }) => {
  const weddingDate = settings?.weddingDate || INVITATION_CONFIG.weddingDate;
  const combinedTitle = settings?.couple?.combinedTitle || INVITATION_CONFIG.couple.combinedTitle;
  const dayName = settings?.dayName || INVITATION_CONFIG.dayName;
  const formattedDateShort = settings?.formattedDateShort || INVITATION_CONFIG.formattedDateShort;
  const themeId = settings?.theme_id || 'classic-card';

  const timeLeft = useCountdown(weddingDate);

  const isPhotovit = themeId === 'photovit';
  const isTimeless = themeId === 'timeless-snapshot';
  const isElegant  = themeId === 'elegant-light';

  // Card wrapper class
  const cardClass = isElegant
    ? 'card-transparant gold-hairline-card'
    : 'card-transparant';

  // Title font size
  const titleSize = isElegant ? '40px' : isPhotovit ? '48px' : '36px';
  const titleLetterSpacing = isElegant ? '2px' : isPhotovit ? '0' : 'normal';

  const units = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' },
  ];

  return (
    <section id="cover" className={cardClass} style={{ marginTop: '20px' }}>

      {/* ── Theme badges ── */}
      {isTimeless && <div className="retro-stamp-badge">SAVE THE DATE</div>}
      {isPhotovit  && <div className="magazine-masthead">The Wedding Celebration</div>}
      {isElegant   && (
        <div style={{ fontSize: '11px', letterSpacing: '4px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--bs-primary)', marginBottom: '8px' }}>
          Royal Wedding Invitation
        </div>
      )}

      <div className="text-size-content text-muted mb-2" style={{ letterSpacing: isElegant ? '2px' : '0' }}>
        {isElegant ? 'THE WEDDING OF' : 'Undangan Pernikahan'}
      </div>

      <h2
        className="font-title text-primary"
        style={{ fontSize: titleSize, letterSpacing: titleLetterSpacing, lineHeight: 1.2, margin: '8px 0' }}
      >
        {combinedTitle}
      </h2>

      <div style={{ marginTop: '20px' }}>
        <div className="text-size-content" style={{ fontWeight: 600, fontSize: '15px' }}>
          {dayName}
        </div>
        <div style={{ letterSpacing: '2px', fontWeight: 600, marginTop: '4px', fontSize: '14px', color: 'var(--text-dark)' }}>
          {formattedDateShort}
        </div>

        {/* ── Live Event / Countdown badge ── */}
        {timeLeft.isExpired ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#ecfdf5', color: '#059669',
            border: '1px solid #a7f3d0', padding: '6px 16px',
            borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginTop: '14px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} className="animate-pulse-soft" />
            <span>Hari Bahagia Sedang Berlangsung</span>
          </div>
        ) : (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            backgroundColor: 'var(--bs-primary-light)', color: 'var(--bs-primary-dark)',
            border: '1px solid rgba(75,107,153,0.15)', padding: '4px 14px',
            borderRadius: '20px', fontSize: '11.5px', fontWeight: 700, marginTop: '12px'
          }}>
            <span>✨ Menuju Hari Bahagia</span>
          </div>
        )}
      </div>

      {/* ── Countdown Timer ── */}
      <div id="countdown" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '320px', margin: '28px auto' }}>
        {units.map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            {/* Uses countdown-box class that each theme overrides */}
            <div
              className="countdown-box"
              style={{
                backgroundColor: 'var(--counter-bg, #4B6B99)',
                color: 'var(--counter-color, #fff)',
                borderRadius: 'var(--counter-radius, 12px)',
                padding: '10px 4px',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1,
                minWidth: '52px',
              }}
            >
              {value}
            </div>
            <div
              className="countdown-label"
              style={{ fontSize: '10px', marginTop: '6px', fontWeight: 600, color: 'var(--text-muted)' }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Recipient info ── */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Kepada:</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginTop: '2px' }}>
          {guestName || INVITATION_CONFIG.defaultGuest}
        </div>
      </div>
    </section>
  );
};
