import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/learningData';
import { sound } from '../lib/sound';
import { Volume2, X, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeItem = GLOSSARY_ITEMS[selectedIdx];

  const handleSpeak = (text: string) => {
    sound.speak(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-amber-300 shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden animate-pop">
        {/* Header */}
        <div className="p-4 bg-amber-100 border-b-2 border-amber-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-800" />
            <h2 className="text-xl sm:text-2xl font-fun font-bold text-amber-950">
              Kamus Kata Cermat
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 transition-all"
            aria-label="Tutup Kamus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="p-2 bg-amber-50 border-b border-amber-200 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {GLOSSARY_ITEMS.map((item, idx) => (
            <button
              key={item.term}
              onClick={() => {
                sound.playClick();
                setSelectedIdx(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedIdx === idx
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {item.term}
            </button>
          ))}
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-fun font-bold text-sky-900">
                  {activeItem.term}
                </h3>
                <span className="inline-block mt-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-sm font-bold">
                  Bentuk: {activeItem.symbol}
                </span>
              </div>
              <button
                onClick={() =>
                  handleSpeak(`${activeItem.term}. ${activeItem.meaning}. ${activeItem.tip}`)
                }
                className="p-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center gap-1.5 font-bold text-sm shadow-sm"
                title="Dengarkan Penjelasan"
              >
                <Volume2 className="w-5 h-5" />
                <span className="hidden sm:inline">Dengarkan</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                Arti Sederhana
              </h4>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                {activeItem.meaning}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                Tips Ingat Cepat
              </h4>
              <p className="text-base sm:text-lg text-emerald-950 leading-relaxed font-bold">
                💡 {activeItem.tip}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-base shadow-sm"
            >
              Sudah Paham!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
