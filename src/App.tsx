import React, { useState, useEffect } from 'react';
import { ViewMode, UserProgress } from './types';
import { MEETINGS_DATA } from './data/learningData';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { InteractiveStage } from './components/InteractiveStage';
import { MissionMap } from './components/MissionMap';
import { GlossaryModal } from './components/GlossaryModal';
import { FunFactsModal } from './components/FunFactsModal';
import { BadgesModal } from './components/BadgesModal';
import { ParentsGuideModal } from './components/ParentsGuideModal';
import { AssetGallery } from './components/AssetGallery';
import { P5Canvas } from './components/P5Canvas';
import { ASSET_REGISTRY } from './assets/p5/registry';
import { sound } from './lib/sound';
import { Sparkles, Play, Award } from 'lucide-react';

const STORAGE_KEY = 'toko_diskon_steam_progress_v1';

export function App() {
  // Navigation mode
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (
      window.location.hash === '#galeri-aset' ||
      window.location.pathname === '/galeri-aset'
    ) {
      return 'asset_gallery';
    }
    return 'cover';
  });

  // Modal overlays
  const [showGlossary, setShowGlossary] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showParents, setShowParents] = useState(false);

  // User progress state
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      currentMeetingId: 1,
      currentMissionIndex: 0,
      completedMissions: {},
      earnedBadges: {},
      totalStars: 0,
      basketItems: [0, 2],
      reflections: {},
    };
  });

  // Active meeting and screen state
  const [currentMeetingId, setCurrentMeetingId] = useState<number>(1);
  const [currentMissionIdx, setCurrentMissionIdx] = useState<number>(0);
  const [currentScreenIdx, setCurrentScreenIdx] = useState<number>(0);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  // Sync hash routing for /galeri-aset
  useEffect(() => {
    const handleHash = () => {
      if (
        window.location.hash === '#galeri-aset' ||
        window.location.pathname === '/galeri-aset'
      ) {
        setViewMode('asset_gallery');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore local storage error
    }
  }, [progress]);

  // Current active data
  const currentMeeting =
    MEETINGS_DATA.find((m) => m.id === currentMeetingId) || MEETINGS_DATA[0];
  const currentMission =
    currentMeeting.missions[currentMissionIdx] || currentMeeting.missions[0];
  const currentScreen =
    currentMission.screens[currentScreenIdx] || currentMission.screens[0];

  const totalScreensInMission = currentMission.screens.length;
  const isLastScreenInMission = currentScreenIdx === totalScreensInMission - 1;
  const isLastMissionInMeeting =
    currentMissionIdx === currentMeeting.missions.length - 1;

  // Handle Next button click
  const handleNextScreen = () => {
    if (!isLastScreenInMission) {
      setCurrentScreenIdx((prev) => prev + 1);
    } else {
      // Mission completed!
      const missionId = currentMission.id;
      const isAlreadyCompleted = !!progress.completedMissions[missionId];
      const starsToAdd = isAlreadyCompleted ? 0 : currentMission.stars;

      // Check if meeting badge earned
      const newBadges = { ...progress.earnedBadges };
      if (isLastMissionInMeeting && currentMeeting.badgeId) {
        newBadges[currentMeeting.badgeId] = true;
        sound.playBadge();
      }

      setProgress((prev) => ({
        ...prev,
        completedMissions: {
          ...prev.completedMissions,
          [missionId]: true,
        },
        earnedBadges: newBadges,
        totalStars: prev.totalStars + starsToAdd,
        currentMeetingId: Math.max(
          prev.currentMeetingId,
          isLastMissionInMeeting
            ? Math.min(4, currentMeetingId + 1)
            : currentMeetingId
        ),
      }));

      // Show celebratory notification
      setCelebrationMessage(
        isLastMissionInMeeting && currentMeeting.badgeTitle
          ? `Hebat! Kamu meraih Lencana ${currentMeeting.badgeTitle}! ⭐ +${starsToAdd}`
          : `Misi Selesai! Kamu mendapat ⭐ +${starsToAdd} Bintang!`
      );

      setTimeout(() => {
        setCelebrationMessage(null);
        if (!isLastMissionInMeeting) {
          setCurrentMissionIdx((prev) => prev + 1);
          setCurrentScreenIdx(0);
        } else {
          // Finished meeting, go to map
          setViewMode('map');
          if (currentMeetingId < 4) {
            setCurrentMeetingId((prev) => prev + 1);
            setCurrentMissionIdx(0);
            setCurrentScreenIdx(0);
          }
        }
      }, 1600);
    }
  };

  // Handle Back button click
  const handleBackScreen = () => {
    if (currentScreenIdx > 0) {
      setCurrentScreenIdx((prev) => prev - 1);
    } else if (currentMissionIdx > 0) {
      const prevMission = currentMeeting.missions[currentMissionIdx - 1];
      setCurrentMissionIdx((prev) => prev - 1);
      setCurrentScreenIdx(prevMission.screens.length - 1);
    } else {
      setViewMode('map');
    }
  };

  // Reset Progress
  const handleResetProgress = () => {
    const empty: UserProgress = {
      currentMeetingId: 1,
      currentMissionIndex: 0,
      completedMissions: {},
      earnedBadges: {},
      totalStars: 0,
      basketItems: [0, 2],
      reflections: {},
    };
    setProgress(empty);
    setCurrentMeetingId(1);
    setCurrentMissionIdx(0);
    setCurrentScreenIdx(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Handle navigation from TopBar
  const handleNavigate = (mode: ViewMode) => {
    if (mode === 'glossary') setShowGlossary(true);
    else if (mode === 'facts') setShowFacts(true);
    else if (mode === 'badges') setShowBadges(true);
    else if (mode === 'parents') setShowParents(true);
    else setViewMode(mode);
  };

  // Render Asset Gallery if in gallery mode
  if (viewMode === 'asset_gallery') {
    return (
      <AssetGallery
        onBack={() => {
          window.location.hash = '';
          setViewMode('cover');
        }}
      />
    );
  }

  // Cover Screen
  if (viewMode === 'cover') {
    const coverMeta = ASSET_REGISTRY['draw_cover_discount_shop'];
    return (
      <main className="w-full h-[100dvh] flex flex-col justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 select-none overflow-hidden safe-padding-bottom">
        {/* Cover Top header */}
        <header className="p-3 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/80 border border-amber-300 rounded-full font-fun font-bold text-xs sm:text-sm text-amber-900 shadow-xs">
              STEAM Matematika Kelas 5 SD
            </span>
          </div>
          <button
            onClick={() => setShowParents(true)}
            className="px-3 py-1.5 bg-white/90 hover:bg-white text-purple-700 border border-purple-200 rounded-xl font-bold text-xs shadow-xs"
          >
            Panduan Guru & Ortu
          </button>
        </header>

        {/* Center Canvas & Brief Text (Text Policy: max 2 short sentences, title <= 5 words) */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full text-center my-auto">
          {/* Title: 4 words */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-fun font-bold text-sky-900 tracking-wide mb-1">
            Toko Diskon Si Cermat
          </h1>

          {/* Subtitle / Text: 2 short sentences */}
          <p className="text-base sm:text-xl text-slate-700 font-medium max-w-xl mb-3">
            Ayo bertualang menghitung potongan harga belanja. Temukan rahasia pecahan, desimal, dan persen!
          </p>

          {/* Large procedural p5 Canvas */}
          <div className="w-full max-h-[48vh] min-h-[190px] flex items-center justify-center my-1 relative">
            <P5Canvas
              sketch={coverMeta.sketch}
              ariaLabel={coverMeta.name}
              aspectRatio="16/9"
              className="shadow-md border-3 border-amber-300/80"
              fallbackTitle={coverMeta.name}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-center gap-3 shrink-0 max-w-md mx-auto w-full">
          <button
            onClick={() => {
              sound.playSuccess();
              setViewMode('map');
            }}
            className="w-full min-h-[56px] py-3.5 px-8 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-fun font-bold text-xl shadow-lg active:scale-95 flex items-center justify-center gap-2 transition-all animate-pop"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>Mulai Petualangan</span>
          </button>
        </div>

        {/* Modals on cover */}
        {showParents && (
          <ParentsGuideModal
            progress={progress}
            onResetProgress={handleResetProgress}
            onOpenAssetGallery={() => setViewMode('asset_gallery')}
            onClose={() => setShowParents(false)}
          />
        )}
      </main>
    );
  }

  // Mission Map Screen
  if (viewMode === 'map') {
    return (
      <main className="w-full h-[100dvh] flex flex-col justify-between bg-amber-50 select-none overflow-hidden">
        <TopBar
          currentStep={1}
          totalSteps={1}
          speechText="Pilih pertemuan untuk melanjutkan petualangan Toko Si Cermat!"
          onNavigate={handleNavigate}
          activeMode="map"
          stars={progress.totalStars}
        />

        <div className="flex-1 w-full overflow-hidden">
          <MissionMap
            progress={progress}
            onSelectMeeting={(mId) => {
              setCurrentMeetingId(mId);
              setCurrentMissionIdx(0);
              setCurrentScreenIdx(0);
              setViewMode('meeting');
            }}
            onBackToApp={() => {
              setViewMode('meeting');
            }}
          />
        </div>

        {/* Modals */}
        {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}
        {showFacts && <FunFactsModal onClose={() => setShowFacts(false)} />}
        {showBadges && (
          <BadgesModal
            earnedBadges={progress.earnedBadges}
            onClose={() => setShowBadges(false)}
          />
        )}
        {showParents && (
          <ParentsGuideModal
            progress={progress}
            onResetProgress={handleResetProgress}
            onOpenAssetGallery={() => setViewMode('asset_gallery')}
            onClose={() => setShowParents(false)}
          />
        )}
      </main>
    );
  }

  // Active Learning Screen (Meeting View)
  // Text policy: max 2 short sentences, title max 5 words, 100dvh, no scroll!
  return (
    <main className="w-full h-[100dvh] flex flex-col justify-between bg-amber-50 select-none overflow-hidden relative">
      {/* Top Bar with Step Progress, TTS Read Button, Audio Mute, and Quick Menu */}
      <TopBar
        currentStep={currentScreenIdx + 1}
        totalSteps={totalScreensInMission}
        speechText={`${currentScreen.title}. ${currentScreen.text}`}
        onNavigate={handleNavigate}
        activeMode="meeting"
        stars={progress.totalStars}
      />

      {/* Middle Interactive Stage (Centered, 1-2 short sentences, large visual) */}
      <section className="flex-1 w-full flex flex-col items-center justify-between px-3 sm:px-6 py-1 overflow-hidden my-auto">
        {/* Screen Title & Short Text */}
        <div className="text-center shrink-0 max-w-xl mx-auto mb-1">
          {/* Title: Max 5 words */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-fun font-bold text-sky-900 leading-tight">
            {currentScreen.title}
          </h2>
          {/* Text: Max 2 short sentences */}
          <p className="text-sm sm:text-base md:text-lg text-slate-700 font-medium mt-0.5 leading-snug">
            {currentScreen.text}
          </p>
        </div>

        {/* Central Visual & Interactive Canvas */}
        <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
          <InteractiveStage
            assetId={currentScreen.assetId}
            interactiveType={currentScreen.interactiveType}
            question={currentScreen.question}
            reflectionOptions={currentScreen.reflectionOptions}
            onAnswerCorrect={() => {
              // Quiz answered correctly
            }}
            onReflectComplete={(mood, refText) => {
              setProgress((prev) => ({
                ...prev,
                reflections: {
                  ...prev.reflections,
                  [currentMission.id]: { mood, text: refText },
                },
              }));
            }}
          />
        </div>
      </section>

      {/* Bottom Navigation: Always Visible, Large Buttons (>=56px) */}
      <BottomNav
        onBack={handleBackScreen}
        onNext={handleNextScreen}
        canBack={true}
        canNext={true}
        nextLabel={
          isLastScreenInMission
            ? isLastMissionInMeeting
              ? 'Tuntaskan Pertemuan! 🎉'
              : 'Selesaikan Misi! ⭐'
            : 'Lanjut'
        }
        backLabel="Kembali"
        isLastStep={isLastScreenInMission}
      />

      {/* Celebration Popup Overlay */}
      {celebrationMessage && (
        <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center border-4 border-amber-300 shadow-2xl animate-pop">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-10 h-10 text-amber-500 animate-spin" />
            </div>
            <h3 className="text-2xl font-fun font-bold text-slate-900 mb-2">
              Luar Biasa!
            </h3>
            <p className="text-base font-bold text-emerald-700">
              {celebrationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}
      {showFacts && <FunFactsModal onClose={() => setShowFacts(false)} />}
      {showBadges && (
        <BadgesModal
          earnedBadges={progress.earnedBadges}
          onClose={() => setShowBadges(false)}
        />
      )}
      {showParents && (
        <ParentsGuideModal
          progress={progress}
          onResetProgress={handleResetProgress}
          onOpenAssetGallery={() => setViewMode('asset_gallery')}
          onClose={() => setShowParents(false)}
        />
      )}
    </main>
  );
}

export default App;
