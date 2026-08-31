import React, { useState, useEffect } from 'react';
import { FileText, Heart, Image as ImageIcon, Gift, MessageSquare } from 'lucide-react';

export const FloatingNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cover');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'cover', el: document.getElementById('cover') },
        { id: 'detail', el: document.getElementById('detail') },
        { id: 'gallery', el: document.getElementById('gallery') },
        { id: 'gift', el: document.getElementById('gift') },
        { id: 'wish', el: document.getElementById('wish') }
      ];

      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="floating-navbar" aria-label="Quick navigation">
      <button
        onClick={() => scrollTo('cover')}
        className={`nav-link-btn ${activeSection === 'cover' ? 'active' : ''}`}
        title="Sampul / Countdown"
      >
        <FileText size={20} />
      </button>

      <button
        onClick={() => scrollTo('detail')}
        className={`nav-link-btn ${activeSection === 'detail' ? 'active' : ''}`}
        title="Mempelai & Acara"
      >
        <Heart size={20} />
      </button>

      <button
        onClick={() => scrollTo('gallery')}
        className={`nav-link-btn ${activeSection === 'gallery' ? 'active' : ''}`}
        title="Galeri Foto"
      >
        <ImageIcon size={20} />
      </button>

      <button
        onClick={() => scrollTo('gift')}
        className={`nav-link-btn ${activeSection === 'gift' ? 'active' : ''}`}
        title="Kado & Hadiah"
      >
        <Gift size={20} />
      </button>

      <button
        onClick={() => scrollTo('wish')}
        className={`nav-link-btn ${activeSection === 'wish' ? 'active' : ''}`}
        title="Ucapan & Doa"
      >
        <MessageSquare size={20} />
      </button>
    </nav>
  );
};
