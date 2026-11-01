import React from 'react';
import { MEETINGS_DATA } from '../data/learningData';
import { UserProgress } from '../types';
import { sound } from '../lib/sound';
import { CheckCircle2, Lock, Star, Sparkles, Award } from 'lucide-react';

interface MissionMapProps {
  progress: UserProgress;
  onSelectMeeting: (meetingId: number) => void;
  onBackToApp: () => void;
}

export const MissionMap: React.FC<MissionMapProps> = ({
  progress,
  onSelectMeeting,
  onBackToApp,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-sky-50 via-amber-50 to-emerald-50 select-none overflow-hidden">
      {/* Title */}
      <div className="text-center shrink-0">
        <h2 className="text-2xl sm:text-3xl font-fun font-bold text-sky-900 tracking-wide">
          Peta Petualangan Belajar
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Pilih pertemuan untuk melanjutkan petualangan Toko Si Cermat!
        </p>
      </div>

      {/* Grid of 4 Meetings */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto overflow-y-auto max-h-[70vh] p-1">
        {MEETINGS_DATA.map((meeting) => {
          const isUnlocked = meeting.id <= progress.currentMeetingId;
          const isCurrent = meeting.id === progress.currentMeetingId;
          const completedCount = meeting.missions.filter(
            (m) => progress.completedMissions[m.id]
          ).length;
          const isCompleted = completedCount === meeting.missions.length;

          return (
            <button
              key={meeting.id}
              onClick={() => {
                if (isUnlocked) {
                  sound.playClick();
                  onSelectMeeting(meeting.id);
                }
              }}
              disabled={!isUnlocked}
              className={`p-3.5 sm:p-4 rounded-3xl border-3 text-left transition-all duration-200 relative flex flex-col justify-between ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-400 hover:shadow-md'
                  : isCurrent
                  ? 'bg-white border-sky-400 shadow-md ring-4 ring-sky-100 scale-[1.02]'
                  : isUnlocked
                  ? 'bg-white border-amber-300 hover:border-amber-400'
                  : 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-fun font-bold ${
                    isCompleted
                      ? 'bg-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isUnlocked
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  Pertemuan {meeting.id}
                </span>

                <div className="flex items-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isUnlocked ? (
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-fun font-bold text-base sm:text-lg text-slate-900">
                  {meeting.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {meeting.theme} · {meeting.missions.length} Misi
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>
                    {completedCount} / {meeting.missions.length} Misi Selesai
                  </span>
                </div>
                {meeting.badgeTitle && (
                  <div className="flex items-center gap-1 text-purple-700">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="hidden xs:inline">{meeting.badgeTitle}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="shrink-0 w-full max-w-sm">
        <button
          onClick={() => {
            sound.playClick();
            onBackToApp();
          }}
          className="w-full min-h-[56px] py-3 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-fun font-bold text-lg shadow-md transition-all active:scale-95"
        >
          Lanjut Belajar
        </button>
      </div>
    </div>
  );
};
