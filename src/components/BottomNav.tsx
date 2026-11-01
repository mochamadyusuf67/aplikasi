import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';

interface BottomNavProps {
  onBack: () => void;
  onNext: () => void;
  canBack?: boolean;
  canNext?: boolean;
  nextLabel?: string;
  backLabel?: string;
  isLastStep?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onBack,
  onNext,
  canBack = true,
  canNext = true,
  nextLabel = 'Lanjut',
  backLabel = 'Kembali',
  isLastStep = false,
}) => {
  return (
    <nav className="w-full bg-white/95 border-t-2 border-amber-200 px-4 py-2.5 safe-padding-bottom flex items-center justify-between gap-3 shrink-0 z-30 shadow-lg">
      <button
        onClick={() => {
          sound.playClick();
          onBack();
        }}
        disabled={!canBack}
        className={`min-h-[56px] min-w-[120px] px-5 py-3 rounded-2xl font-fun font-bold text-lg sm:text-xl flex items-center justify-center gap-2 transition-all ${
          canBack
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 shadow-sm'
            : 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
        aria-label="Kembali ke langkah sebelumnya"
      >
        <ArrowLeft className="w-6 h-6 shrink-0" />
        <span>{backLabel}</span>
      </button>

      <button
        onClick={() => {
          if (isLastStep) {
            sound.playSuccess();
          } else {
            sound.playClick();
          }
          onNext();
        }}
        disabled={!canNext}
        className={`min-h-[56px] flex-1 max-w-[280px] px-6 py-3 rounded-2xl font-fun font-bold text-lg sm:text-xl flex items-center justify-center gap-2 transition-all ${
          canNext
            ? isLastStep
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95 animate-bounce'
              : 'bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95'
            : 'opacity-40 bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
        aria-label="Lanjut ke langkah berikutnya"
      >
        <span>{nextLabel}</span>
        <ArrowRight className="w-6 h-6 shrink-0" />
      </button>
    </nav>
  );
};
