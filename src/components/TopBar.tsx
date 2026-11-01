import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1, Map, BookOpen, Sparkles, Award, HelpCircle } from 'lucide-react';
import { sound } from '../lib/sound';
import { ViewMode } from '../types';

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  speechText?: string;
  onNavigate: (mode: ViewMode) => void;
  activeMode: ViewMode;
  stars: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentStep = 1,
  totalSteps = 1,
  speechText = '',
  onNavigate,
  activeMode,
  stars,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      sound.stopSpeech();
      setIsSpeaking(false);
    } else if (speechText) {
      setIsSpeaking(true);
      sound.speak(speechText, () => setIsSpeaking(false));
    }
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b-2 border-amber-200 px-3 py-2 flex items-center justify-between shrink-0 select-none z-30">
      {/* Kiri: Quick menu icons */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('map');
          }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeMode === 'map'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
          }`}
          title="Peta Misi"
        >
          <Map className="w-4 h-4" />
          <span className="hidden xs:inline">Peta</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('glossary');
          }}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1 transition-all"
          title="Kamus Kata"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Kamus</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('facts');
          }}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1 transition-all"
          title="Fakta Seru"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Fakta</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('badges');
          }}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1 transition-all"
          title="Koleksi Lencana"
        >
          <Award className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">Lencana</span>
        </button>
      </div>

      {/* Tengah: Progress dots / bar */}
      {totalSteps > 1 && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx + 1 === currentStep
                  ? 'w-6 bg-sky-500'
                  : idx + 1 < currentStep
                  ? 'w-2.5 bg-emerald-500'
                  : 'w-2.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Kanan: Bintang, Audio Reader & Mute Toggle */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Stars counter */}
        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 font-bold text-xs sm:text-sm">
          <span>⭐</span>
          <span>{stars}</span>
        </div>

        {/* Read aloud button */}
        {speechText && (
          <button
            onClick={handleSpeak}
            className={`p-2 rounded-xl transition-all flex items-center gap-1 font-bold text-xs sm:text-sm ${
              isSpeaking
                ? 'bg-pink-500 text-white animate-pulse'
                : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
            }`}
            title="Bacakan Tulisan"
            aria-label="Bacakan Teks"
          >
            <Volume1 className="w-4 h-4" />
            <span className="hidden md:inline">{isSpeaking ? 'Berhenti' : 'Baca'}</span>
          </button>
        )}

        {/* Mute button */}
        <button
          onClick={handleToggleMute}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
          title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
        </button>

        {/* Info Orang Tua & Guru */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('parents');
          }}
          className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all"
          title="Panduan Guru & Orang Tua"
          aria-label="Panduan Guru & Orang Tua"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
