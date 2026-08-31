import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Music as MusicIcon, Play, Pause } from 'lucide-react';
import { INVITATION_CONFIG } from '../data/invitationData';

// 1. RSVP Attendance Modal
interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  guestName,
  onShowToast
}) => {
  const [attending, setAttending] = useState<boolean | null>(true);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onShowToast('Konfirmasi kehadiran Anda telah tersimpan!', 'success');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Konfirmasi Kehadiran</h4>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Status Confirmation Alert */}
        {isSubmitted && (
          <div style={{ marginBottom: '20px' }}>
            {attending ? (
              <div
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <CheckCircle size={22} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#065f46', fontSize: '14px' }}>
                    Terima kasih telah memberikan konfirmasi kehadiran
                  </div>
                  <div style={{ fontSize: '12px', color: '#047857', marginTop: '4px', lineHeight: 1.5 }}>
                    Kami sangat senang dan menantikan kehadiran Anda di acara kami.
                  </div>
                  <div style={{ fontSize: '12px', color: '#065f46', fontWeight: 600, marginTop: '6px' }}>
                    Anda akan hadir: {peopleCount} orang
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <AlertCircle size={22} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '14px' }}>
                    Terima kasih atas konfirmasinya
                  </div>
                  <div style={{ fontSize: '12px', color: '#b91c1c', marginTop: '4px', lineHeight: 1.5 }}>
                    Kami memahami apabila Anda belum bisa hadir. Doa dan restu Anda dari jauh sudah sangat berarti bagi kami.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Nama Tamu
            </label>
            <input
              type="text"
              value={guestName || INVITATION_CONFIG.defaultGuest}
              disabled
              className="form-control"
              style={{ backgroundColor: '#edf2f7', cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Jumlah Orang
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={peopleCount}
              onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
              className="form-control"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => {
                setAttending(true);
                setIsSubmitted(true);
                onShowToast('Tersimpan: Akan Hadir (' + peopleCount + ' orang)', 'success');
              }}
              className="btn"
              style={{
                flex: 1,
                backgroundColor: '#373a38',
                color: '#ffffff',
                borderRadius: '8px'
              }}
            >
              Hadir
            </button>

            <button
              type="button"
              onClick={() => {
                setAttending(false);
                setIsSubmitted(true);
                onShowToast('Tersimpan: Tidak Hadir', 'error');
              }}
              className="btn"
              style={{
                flex: 1,
                backgroundColor: '#ef4444',
                color: '#ffffff',
                borderRadius: '8px'
              }}
            >
              Tidak Hadir
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn"
              style={{
                backgroundColor: '#e2e8f0',
                color: '#1e293b',
                borderRadius: '8px'
              }}
            >
              Tutup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Background Music Info Modal
interface MusicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicInfoModal: React.FC<MusicInfoModalProps> = ({
  isOpen,
  onClose,
  isPlaying,
  onTogglePlay
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
        <div className="modal-header">
          <h4 className="modal-title">Background Music</h4>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--bs-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: 'var(--bs-primary)'
          }}
        >
          <MusicIcon size={32} />
        </div>

        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
          Romantic Wedding Background Music
        </div>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
          Original Soundtrack • PIXABAY
        </div>

        <button
          onClick={onTogglePlay}
          className="btn btn-primary"
          style={{
            borderRadius: '24px',
            padding: '10px 24px',
            margin: '0 auto 20px auto'
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          <span>{isPlaying ? 'Jeda Musik (Pause)' : 'Putar Musik (Play)'}</span>
        </button>

        <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>
          Beberapa browser membatasi fitur autoplay. Anda dapat menghidupkan atau mematikan musik kapan saja menggunakan tombol floating di pojok kanan bawah.
        </p>

        <button
          onClick={onClose}
          className="btn btn-light"
          style={{ width: '100%', marginTop: '20px', borderRadius: '8px' }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
