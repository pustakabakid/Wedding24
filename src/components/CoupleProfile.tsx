import React from 'react';
import { Instagram, Sparkles, Heart } from 'lucide-react';
import { INVITATION_CONFIG } from '../data/invitationData';
import { CoupleInfo, FeatureFlags, ThemeId } from '../types';

interface CoupleProfileProps {
  couple?: CoupleInfo;
  flags?: FeatureFlags;
  invitationType?: string;
  themeId?: ThemeId;
}

export const CoupleProfile: React.FC<CoupleProfileProps> = ({
  couple: customCouple,
  flags,
  invitationType,
  themeId = 'classic-card'
}) => {
  const couple = customCouple || INVITATION_CONFIG.couple;
  const { bride, groom } = couple;

  const showBrideInstagram = flags ? flags.showBrideInstagram !== false : true;
  const showGroomInstagram = flags ? flags.showGroomInstagram !== false : true;
  const showParentsInfo = flags ? flags.showParentsInfo !== false : true;

  const isGroomFirst = invitationType === 'groom' || (couple.combinedTitle && couple.combinedTitle.toLowerCase().startsWith(groom.nickname.toLowerCase()));

  // 1. RENDERER UNTUK THEME: TIMELESS SNAPSHOT (Polaroid Photo-Booth)
  if (themeId === 'timeless-snapshot') {
    const renderPolaroidGroom = () => (
      <div style={{ marginTop: '16px' }}>
        <div className="retro-stamp-badge">The Groom</div>
        <div className="polaroid-frame polaroid-tilt-left">
          <div className="washi-tape" />
          <img src={groom.avatar} alt={groom.name} />
          <div className="polaroid-caption">{groom.nickname}</div>
        </div>
        <h3 className="font-title text-primary" style={{ fontSize: '28px', marginTop: '12px' }}>
          {groom.name}
        </h3>
        {showParentsInfo && <p className="text-size-caption text-muted mb-3">{groom.parents}</p>}
        {showGroomInstagram && (
          <a href={groom.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '4px' }}>
            <Instagram size={14} />
            <span>@{groom.instagram}</span>
          </a>
        )}
      </div>
    );

    const renderPolaroidBride = () => (
      <div style={{ marginTop: '16px' }}>
        <div className="retro-stamp-badge">The Bride</div>
        <div className="polaroid-frame polaroid-tilt-right">
          <div className="washi-tape" />
          <img src={bride.avatar} alt={bride.name} />
          <div className="polaroid-caption">{bride.nickname}</div>
        </div>
        <h3 className="font-title text-primary" style={{ fontSize: '28px', marginTop: '12px' }}>
          {bride.name}
        </h3>
        {showParentsInfo && <p className="text-size-caption text-muted mb-3">{bride.parents}</p>}
        {showBrideInstagram && (
          <a href={bride.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '4px' }}>
            <Instagram size={14} />
            <span>@{bride.instagram}</span>
          </a>
        )}
      </div>
    );

    return (
      <section id="detail" className="card-transparant" style={{ background: '#FCFAF6', border: '1px solid #E6DAC8' }}>
        <div id="detail-section">
          <p className="text-size-content mb-6" style={{ fontStyle: 'italic', color: '#664d38' }}>
            "Maha Suci Allah yang telah menciptakan pasangan-pasangan semuanya..."
          </p>

          {isGroomFirst ? renderPolaroidGroom() : renderPolaroidBride()}

          <div className="font-title text-primary my-6" style={{ fontSize: '42px', color: '#8C6D53' }}>
            &amp;
          </div>

          {isGroomFirst ? renderPolaroidBride() : renderPolaroidGroom()}
        </div>
      </section>
    );
  }

  // 2. RENDERER UNTUK THEME: ELEGANT LIGHT (Royal Gold Arch Frame)
  if (themeId === 'elegant-light') {
    const renderRoyalGroom = () => (
      <div style={{ marginTop: '16px' }}>
        <div className="royal-arch-frame">
          <img src={groom.avatar} alt={groom.name} />
        </div>
        <h3 className="font-title text-primary" style={{ fontSize: '30px', marginTop: '16px', letterSpacing: '2px' }}>
          {groom.name}
        </h3>
        {showParentsInfo && <p className="text-size-caption text-muted mb-3">{groom.parents}</p>}
        {showGroomInstagram && (
          <a href={groom.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '30px', padding: '6px 20px' }}>
            <Instagram size={14} />
            <span>@{groom.instagram}</span>
          </a>
        )}
      </div>
    );

    const renderRoyalBride = () => (
      <div style={{ marginTop: '16px' }}>
        <div className="royal-arch-frame">
          <img src={bride.avatar} alt={bride.name} />
        </div>
        <h3 className="font-title text-primary" style={{ fontSize: '30px', marginTop: '16px', letterSpacing: '2px' }}>
          {bride.name}
        </h3>
        {showParentsInfo && <p className="text-size-caption text-muted mb-3">{bride.parents}</p>}
        {showBrideInstagram && (
          <a href={bride.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '30px', padding: '6px 20px' }}>
            <Instagram size={14} />
            <span>@{bride.instagram}</span>
          </a>
        )}
      </div>
    );

    return (
      <section id="detail" className="card-transparant gold-hairline-card">
        <div id="detail-section">
          <div className="gold-crest-icon">
            <Sparkles size={32} style={{ margin: '0 auto' }} />
          </div>
          <p className="text-size-content mb-6" style={{ fontStyle: 'italic', color: '#8B7355', letterSpacing: '1px' }}>
            Mempelai yang Berbahagia
          </p>

          {isGroomFirst ? renderRoyalGroom() : renderRoyalBride()}

          <div className="gold-divider-diamond">
            <Heart size={16} color="#D4AF37" fill="#D4AF37" />
          </div>

          {isGroomFirst ? renderRoyalBride() : renderRoyalGroom()}
        </div>
      </section>
    );
  }

  // 3. RENDERER UNTUK THEME: PHOTOVIT (Magazine Editorial Spread)
  if (themeId === 'photovit') {
    const renderMagazineGroom = () => (
      <div style={{ marginTop: '16px' }}>
        <div className="magazine-portrait-frame">
          <img src={groom.avatar} alt={groom.name} />
        </div>
        <h3 className="font-title text-primary" style={{ fontSize: '32px', marginTop: '14px' }}>
          {groom.name}
        </h3>
        {showParentsInfo && <p className="text-size-caption text-muted mb-3">{groom.parents}</p>}
        {showGroomInstagram && (
          <a href={groom.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '8px' }}>
            <Instagram size={14} />
            <span>@{groom.instagram}</span>
          </a>
        )}
      </div>
    );

    const renderMagazineBride = () => (
      <div style={{ marginTop: '16px' }}>
        <div className="magazine-portrait-frame">
          <img src={bride.avatar} alt={bride.name} />
        </div>
        <h3 className="font-title text-primary" style={{ fontSize: '32px', marginTop: '14px' }}>
          {bride.name}
        </h3>
        {showParentsInfo && <p className="text-size-caption text-muted mb-3">{bride.parents}</p>}
        {showBrideInstagram && (
          <a href={bride.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '8px' }}>
            <Instagram size={14} />
            <span>@{bride.instagram}</span>
          </a>
        )}
      </div>
    );

    return (
      <section id="detail" className="card-transparant">
        <div className="magazine-masthead">Exclusive Couple Profile</div>
        <div id="detail-section">
          {isGroomFirst ? renderMagazineGroom() : renderMagazineBride()}

          <div className="font-title text-primary my-6" style={{ fontSize: '44px', color: '#D97768' }}>
            &amp;
          </div>

          {isGroomFirst ? renderMagazineBride() : renderMagazineGroom()}
        </div>
      </section>
    );
  }

  // 4. DEFAULT TEMA: CLASSIC EMERALD BOTANICAL
  const renderClassicBride = () => (
    <div style={{ marginTop: isGroomFirst ? '0' : '20px' }}>
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
  );

  const renderClassicGroom = () => (
    <div style={{ marginTop: isGroomFirst ? '20px' : '0' }}>
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
  );

  return (
    <section id="detail" className="card-transparant">
      <div id="detail-section">
        <p className="text-size-content mb-6" style={{ fontStyle: 'italic', color: '#555' }}>
          Kami mohon do'a & restunya atas pernikahan kami
        </p>

        {isGroomFirst ? renderClassicGroom() : renderClassicBride()}

        {/* Ampersand Divider */}
        <div
          className="font-title text-primary my-6"
          style={{ fontSize: '48px', fontWeight: 700 }}
        >
          &
        </div>

        {isGroomFirst ? renderClassicBride() : renderClassicGroom()}
      </div>
    </section>
  );
};


