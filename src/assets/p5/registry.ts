import { P5SketchFn } from '../../components/P5Canvas';
import {
  drawCoverDiscountShop,
  drawBgMarketNumbers,
  drawBgBudgetPlan,
  drawBgShopPosterStudio,
  drawBgThriftExhibition,
  drawTechNumberLineSlider,
  drawEngBudgetBasket,
  drawArtPosterKit,
  drawMathDiscountSlicer,
  drawSimShopShelfItems,
  drawBadgeNumberExplorer,
  drawBadgeWiseShopper,
  drawBadgeBudgetChampion,
} from './assets';

export interface AssetMeta {
  id: string;
  name: string;
  purpose: string;
  usedOn: string;
  aspectRatio: string;
  mustDepict: string[];
  sketch: P5SketchFn;
}

export const ASSET_REGISTRY: Record<string, AssetMeta> = {
  draw_cover_discount_shop: {
    id: 'draw_cover_discount_shop',
    name: 'Sampul Toko Diskon Si Cermat',
    purpose: 'Gambar sampul halaman utama aplikasi Toko Diskon Si Cermat',
    usedOn: 'Layar sampul aplikasi',
    aspectRatio: '16/9',
    mustDepict: [
      'tenda toko kelontong lokal',
      'label diskon terbagi empat bagian',
      'batang garis bilangan di depan toko',
      'keranjang belanja berisi buah',
    ],
    sketch: drawCoverDiscountShop,
  },
  draw_bg_market_numbers: {
    id: 'draw_bg_market_numbers',
    name: 'Latar Rahasia Angka di Pasar',
    purpose: 'Latar pertemuan 1 tentang rahasia angka di pasar tradisional',
    usedOn: 'Pertemuan 1: Rahasia Angka di Pasar',
    aspectRatio: '16/9',
    mustDepict: [
      'kios pasar tradisional',
      'timbangan buah bulat',
      'kue bundar terpotong pecahan',
      'papan garis bilangan kayu',
    ],
    sketch: drawBgMarketNumbers,
  },
  draw_bg_budget_plan: {
    id: 'draw_bg_budget_plan',
    name: 'Latar Rencana Belanja Bijak',
    purpose: 'Latar pertemuan 2 untuk merencanakan belanja bijak sesuai anggaran',
    usedOn: 'Pertemuan 2: Rencana Belanja Bijak',
    aspectRatio: '16/9',
    mustDepict: [
      'meja kayu ruang belajar',
      'celengan berbentuk koin besar',
      'kertas daftar belanja bergaris',
      'dompet lipat sederhana',
    ],
    sketch: drawBgBudgetPlan,
  },
  draw_bg_shop_poster_studio: {
    id: 'draw_bg_shop_poster_studio',
    name: 'Latar Studio Uji Toko dan Poster',
    purpose: 'Latar pertemuan 3 untuk uji toko diskon dan area membuat poster',
    usedOn: 'Pertemuan 3: Uji Toko dan Buat Poster',
    aspectRatio: '16/9',
    mustDepict: [
      'rak barang toko',
      'karton poster kosong di penyangga',
      'kotak krayon warna-warni',
      'label potongan harga tergantung',
    ],
    sketch: drawBgShopPosterStudio,
  },
  draw_bg_thrift_exhibition: {
    id: 'draw_bg_thrift_exhibition',
    name: 'Latar Pameran Belanja Hemat',
    purpose: 'Latar pertemuan 4 untuk pameran daftar belanja hemat',
    usedOn: 'Pertemuan 4: Pameran Belanja Hemat',
    aspectRatio: '16/9',
    mustDepict: [
      'papan pameran daftar belanja',
      'bendera segitiga hiasan kelas',
      'meja pajangan hasil karya',
      'lencana bintang penghargaan',
    ],
    sketch: drawBgThriftExhibition,
  },
  draw_tech_number_line_slider: {
    id: 'draw_tech_number_line_slider',
    name: 'Alat Garis Bilangan Geser',
    purpose: 'Alat simulasi Teknologi menggeser titik pada garis bilangan untuk melihat pecahan, desimal, dan persen',
    usedOn: 'Pertemuan 1 dan Simulasi Garis Bilangan',
    aspectRatio: '16/9',
    mustDepict: [
      'batang garis bilangan sepuluh ruas',
      'tombol geser bulat',
      'lingkaran pecahan yang terisi sesuai posisi',
      'kotak seratus petak persen',
    ],
    sketch: drawTechNumberLineSlider,
  },
  draw_eng_budget_basket: {
    id: 'draw_eng_budget_basket',
    name: 'Simulasi Keranjang Anggaran',
    purpose: 'Objek Rekayasa untuk merancang daftar belanja hemat sesuai batas anggaran',
    usedOn: 'Pertemuan 2 dan Simulasi Anggaran Belanja',
    aspectRatio: '4/3',
    mustDepict: [
      'keranjang belanja anyaman',
      'bar pengukur batas anggaran',
      'buku tulis dan pensil sebagai barang kebutuhan',
      'label diskon pecahan pada barang',
    ],
    sketch: drawEngBudgetBasket,
  },
  draw_art_poster_kit: {
    id: 'draw_art_poster_kit',
    name: 'Panduan Poster Diskon',
    purpose: 'Objek Seni berupa panduan alat karton dan krayon untuk membuat poster diskon',
    usedOn: 'Pertemuan 3: Tugas Proyek Poster Diskon',
    aspectRatio: '4/3',
    mustDepict: [
      'lembar karton lebar',
      'tiga batang krayon gemuk',
      'gunting ujung bulat',
      'bentuk dekorasi potongan lingkaran dan bintang',
    ],
    sketch: drawArtPosterKit,
  },
  draw_math_discount_slicer: {
    id: 'draw_math_discount_slicer',
    name: 'Pemotong Diskon Matematika',
    purpose: 'Simulasi Matematika untuk membandingkan pecahan, desimal, persen, dan memotong harga diskon',
    usedOn: 'Pertemuan 1, 2, dan 3 pada Simulasi Toko Diskon',
    aspectRatio: '4/3',
    mustDepict: [
      'label harga utuh berbentuk batang',
      'pemotong diskon menjadi empat atau sepuluh bagian',
      'bagian potongan harga yang berwarna beda',
      'kotak barang kebutuhan sehari-hari',
    ],
    sketch: drawMathDiscountSlicer,
  },
  draw_sim_shop_shelf_items: {
    id: 'draw_sim_shop_shelf_items',
    name: 'Rak Belanja Si Cermat',
    purpose: 'Rak barang interaktif di Toko Diskon tempat anak memilih barang untuk dihitung harga akhirnya',
    usedOn: 'Simulasi Toko Diskon Si Cermat',
    aspectRatio: '4/3',
    mustDepict: [
      'tas sekolah',
      'botol minum',
      'kotak bekal',
      'label lingkaran diskon seperempat dan setengah',
    ],
    sketch: drawSimShopShelfItems,
  },
  draw_badge_number_explorer: {
    id: 'draw_badge_number_explorer',
    name: 'Lencana Penjelajah Angka',
    purpose: 'Lencana hadiah setelah berhasil mengubah dan membandingkan pecahan, desimal, dan persen',
    usedOn: 'Layar pencapaian misi dan kuis',
    aspectRatio: '1/1',
    mustDepict: [
      'medali lingkaran bergerigi',
      'lingkaran pecahan tiga perempat',
      'batang desimal sepuluh bagian',
      'pita medali kembar',
    ],
    sketch: drawBadgeNumberExplorer,
  },
  draw_badge_wise_shopper: {
    id: 'draw_badge_wise_shopper',
    name: 'Lencana Pembelanja Cermat',
    purpose: 'Lencana hadiah setelah berhasil menghitung diskon dengan tepat di toko',
    usedOn: 'Layar pencapaian misi dan kuis',
    aspectRatio: '1/1',
    mustDepict: [
      'medali perisai bulat',
      'keranjang belanja kecil',
      'label diskon terpotong',
      'bintang sudut medali',
    ],
    sketch: drawBadgeWiseShopper,
  },
  draw_badge_budget_champion: {
    id: 'draw_badge_budget_champion',
    name: 'Lencana Juara Anggaran',
    purpose: 'Lencana hadiah utama setelah menyelesaikan proyek daftar belanja hemat dan poster diskon',
    usedOn: 'Pertemuan 4 dan Layar Tamat Misi',
    aspectRatio: '1/1',
    mustDepict: [
      'piala bulat berpegangan',
      'kertas daftar belanja tercentang',
      'koin emas hemat',
      'mahkota daun di atas piala',
    ],
    sketch: drawBadgeBudgetChampion,
  },
};
