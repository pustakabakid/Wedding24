import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/invitationData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryImages?: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryImages: customImages }) => {
  const galleryImages = customImages && customImages.length > 0 ? customImages : GALLERY_IMAGES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto slide interval
  useEffect(() => {
    if (galleryImages.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const nextSlide = () => {
    if (galleryImages.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    if (galleryImages.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="card-transparant">
      <div id="gallery-section">
        <h2 className="font-title text-primary text-size-title mb-6">Galeri</h2>

        {/* Main Photo Slider */}
        <div
          className="parallax-img-wrapper"
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            backgroundColor: '#f1f5f9'
          }}
        >
          <img
            src={galleryImages[activeIndex]?.src || ''}
            alt={galleryImages[activeIndex]?.alt || 'Gallery photo'}
            className="parallax-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.4s ease'
            }}
          />

          {/* Slider Arrows */}
          <button
            onClick={prevSlide}
            className="btn-clean"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bs-primary)'
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="btn-clean"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bs-primary)'
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Lightbox Zoom Trigger */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="btn-clean"
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.5)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Thumbnail Navigation Row */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginTop: '14px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {galleryImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className="btn-clean"
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                width: '72px',
                height: '48px',
                padding: 0,
                border: activeIndex === idx ? '3px solid var(--bs-primary)' : '2px solid transparent',
                opacity: activeIndex === idx ? 1 : 0.65,
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="modal-overlay" onClick={() => setLightboxOpen(false)}>
            <div
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="btn-clean"
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  color: '#ffffff',
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '50%',
                  padding: '6px'
                }}
              >
                <X size={24} />
              </button>
              <img
                src={galleryImages[activeIndex]?.src || ''}
                alt={galleryImages[activeIndex]?.alt || 'Gallery Zoom'}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
