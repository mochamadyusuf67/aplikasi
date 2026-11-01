import React from 'react';
import { BADGES_INFO } from '../data/learningData';
import { P5Canvas } from './P5Canvas';
import { ASSET_REGISTRY } from '../assets/p5/registry';
import { sound } from '../lib/sound';
import { Award, X, CheckCircle, Lock } from 'lucide-react';

interface BadgesModalProps {
  earnedBadges: Record<string, boolean>;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ earnedBadges, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="w-full max-w-3xl bg-white rounded-3xl border-3 border-amber-300 shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden animate-pop">
        {/* Header */}
        <div className="p-4 bg-amber-100 border-b-2 border-amber-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-700" />
            <h2 className="text-xl sm:text-2xl font-fun font-bold text-amber-950">
              Koleksi Lencana Penghargaan
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 transition-all"
            aria-label="Tutup Koleksi Lencana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {BADGES_INFO.map((badge) => {
            const isEarned = !!earnedBadges[badge.id];
            const meta = ASSET_REGISTRY[badge.assetId];

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border-2 flex flex-col items-center text-center justify-between transition-all ${
                  isEarned
                    ? 'bg-gradient-to-b from-amber-50 to-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                {/* Status chip */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isEarned
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isEarned ? 'Tercapai!' : 'Terkunci'}
                  </span>
                  {isEarned ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {/* Live p5 Badge */}
                <div className="w-36 h-36 my-2 flex items-center justify-center relative">
                  {meta && (
                    <P5Canvas
                      sketch={meta.sketch}
                      ariaLabel={meta.name}
                      aspectRatio="1/1"
                      className="w-full h-full"
                    />
                  )}
                </div>

                <div className="mt-2">
                  <h3 className="font-fun font-bold text-lg text-slate-900">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-amber-50 border-t border-amber-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-fun font-bold text-base shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
