import p5 from 'p5';
import { cute } from '../../lib/cuteKit.js';

// Setup helper for consistent canvas sizing
function setupCanvas(p: p5, container: HTMLElement) {
  const w = Math.max(container.clientWidth || 360, 240);
  const h = Math.max(container.clientHeight || 200, 160);
  p.createCanvas(w, h);
  p.pixelDensity(Math.min(p.displayDensity(), 2));
  p.frameRate(30);
}

function handleResize(p: p5, container: HTMLElement) {
  const w = Math.max(container.clientWidth || 360, 240);
  const h = Math.max(container.clientHeight || 200, 160);
  p.resizeCanvas(w, h);
}

// 1. draw_cover_discount_shop
export const drawCoverDiscountShop = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.04;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(247, 250, 255);

    // Soft hills in background
    p.noStroke();
    p.fill(225, 245, 230);
    p.ellipse(w * 0.3, h * 0.95, w * 0.9, h * 0.6);
    p.fill(210, 238, 252);
    p.ellipse(w * 0.8, h * 0.98, w * 0.8, h * 0.5);

    // Tenda Toko Kelontong
    const stallX = w * 0.5;
    const stallY = h * 0.48;
    const stallW = s * 0.92;
    const stallH = s * 0.65;

    // Soft shadow under shop
    cute.shadow(p, stallX, stallY + stallH * 0.45, stallW * 0.95);

    // Wooden stall frame
    cute.body(p, '#ebd7b5', s, () => {
      p.rect(stallX - stallW * 0.42, stallY - stallH * 0.1, stallW * 0.84, stallH * 0.52, s * 0.04);
    });

    // Awning stripes (tenda belang #2ba3f5 dan #ffc83d)
    const bob = Math.sin(t * 1.5) * 4;
    const awningY = stallY - stallH * 0.28 + bob;
    const stripes = 6;
    const segW = stallW * 0.88 / stripes;

    for (let i = 0; i < stripes; i++) {
      const col = i % 2 === 0 ? '#2ba3f5' : '#ffc83d';
      cute.body(p, col, s, () => {
        p.rect(stallX - stallW * 0.44 + i * segW, awningY, segW, stallH * 0.28, 0, 0, s * 0.03, s * 0.03);
      });
    }

    // Toko sign / banner
    cute.body(p, '#ffffff', s, () => {
      p.rect(stallX - stallW * 0.32, stallY - stallH * 0.04, stallW * 0.64, stallH * 0.16, s * 0.02);
    });
    p.fill(30, 80, 150);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.075);
    p.textStyle(p.BOLD);
    p.text('TOKO SI CERMAT', stallX, stallY + stallH * 0.04);

    // Label diskon terbagi 4 bagian (hanging discount tag)
    const tagX = stallX + stallW * 0.3;
    const tagY = stallY + stallH * 0.18;
    const tagR = s * 0.16;
    p.push();
    p.translate(tagX, tagY);
    p.rotate(Math.sin(t * 2) * 0.1);
    cute.shadow(p, 0, tagR * 0.7, tagR * 1.2);
    cute.body(p, '#ffffff', s, () => {
      p.ellipse(0, 0, tagR, tagR);
    });
    // 4 slices
    p.noStroke();
    for (let a = 0; a < 4; a++) {
      p.fill(a === 0 ? '#ffc83d' : '#e2e8f0');
      p.arc(0, 0, tagR * 0.82, tagR * 0.82, a * p.HALF_PI, (a + 1) * p.HALF_PI, p.PIE);
    }
    p.fill(20, 30, 50);
    p.textSize(s * 0.05);
    p.text('1/4', 0, 0);
    cute.sparkle(p, tagR * 0.45, -tagR * 0.4, s * 0.04, t);
    p.pop();

    // Keranjang belanja berisi buah hijau #5bcb7a
    const bX = stallX - stallW * 0.28;
    const bY = stallY + stallH * 0.22;
    cute.shadow(p, bX, bY + s * 0.1, s * 0.26);
    // basket
    cute.body(p, '#5bcb7a', s, () => {
      p.beginShape();
      p.vertex(bX - s * 0.12, bY);
      p.vertex(bX + s * 0.12, bY);
      p.vertex(bX + s * 0.09, bY + s * 0.1);
      p.vertex(bX - s * 0.09, bY + s * 0.1);
      p.endShape(p.CLOSE);
      // handle
      p.noFill();
      p.arc(bX, bY, s * 0.16, s * 0.12, p.PI, p.TWO_PI);
    });
    // fruit ellipses in basket
    cute.body(p, '#2ba3f5', s, () => {
      p.ellipse(bX - s * 0.04, bY - s * 0.02, s * 0.07, s * 0.07);
    });
    cute.body(p, '#ffc83d', s, () => {
      p.ellipse(bX + s * 0.04, bY - s * 0.02, s * 0.07, s * 0.07);
    });
    cute.body(p, '#5bcb7a', s, () => {
      p.ellipse(bX, bY - s * 0.04, s * 0.08, s * 0.08);
    });

    // Batang garis bilangan di depan toko
    const nlY = h * 0.88;
    const nlX1 = w * 0.1;
    const nlX2 = w * 0.9;
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(nlX1, nlY - s * 0.02, nlX2 - nlX1, s * 0.04, s * 0.02);
    });
    // Ticks: 0, 1/4, 2/4 (1/2), 3/4, 1
    const labels = ['0', '1/4', '1/2', '3/4', '1'];
    labels.forEach((lbl, idx) => {
      const tx = p.lerp(nlX1 + s * 0.02, nlX2 - s * 0.02, idx / 4);
      p.stroke(255);
      p.strokeWeight(3);
      p.line(tx, nlY - s * 0.025, tx, nlY + s * 0.025);
      p.noStroke();
      p.fill(30, 50, 90);
      p.textSize(s * 0.045);
      p.text(lbl, tx, nlY + s * 0.06);
    });
  };
};

// 2. draw_bg_market_numbers
export const drawBgMarketNumbers = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.03;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(254, 250, 240);

    // Kios pasar tradisional (wooden rounded table)
    const tblY = h * 0.72;
    cute.shadow(p, w * 0.5, tblY + s * 0.08, w * 0.85);
    cute.body(p, '#dfc499', s, () => {
      p.rect(w * 0.08, tblY, w * 0.84, h * 0.22, s * 0.04);
    });

    // Kue bundar terpotong pecahan di kiri meja
    const pieX = w * 0.28;
    const pieY = tblY - s * 0.12;
    const pieR = s * 0.28;
    cute.shadow(p, pieX, pieY + pieR * 0.5, pieR * 1.1);

    // Round pie divided into 4 slices in #ffc83d
    for (let i = 0; i < 4; i++) {
      const sliceOffset = i === 1 ? s * 0.03 : 0;
      p.push();
      p.translate(pieX, pieY);
      cute.body(p, i === 1 ? '#ffb703' : '#ffc83d', s, () => {
        p.arc(
          Math.cos(i * p.HALF_PI + 0.4) * sliceOffset,
          Math.sin(i * p.HALF_PI + 0.4) * sliceOffset,
          pieR,
          pieR,
          i * p.HALF_PI,
          (i + 1) * p.HALF_PI,
          p.PIE
        );
      });
      p.pop();
    }
    // Tag label on pie
    cute.body(p, '#ffffff', s, () => {
      p.rect(pieX - s * 0.09, pieY - s * 0.05, s * 0.18, s * 0.09, s * 0.02);
    });
    p.fill(40, 50, 70);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.05);
    p.text('1/4', pieX, pieY - s * 0.005);

    // Timbangan buah bulat (balance scale) in #2ba3f5
    const scX = w * 0.72;
    const scY = tblY - s * 0.18;
    const scTilt = Math.sin(t * 1.5) * 0.08;

    cute.shadow(p, scX, tblY - s * 0.02, s * 0.35);
    // base and pillar
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(scX - s * 0.08, tblY - s * 0.05, s * 0.16, s * 0.05, s * 0.02);
      p.rect(scX - s * 0.025, scY, s * 0.05, s * 0.22, s * 0.01);
    });
    // scale arm and pans
    p.push();
    p.translate(scX, scY);
    p.rotate(scTilt);
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(-s * 0.18, -s * 0.02, s * 0.36, s * 0.04, s * 0.01);
    });
    // left pan with fruit
    cute.body(p, '#ffc83d', s, () => {
      p.arc(-s * 0.15, s * 0.08, s * 0.14, s * 0.08, 0, p.PI, p.CHORD);
      p.ellipse(-s * 0.15, s * 0.05, s * 0.06, s * 0.06);
    });
    // right pan with weights
    cute.body(p, '#5bcb7a', s, () => {
      p.arc(s * 0.15, s * 0.08, s * 0.14, s * 0.08, 0, p.PI, p.CHORD);
      p.rect(s * 0.12, s * 0.02, s * 0.06, s * 0.06, s * 0.01);
    });
    p.pop();

    // Papan garis bilangan kayu (divided into 10 segments in #5bcb7a)
    const boardY = h * 0.2;
    cute.shadow(p, w * 0.5, boardY + s * 0.07, w * 0.8);
    cute.body(p, '#5bcb7a', s, () => {
      p.rect(w * 0.1, boardY, w * 0.8, s * 0.1, s * 0.02);
    });
    // 10 segments
    const bw = w * 0.8;
    for (let j = 0; j <= 10; j++) {
      const lx = w * 0.1 + (j / 10) * bw;
      p.stroke(255);
      p.strokeWeight(2.5);
      p.line(lx, boardY + 4, lx, boardY + s * 0.1 - 4);
    }
    p.noStroke();
    p.fill(255);
    p.textSize(s * 0.04);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('0.0              0.5 (1/2)              1.0', w * 0.5, boardY + s * 0.05);
  };
};

// 3. draw_bg_budget_plan
export const drawBgBudgetPlan = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.03;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(255, 248, 238);

    // Warm wooden tabletop
    p.noStroke();
    p.fill(240, 224, 204);
    p.rect(0, h * 0.4, w, h * 0.6);

    // Celengan berbentuk koin besar in #ffc83d (gently breathes)
    const bankX = w * 0.24;
    const bankY = h * 0.52;
    const scale = cute.breathe(t, 0.05, 2);
    const bankR = s * 0.28 * scale;

    cute.shadow(p, bankX, bankY + bankR * 0.5, bankR * 1.1);
    cute.body(p, '#ffc83d', s, () => {
      p.ellipse(bankX, bankY, bankR, bankR);
    });
    // Coin slot
    p.fill(160, 110, 20);
    p.noStroke();
    p.rect(bankX - bankR * 0.2, bankY - bankR * 0.28, bankR * 0.4, bankR * 0.08, bankR * 0.04);
    // Rp sign on coin bank
    p.fill(130, 80, 10);
    p.textSize(bankR * 0.35);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Rp', bankX, bankY + bankR * 0.06);
    cute.sparkle(p, bankX + bankR * 0.3, bankY - bankR * 0.3, s * 0.04, t);

    // Kertas daftar belanja bergaris (checklist notebook)
    const noteX = w * 0.54;
    const noteY = h * 0.32;
    const noteW = s * 0.45;
    const noteH = s * 0.55;

    cute.shadow(p, noteX + noteW * 0.5, noteY + noteH * 0.52, noteW * 1.05);
    cute.body(p, '#ffffff', s, () => {
      p.rect(noteX, noteY, noteW, noteH, s * 0.03);
    });
    // Notebook header & lines
    p.fill('#2ba3f5');
    p.noStroke();
    p.rect(noteX, noteY, noteW, noteH * 0.18, s * 0.03, s * 0.03, 0, 0);
    p.fill(255);
    p.textSize(s * 0.045);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Daftar Belanja', noteX + noteW * 0.5, noteY + noteH * 0.09);

    // Checklist lines with checkmarks
    for (let i = 0; i < 4; i++) {
      const lineY = noteY + noteH * 0.32 + i * (noteH * 0.16);
      p.stroke('#5bcb7a');
      p.strokeWeight(3);
      // checkmark
      p.line(noteX + noteW * 0.1, lineY, noteX + noteW * 0.16, lineY + s * 0.02);
      p.line(noteX + noteW * 0.16, lineY + s * 0.02, noteX + noteW * 0.24, lineY - s * 0.02);
      // text line
      p.stroke('#cbd5e1');
      p.line(noteX + noteW * 0.32, lineY, noteX + noteW * 0.88, lineY);
    }

    // Dompet lipat sederhana in #2ba3f5 & green #5bcb7a paper bills
    const wltX = w * 0.85;
    const wltY = h * 0.65;
    const wltW = s * 0.3;
    const wltH = s * 0.22;

    cute.shadow(p, wltX, wltY + wltH * 0.5, wltW * 1.1);
    // Green bills sticking out
    cute.body(p, '#5bcb7a', s, () => {
      p.rect(wltX - wltW * 0.45, wltY - wltH * 0.55, wltW * 0.8, wltH * 0.4, s * 0.02);
    });
    // Wallet body
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(wltX - wltW * 0.5, wltY - wltH * 0.3, wltW, wltH, s * 0.03);
      // snap button
      p.fill('#ffc83d');
      p.ellipse(wltX + wltW * 0.2, wltY + wltH * 0.1, s * 0.04, s * 0.04);
    });
  };
};

// 4. draw_bg_shop_poster_studio
export const drawBgShopPosterStudio = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.035;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(245, 252, 255);

    // Rak barang toko di sisi kiri in #2ba3f5
    const shelfX = w * 0.15;
    const shelfW = s * 0.35;
    const shelfH = s * 0.65;
    const shelfY = h * 0.22;

    cute.shadow(p, shelfX + shelfW * 0.5, shelfY + shelfH * 1.02, shelfW * 1.1);
    cute.body(p, '#2ba3f5', s, () => {
      // 3 shelves
      p.rect(shelfX, shelfY, shelfW, shelfH, s * 0.03);
      p.fill(255);
      p.rect(shelfX + s * 0.02, shelfY + shelfH * 0.32, shelfW - s * 0.04, s * 0.03);
      p.rect(shelfX + s * 0.02, shelfY + shelfH * 0.64, shelfW - s * 0.04, s * 0.03);
    });

    // Hanging discount price tags swinging softly
    const swing = Math.sin(t * 2) * 0.15;
    p.push();
    p.translate(shelfX + shelfW * 0.5, shelfY + shelfH * 0.35);
    p.rotate(swing);
    cute.body(p, '#ffc83d', s, () => {
      p.rect(-s * 0.05, 0, s * 0.1, s * 0.12, s * 0.02);
    });
    p.fill(50, 40, 20);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.04);
    p.text('50%', 0, s * 0.06);
    p.pop();

    // Karton poster kosong di penyangga (easel on right)
    const easelX = w * 0.65;
    const easelY = h * 0.2;
    const easelW = s * 0.55;
    const easelH = s * 0.52;

    // Wooden legs
    p.stroke('#c49b66');
    p.strokeWeight(s * 0.03);
    p.line(easelX + easelW * 0.5, easelY, easelX + s * 0.05, easelY + easelH * 1.35);
    p.line(easelX + easelW * 0.5, easelY, easelX + easelW - s * 0.05, easelY + easelH * 1.35);

    // Blank poster board
    cute.shadow(p, easelX + easelW * 0.5, easelY + easelH * 0.52, easelW * 1.05);
    cute.body(p, '#ffffff', s, () => {
      p.rect(easelX, easelY, easelW, easelH, s * 0.03);
    });
    // Border decor on poster
    p.noFill();
    p.stroke('#5bcb7a');
    p.strokeWeight(2);
    p.rect(easelX + s * 0.03, easelY + s * 0.03, easelW - s * 0.06, easelH - s * 0.06, s * 0.02);
    p.noStroke();
    p.fill(40, 70, 90);
    p.textSize(s * 0.045);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('POSTER DISKON', easelX + easelW * 0.5, easelY + s * 0.1);
    p.fill('#ffc83d');
    p.textSize(s * 0.038);
    p.text('Diskon 25% = 1/4 = 0,25', easelX + easelW * 0.5, easelY + easelH * 0.5);

    // Kotak krayon warna-warni di bawah poster (#ffc83d dan #5bcb7a)
    const crX = easelX + easelW * 0.2;
    const crY = easelY + easelH * 1.05;
    cute.shadow(p, crX + s * 0.15, crY + s * 0.08, s * 0.35);
    cute.body(p, '#ffc83d', s, () => {
      p.rect(crX, crY, s * 0.3, s * 0.12, s * 0.02);
    });
    // Chubby crayons sticking out
    const cColors = ['#2ba3f5', '#5bcb7a', '#ff477e', '#ffc83d'];
    cColors.forEach((col, idx) => {
      cute.body(p, col, s, () => {
        p.rect(crX + s * 0.03 + idx * s * 0.065, crY - s * 0.08, s * 0.045, s * 0.09, s * 0.015);
      });
    });
  };
};

// 5. draw_bg_thrift_exhibition
export const drawBgThriftExhibition = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.03;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(253, 248, 255);

    // Bendera segitiga hiasan kelas (triangle bunting arcs across the top)
    const buntingY = h * 0.12;
    const bCount = 8;
    const bStep = w / bCount;
    for (let i = 0; i < bCount; i++) {
      const col = i % 3 === 0 ? '#ffc83d' : i % 3 === 1 ? '#5bcb7a' : '#2ba3f5';
      const wave = Math.sin(t * 2 + i * 0.5) * 4;
      p.fill(col);
      p.stroke(40, 50, 70);
      p.strokeWeight(2);
      p.triangle(
        i * bStep, buntingY + wave,
        (i + 1) * bStep, buntingY + wave,
        i * bStep + bStep * 0.5, buntingY + s * 0.12 + wave
      );
    }

    // Papan pameran daftar belanja in #2ba3f5 displaying chart cards
    const boardX = w * 0.5;
    const boardY = h * 0.5;
    const boardW = s * 0.92;
    const boardH = s * 0.52;

    cute.shadow(p, boardX, boardY + boardH * 0.52, boardW * 1.05);
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(boardX - boardW * 0.5, boardY - boardH * 0.5, boardW, boardH, s * 0.04);
    });

    // 3 cards displayed on exhibition board
    const cW = boardW * 0.28;
    const cH = boardH * 0.72;
    const cards = [
      { title: 'Hemat', val: 'Diskon 50%', col: '#ffc83d' },
      { title: 'Tepat', val: '1/4 = 25%', col: '#5bcb7a' },
      { title: 'Cerdas', val: '0,5 = 50%', col: '#ffffff' },
    ];
    cards.forEach((cd, idx) => {
      const cx = boardX - boardW * 0.32 + idx * (boardW * 0.32);
      cute.body(p, cd.col, s, () => {
        p.rect(cx - cW * 0.5, boardY - cH * 0.5, cW, cH, s * 0.02);
      });
      p.fill(40, 50, 70);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(s * 0.045);
      p.text(cd.title, cx, boardY - cH * 0.2);
      p.textSize(s * 0.038);
      p.text(cd.val, cx, boardY + cH * 0.15);
    });

    // Meja pajangan hasil karya below
    cute.body(p, '#ecd3b0', s, () => {
      p.rect(w * 0.08, h * 0.8, w * 0.84, h * 0.2, s * 0.03);
    });

    // Lencana bintang penghargaan with sparkles
    const starX = w * 0.82;
    const starY = h * 0.42;
    cute.sparkle(p, starX, starY, s * 0.08, t);
    cute.sparkle(p, w * 0.18, starY - s * 0.1, s * 0.06, t + 1);
  };
};

// 6. draw_tech_number_line_slider (Interactive!)
export const drawTechNumberLineSlider = (
  p: p5,
  container: HTMLElement,
  extraProps?: Record<string, unknown>
) => {
  let val = (extraProps?.value as number) ?? 0.5;
  const onChange = extraProps?.onChange as ((v: number) => void) | undefined;
  let isDragging = false;
  let t = 0;

  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  function updateFromPointer(px: number) {
    const w = p.width;
    const trackX1 = w * 0.12;
    const trackX2 = w * 0.88;
    const clamped = Math.max(0, Math.min(1, (px - trackX1) / (trackX2 - trackX1)));
    const stepped = Math.round(clamped * 20) / 20; // 0.05 step
    val = stepped;
    if (onChange) onChange(stepped);
  }

  p.mousePressed = () => {
    const trackY = p.height * 0.76;
    if (Math.abs(p.mouseY - trackY) < 45) {
      isDragging = true;
      updateFromPointer(p.mouseX);
    }
  };

  p.mouseDragged = () => {
    if (isDragging) {
      updateFromPointer(p.mouseX);
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };

  const pAny = p as unknown as Record<string, unknown>;
  pAny.touchStarted = () => {
    const trackY = p.height * 0.76;
    if (p.touches.length > 0) {
      const touch = p.touches[0] as { x: number; y: number };
      if (Math.abs(touch.y - trackY) < 55) {
        isDragging = true;
        updateFromPointer(touch.x);
      }
    }
    return false;
  };

  pAny.touchMoved = () => {
    if (isDragging && p.touches.length > 0) {
      const touch = p.touches[0] as { x: number; y: number };
      updateFromPointer(touch.x);
    }
    return false;
  };

  pAny.touchEnded = () => {
    isDragging = false;
    return false;
  };

  p.draw = () => {
    t += 0.04;
    // sync value if updated externally
    if (extraProps?.value !== undefined && !isDragging) {
      val = extraProps.value as number;
    }

    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(255, 255, 255);

    // 1. Arc pie chart (Lingkaran pecahan terisi sesuai posisi)
    const pieX = w * 0.28;
    const pieY = h * 0.35;
    const pieR = s * 0.42;

    cute.shadow(p, pieX, pieY + pieR * 0.5, pieR * 1.1);
    // Background circle
    cute.body(p, '#e2e8f0', s, () => {
      p.ellipse(pieX, pieY, pieR, pieR);
    });
    // Filled pie slice in #2ba3f5
    if (val > 0.01) {
      cute.body(p, '#2ba3f5', s, () => {
        p.arc(pieX, pieY, pieR, pieR, -p.HALF_PI, -p.HALF_PI + val * p.TWO_PI, p.PIE);
      });
    }

    // Pie fraction label in Indonesian
    p.noStroke();
    p.fill(20, 40, 70);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.06);
    p.textStyle(p.BOLD);
    const fracText = val === 0.25 ? '1/4' : val === 0.5 ? '1/2' : val === 0.75 ? '3/4' : val === 1 ? '1' : `${Math.round(val * 10)}/10`;
    p.text(`Pecahan: ${fracText}`, pieX, pieY + pieR * 0.65);

    // 2. Kotak seratus petak persen (10x10 mini grid in #5bcb7a)
    const gridX = w * 0.58;
    const gridY = h * 0.16;
    const gridS = s * 0.45;
    const cellSize = gridS / 10;

    cute.shadow(p, gridX + gridS * 0.5, gridY + gridS * 0.52, gridS * 1.05);
    cute.body(p, '#ffffff', s, () => {
      p.rect(gridX, gridY, gridS, gridS, s * 0.02);
    });

    const filledCells = Math.round(val * 100);
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cellIndex = r * 10 + c;
        if (cellIndex < filledCells) {
          p.fill('#5bcb7a');
        } else {
          p.fill('#f1f5f9');
        }
        p.stroke('#e2e8f0');
        p.strokeWeight(1);
        p.rect(gridX + c * cellSize, gridY + r * cellSize, cellSize, cellSize, 1);
      }
    }

    // Persen & Desimal labels
    p.noStroke();
    p.fill(20, 40, 70);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.055);
    const pct = Math.round(val * 100);
    const des = (val).toFixed(2).replace('.', ',');
    p.text(`Persen: ${pct}%  |  Desimal: ${des}`, gridX + gridS * 0.5, gridY + gridS + s * 0.08);

    // 3. Batang garis bilangan sepuluh ruas (Horizontal track 0 to 1)
    const trackX1 = w * 0.12;
    const trackX2 = w * 0.88;
    const trackW = trackX2 - trackX1;
    const trackY = h * 0.82;

    // Track line
    cute.body(p, '#cbd5e1', s, () => {
      p.rect(trackX1, trackY - s * 0.02, trackW, s * 0.04, s * 0.02);
    });
    // Active track fill
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(trackX1, trackY - s * 0.02, trackW * val, s * 0.04, s * 0.02);
    });

    // 10 tick marks
    for (let k = 0; k <= 10; k++) {
      const tx = trackX1 + (k / 10) * trackW;
      p.stroke(100, 116, 139);
      p.strokeWeight(2.5);
      p.line(tx, trackY - s * 0.035, tx, trackY + s * 0.035);
      p.noStroke();
      p.fill(71, 85, 105);
      p.textSize(s * 0.04);
      p.textAlign(p.CENTER, p.CENTER);
      const tickLabel = k === 0 ? '0' : k === 10 ? '1' : `${k / 10}`.replace('.', ',');
      p.text(tickLabel, tx, trackY + s * 0.07);
    }

    // Tombol geser bulat (#ffc83d draggable knob)
    const knobX = trackX1 + trackW * val;
    cute.shadow(p, knobX, trackY + s * 0.04, s * 0.14);
    cute.body(p, isDragging ? '#ffb703' : '#ffc83d', s, () => {
      p.ellipse(knobX, trackY, s * 0.11, s * 0.11);
    });
    cute.sparkle(p, knobX + s * 0.03, trackY - s * 0.03, s * 0.025, t);
  };
};

// 7. draw_eng_budget_basket (Interactive Drag/Pick items into basket)
export const drawEngBudgetBasket = (
  p: p5,
  container: HTMLElement,
  extraProps?: Record<string, unknown>
) => {
  let itemsInBasket = (extraProps?.itemsInBasket as number[]) || [0];
  const maxBudget = 50000;
  const items = [
    { name: 'Buku Tulis', orig: 20000, disc: 'Diskon 50%', discVal: 0.5, final: 10000, col: '#2ba3f5' },
    { name: 'Pensil Warna', orig: 24000, disc: 'Diskon 25%', discVal: 0.25, final: 18000, col: '#ffc83d' },
    { name: 'Beras 1 kg', orig: 16000, disc: 'Diskon 25%', discVal: 0.25, final: 12000, col: '#5bcb7a' },
    { name: 'Minyak Goreng', orig: 20000, disc: 'Diskon 10%', discVal: 0.1, final: 18000, col: '#f97316' },
  ];
  const onToggleItem = extraProps?.onToggleItem as ((idx: number) => void) | undefined;

  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.mousePressed = () => {
    // Check if clicked one of the 4 items
    const s = Math.min(p.width, p.height);
    const itemW = p.width * 0.22;
    const itemH = s * 0.28;
    const itemY = p.height * 0.12;

    for (let i = 0; i < items.length; i++) {
      const ix = p.width * 0.05 + i * (itemW + p.width * 0.02);
      if (p.mouseX >= ix && p.mouseX <= ix + itemW && p.mouseY >= itemY && p.mouseY <= itemY + itemH) {
        if (onToggleItem) {
          onToggleItem(i);
        }
        break;
      }
    }
  };

  p.draw = () => {
    if (extraProps?.itemsInBasket) {
      itemsInBasket = extraProps.itemsInBasket as number[];
    }
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(255, 255, 255);

    // 4 Item cards at the top
    const itemW = w * 0.21;
    const itemH = s * 0.32;
    const itemY = h * 0.08;

    items.forEach((it, idx) => {
      const ix = w * 0.04 + idx * (itemW + w * 0.025);
      const isSelected = itemsInBasket.includes(idx);

      cute.shadow(p, ix + itemW * 0.5, itemY + itemH * 0.52, itemW);
      cute.body(p, isSelected ? it.col : '#f8fafc', s, () => {
        p.rect(ix, itemY, itemW, itemH, s * 0.025);
      });

      // Item text
      p.noStroke();
      p.fill(isSelected ? '#ffffff' : '#1e293b');
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(s * 0.042);
      p.textStyle(p.BOLD);
      p.text(it.name, ix + itemW * 0.5, itemY + itemH * 0.25);

      // Discount tag
      p.textSize(s * 0.038);
      p.fill(isSelected ? '#fffae6' : '#d97706');
      p.text(it.disc, ix + itemW * 0.5, itemY + itemH * 0.55);

      // Final price
      p.textSize(s * 0.04);
      p.fill(isSelected ? '#ffffff' : '#059669');
      p.text(`Rp${it.final.toLocaleString('id-ID')}`, ix + itemW * 0.5, itemY + itemH * 0.82);
    });

    // Calculate current total
    const currentTotal = itemsInBasket.reduce((sum, idx) => sum + items[idx].final, 0);

    // Keranjang Belanja Anyaman (Trapezoid rounded basket in #2ba3f5)
    const bX = w * 0.42;
    const bY = h * 0.62;
    const bW = s * 0.55;
    const bH = s * 0.28;

    cute.shadow(p, bX, bY + bH * 0.55, bW * 1.1);
    cute.body(p, '#2ba3f5', s, () => {
      p.beginShape();
      p.vertex(bX - bW * 0.5, bY - bH * 0.5);
      p.vertex(bX + bW * 0.5, bY - bH * 0.5);
      p.vertex(bX + bW * 0.38, bY + bH * 0.5);
      p.vertex(bX - bW * 0.38, bY + bH * 0.5);
      p.endShape(p.CLOSE);
      // Weave pattern lines
      p.stroke(255, 255, 255, 120);
      p.strokeWeight(2.5);
      p.line(bX - bW * 0.3, bY - bH * 0.3, bX + bW * 0.2, bY + bH * 0.3);
      p.line(bX + bW * 0.3, bY - bH * 0.3, bX - bW * 0.2, bY + bH * 0.3);
    });

    // Basket label
    p.noStroke();
    p.fill(255);
    p.textSize(s * 0.045);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Isi: ${itemsInBasket.length} barang`, bX, bY);

    // Bar Pengukur Batas Anggaran (Vertical meter bar on the right side)
    const meterX = w * 0.84;
    const meterY = h * 0.48;
    const meterW = s * 0.12;
    const meterH = s * 0.45;
    const fillRatio = Math.min(1, currentTotal / maxBudget);
    const meterCol = currentTotal > maxBudget ? '#ef4444' : currentTotal >= 40000 ? '#ffc83d' : '#5bcb7a';

    cute.shadow(p, meterX + meterW * 0.5, meterY + meterH * 0.5, meterW * 1.2);
    cute.body(p, '#f1f5f9', s, () => {
      p.rect(meterX, meterY, meterW, meterH, s * 0.02);
    });

    // Meter fill
    cute.body(p, meterCol, s, () => {
      const fh = meterH * fillRatio;
      p.rect(meterX, meterY + meterH - fh, meterW, fh, s * 0.02);
    });

    // Budget text
    p.noStroke();
    p.fill(20, 30, 60);
    p.textSize(s * 0.042);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Total: Rp${currentTotal.toLocaleString('id-ID')}`, w * 0.42, h * 0.88);
    p.textSize(s * 0.038);
    p.fill(currentTotal > maxBudget ? '#ef4444' : '#64748b');
    p.text(currentTotal > maxBudget ? 'Melebihi Rp50.000!' : 'Batas Anggaran: Rp50.000', w * 0.42, h * 0.94);
  };
};

// 8. draw_art_poster_kit (Interactive Tap crayons)
export const drawArtPosterKit = (
  p: p5,
  container: HTMLElement,
  extraProps?: Record<string, unknown>
) => {
  let t = 0;
  let wiggle = 0;

  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.mousePressed = () => {
    wiggle = 1.0;
    if (extraProps?.onTap) {
      (extraProps.onTap as () => void)();
    }
  };

  p.draw = () => {
    t += 0.03;
    if (wiggle > 0.01) wiggle *= 0.92;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(255, 255, 255);

    // Lembar karton lebar (Tilted poster sheet)
    const pX = w * 0.46;
    const pY = h * 0.44;
    const pW = s * 0.65;
    const pH = s * 0.6;

    cute.shadow(p, pX, pY + pH * 0.52, pW * 1.05);
    p.push();
    p.translate(pX, pY);
    p.rotate(-0.04);
    cute.body(p, '#ffffff', s, () => {
      p.rect(-pW * 0.5, -pH * 0.5, pW, pH, s * 0.03);
    });

    // Poster artwork draft inside
    p.fill(245, 250, 255);
    p.stroke('#2ba3f5');
    p.strokeWeight(2);
    p.rect(-pW * 0.42, -pH * 0.42, pW * 0.84, pH * 0.22, s * 0.02);
    p.fill('#2ba3f5');
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.048);
    p.textStyle(p.BOLD);
    p.text('TOKO HEMAT CERMAT', 0, -pH * 0.31);

    // Decorative cut-out fraction circle & star on poster
    p.fill('#ffc83d');
    p.arc(-pW * 0.2, pH * 0.1, s * 0.16, s * 0.16, 0, p.PI * 1.5, p.PIE);
    p.fill(20, 30, 50);
    p.textSize(s * 0.035);
    p.text('3/4 = 75%', -pW * 0.2, pH * 0.26);

    // Checklist box
    p.fill('#f1f5f9');
    p.rect(pW * 0.02, -pH * 0.05, pW * 0.4, pH * 0.38, s * 0.02);
    p.fill(40, 60, 90);
    p.textSize(s * 0.035);
    p.text('Tabel Diskon:\n1/2 = 50%\n1/4 = 25%', pW * 0.22, pH * 0.14);
    p.pop();

    // Safe round-tip scissors made of ellipses in top right
    const scX = w * 0.82;
    const scY = h * 0.22;
    cute.body(p, '#2ba3f5', s, () => {
      p.ellipse(scX - s * 0.04, scY, s * 0.07, s * 0.07);
      p.ellipse(scX + s * 0.04, scY, s * 0.07, s * 0.07);
      p.fill('#94a3b8');
      p.rect(scX - s * 0.03, scY + s * 0.03, s * 0.06, s * 0.12, s * 0.02);
    });

    // Tiga batang krayon gemuk in #2ba3f5, #ffc83d, #5bcb7a (wiggle on tap)
    const crY = h * 0.82;
    const crayons = [
      { col: '#2ba3f5', x: w * 0.22 },
      { col: '#ffc83d', x: w * 0.44 },
      { col: '#5bcb7a', x: w * 0.66 },
    ];
    crayons.forEach((c, idx) => {
      const crWiggle = Math.sin(t * 8 + idx) * (wiggle * 8);
      p.push();
      p.translate(c.x, crY + crWiggle);
      cute.shadow(p, 0, s * 0.07, s * 0.22);
      cute.body(p, c.col, s, () => {
        // crayon body
        p.rect(-s * 0.05, -s * 0.08, s * 0.1, s * 0.16, s * 0.02);
        // tip
        p.triangle(-s * 0.05, -s * 0.08, s * 0.05, -s * 0.08, 0, -s * 0.13);
      });
      p.pop();
    });
  };
};

// 9. draw_math_discount_slicer (Interactive discount slicer)
export const drawMathDiscountSlicer = (
  p: p5,
  container: HTMLElement,
  extraProps?: Record<string, unknown>
) => {
  let slices = (extraProps?.slices as number) || 4;
  let activeSlice = (extraProps?.activeSlice as number) || 1;
  const onSliceChange = extraProps?.onSliceChange as ((n: number) => void) | undefined;
  let t = 0;

  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.mousePressed = () => {
    // Check if clicked the toggle slice button or blocks
    const s = Math.min(p.width, p.height);
    const barY = p.height * 0.48;
    if (Math.abs(p.mouseY - barY) < s * 0.15) {
      activeSlice = (activeSlice % slices) + 1;
      if (onSliceChange) onSliceChange(activeSlice);
    }
  };

  p.draw = () => {
    t += 0.03;
    if (extraProps?.slices) slices = extraProps.slices as number;
    if (extraProps?.activeSlice) activeSlice = extraProps.activeSlice as number;

    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(255, 255, 255);

    // Kotak barang kebutuhan sehari-hari (Buku / Beras) in #2ba3f5
    const itemX = w * 0.2;
    const itemY = h * 0.32;
    const itemS = s * 0.35;

    cute.shadow(p, itemX, itemY + itemS * 0.52, itemS * 1.1);
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(itemX - itemS * 0.5, itemY - itemS * 0.5, itemS, itemS, s * 0.03);
    });
    // Cute face on item
    cute.face(p, itemX, itemY - s * 0.02, itemS * 0.7, 'happy', t);
    p.noStroke();
    p.fill(255);
    p.textSize(s * 0.045);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Harga Rp40.000', itemX, itemY + itemS * 0.35);

    // Label harga utuh berbentuk batang (Price bar)
    const barX = w * 0.45;
    const barY = h * 0.48;
    const barW = w * 0.5;
    const barH = s * 0.18;
    const segW = barW / slices;

    cute.shadow(p, barX + barW * 0.5, barY + barH * 0.52, barW * 1.05);

    // Slices separating smoothly
    for (let i = 0; i < slices; i++) {
      const isDiscounted = i < activeSlice;
      const col = isDiscounted ? '#ffc83d' : '#5bcb7a';
      const gap = isDiscounted ? -3 : 2;

      cute.body(p, col, s, () => {
        p.rect(barX + i * segW + gap, barY, segW - 4, barH, s * 0.02);
      });

      p.noStroke();
      p.fill(30, 40, 60);
      p.textSize(s * 0.04);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`1/${slices}`, barX + i * segW + segW * 0.5, barY + barH * 0.5);
    }

    // Mathematical breakdown summary text
    p.noStroke();
    p.fill(30, 50, 80);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(s * 0.048);
    const discPct = Math.round((activeSlice / slices) * 100);
    const potongRp = (40000 * (activeSlice / slices)).toLocaleString('id-ID');
    const bayarRp = (40000 * (1 - activeSlice / slices)).toLocaleString('id-ID');
    p.text(`Potongan: ${activeSlice}/${slices} = ${discPct}% (Hemat Rp${potongRp})`, w * 0.5, h * 0.82);
    p.fill('#059669');
    p.textSize(s * 0.052);
    p.text(`Harga Akhir: Rp${bayarRp}`, w * 0.5, h * 0.92);
  };
};

// 10. draw_sim_shop_shelf_items (Rak barang toko interaktif)
export const drawSimShopShelfItems = (
  p: p5,
  container: HTMLElement,
  extraProps?: Record<string, unknown>
) => {
  let selected = (extraProps?.selectedItem as number) ?? 0;
  const onSelect = extraProps?.onSelect as ((n: number) => void) | undefined;
  let t = 0;

  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.mousePressed = () => {
    const s = Math.min(p.width, p.height);
    const itemW = p.width * 0.28;
    for (let i = 0; i < 3; i++) {
      const ix = p.width * 0.06 + i * (itemW + p.width * 0.04);
      if (p.mouseX >= ix && p.mouseX <= ix + itemW && Math.abs(p.mouseY - p.height * 0.45) < s * 0.3) {
        selected = i;
        if (onSelect) onSelect(i);
        break;
      }
    }
  };

  p.draw = () => {
    t += 0.04;
    if (extraProps?.selectedItem !== undefined) {
      selected = extraProps.selectedItem as number;
    }
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);

    p.background(255, 255, 255);

    // Two wooden shelf bars
    cute.body(p, '#d4a373', s, () => {
      p.rect(w * 0.04, h * 0.65, w * 0.92, s * 0.05, s * 0.02);
      p.rect(w * 0.04, h * 0.92, w * 0.92, s * 0.05, s * 0.02);
    });

    const items = [
      { name: 'Tas Sekolah', disc: '1/2 (50%)', orig: 60000, final: 30000, col: '#2ba3f5' },
      { name: 'Botol Minum', disc: '1/4 (25%)', orig: 20000, final: 15000, col: '#5bcb7a' },
      { name: 'Kotak Bekal', disc: '1/10 (10%)', orig: 40000, final: 36000, col: '#ffc83d' },
    ];

    const itemW = w * 0.26;
    items.forEach((it, idx) => {
      const ix = w * 0.06 + idx * (itemW + w * 0.05);
      const iy = h * 0.38;
      const isSel = idx === selected;
      const bob = isSel ? Math.sin(t * 4) * 6 : 0;

      cute.shadow(p, ix + itemW * 0.5, h * 0.64, itemW * 0.9);

      p.push();
      p.translate(ix + itemW * 0.5, iy + bob);
      // Item body
      cute.body(p, it.col, s, () => {
        if (idx === 0) {
          // Backpack
          p.rect(-itemW * 0.45, -s * 0.2, itemW * 0.9, s * 0.28, s * 0.04);
          p.rect(-itemW * 0.3, -s * 0.05, itemW * 0.6, s * 0.12, s * 0.02);
        } else if (idx === 1) {
          // Water bottle
          p.rect(-itemW * 0.3, -s * 0.22, itemW * 0.6, s * 0.3, s * 0.03);
          p.rect(-itemW * 0.15, -s * 0.26, itemW * 0.3, s * 0.05, s * 0.01);
        } else {
          // Lunchbox
          p.rect(-itemW * 0.45, -s * 0.16, itemW * 0.9, s * 0.24, s * 0.03);
          p.arc(0, -s * 0.16, itemW * 0.4, s * 0.08, p.PI, p.TWO_PI);
        }
      });

      // Discount circle tag
      cute.body(p, '#ffffff', s, () => {
        p.ellipse(itemW * 0.35, -s * 0.18, s * 0.14, s * 0.14);
      });
      p.noStroke();
      p.fill(210, 40, 60);
      p.textSize(s * 0.04);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(idx === 0 ? '1/2' : idx === 1 ? '1/4' : '10%', itemW * 0.35, -s * 0.18);
      p.pop();

      // Label below shelf
      p.noStroke();
      p.fill(isSel ? '#1d4ed8' : '#334155');
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(s * 0.042);
      p.textStyle(isSel ? p.BOLD : p.NORMAL);
      p.text(it.name, ix + itemW * 0.5, h * 0.74);
      p.textSize(s * 0.038);
      p.fill('#059669');
      p.text(`Rp${it.final.toLocaleString('id-ID')}`, ix + itemW * 0.5, h * 0.82);
    });
  };
};

// 11. draw_badge_number_explorer
export const drawBadgeNumberExplorer = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.03;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);
    const cx = w * 0.5;
    const cy = h * 0.48;

    p.background(255, 255, 255);

    // Twin ribbon tails in #2ba3f5
    cute.body(p, '#2ba3f5', s, () => {
      p.quad(cx - s * 0.25, cy + s * 0.15, cx - s * 0.12, cy + s * 0.15, cx - s * 0.18, cy + s * 0.44, cx - s * 0.32, cy + s * 0.42);
      p.quad(cx + s * 0.12, cy + s * 0.15, cx + s * 0.25, cy + s * 0.15, cx + s * 0.32, cy + s * 0.42, cx + s * 0.18, cy + s * 0.44);
    });

    // Scalloped circle medal in #ffc83d
    const r = s * 0.32;
    cute.shadow(p, cx, cy + r * 0.8, r * 1.5);

    p.push();
    p.translate(cx, cy);
    p.rotate(Math.sin(t) * 0.04);
    cute.body(p, '#ffc83d', s, () => {
      // 12 scalloped bumps
      for (let i = 0; i < 12; i++) {
        const a = (i * p.TWO_PI) / 12;
        p.ellipse(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.85, r * 0.35, r * 0.35);
      }
      p.ellipse(0, 0, r * 1.6, r * 1.6);
    });

    // Inner circle
    cute.body(p, '#ffffff', s, () => {
      p.ellipse(0, 0, r * 1.25, r * 1.25);
    });

    // Lingkaran pecahan 3/4 in #5bcb7a
    cute.body(p, '#5bcb7a', s, () => {
      p.arc(-r * 0.2, 0, r * 0.65, r * 0.65, -p.HALF_PI, p.PI, p.PIE);
    });

    // Batang desimal 10 bagian beside pie
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(r * 0.2, -r * 0.3, r * 0.2, r * 0.6, s * 0.02);
    });
    for (let k = 1; k < 5; k++) {
      p.stroke(255);
      p.line(r * 0.2, -r * 0.3 + k * (r * 0.12), r * 0.4, -r * 0.3 + k * (r * 0.12));
    }
    p.pop();

    cute.sparkle(p, cx + r * 0.7, cy - r * 0.6, s * 0.07, t);
    cute.sparkle(p, cx - r * 0.7, cy + r * 0.2, s * 0.05, t + 1);
  };
};

// 12. draw_badge_wise_shopper
export const drawBadgeWiseShopper = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.035;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);
    const cx = w * 0.5;
    const cy = h * 0.46;
    const floatY = Math.sin(t * 1.8) * 5;

    p.background(255, 255, 255);

    // Rounded shield badge in #5bcb7a with #ffc83d border
    const sw = s * 0.6;
    const sh = s * 0.65;

    cute.shadow(p, cx, cy + sh * 0.52 + floatY, sw * 1.1);

    p.push();
    p.translate(cx, cy + floatY);

    // Outer frame #ffc83d
    cute.body(p, '#ffc83d', s, () => {
      p.beginShape();
      p.vertex(-sw * 0.5, -sh * 0.45);
      p.vertex(sw * 0.5, -sh * 0.45);
      p.vertex(sw * 0.45, sh * 0.15);
      p.vertex(0, sh * 0.5);
      p.vertex(-sw * 0.45, sh * 0.15);
      p.endShape(p.CLOSE);
    });

    // Inner shield #5bcb7a
    cute.body(p, '#5bcb7a', s, () => {
      p.beginShape();
      p.vertex(-sw * 0.4, -sh * 0.38);
      p.vertex(sw * 0.4, -sh * 0.38);
      p.vertex(sw * 0.36, sh * 0.12);
      p.vertex(0, sh * 0.42);
      p.vertex(-sw * 0.36, sh * 0.12);
      p.endShape(p.CLOSE);
    });

    // Cute shopping basket emblem in white & #2ba3f5
    cute.body(p, '#ffffff', s, () => {
      p.rect(-sw * 0.22, -sh * 0.05, sw * 0.44, sh * 0.22, s * 0.03);
      p.noFill();
      p.arc(0, -sh * 0.05, sw * 0.28, sh * 0.2, p.PI, p.TWO_PI);
    });

    // Split discount tag at center
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(-sw * 0.15, -sh * 0.25, sw * 0.3, sh * 0.14, s * 0.02);
    });
    p.fill(255);
    p.noStroke();
    p.textSize(s * 0.045);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('%', 0, -sh * 0.18);
    p.pop();

    // Twinkling corner stars
    cute.sparkle(p, cx - sw * 0.45, cy - sh * 0.35 + floatY, s * 0.07, t);
    cute.sparkle(p, cx + sw * 0.45, cy - sh * 0.35 + floatY, s * 0.07, t + 1.2);
  };
};

// 13. draw_badge_budget_champion
export const drawBadgeBudgetChampion = (p: p5, container: HTMLElement) => {
  let t = 0;
  p.setup = () => setupCanvas(p, container);
  p.windowResized = () => handleResize(p, container);

  p.draw = () => {
    t += 0.035;
    const w = p.width;
    const h = p.height;
    const s = Math.min(w, h);
    const cx = w * 0.5;
    const cy = h * 0.46;

    p.background(255, 255, 255);

    // Floating confetti circles around trophy
    for (let i = 0; i < 7; i++) {
      const a = (i * p.TWO_PI) / 7 + t * 0.8;
      const dist = s * 0.38 + Math.sin(t * 2 + i) * (s * 0.05);
      const col = i % 3 === 0 ? '#ffc83d' : i % 3 === 1 ? '#2ba3f5' : '#5bcb7a';
      p.fill(col);
      p.noStroke();
      p.ellipse(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, s * 0.04, s * 0.04);
    }

    // Chubby golden cup trophy in #ffc83d on #2ba3f5 base
    cute.shadow(p, cx, cy + s * 0.35, s * 0.65);

    // Base #2ba3f5
    cute.body(p, '#2ba3f5', s, () => {
      p.rect(cx - s * 0.18, cy + s * 0.22, s * 0.36, s * 0.1, s * 0.02);
      p.rect(cx - s * 0.08, cy + s * 0.12, s * 0.16, s * 0.12, s * 0.02);
    });

    // Handles
    cute.body(p, '#ffc83d', s, () => {
      p.noFill();
      p.strokeWeight(s * 0.04);
      p.arc(cx - s * 0.2, cy - s * 0.04, s * 0.2, s * 0.28, p.HALF_PI, p.PI + p.HALF_PI);
      p.arc(cx + s * 0.2, cy - s * 0.04, s * 0.2, s * 0.28, -p.HALF_PI, p.HALF_PI);
    });

    // Cup body
    cute.body(p, '#ffc83d', s, () => {
      p.beginShape();
      p.vertex(cx - s * 0.22, cy - s * 0.22);
      p.vertex(cx + s * 0.22, cy - s * 0.22);
      p.vertex(cx + s * 0.16, cy + s * 0.12);
      p.vertex(cx - s * 0.16, cy + s * 0.12);
      p.endShape(p.CLOSE);
    });

    // Laurel leaves on top
    cute.body(p, '#5bcb7a', s, () => {
      p.ellipse(cx - s * 0.15, cy - s * 0.25, s * 0.09, s * 0.05);
      p.ellipse(cx + s * 0.15, cy - s * 0.25, s * 0.09, s * 0.05);
      p.ellipse(cx, cy - s * 0.26, s * 0.1, s * 0.06);
    });

    // Miniature checklist card & stacked coins
    cute.body(p, '#ffffff', s, () => {
      p.rect(cx - s * 0.1, cy - s * 0.12, s * 0.2, s * 0.18, s * 0.02);
    });
    // Checkmarks
    p.stroke('#5bcb7a');
    p.strokeWeight(2.5);
    p.line(cx - s * 0.06, cy - s * 0.04, cx - s * 0.02, cy - s * 0.01);
    p.line(cx - s * 0.02, cy - s * 0.01, cx + s * 0.05, cy - s * 0.07);

    cute.sparkle(p, cx + s * 0.25, cy - s * 0.22, s * 0.08, t);
  };
};
