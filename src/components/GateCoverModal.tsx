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
  const dayName = settings?.dayName || INVITATION_CONFIG.dayName;
  const defaultGuest = settings?.defaultGuest || INVITATION_CONFIG.defaultGuest;
  const themeId = settings?.theme_id || 'classic-card';

  // Format date display
  const dateObj = new Date(settings?.weddingDate || INVITATION_CONFIG.weddingDate);
  const dateNumber = !isNaN(dateObj.getDate()) ? String(dateObj.getDate()).padStart(2, '0') : INVITATION_CONFIG.dateNumber;
  const year = !isNaN(dateObj.getFullYear()) ? String(dateObj.getFullYear()) : INVITATION_CONFIG.year;
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthName = !isNaN(dateObj.getMonth()) ? months[dateObj.getMonth()] : INVITATION_CONFIG.monthName;

  const getGateCardClass = () => {
    if (themeId === 'elegant-light') return 'gate-card-box gold-hairline-card animate-fade-in-scale';
    if (themeId === 'timeless-snapshot') return 'gate-card-box vintage-ticket-card animate-fade-in-scale';
    return 'gate-card-box animate-fade-in-scale';
  };

  return (
    <div className={`gate-screen theme-${themeId}`}>
      {/* Background couple portrait with soft opacity */}
      <div className="gate-bg-cover" />

      {/* Decorative Corner Florals (only in classic theme) */}
      {themeId === 'classic-card' && (
        <>
          <img
            src="/assets/images/corner-top-left.png"
            alt="Floral Corner"
            className="fixed-corner-tl"
          />
          <img
            src="/assets/images/corner-bottom-right.png"
            alt="Floral Corner"
            className="fixed-corner-br"
          />
        </>
      )}

      {/* Center Gate Card */}
      <div className={getGateCardClass()} style={{ position: 'relative' }}>
        {themeId === 'timeless-snapshot' && (
          <>
            <div className="washi-tape" />
            <div className="retro-stamp-badge" style={{ marginTop: '10px' }}>VIP INVITATION</div>
          </>
        )}
        {themeId === 'photovit' && <div className="magazine-masthead">The Wedding Issue</div>}

        <div className="text-size-content text-muted mb-1">
          {themeId === 'elegant-light' ? 'ROYAL WEDDING INVITATION' : 'Undangan Pernikahan'}
        </div>

        <h1
          className="font-title text-size-title text-primary my-2"
          style={{
            fontSize: themeId === 'elegant-light' ? '42px' : '38px',
            letterSpacing: themeId === 'elegant-light' ? '2px' : 'normal'
          }}
        >
          {coupleTitle}
        </h1>

        {/* Date Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '28px 0',
            gap: '12px'
          }}
        >
          <div style={{ textAlign: 'right', flex: 1, fontSize: '15px', fontWeight: 500 }}>
            {dayName}
          </div>
          <div
            style={{
              padding: '0 16px',
              borderLeft: '2px solid #2B2B2B',
              borderRight: '2px solid #2B2B2B',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1 }}>
              {dateNumber}
            </div>
            <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              {year}
            </div>
          </div>
          <div style={{ textAlign: 'left', flex: 1, fontSize: '15px', fontWeight: 500 }}>
            {monthName}
          </div>
        </div>

        {/* Guest Designation */}
        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#666' }}>Kepada:</div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--text-dark)',
              marginTop: '4px'
            }}
          >
            {guestName || INVITATION_CONFIG.defaultGuest}
          </div>
        </div>

        {/* Open Invitation CTA */}
        <button
          onClick={onOpenInvitation}
          className="btn btn-primary animate-pulse-soft"
          style={{
            padding: '12px 28px',
            fontSize: '15px',
            borderRadius: '24px',
            margin: '0 auto',
            boxShadow: '0 8px 24px rgba(75, 107, 153, 0.35)'
          }}
        >
          <MailOpen size={18} />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  );
};
