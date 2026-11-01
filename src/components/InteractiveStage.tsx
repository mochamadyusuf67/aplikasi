import React, { useState } from 'react';
import { P5Canvas } from './P5Canvas';
import { ASSET_REGISTRY } from '../assets/p5/registry';
import { Question } from '../types';
import { sound } from '../lib/sound';
import { Check, Lightbulb, Smile, Star, Heart } from 'lucide-react';

interface InteractiveStageProps {
  assetId: string;
  interactiveType?: string;
  question?: Question;
  reflectionOptions?: string[];
  onAnswerCorrect?: () => void;
  onReflectComplete?: (mood: string, reflection: string) => void;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  assetId,
  interactiveType = 'none',
  question,
  reflectionOptions,
  onAnswerCorrect,
  onReflectComplete,
}) => {
  // Slider state
  const [sliderVal, setSliderVal] = useState<number>(0.5);

  // Basket state
  const [basketItems, setBasketItems] = useState<number[]>([0, 2]); // default Buku + Beras = Rp22.000

  // Discount slicer state
  const [activeSlice, setActiveSlice] = useState<number>(2);

  // Shelves state
  const [selectedShelfItem, setSelectedShelfItem] = useState<number>(0);

  // Art kit wiggle
  const [artKitTapped, setArtKitTapped] = useState<number>(0);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Reflection state
  const [selectedMood, setSelectedMood] = useState<string>('Senang');
  const [selectedReflection, setSelectedReflection] = useState<string>(
    reflectionOptions?.[0] || 'Belajar pecahan itu seru!'
  );

  const assetMeta = ASSET_REGISTRY[assetId] || ASSET_REGISTRY['draw_cover_discount_shop'];

  const extraProps = {
    value: sliderVal,
    onChange: (v: number) => setSliderVal(v),
    itemsInBasket: basketItems,
    onToggleItem: (idx: number) => {
      sound.playDrop();
      setBasketItems((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    },
    slices: 4,
    activeSlice,
    onSliceChange: (s: number) => {
      sound.playSlice();
      setActiveSlice(s);
    },
    selectedItem: selectedShelfItem,
    onSelect: (idx: number) => {
      sound.playClick();
      setSelectedShelfItem(idx);
    },
    artTapped: artKitTapped,
    onTap: () => {
      sound.playClick();
      setArtKitTapped((prev) => prev + 1);
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 max-w-4xl mx-auto overflow-hidden">
      {/* Visual Canvas Area */}
      <div className="w-full flex-1 max-h-[58vh] min-h-[160px] flex items-center justify-center relative">
        <P5Canvas
          sketch={assetMeta.sketch}
          ariaLabel={assetMeta.name}
          aspectRatio={assetMeta.aspectRatio}
          extraProps={extraProps}
          fallbackTitle={assetMeta.name}
          className="shadow-sm border-2 border-amber-200/60"
        />
      </div>

      {/* Interactive Controls Bar Below Canvas */}
      <div className="w-full shrink-0 mt-1 max-w-2xl px-2">
        {/* 1. Tech Slider Accessible Controls */}
        {interactiveType === 'tech_slider' && (
          <div className="bg-sky-50 p-2 rounded-2xl border border-sky-200 flex flex-wrap items-center justify-between gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-bold text-sky-800">Pilih Cepat:</span>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              {[
                { label: '0,25 (1/4 = 25%)', val: 0.25 },
                { label: '0,50 (1/2 = 50%)', val: 0.5 },
                { label: '0,75 (3/4 = 75%)', val: 0.75 },
                { label: '1,00 (100%)', val: 1.0 },
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => {
                    sound.playClick();
                    setSliderVal(btn.val);
                  }}
                  className={`px-2 py-1 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    Math.abs(sliderVal - btn.val) < 0.02
                      ? 'bg-sky-500 text-white shadow-sm scale-105'
                      : 'bg-white text-sky-700 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Budget Basket Controls */}
        {interactiveType === 'budget_basket' && (
          <div className="bg-amber-50 p-2 rounded-2xl border border-amber-200">
            <div className="text-xs font-bold text-amber-900 mb-1 text-center">
              Sentuh barang untuk memasukkan ke keranjang belanja:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { name: 'Buku', final: 'Rp10.000', idx: 0 },
                { name: 'Pensil', final: 'Rp18.000', idx: 1 },
                { name: 'Beras 1kg', final: 'Rp12.000', idx: 2 },
                { name: 'Minyak', final: 'Rp18.000', idx: 3 },
              ].map((it) => {
                const inB = basketItems.includes(it.idx);
                return (
                  <button
                    key={it.idx}
                    onClick={() => {
                      sound.playDrop();
                      setBasketItems((prev) =>
                        prev.includes(it.idx)
                          ? prev.filter((i) => i !== it.idx)
                          : [...prev, it.idx]
                      );
                    }}
                    className={`p-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      inB
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-amber-200'
                    }`}
                  >
                    <span>{it.name}</span>
                    <span className="text-[11px] opacity-90">{it.final}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Discount Slicer Controls */}
        {interactiveType === 'discount_slicer' && (
          <div className="bg-emerald-50 p-2 rounded-2xl border border-emerald-200 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-emerald-900">Ubah Potongan:</span>
            {[
              { label: '1/4 (25%)', val: 1 },
              { label: '2/4 (50%)', val: 2 },
              { label: '3/4 (75%)', val: 3 },
            ].map((sl) => (
              <button
                key={sl.val}
                onClick={() => {
                  sound.playSlice();
                  setActiveSlice(sl.val);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeSlice === sl.val
                    ? 'bg-emerald-600 text-white shadow-sm scale-105'
                    : 'bg-white text-emerald-800 border border-emerald-200'
                }`}
              >
                {sl.label}
              </button>
            ))}
          </div>
        )}

        {/* 4. Shop Shelves Controls */}
        {interactiveType === 'shop_shelves' && (
          <div className="bg-amber-50 p-2 rounded-2xl border border-amber-200 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-amber-900">Pilih Barang Rak:</span>
            {[
              { label: 'Tas Sekolah (Diskon 50%)', idx: 0 },
              { label: 'Botol Minum (Diskon 25%)', idx: 1 },
              { label: 'Kotak Bekal (Diskon 10%)', idx: 2 },
            ].map((sh) => (
              <button
                key={sh.idx}
                onClick={() => {
                  sound.playClick();
                  setSelectedShelfItem(sh.idx);
                }}
                className={`px-2.5 py-1 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  selectedShelfItem === sh.idx
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-amber-900 border border-amber-200'
                }`}
              >
                {sh.label}
              </button>
            ))}
          </div>
        )}

        {/* 5. Art Kit Controls */}
        {interactiveType === 'art_kit' && (
          <div className="bg-purple-50 p-2 rounded-2xl border border-purple-200 flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-purple-900">Alat Siap: Karton & Krayon</span>
            <button
              onClick={() => {
                sound.playClick();
                setArtKitTapped((prev) => prev + 1);
              }}
              className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm"
            >
              Goyang Krayon 🎨
            </button>
          </div>
        )}

        {/* 6. Quiz Options and Feedback */}
        {interactiveType === 'quiz' && question && (
          <div className="bg-white p-2.5 rounded-2xl border-2 border-amber-300 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs sm:text-sm text-amber-900">
                {question.prompt}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowHint((prev) => !prev);
                }}
                className="text-xs px-2 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1 shrink-0"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Petunjuk</span>
              </button>
            </div>

            {showHint && (
              <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-xs text-amber-900 mb-2 animate-pop">
                💡 {question.hint}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOption(idx);
                      if (opt.isCorrect) {
                        sound.playSuccess();
                        if (onAnswerCorrect) onAnswerCorrect();
                      } else {
                        sound.playClick();
                      }
                    }}
                    className={`p-2 rounded-xl font-bold text-xs sm:text-sm text-left transition-all border-2 flex items-center justify-between ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-amber-200 text-amber-900 border-amber-400'
                        : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && opt.isCorrect && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div
                className={`mt-2 p-2 rounded-xl text-xs sm:text-sm font-semibold animate-pop ${
                  question.options[selectedOption].isCorrect
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {question.options[selectedOption].reason}
              </div>
            )}
          </div>
        )}

        {/* 7. Reflection Form */}
        {interactiveType === 'reflection' && (
          <div className="bg-white p-2.5 rounded-2xl border-2 border-emerald-300 shadow-sm">
            <div className="text-xs sm:text-sm font-bold text-emerald-900 mb-1.5 text-center">
              Pilih perasaanmu dan pelajaran terpenting hari ini:
            </div>

            {/* Mood selector */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {[
                { label: 'Senang', icon: Smile, col: 'bg-sky-100 text-sky-700' },
                { label: 'Semangat', icon: Star, col: 'bg-amber-100 text-amber-700' },
                { label: 'Paham', icon: Heart, col: 'bg-pink-100 text-pink-700' },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = selectedMood === m.label;
                return (
                  <button
                    key={m.label}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMood(m.label);
                      if (onReflectComplete) onReflectComplete(m.label, selectedReflection);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                      isSel
                        ? 'bg-emerald-500 text-white shadow-sm scale-105'
                        : `${m.col} hover:opacity-90`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Reflection options */}
            {reflectionOptions && reflectionOptions.length > 0 && (
              <div className="space-y-1">
                {reflectionOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playSuccess();
                      setSelectedReflection(opt);
                      if (onReflectComplete) onReflectComplete(selectedMood, opt);
                    }}
                    className={`w-full p-1.5 rounded-xl text-xs sm:text-sm font-medium text-left transition-all flex items-center justify-between ${
                      selectedReflection === opt
                        ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedReflection === opt && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
