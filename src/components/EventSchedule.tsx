import React from 'react';
import { CalendarCheck, Navigation, Radio } from 'lucide-react';
import { SCHEDULE_DATA, INVITATION_CONFIG } from '../data/invitationData';
import { ScheduleItem } from '../types';

interface EventScheduleProps {
  schedules?: ScheduleItem[];
  liveStreamUrl?: string;
}

export const EventSchedule: React.FC<EventScheduleProps> = ({
  schedules: customSchedules,
  liveStreamUrl: customLiveStreamUrl
}) => {
  const schedules = customSchedules || SCHEDULE_DATA;
  const liveStreamUrl = customLiveStreamUrl || INVITATION_CONFIG.liveStreamUrl;
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

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: 'center'
                  }}
                >
                  <a
                    href={item.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ minWidth: '140px' }}
                  >
                    <CalendarCheck size={14} />
                    <span>Simpan Tanggal</span>
                  </a>
                  <a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ minWidth: '140px' }}
                  >
                    <Navigation size={14} />
                    <span>Navigasi Map</span>
                  </a>
                </div>
              </div>

              {index < schedules.length - 1 && <div className="sparator-line" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Live Streaming Subcard */}
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
    </section>
  );
};
