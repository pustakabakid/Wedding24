import React from 'react';
import { CalendarCheck, Navigation, Radio } from 'lucide-react';
import { SCHEDULE_DATA, INVITATION_CONFIG } from '../data/invitationData';
import { ScheduleItem, FeatureFlags } from '../types';

interface EventScheduleProps {
  schedules?: ScheduleItem[];
  liveStreamUrl?: string;
  flags?: FeatureFlags;
}

export const EventSchedule: React.FC<EventScheduleProps> = ({
  schedules: customSchedules,
  liveStreamUrl: customLiveStreamUrl,
  flags
}) => {
  const schedules = customSchedules || SCHEDULE_DATA;
  const liveStreamUrl = customLiveStreamUrl || INVITATION_CONFIG.liveStreamUrl;

  const showGoogleCal = flags ? flags.showGoogleCal !== false : true;
  const showAppleCal = flags ? flags.showAppleCal !== false : true;
  const showGoogleMaps = flags ? flags.showGoogleMaps !== false : true;
  const showWaze = flags ? flags.showWaze !== false : true;
  const showLiveStream = flags ? flags.showLiveStream !== false : true;

  const downloadIcsFile = (item: ScheduleItem) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wevitation//Wedding Invitation//ID',
      'BEGIN:VEVENT',
      `SUMMARY:${item.title} - ${INVITATION_CONFIG.couple.combinedTitle}`,
      `DESCRIPTION:${item.title} Pernikahan ${INVITATION_CONFIG.couple.combinedTitle}\\nWaktu: ${item.time} WIB\\nLokasi: ${item.venue}, ${item.address}`,
      `LOCATION:${item.venue}, ${item.address}`,
      'DTSTART:20260921T090000Z',
      'DTEND:20260921T140000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${item.title.toLowerCase().replace(/\s+/g, '_')}_wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasAnyButton = showGoogleCal || showAppleCal || showGoogleMaps || showWaze;

  return (
    <section id="schedule">
      <div className="card-transparant">
        <h2 className="font-title text-primary text-size-title mb-2">Acara</h2>
        <p className="text-size-content text-muted mb-6">
          Kami bermaksud untuk mengundang saudara/(i) dalam acara pernikahan kami pada:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {schedules.map((item, index) => (
            <React.Fragment key={item.id}>
              <div style={{ padding: '12px 8px' }}>
                <h3
                  className="text-size-subtitle font-bold text-dark mb-1"
                  style={{ fontWeight: 800 }}
                >
                  {item.title}
                </h3>
                <div className="text-size-caption text-primary font-semibold">{item.date}</div>
                <div className="text-size-caption text-muted my-1">{item.time} WIB</div>
                <div
                  className="text-size-content font-bold"
                  style={{ fontWeight: 700, marginTop: '6px' }}
                >
                  {item.venue}
                </div>
                <div className="text-size-caption text-muted mb-4">{item.address}</div>

                {hasAnyButton && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      justifyContent: 'center'
                    }}
                  >
                    {showGoogleCal && (
                      <a
                        href={item.calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ minWidth: '130px' }}
                        title="Simpan ke Google Calendar"
                      >
                        <CalendarCheck size={14} />
                        <span>Google Cal</span>
                      </a>
                    )}

                    {showAppleCal && (
                      <button
                        onClick={() => downloadIcsFile(item)}
                        className="btn btn-primary btn-sm"
                        style={{ minWidth: '110px' }}
                        title="Download Apple / Outlook Calendar (.ics)"
                      >
                        <CalendarCheck size={14} />
                        <span>Apple / iCal</span>
                      </button>
                    )}

                    {showGoogleMaps && (
                      <a
                        href={item.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ minWidth: '130px' }}
                        title="Buka rute di Google Maps"
                      >
                        <Navigation size={14} />
                        <span>Google Maps</span>
                      </a>
                    )}

                    {showWaze && (
                      <a
                        href={`https://waze.com/ul?q=${encodeURIComponent(item.venue + ' ' + item.address)}&navigate=yes`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ minWidth: '110px' }}
                        title="Buka rute di Waze"
                      >
                        <Navigation size={14} />
                        <span>Waze</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {index < schedules.length - 1 && <div className="sparator-line" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Live Streaming Subcard */}
      {showLiveStream && (
        <div className="card-transparant" style={{ marginTop: '32px' }}>
          <h3 className="font-title text-primary text-size-title mb-2">Live Streaming</h3>
          <p className="text-size-caption text-muted mb-4">
            Acara ini akan disiarkan langsung melalui media internet. Silahkan klik tombol dibawah ini untuk membuka saluran live streaming.
          </p>
          <a
            href={liveStreamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ borderRadius: '24px', padding: '10px 24px' }}
          >
            <Radio size={16} className="animate-pulse-soft" />
            <span>Saluran Live Streaming</span>
          </a>
        </div>
      )}
    </section>
  );
};
