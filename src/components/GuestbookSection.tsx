import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Clock, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestWish } from '../types';
import { INITIAL_WISHES } from '../data/invitationData';
import { fetchWishes, submitWish } from '../lib/supabaseService';

interface GuestbookSectionProps {
  defaultName: string;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  defaultName,
  onShowToast
}) => {
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [name, setName] = useState(defaultName || 'Lia');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      timestamp: formattedTimestamp
    };

    // Optimistic UI update
    setWishes((prev) => [newWish, ...prev]);
    setComment('');

    await submitWish(name.trim(), comment.trim(), true);
    setIsSubmitting(false);
    onShowToast('Terima kasih atas ucapan & doa Anda!', 'success');

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

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
              placeholder="Tulis ucapan & doa"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-control"
              rows={4}
              required
            />
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
          {wishes.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bs-primary-light)',
                borderRadius: '12px',
                padding: '14px 16px',
                border: '1px solid rgba(75, 107, 153, 0.15)'
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
                  wordBreak: 'break-word'
                }}
              >
                {item.comment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
