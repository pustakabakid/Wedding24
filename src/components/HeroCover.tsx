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
  const defaultGuest = settings?.defaultGuest || INVITATION_CONFIG.defaultGuest;

  const timeLeft = useCountdown(weddingDate);

  return (
    <section id="cover" className="card-transparant" style={{ marginTop: '20px' }}>
      <div className="text-size-content text-muted mb-2">Undangan Pernikahan</div>
      <h2 className="font-title text-size-title text-primary" style={{ fontSize: '36px' }}>
        {combinedTitle}
      </h2>

      <div style={{ marginTop: '24px' }}>
        <div className="text-size-content font-semibold" style={{ fontSize: '15px' }}>
          {dayName}
        </div>
        <div
          className="text-size-content"
          style={{ letterSpacing: '2px', fontWeight: 600, marginTop: '4px' }}
        >
          {formattedDateShort}
        </div>
      </div>

      {/* Countdown Timer */}
      <div
        id="countdown"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          maxWidth: '340px',
          margin: '28px auto'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--bs-primary)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '10px 4px',
              fontSize: '18px',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(75, 107, 153, 0.25)'
            }}
          >
            {timeLeft.days}
          </div>
          <div style={{ fontSize: '11px', marginTop: '6px', color: '#666', fontWeight: 600 }}>
            Hari
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--bs-primary)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '10px 4px',
              fontSize: '18px',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(75, 107, 153, 0.25)'
            }}
          >
            {timeLeft.hours}
          </div>
          <div style={{ fontSize: '11px', marginTop: '6px', color: '#666', fontWeight: 600 }}>
            Jam
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--bs-primary)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '10px 4px',
              fontSize: '18px',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(75, 107, 153, 0.25)'
            }}
          >
            {timeLeft.minutes}
          </div>
          <div style={{ fontSize: '11px', marginTop: '6px', color: '#666', fontWeight: 600 }}>
            Menit
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--bs-primary)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '10px 4px',
              fontSize: '18px',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(75, 107, 153, 0.25)'
            }}
          >
            {timeLeft.seconds}
          </div>
          <div style={{ fontSize: '11px', marginTop: '6px', color: '#666', fontWeight: 600 }}>
            Detik
          </div>
        </div>
      </div>

      {/* Recipient info */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '13px', color: '#666' }}>Kepada:</div>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-dark)',
            marginTop: '2px'
          }}
        >
          {guestName || INVITATION_CONFIG.defaultGuest}
        </div>
      </div>
    </section>
  );
};
