import React from 'react';
import { ASSET_REGISTRY } from '../assets/p5/registry';
import { P5Canvas } from './P5Canvas';
import { sound } from '../lib/sound';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AssetGalleryProps {
  onBack: () => void;
}

export const AssetGallery: React.FC<AssetGalleryProps> = ({ onBack }) => {
  const assets = Object.values(ASSET_REGISTRY);

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 p-4 sm:p-6 select-text text-slate-800">
      {/* Header bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-fun font-bold text-slate-900">
            Galeri Pemeriksaan Aset p5.js (/galeri-aset)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Alat verifikasi guru: Menampilkan seluruh 13 ilustrasi prosedural 2D p5.js beserta daftar periksa unsur nyata materi (must_depict).
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-fun font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Aplikasi</span>
        </button>
      </div>

      {/* Grid of all 13 assets */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {assets.map((asset, index) => (
          <div
            key={asset.id}
            className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between"
          >
            <div>
              {/* Asset header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-600 font-bold">
                    Aset #{index + 1} · {asset.id}
                  </span>
                  <h2 className="text-lg sm:text-xl font-fun font-bold text-slate-900 mt-0.5">
                    {asset.name}
                  </h2>
                </div>
                <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold font-mono">
                  {asset.aspectRatio}
                </span>
              </div>

              {/* Purpose and Used On */}
              <div className="text-xs text-slate-600 mb-3 space-y-0.5">
                <div>
                  <strong>Tujuan:</strong> {asset.purpose}
                </div>
                <div>
                  <strong>Digunakan Pada:</strong> {asset.usedOn}
                </div>
              </div>

              {/* Live Canvas Box */}
              <div
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-2"
                style={{ height: '240px' }}
              >
                <P5Canvas
                  sketch={asset.sketch}
                  ariaLabel={asset.name}
                  aspectRatio={asset.aspectRatio}
                  className="w-full h-full"
                  extraProps={{
                    value: 0.5,
                    itemsInBasket: [0, 2],
                    slices: 4,
                    activeSlice: 2,
                    selectedItem: 0,
                  }}
                />
              </div>

              {/* Must Depict Checklist */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                  Unsur Wajib Materi (must_depict):
                </div>
                <ul className="space-y-1.5">
                  {asset.mustDepict.map((depict, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{depict}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
