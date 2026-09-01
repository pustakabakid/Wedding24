import React from 'react';
import { Heart } from 'lucide-react';
import { LOVE_STORIES } from '../data/invitationData';
import { TimelineStory, ThemeId } from '../types';

interface LoveStoryProps {
  loveStories?: TimelineStory[];
  themeId?: ThemeId;
}

export const LoveStory: React.FC<LoveStoryProps> = ({ loveStories: customStories, themeId = 'classic-card' }) => {
  const loveStories: TimelineStory[] = customStories || LOVE_STORIES;

  const getCardClass = () => {
    if (themeId === 'elegant-light') return 'card-transparant gold-hairline-card';
    if (themeId === 'timeless-snapshot') return 'card-transparant vintage-ticket-card';
    return 'card-transparant';
  };

  return (
    <section id="lovestory" className={getCardClass()}>
      {themeId === 'photovit' && <div className="magazine-masthead">Our Love Journey</div>}
      {themeId === 'timeless-snapshot' && <div className="retro-stamp-badge">Memories &amp; Stories</div>}

      <h2 className="font-title text-primary text-size-title mb-6">
        {themeId === 'elegant-light' ? 'Untaian Kisah Kasih' : 'Kisah Cinta'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
        {loveStories.map((story) => (
          <div
            key={story.id}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f0f4f8'
            }}
          >
            {/* Story Card Image */}
            <div className="parallax-img-wrapper" style={{ position: 'relative', height: '180px', width: '100%' }}>
              <img
                src={story.image}
                alt={story.title}
                className="parallax-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(255,255,255,1) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'var(--bs-primary)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                <Heart size={16} fill="white" />
              </div>
            </div>

            {/* Story Card Content */}
            <div style={{ padding: '16px 20px 20px 20px' }}>
              <h3
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  marginBottom: '8px'
                }}
              >
                {story.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: '1.7',
                  color: '#555'
                }}
              >
                {story.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
