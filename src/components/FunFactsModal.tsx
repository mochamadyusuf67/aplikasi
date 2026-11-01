import React from 'react';
import { FUN_FACTS } from '../data/learningData';
import { sound } from '../lib/sound';
import { Sparkles, X, Volume2 } from 'lucide-react';

interface FunFactsModalProps {
  onClose: () => void;
}

export const FunFactsModal: React.FC<FunFactsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-amber-300 shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden animate-pop">
        {/* Header */}
        <div className="p-4 bg-amber-100 border-b-2 border-amber-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-fun font-bold text-amber-950">
              Tahukah Kamu? (Fakta Seru)
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 transition-all"
            aria-label="Tutup Fakta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {FUN_FACTS.map((fact, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start justify-between gap-3 shadow-xs"
            >
              <div>
                <h3 className="font-fun font-bold text-base sm:text-lg text-amber-900 mb-1">
                  {idx + 1}. {fact.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {fact.text}
                </p>
              </div>
              <button
                onClick={() => sound.speak(`${fact.title}. ${fact.text}`)}
                className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 shrink-0 mt-1"
                title="Bacakan Fakta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 bg-amber-50 border-t border-amber-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-base shadow-sm"
          >
            Keren Sekali!
          </button>
        </div>
      </div>
    </div>
  );
};
