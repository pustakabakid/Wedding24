import React from 'react';
import { Instagram } from 'lucide-react';
import { INVITATION_CONFIG } from '../data/invitationData';
import { CoupleInfo, FeatureFlags } from '../types';

interface CoupleProfileProps {
  couple?: CoupleInfo;
  flags?: FeatureFlags;
}

export const CoupleProfile: React.FC<CoupleProfileProps> = ({ couple: customCouple, flags }) => {
  const couple = customCouple || INVITATION_CONFIG.couple;
  const { bride, groom } = couple;

  const showBrideInstagram = flags ? flags.showBrideInstagram !== false : true;
  const showGroomInstagram = flags ? flags.showGroomInstagram !== false : true;
  const showParentsInfo = flags ? flags.showParentsInfo !== false : true;

  return (
    <section id="detail" className="card-transparant">
      <div id="detail-section">
        <p className="text-size-content mb-6" style={{ fontStyle: 'italic', color: '#555' }}>
          Kami mohon do'a & restunya atas pernikahan kami
        </p>

        {/* Bride Profile */}
        <div style={{ marginTop: '20px' }}>
          <div className="avatar-wrapper parallax-img-wrapper">
            <img
              src={bride.avatar}
              alt={bride.name}
              className="avatar-circle parallax-img"
              style={{ margin: '0 auto' }}
            />
          </div>
          <h3
            className="font-title text-primary"
            style={{ fontSize: '32px', margin: '8px 0 4px 0' }}
          >
            {bride.name}
          </h3>
          {showParentsInfo && <p className="text-size-caption text-muted mb-3">{bride.parents}</p>}
          {showBrideInstagram && (
            <a
              href={bride.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '20px' }}
            >
              <Instagram size={14} />
              <span>@{bride.instagram}</span>
            </a>
          )}
        </div>

        {/* Ampersand Divider */}
        <div
          className="font-title text-primary my-6"
          style={{ fontSize: '48px', fontWeight: 700 }}
        >
          &
        </div>

        {/* Groom Profile */}
        <div>
          <div className="avatar-wrapper parallax-img-wrapper">
            <img
              src={groom.avatar}
              alt={groom.name}
              className="avatar-circle parallax-img"
              style={{ margin: '0 auto' }}
            />
          </div>
          <h3
            className="font-title text-primary"
            style={{ fontSize: '32px', margin: '8px 0 4px 0' }}
          >
            {groom.name}
          </h3>
          {showParentsInfo && <p className="text-size-caption text-muted mb-3">{groom.parents}</p>}
          {showGroomInstagram && (
            <a
              href={groom.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '20px' }}
            >
              <Instagram size={14} />
              <span>@{groom.instagram}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
