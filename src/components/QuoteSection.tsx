import React from 'react';

export const QuoteSection: React.FC = () => {
  return (
    <section id="quote" className="card-transparant">
      <div
        className="font-arabic"
        style={{
          color: 'var(--bs-primary)',
          fontSize: '1.25rem',
          marginBottom: '20px',
          padding: '0 8px'
        }}
      >
        وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
      </div>

      <div
        style={{
          fontStyle: 'italic',
          color: 'var(--bs-primary)',
          fontSize: '13px',
          lineHeight: '1.8',
          margin: '0 auto',
          maxWidth: '440px'
        }}
      >
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu merasa tenang dan tentram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
      </div>

      <div
        style={{
          fontWeight: 700,
          color: 'var(--bs-primary)',
          marginTop: '16px',
          fontSize: '14px'
        }}
      >
        Ar Rum: 21
      </div>
    </section>
  );
};
