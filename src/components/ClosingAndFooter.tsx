import React from 'react';
import { INVITATION_CONFIG } from '../data/invitationData';

interface ClosingSectionProps {
  combinedTitle?: string;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ combinedTitle }) => {
  const title = combinedTitle || INVITATION_CONFIG.couple.combinedTitle;
  return (
    <section id="closing" className="card-transparant" style={{ marginBottom: '80px' }}>
      <div style={{ padding: '10px 0' }}>
        <p className="text-size-content mb-6" style={{ color: '#444' }}>
          Atas kehadiran saudara/(i) &amp; Do'a restunya, kami ucapkan terimakasih
        </p>
        <div className="text-size-content text-muted mt-8 mb-2">Hormat Kami</div>
        <h3
          className="font-title text-primary text-size-title"
          style={{ fontSize: '34px', fontWeight: 700 }}
        >
          {title}
        </h3>
      </div>
    </section>
  );
};
