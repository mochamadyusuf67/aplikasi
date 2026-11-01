import React, { useState } from 'react';
import { UserProgress } from '../types';
import { sound } from '../lib/sound';
import { HelpCircle, X, RotateCcw, Image, CheckCircle, Award, Star } from 'lucide-react';

interface ParentsGuideModalProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onOpenAssetGallery: () => void;
  onClose: () => void;
}

export const ParentsGuideModal: React.FC<ParentsGuideModalProps> = ({
  progress,
  onResetProgress,
  onOpenAssetGallery,
  onClose,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const completedCount = Object.keys(progress.completedMissions).length;
  const badgesEarnedCount = Object.keys(progress.earnedBadges).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-purple-300 shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden animate-pop">
        {/* Header */}
        <div className="p-4 bg-purple-100 border-b-2 border-purple-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-700" />
            <h2 className="text-xl sm:text-2xl font-fun font-bold text-purple-950">
              Panduan Guru & Orang Tua
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-purple-200 hover:bg-purple-300 text-purple-900 transition-all"
            aria-label="Tutup Panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-slate-800 text-sm sm:text-base">
          {/* Progress Overview Card */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <h3 className="font-fun font-bold text-purple-900 text-base mb-2">
              Progres Belajar Siswa di Perangkat Ini
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-white rounded-xl border border-purple-100 shadow-xs">
                <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
                  <Star className="w-5 h-5 fill-amber-400" />
                  <span>{progress.totalStars}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">Bintang Dikumpulkan</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-purple-100 shadow-xs">
                <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span>{completedCount}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">Misi Dituntaskan</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-purple-100 shadow-xs">
                <div className="flex items-center justify-center gap-1 text-purple-600 font-bold text-lg">
                  <Award className="w-5 h-5" />
                  <span>{badgesEarnedCount} / 3</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">Lencana Diraih</div>
              </div>
            </div>
          </div>

          {/* Kurikulum Merdeka Alignment */}
          <div className="space-y-2">
            <h3 className="font-fun font-bold text-slate-900 text-base">
              Kesesuaian Kurikulum Merdeka (Fase C - Kelas 5 SD)
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
              <li>
                <strong>Capaian Pembelajaran:</strong> Menghubungkan pecahan, desimal, dan persen lewat konteks belanja dan potongan harga di kehidupan nyata.
              </li>
              <li>
                <strong>Pemberdayaan Berpikir Kritis:</strong> Mengatasi miskonsepsi umum (misal: 0,5 sering disangka lebih kecil dari 0,25) melalui representasi visual petak 100 dan garis bilangan.
              </li>
              <li>
                <strong>Integrasi STEAM:</strong> Sains/Rekayasa mengelola anggaran Rp50.000, Seni membuat poster diskon karton di luar aplikasi, dan Matematika menghitung diskon.
              </li>
              <li>
                <strong>Pendidikan Konsumsi Bijak:</strong> Menghindari perilaku konsumtif dan melatih anak membeli kebutuhan, bukan keinginan semata.
              </li>
            </ul>
          </div>

          {/* 4 Pertemuan Breakdown */}
          <div className="space-y-2">
            <h3 className="font-fun font-bold text-slate-900 text-base">
              Alur 4 Pertemuan Pembelajaran (70 Menit / Pertemuan)
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-sky-800">Pertemuan 1: Rahasia Angka di Pasar</span>
                <p className="text-slate-600 mt-0.5">
                  Menggeser garis bilangan, mengamati 1/2 = 0,5 = 50%, dan membandingkan desimal.
                </p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-800">Pertemuan 2: Rencana Belanja Bijak</span>
                <p className="text-slate-600 mt-0.5">
                  Menghitung diskon 10%, 25%, 50% dan merancang daftar belanja hemat batas Rp50.000.
                </p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-800">Pertemuan 3: Uji Toko dan Buat Poster</span>
                <p className="text-slate-600 mt-0.5">
                  Menguji simulasi rak toko dan panduan berkarya poster karton menggunakan krayon.
                </p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-purple-800">Pertemuan 4: Pameran Belanja Hemat</span>
                <p className="text-slate-600 mt-0.5">
                  Pameran poster kelas, kuis studi kasus akhir, dan refleksi bijak berbelanja.
                </p>
              </div>
            </div>
          </div>

          {/* Teacher Tool & Privacy */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <h3 className="font-fun font-bold text-slate-900 text-base">
              Alat Verifikasi Guru & Keamanan Data
            </h3>
            <p className="text-xs text-slate-600">
              Aplikasi ini 100% statis tanpa akun, tanpa pelacak (tracking), dan tanpa server. Data progres tersimpan lokal di browser perangkat anak.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenAssetGallery();
                }}
                className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Image className="w-4 h-4" />
                <span>Buka Galeri 13 Aset p5.js (/galeri-aset)</span>
              </button>

              <button
                onClick={() => setShowConfirmReset(true)}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Progres Belajar</span>
              </button>
            </div>

            {showConfirmReset && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl animate-pop mt-2">
                <p className="text-xs text-red-800 font-bold mb-2">
                  Apakah Anda yakin ingin mengulang seluruh misi dari awal?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onResetProgress();
                      setShowConfirmReset(false);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
                  >
                    Ya, Reset
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-purple-50 border-t border-purple-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-fun font-bold text-base shadow-sm"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
