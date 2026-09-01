import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Clock, Send, Heart, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestWish, FeatureFlags } from '../types';
import { INITIAL_WISHES } from '../data/invitationData';
import { fetchWishes, submitWish, likeWish } from '../lib/supabaseService';

interface GuestbookSectionProps {
  defaultName: string;
  flags?: FeatureFlags;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  defaultName,
  flags,
  onShowToast
}) => {
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [name, setName] = useState(defaultName || 'Lia');
  const [comment, setComment] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak'>('hadir');
  const [activeFilter, setActiveFilter] = useState<'all' | 'hadir' | 'ragu' | 'tidak'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedWishes, setLikedWishes] = useState<Record<string, boolean>>({});

  const showWishLikes = flags ? flags.showWishLikes !== false : true;

  useEffect(() => {
    fetchWishes().then((data) => {
      if (data && data.length > 0) {
        setWishes(data);
      }
    });
  }, []);

  useEffect(() => {
    if (defaultName) {
      setName(defaultName);
    }
  }, [defaultName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      onShowToast('Mohon isi nama dan ucapan Anda', 'error');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const dayName = days[now.getDay()];
    const dateNum = String(now.getDate()).padStart(2, '0');
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedTimestamp = `${dayName}, ${dateNum} ${monthName} ${year} ${hours}:${minutes}`;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: comment.trim(),
      attending: attendance === 'hadir',
      attendance_status: attendance,
      likes_count: 0,
      timestamp: formattedTimestamp
    };

    // Optimistic UI update
    setWishes((prev) => [newWish, ...prev]);
    setComment('');

    const ok = await submitWish(name.trim(), comment.trim(), attendance);
    if (ok) {
      fetchWishes().then((data) => {
        if (data && data.length > 0) setWishes(data);
      });
    }
    setIsSubmitting(false);
    onShowToast('Terima kasih atas ucapan & doa Anda!', 'success');

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleLike = async (wishId: string, currentLikes = 0) => {
    if (likedWishes[wishId]) return;
    
    setLikedWishes((prev) => ({ ...prev, [wishId]: true }));
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likes_count: (w.likes_count || 0) + 1 } : w))
    );

    await likeWish(wishId, currentLikes);
  };

  // Filtered wishes list
  const filteredWishes = wishes.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.attendance_status === activeFilter || (activeFilter === 'hadir' && item.attending);
  });

  const countAll = wishes.length;
  const countHadir = wishes.filter((w) => w.attendance_status === 'hadir' || w.attending).length;
  const countRagu = wishes.filter((w) => w.attendance_status === 'ragu').length;
  const countTidak = wishes.filter((w) => w.attendance_status === 'tidak' || (w.attending === false && !w.attendance_status)).length;

  return (
    <section id="wish" className="card-transparant">
      <div id="wish-section">
        <h2 className="font-title text-primary text-size-title mb-6">Ucapan &amp; Doa</h2>

        {/* Wish Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginBottom: '28px' }}>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <textarea
              placeholder="Tulis ucapan & doa restu Anda..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-control"
              rows={3}
              required
            />
          </div>

          {/* Attendance Status Selector */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
              Konfirmasi Kehadiran Anda:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`btn btn-sm ${attendance === 'hadir' ? 'btn-primary' : 'btn-clean'}`}
                style={{
                  borderRadius: '10px',
                  border: attendance === 'hadir' ? 'none' : '1px solid var(--border)',
                  padding: '8px 4px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <CheckCircle2 size={13} />
                <span>Hadir</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('ragu')}
                className={`btn btn-sm ${attendance === 'ragu' ? 'btn-primary' : 'btn-clean'}`}
                style={{
                  borderRadius: '10px',
                  border: attendance === 'ragu' ? 'none' : '1px solid var(--border)',
                  padding: '8px 4px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <HelpCircle size={13} />
                <span>Ragu-ragu</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('tidak')}
                className={`btn btn-sm ${attendance === 'tidak' ? 'btn-primary' : 'btn-clean'}`}
                style={{
                  borderRadius: '10px',
                  border: attendance === 'tidak' ? 'none' : '1px solid var(--border)',
                  padding: '8px 4px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <XCircle size={13} />
                <span>Tidak Hadir</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', borderRadius: '10px' }}
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}</span>
          </button>
        </form>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            marginBottom: '14px',
            paddingBottom: '4px'
          }}
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`btn-clean ${activeFilter === 'all' ? 'active-filter' : ''}`}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: 700,
              background: activeFilter === 'all' ? 'var(--bs-primary)' : '#f1f5f9',
              color: activeFilter === 'all' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Semua ({countAll})
          </button>

          <button
            onClick={() => setActiveFilter('hadir')}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: 700,
              background: activeFilter === 'hadir' ? 'var(--bs-primary)' : '#f1f5f9',
              color: activeFilter === 'hadir' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Hadir ({countHadir})
          </button>

          <button
            onClick={() => setActiveFilter('ragu')}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: 700,
              background: activeFilter === 'ragu' ? 'var(--bs-primary)' : '#f1f5f9',
              color: activeFilter === 'ragu' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Ragu-ragu ({countRagu})
          </button>

          <button
            onClick={() => setActiveFilter('tidak')}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: 700,
              background: activeFilter === 'tidak' ? 'var(--bs-primary)' : '#f1f5f9',
              color: activeFilter === 'tidak' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Tidak Hadir ({countTidak})
          </button>
        </div>

        {/* Wishes Feed */}
        <div
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingRight: '4px',
            textAlign: 'left'
          }}
        >
          {filteredWishes.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '24px', fontSize: '13px' }}>
              Belum ada ucapan pada kategori ini.
            </div>
          ) : (
            filteredWishes.map((item) => {
              const isLiked = likedWishes[item.id];
              const likes = item.likes_count || 0;

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--bs-primary-light)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    border: '1px solid rgba(75, 107, 153, 0.15)',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: 'var(--bs-primary)',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <MessageSquareHeart size={15} />
                      <span>{item.name}</span>
                    </div>

                    {/* Attendance Badge */}
                    {item.attendance_status && (
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '12px',
                          background:
                            item.attendance_status === 'hadir'
                              ? '#dcfce7'
                              : item.attendance_status === 'ragu'
                              ? '#fef3c7'
                              : '#fee2e2',
                          color:
                            item.attendance_status === 'hadir'
                              ? '#15803d'
                              : item.attendance_status === 'ragu'
                              ? '#b45309'
                              : '#dc2626'
                        }}
                      >
                        {item.attendance_status === 'hadir'
                          ? '✓ Hadir'
                          : item.attendance_status === 'ragu'
                          ? '? Ragu'
                          : '✕ Tidak Hadir'}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--bs-primary-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '2px',
                      marginBottom: '6px'
                    }}
                  >
                    <Clock size={12} />
                    <span>{item.timestamp}</span>
                  </div>

                  <div
                    style={{
                      fontSize: '13px',
                      color: '#2B2B2B',
                      lineHeight: '1.5',
                      wordBreak: 'break-word',
                      marginBottom: '8px'
                    }}
                  >
                    {item.comment}
                  </div>

                  {/* Like Button */}
                  {showWishLikes && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleLike(item.id, likes)}
                        className="btn-clean"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11.5px',
                          color: isLiked ? '#ef4444' : 'var(--bs-primary-dark)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: '2px 6px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        <Heart
                          size={13}
                          fill={isLiked ? '#ef4444' : 'none'}
                          color={isLiked ? '#ef4444' : 'currentColor'}
                        />
                        <span>{likes > 0 ? `${likes} Love` : 'Kirim Love'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
