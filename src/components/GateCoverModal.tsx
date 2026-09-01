import React from 'react';
import { MailOpen } from 'lucide-react';
import { INVITATION_CONFIG } from '../data/invitationData';
import { FullInvitationSettings } from '../types';

interface GateCoverModalProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
  guestName: string;
  settings?: FullInvitationSettings;
}

export const GateCoverModal: React.FC<GateCoverModalProps> = ({
  isOpen,
  onOpenInvitation,
  guestName,
  settings
}) => {
  if (!isOpen) return null;

  const coupleTitle = settings?.couple?.combinedTitle || INVITATION_CONFIG.couple.combinedTitle;
  const dayName     = settings?.dayName || INVITATION_CONFIG.dayName;
  const themeId     = settings?.theme_id || 'classic-card';

  // Date parsing
  const dateObj    = new Date(settings?.weddingDate || INVITATION_CONFIG.weddingDate);
  const dateNumber = !isNaN(dateObj.getDate()) ? String(dateObj.getDate()).padStart(2, '0') : INVITATION_CONFIG.dateNumber;
  const year       = !isNaN(dateObj.getFullYear()) ? String(dateObj.getFullYear()) : INVITATION_CONFIG.year;
  const months     = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const monthName  = !isNaN(dateObj.getMonth()) ? months[dateObj.getMonth()] : INVITATION_CONFIG.monthName;

  const isTimeless = themeId === 'timeless-snapshot';
  const isElegant  = themeId === 'elegant-light';
  const isPhotovit = themeId === 'photovit';

  // Date separators colors per theme
  const dateSeparatorColor = isTimeless ? '#D4AF37' : isPhotovit ? 'rgba(255,255,255,0.4)' : '#2B2B2B';
  const dateNumColor       = isTimeless || isPhotovit ? '#FFFFFF' : 'var(--text-dark)';
  const dateSubColor       = isTimeless || isPhotovit ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)';

  return (
    <div className={`gate-screen theme-${themeId}`}>
      {/* Soft photo backdrop */}
      <div className="gate-bg-cover" />

      {/* Classic theme: botanical corners */}
      {themeId === 'classic-card' && (
        <>
          <img src="/assets/images/corner-top-left.png" alt="" className="fixed-corner-tl" />
          <img src="/assets/images/corner-bottom-right.png" alt="" className="fixed-corner-br" />
        </>
      )}

      {/* ── Gate Card ── */}
      <div className="gate-card-box animate-fade-in-scale" style={{ position: 'relative' }}>

        {/* Theme-specific top decorations */}
        {isTimeless && (
          <>
            <div className="washi-tape" />
            <div className="retro-stamp-badge" style={{ marginTop: '12px', color: '#D4AF37', borderColor: '#D4AF37' }}>
              VIP INVITATION
            </div>
          </>
        )}
        {isPhotovit && <div className="magazine-masthead" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>The Wedding Issue</div>}
        {isElegant && (
          <div style={{ fontSize: '10px', letterSpacing: '4px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--bs-primary)', marginBottom: '8px' }}>
            Royal Wedding Invitation
          </div>
        )}

        {/* Subtitle */}
        <div
          className="text-size-content text-muted mb-1"
          style={{ letterSpacing: isElegant ? '2px' : '0' }}
        >
          {isElegant ? 'THE WEDDING OF' : 'Undangan Pernikahan'}
        </div>

        {/* Couple title */}
        <h1
          className="font-title text-primary my-2"
          style={{
            fontSize: isElegant ? '40px' : isPhotovit ? '38px' : '36px',
            letterSpacing: isElegant ? '2px' : 'normal',
            lineHeight: 1.2
          }}
        >
          {coupleTitle}
        </h1>

        {/* Date display */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '24px 0', gap: '12px' }}>
          <div style={{ textAlign: 'right', flex: 1, fontSize: '14px', fontWeight: 500, color: isTimeless || isPhotovit ? 'rgba(255,255,255,0.8)' : 'var(--text-dark)' }}>
            {dayName}
          </div>
          <div style={{ padding: '0 14px', borderLeft: `2px solid ${dateSeparatorColor}`, borderRight: `2px solid ${dateSeparatorColor}`, textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1, color: dateNumColor }}>{dateNumber}</div>
            <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 600, color: dateSubColor }}>{year}</div>
          </div>
          <div style={{ textAlign: 'left', flex: 1, fontSize: '14px', fontWeight: 500, color: isTimeless || isPhotovit ? 'rgba(255,255,255,0.8)' : 'var(--text-dark)' }}>
            {monthName}
          </div>
        </div>

        {/* Guest */}
        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: isTimeless || isPhotovit ? 'rgba(255,255,255,0.5)' : '#999' }}>Kepada:</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: isTimeless || isPhotovit ? '#FFFFFF' : 'var(--text-dark)', marginTop: '4px' }}>
            {guestName || INVITATION_CONFIG.defaultGuest}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenInvitation}
          className="btn btn-primary animate-pulse-soft"
          style={{
            padding: '12px 32px',
            fontSize: '15px',
            borderRadius: isElegant ? '30px' : isPhotovit ? '8px' : '24px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: isElegant ? '1px' : '0'
          }}
        >
          <MailOpen size={18} />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  );
};
