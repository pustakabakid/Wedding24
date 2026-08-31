import React, { useState } from 'react';
import { Copy, Check, QrCode, UserCheck } from 'lucide-react';
import { BANK_ACCOUNTS } from '../data/invitationData';
import { BankAccount } from '../types';

interface GiftSectionProps {
  bankAccounts?: BankAccount[];
  onOpenRSVP: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({
  bankAccounts: customBanks,
  onOpenRSVP,
  onShowToast
}) => {
  const bankAccounts = customBanks && customBanks.length > 0 ? customBanks : BANK_ACCOUNTS;
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setCopiedAccount(accountNumber);
        onShowToast('Berhasil menyalin nomor rekening ke clipboard!', 'success');
        setTimeout(() => setCopiedAccount(null), 2500);
      })
      .catch(() => {
        onShowToast('Gagal menyalin nomor rekening', 'error');
      });
  };

  return (
    <section id="gift" className="card-transparant">
      <div id="gift-section">
        {/* RSVP Trigger Button */}
        <h2 className="font-title text-primary text-size-title mb-2">Rsvp</h2>
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={onOpenRSVP}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '16px',
              flexDirection: 'column',
              gap: '6px',
              boxShadow: '0 8px 20px rgba(75, 107, 153, 0.25)'
            }}
          >
            <UserCheck size={28} />
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Konfirmasi Kehadiran</span>
          </button>
        </div>

        {/* Gift / Kado Header */}
        <h2 className="font-title text-primary text-size-title mb-2">Kado</h2>
        <p className="text-size-caption text-muted mb-4">
          Doa restu anda merupakan karunia yang sangat berarti bagi kedua mempelai. Namun jika memberi adalah ungkapan tanda kasih anda, anda dapat menggunakan fitur berikut:
        </p>

        {/* Collapsible Toggle Button */}
        <div style={{ marginBottom: isGiftOpen ? '20px' : '0' }}>
          <button
            onClick={() => setIsGiftOpen((prev) => !prev)}
            className="btn btn-primary"
            style={{
              borderRadius: '24px',
              padding: '10px 24px',
              fontSize: '14px',
              boxShadow: '0 4px 14px rgba(75, 107, 153, 0.25)'
            }}
          >
            <span>{isGiftOpen ? 'Tutup Amplop Digital' : 'Kirim Hadiah / Amplop Digital'}</span>
          </button>
        </div>

        {/* Collapsible Bank Account Cards */}
        {isGiftOpen && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
          {BANK_ACCOUNTS.map((bank) => (
            <div
              key={bank.accountNumber}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px 20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
              }}
            >
              <img
                src={bank.logo}
                alt={bank.bankName}
                style={{ height: '24px', margin: '0 auto 12px auto', display: 'block' }}
              />

              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--bs-primary)' }}>
                {bank.bankName}
              </div>

              <div className="text-size-caption text-muted mt-2">Nama Rekening</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>
                {bank.accountHolder}
              </div>

              <div className="text-size-caption text-muted mt-3">Nomor Rekening</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '2px'
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    color: 'var(--bs-primary)'
                  }}
                >
                  {bank.accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(bank.accountNumber)}
                  className="btn btn-clean"
                  title="Salin nomor rekening"
                  style={{ color: 'var(--bs-primary)' }}
                >
                  {copiedAccount === bank.accountNumber ? (
                    <Check size={18} color="#16a34a" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>

              {/* QRIS section */}
              {bank.qrisImage && (
                <div style={{ marginTop: '24px', borderTop: '1px dashed #e2e8f0', paddingTop: '16px' }}>
                  <div className="text-size-caption text-muted mb-2">
                    Transfer pakai QRIS {bank.bankName}
                  </div>
                  <img
                    src={bank.qrisImage}
                    alt="QRIS Code"
                    onClick={() => setShowQRModal(true)}
                    style={{
                      maxWidth: '220px',
                      width: '100%',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      margin: '0 auto',
                      display: 'block',
                      cursor: 'zoom-in'
                    }}
                  />
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>
                    Klik gambar QR untuk memperbesar
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* QRIS Full Modal */}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">QRIS Bank BCA</div>
              <button onClick={() => setShowQRModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <img
                src={bankAccounts[0]?.qrisImage || ''}
                alt="QRIS Payment"
                style={{ width: '100%', maxWidth: '320px', borderRadius: '12px' }}
              />
              <p className="text-size-caption text-muted mt-3">
                Scan QRIS di atas melalui mobile banking Anda.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
