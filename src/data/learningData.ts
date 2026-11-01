import { Meeting } from '../types';

export const MEETINGS_DATA: Meeting[] = [
  // PERTEMUAN 1: Rahasia Angka di Pasar
  {
    id: 1,
    title: 'Rahasia Angka di Pasar',
    theme: 'Mengenal Masalah',
    bgAssetId: 'draw_bg_market_numbers',
    badgeId: 'badge_number_explorer',
    badgeTitle: 'Penjelajah Angka',
    missions: [
      {
        id: 'm1_intro',
        title: 'Cerita Pasar Tradisional',
        type: 'math',
        stars: 1,
        screens: [
          {
            id: 'm1_s1',
            title: 'Toko Si Cermat',
            text: 'Warga bingung melihat papan diskon. Ada tulisan 1/2, 0,5, dan 50%!',
            assetId: 'draw_bg_market_numbers',
            interactiveType: 'none',
          },
          {
            id: 'm1_s2',
            title: 'Tebak Nilai Potongan',
            text: 'Apakah 1/2, 0,5, dan 50% nilainya sama? Ayo kita buktikan bersama!',
            assetId: 'draw_math_discount_slicer',
            interactiveType: 'discount_slicer',
          },
        ],
      },
      {
        id: 'm1_tech',
        title: 'Garis Bilangan Tiga Bentuk',
        type: 'tech',
        stars: 1,
        screens: [
          {
            id: 'm1_tech_s1',
            title: 'Geser Titik Bilangan',
            text: 'Geser titik pada garis bilangan. Perhatikan perubahan pecahan, desimal, dan persen!',
            assetId: 'draw_tech_number_line_slider',
            interactiveType: 'tech_slider',
          },
          {
            id: 'm1_tech_s2',
            title: 'Uji Pecahan Setengah',
            text: 'Tepat di tengah nilainya 1/2. Itu sama dengan 0,5 dan 50%!',
            assetId: 'draw_tech_number_line_slider',
            interactiveType: 'tech_slider',
          },
        ],
      },
      {
        id: 'm1_compare',
        title: 'Bandingkan Nilai Desimal',
        type: 'math',
        stars: 1,
        screens: [
          {
            id: 'm1_cmp_s1',
            title: 'Jangan Terkecoh Angka',
            text: 'Manakah yang lebih besar, 0,5 atau 0,25? Ingat, 0,5 itu sama dengan 0,50!',
            assetId: 'draw_tech_number_line_slider',
            interactiveType: 'tech_slider',
          },
          {
            id: 'm1_cmp_s2',
            title: 'Kuis Dua Desimal',
            text: 'Pilihlah jawaban yang benar. Perhatikan jumlah petak seratusnya!',
            assetId: 'draw_math_discount_slicer',
            interactiveType: 'quiz',
            question: {
              id: 'q1_1',
              prompt: 'Mana yang lebih besar, 0,5 atau 0,25?',
              hint: '0,5 berarti 50 petak dari 100, sedangkan 0,25 hanya 25 petak.',
              options: [
                {
                  label: '0,5 lebih besar',
                  isCorrect: true,
                  reason: 'Benar! 0,5 sama dengan 50/100, lebih banyak dari 25/100.',
                },
                {
                  label: '0,25 lebih besar',
                  isCorrect: false,
                  reason: 'Belum tepat. Angka 25 tampak banyak, tetapi nilainya hanya 25/100.',
                },
                {
                  label: 'Keduanya sama besar',
                  isCorrect: false,
                  reason: 'Belum tepat. 50 petak tentu lebih banyak dari 25 petak.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'm1_quiz_reflect',
        title: 'Refleksi Pertemuan Pertama',
        type: 'reflection',
        stars: 1,
        screens: [
          {
            id: 'm1_q2',
            title: 'Ubah Pecahan ke Persen',
            text: 'Pecahan 1/4 nilainya sama dengan berapa persen? Ingat 1 perempat dari 100.',
            assetId: 'draw_math_discount_slicer',
            interactiveType: 'quiz',
            question: {
              id: 'q1_2',
              prompt: 'Berapakah nilai 1/4 jika diubah ke persen?',
              hint: 'Bagi 100 menjadi 4 bagian yang sama besar.',
              options: [
                {
                  label: '25%',
                  isCorrect: true,
                  reason: 'Hebat! 100 dibagi 4 adalah 25, jadi 1/4 = 25%.',
                },
                {
                  label: '14%',
                  isCorrect: false,
                  reason: 'Bukan, jangan hanya mengambil angka 1 dan 4.',
                },
                {
                  label: '40%',
                  isCorrect: false,
                  reason: 'Belum tepat. 1/4 dari 100 adalah 25.',
                },
              ],
            },
          },
          {
            id: 'm1_ref',
            title: 'Bagaimana Perasaanmu?',
            text: 'Pilih ekspresi dan satu pelajaran penting yang kamu temukan hari ini.',
            assetId: 'draw_badge_number_explorer',
            interactiveType: 'reflection',
            reflectionOptions: [
              '1/2, 0,5, dan 50% itu nilainya sama.',
              '0,5 lebih besar daripada 0,25.',
              'Pecahan 1/4 sama nilainya dengan 25%.',
            ],
          },
        ],
      },
    ],
  },

  // PERTEMUAN 2: Rencana Belanja Bijak
  {
    id: 2,
    title: 'Rencana Belanja Bijak',
    theme: 'Menyelidiki dan Merancang',
    bgAssetId: 'draw_bg_budget_plan',
    badgeId: 'badge_wise_shopper',
    badgeTitle: 'Pembelanja Cermat',
    missions: [
      {
        id: 'm2_calc_discount',
        title: 'Hitung Potongan Diskon',
        type: 'math',
        stars: 1,
        screens: [
          {
            id: 'm2_s1',
            title: 'Tantangan Belanja Keluarga',
            text: 'Kamu punya anggaran Rp50.000. Belilah barang kebutuhan dengan bijak tanpa boros!',
            assetId: 'draw_bg_budget_plan',
            interactiveType: 'none',
          },
          {
            id: 'm2_s2',
            title: 'Potong Harga Barang',
            text: 'Buku seharga Rp20.000 mendapat diskon 50%. Berapakah potongan harganya?',
            assetId: 'draw_math_discount_slicer',
            interactiveType: 'discount_slicer',
          },
          {
            id: 'm2_s3',
            title: 'Kuis Diskon Buku',
            text: 'Berapa rupiah yang harus dibayar untuk buku berdiskon 50% tersebut?',
            assetId: 'draw_math_discount_slicer',
            interactiveType: 'quiz',
            question: {
              id: 'q2_1',
              prompt: 'Harga buku Rp20.000 diskon 50%. Berapa harga yang harus dibayar?',
              hint: 'Diskon 50% sama dengan setengah harga asli.',
              options: [
                {
                  label: 'Rp10.000',
                  isCorrect: true,
                  reason: 'Tepat sekali! Setengah dari Rp20.000 adalah Rp10.000.',
                },
                {
                  label: 'Rp15.000',
                  isCorrect: false,
                  reason: 'Belum tepat. Diskon 50% memotong setengah harga utuh.',
                },
                {
                  label: 'Rp5.000',
                  isCorrect: false,
                  reason: 'Itu diskon 75%. Diskon 50% artinya membayar Rp10.000.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'm2_order_pct',
        title: 'Urutkan Persen Diskon',
        type: 'tech',
        stars: 1,
        screens: [
          {
            id: 'm2_ord_s1',
            title: 'Garis Bilangan Diskon',
            text: 'Geser titik untuk mengurutkan diskon 10%, 25%, dan 50% di garis bilangan.',
            assetId: 'draw_tech_number_line_slider',
            interactiveType: 'tech_slider',
          },
          {
            id: 'm2_ord_s2',
            title: 'Kuis Urutan Diskon',
            text: 'Manakah urutan diskon dari yang terkecil sampai terbesar?',
            assetId: 'draw_tech_number_line_slider',
            interactiveType: 'quiz',
            question: {
              id: 'q2_2',
              prompt: 'Urutkan potongan harga dari terkecil hingga terbesar:',
              hint: 'Bandingkan 10%, 25%, dan 50%.',
              options: [
                {
                  label: '10%, lalu 25%, lalu 50%',
                  isCorrect: true,
                  reason: 'Luar biasa! 10% adalah yang terkecil dan 50% yang terbesar.',
                },
                {
                  label: '50%, lalu 25%, lalu 10%',
                  isCorrect: false,
                  reason: 'Itu urutan dari terbesar ke terkecil.',
                },
                {
                  label: '25%, lalu 10%, lalu 50%',
                  isCorrect: false,
                  reason: '10% lebih kecil daripada 25%.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'm2_eng_budget',
        title: 'Rancang Keranjang Belanja',
        type: 'eng',
        stars: 1,
        screens: [
          {
            id: 'm2_eng_s1',
            title: 'Pilih Barang Belanja',
            text: 'Pilihlah barang kebutuhan pokok. Pastikan total belanja tidak melebihi Rp50.000!',
            assetId: 'draw_eng_budget_basket',
            interactiveType: 'budget_basket',
          },
          {
            id: 'm2_eng_s2',
            title: 'Periksa Pengukur Anggaran',
            text: 'Jika warna meteran berubah merah, kurangi barang agar uangmu mencukupi.',
            assetId: 'draw_eng_budget_basket',
            interactiveType: 'budget_basket',
          },
        ],
      },
      {
        id: 'm2_ref',
        title: 'Refleksi Anggaran Hemat',
        type: 'reflection',
        stars: 1,
        screens: [
          {
            id: 'm2_ref_s1',
            title: 'Alasan Belanja Bijak',
            text: 'Ceritakan perasaanmu saat berhasil menyusun belanja hemat sesuai anggaran.',
            assetId: 'draw_badge_wise_shopper',
            interactiveType: 'reflection',
            reflectionOptions: [
              'Membeli kebutuhan saja, tidak berlebihan.',
              'Menghitung harga diskon sebelum membayar.',
              'Menjaga total belanja di bawah anggaran.',
            ],
          },
        ],
      },
    ],
  },

  // PERTEMUAN 3: Uji Toko dan Buat Poster
  {
    id: 3,
    title: 'Uji Toko dan Poster',
    theme: 'Membuat dan Menguji',
    bgAssetId: 'draw_bg_shop_poster_studio',
    badgeId: 'badge_wise_shopper',
    badgeTitle: 'Uji Cermat',
    missions: [
      {
        id: 'm3_sim_shop',
        title: 'Simulasi Rak Toko Diskon',
        type: 'math',
        stars: 1,
        screens: [
          {
            id: 'm3_sim_s1',
            title: 'Uji Harga di Rak',
            text: 'Sentuh barang di rak toko. Periksa potongan diskon dan harga akhirnya!',
            assetId: 'draw_sim_shop_shelf_items',
            interactiveType: 'shop_shelves',
          },
          {
            id: 'm3_sim_s2',
            title: 'Tas Sekolah Diskon',
            text: 'Tas sekolah Rp60.000 diskon 1/2. Harga akhirnya menjadi Rp30.000!',
            assetId: 'draw_sim_shop_shelf_items',
            interactiveType: 'shop_shelves',
          },
        ],
      },
      {
        id: 'm3_art_guide',
        title: 'Panduan Poster Diskon',
        type: 'art',
        stars: 1,
        screens: [
          {
            id: 'm3_art_s1',
            title: 'Siapkan Karton dan Krayon',
            text: 'Siapkan karton dan krayon di mejamu. Sentuh krayon untuk melihat warnanya!',
            assetId: 'draw_art_poster_kit',
            interactiveType: 'art_kit',
          },
          {
            id: 'm3_art_s2',
            title: 'Tiga Bagian Poster',
            text: 'Tulis nama barang, gambar pecahan diskon, dan tulis harga hematnya di karton.',
            assetId: 'draw_art_poster_kit',
            interactiveType: 'art_kit',
          },
        ],
      },
      {
        id: 'm3_art_check',
        title: 'Ceklis Karya Nyata',
        type: 'art',
        stars: 1,
        screens: [
          {
            id: 'm3_chk_s1',
            title: 'Kerjakan di Mejamu',
            text: 'Gambarlah poster diskon di karton bersama temanmu dengan ceria!',
            assetId: 'draw_bg_shop_poster_studio',
            interactiveType: 'none',
          },
          {
            id: 'm3_chk_s2',
            title: 'Refleksi Poster Keren',
            text: 'Bagaimana perasaanmu setelah menyelesaikan poster diskon di karton?',
            assetId: 'draw_bg_shop_poster_studio',
            interactiveType: 'reflection',
            reflectionOptions: [
              'Bangga poster karton buatan saya rapi.',
              'Pecahan dan persen diskon tertulis jelas.',
              'Senang menggambar bersama teman sekelas.',
            ],
          },
        ],
      },
    ],
  },

  // PERTEMUAN 4: Pameran Belanja Hemat
  {
    id: 4,
    title: 'Pameran Belanja Hemat',
    theme: 'Membagikan dan Merayakan',
    bgAssetId: 'draw_bg_thrift_exhibition',
    badgeId: 'badge_budget_champion',
    badgeTitle: 'Juara Anggaran',
    missions: [
      {
        id: 'm4_exhibit',
        title: 'Pameran Karya Kelas',
        type: 'art',
        stars: 1,
        screens: [
          {
            id: 'm4_ex_s1',
            title: 'Pajang Postermu di Meja',
            text: 'Letakkan poster kartonmu di meja. Amati karya temanmu dengan sopan!',
            assetId: 'draw_bg_thrift_exhibition',
            interactiveType: 'none',
          },
          {
            id: 'm4_ex_s2',
            title: 'Pertanyaan Presentasi',
            text: 'Jelaskan mengapa kamu memilih barang itu dan cara menghitung potongan harganya.',
            assetId: 'draw_bg_thrift_exhibition',
            interactiveType: 'none',
          },
        ],
      },
      {
        id: 'm4_final_quiz',
        title: 'Tantangan Lencana Akhir',
        type: 'quiz',
        stars: 2,
        screens: [
          {
            id: 'm4_q1',
            title: 'Tantangan Belanja Cermat',
            text: 'Sepatu Rp100.000 diskon 25%. Berapakah potongan harganya dalam rupiah?',
            assetId: 'draw_math_discount_slicer',
            interactiveType: 'quiz',
            question: {
              id: 'q4_1',
              prompt: 'Diskon 25% dari Rp100.000 adalah berapa rupiah?',
              hint: '25% sama dengan 1/4 bagian dari Rp100.000.',
              options: [
                {
                  label: 'Rp25.000',
                  isCorrect: true,
                  reason: 'Hebat! 25% dari 100.000 adalah tepat Rp25.000.',
                },
                {
                  label: 'Rp2.500',
                  isCorrect: false,
                  reason: 'Belum tepat, jangan kekurangan angka nol.',
                },
                {
                  label: 'Rp50.000',
                  isCorrect: false,
                  reason: 'Itu potongan 50%, bukan 25%.',
                },
              ],
            },
          },
          {
            id: 'm4_q2',
            title: 'Tantangan Nilai Desimal',
            text: 'Bentuk desimal dari potongan 25% adalah angka berapa?',
            assetId: 'draw_tech_number_line_slider',
            interactiveType: 'quiz',
            question: {
              id: 'q4_2',
              prompt: '25% jika diubah menjadi bentuk desimal adalah:',
              hint: '25 per seratus berarti ada 2 angka di belakang koma.',
              options: [
                {
                  label: '0,25',
                  isCorrect: true,
                  reason: 'Pintar! 25/100 sama dengan 0,25.',
                },
                {
                  label: '2,5',
                  isCorrect: false,
                  reason: '2,5 nilainya 250%, bukan 25%.',
                },
                {
                  label: '0,025',
                  isCorrect: false,
                  reason: 'Itu 2,5 per seratus.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'm4_final_celebrate',
        title: 'Penghargaan Juara Anggaran',
        type: 'reflection',
        stars: 2,
        screens: [
          {
            id: 'm4_cel_s1',
            title: 'Selamat Juara Anggaran!',
            text: 'Kamu berhasil menyelesaikan semua misi dan menjadi pembelanja bijak!',
            assetId: 'draw_badge_budget_champion',
            interactiveType: 'none',
          },
          {
            id: 'm4_cel_s2',
            title: 'Refleksi Akhir Proyek',
            text: 'Pilihlah satu pesan terpenting yang akan kamu ingat saat berbelanja.',
            assetId: 'draw_badge_budget_champion',
            interactiveType: 'reflection',
            reflectionOptions: [
              'Belanja sesuai kebutuhan dan hemat uang.',
              'Selalu periksa pecahan, desimal, dan persen diskon.',
              'Diskon besar belum tentu barang yang kita perlukan.',
            ],
          },
        ],
      },
    ],
  },
];

export const GLOSSARY_ITEMS = [
  {
    term: 'Pecahan',
    symbol: '1/2, 1/4',
    meaning: 'Bagian dari suatu benda utuh yang dibagi sama besar. Contohnya 1 dari 4 potong kue.',
    tip: '1/2 artinya satu potong dari dua bagian sama banyak.',
  },
  {
    term: 'Desimal',
    symbol: '0,5 atau 0,25',
    meaning: 'Bentuk bilangan pecahan yang ditulis menggunakan tanda koma berdasarkan persepuluh atau perseratus.',
    tip: '0,5 nilainya sama dengan 0,50 (50 petak dari 100).',
  },
  {
    term: 'Persen (%)',
    symbol: '50%, 25%',
    meaning: 'Perseratus. Tanda % artinya berapa bagian dari seratus.',
    tip: '50% artinya 50 dari 100, atau persis setengah.',
  },
  {
    term: 'Diskon',
    symbol: 'Potongan Harga',
    meaning: 'Pengurangan harga asli barang sehingga pembeli membayar lebih murah.',
    tip: 'Diskon 50% membuat harga menjadi setengahnya saja!',
  },
  {
    term: 'Anggaran',
    symbol: 'Batas Belanja',
    meaning: 'Jumlah uang yang disiapkan sebelum berbelanja agar kita tidak boros.',
    tip: 'Belilah yang paling penting terlebih dahulu.',
  },
];

export const FUN_FACTS = [
  {
    title: 'Arti Kata Persen',
    text: 'Kata persen berasal dari bahasa Latin "per centum", yang artinya "untuk setiap seratus"!',
  },
  {
    title: 'Diskon di Pasar',
    text: 'Banyak pedagang menulis "setengah harga", itu persis sama dengan diskon 50% atau potongan 1/2.',
  },
  {
    title: 'Trik Angka Desimal',
    text: '0,5 itu lebih besar daripada 0,25. Bayangkan 50 uang logam seratusan melawan 25 uang logam!',
  },
  {
    title: 'Belanja Pintar',
    text: 'Membeli barang diskon yang sebenarnya tidak kita butuhkan tetaplah membuat uang kita terbuang.',
  },
];

export const BADGES_INFO = [
  {
    id: 'badge_number_explorer',
    title: 'Penjelajah Angka',
    desc: 'Berhasil menghubungkan pecahan 1/2, desimal 0,5, dan 50% pada garis bilangan.',
    assetId: 'draw_badge_number_explorer',
  },
  {
    id: 'badge_wise_shopper',
    title: 'Pembelanja Cermat',
    desc: 'Mampu menghitung harga diskon dan menyusun belanja hemat sesuai anggaran Rp50.000.',
    assetId: 'draw_badge_wise_shopper',
  },
  {
    id: 'badge_budget_champion',
    title: 'Juara Anggaran',
    desc: 'Menuntaskan semua tantangan studi kasus belanja dan pameran poster diskon kelas.',
    assetId: 'draw_badge_budget_champion',
  },
];
