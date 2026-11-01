// cuteKit.js - pustaka gambar imut untuk p5.js (mode instance). Semua ukuran relatif terhadap s (ukuran objek).
export const cute = {
  shade(p, c, f) { return p.lerpColor(p.color(c), p.color(0), f); },
  tint(p, c, f) { return p.lerpColor(p.color(c), p.color(255), f); },
  // bentuk berwarna dengan garis tepi tebal berujung bulat yang lebih gelap dari isinya
  body(p, c, s, draw) {
    p.push();
    p.strokeWeight(s * 0.045); p.strokeJoin(p.ROUND); p.strokeCap(p.ROUND);
    p.stroke(cute.shade(p, c, 0.35)); p.fill(c);
    draw();
    p.pop();
  },
  highlight(p, x, y, w, h) { p.push(); p.noStroke(); p.fill(255, 255, 255, 150); p.ellipse(x, y, w, h); p.pop(); },
  shadow(p, x, y, w) { p.push(); p.noStroke(); p.fill(0, 0, 0, 28); p.ellipse(x, y, w, w * 0.22); p.pop(); },
  cheeks(p, x, y, gap, r) {
    p.push(); p.noStroke(); p.fill(255, 120, 150, 130);
    p.ellipse(x - gap, y, r, r * 0.7); p.ellipse(x + gap, y, r, r * 0.7);
    p.pop();
  },
  // wajah imut: mata besar berkilau, pipi merona, mulut kecil. mood: happy, excited, curious, sleepy
  face(p, x, y, s, mood, t) {
    mood = mood || 'happy'; t = t || 0;
    const gap = s * 0.2, er = s * 0.14;
    const blink = (t % 4) > 3.85 ? 0.15 : 1;
    p.push(); p.noStroke();
    [-1, 1].forEach((d) => {
      p.fill(30, 30, 50); p.ellipse(x + d * gap, y, er, er * 1.25 * blink);
      p.fill(255); p.ellipse(x + d * gap - er * 0.18, y - er * 0.25, er * 0.4);
    });
    p.pop();
    cute.cheeks(p, x, y + s * 0.1, gap * 1.55, s * 0.13);
    p.push(); p.stroke(30, 30, 50); p.strokeWeight(s * 0.03); p.strokeCap(p.ROUND);
    if (mood === 'excited') { p.fill(210, 70, 90); p.arc(x, y + s * 0.1, s * 0.2, s * 0.2, 0, p.PI, p.CHORD); }
    else if (mood === 'curious') { p.noFill(); p.ellipse(x, y + s * 0.14, s * 0.07); }
    else if (mood === 'sleepy') { p.noFill(); p.line(x - s * 0.06, y + s * 0.14, x + s * 0.06, y + s * 0.14); }
    else { p.noFill(); p.arc(x, y + s * 0.08, s * 0.16, s * 0.12, 0.15, p.PI - 0.15); }
    p.pop();
  },
  // gerak idle: napas pelan (skala) dan melayang (naik turun)
  breathe(t, amp, speed) { return 1 + Math.sin(t * (speed || 2)) * (amp || 0.03); },
  float(t, amp, speed) { return Math.sin(t * (speed || 1.5)) * (amp || 6); },
  // pantulan saat disentuh: k dari 0 ke 1, mengembang lalu kembali
  squash(k) { const e = Math.sin(Math.min(Math.max(k, 0), 1) * Math.PI); return { sx: 1 + e * 0.18, sy: 1 - e * 0.14 }; },
  sparkle(p, x, y, r, t) {
    const k = 0.6 + 0.4 * Math.sin((t || 0) * 4 + x);
    p.push(); p.noStroke(); p.fill(255, 245, 160, 230); p.translate(x, y); p.scale(k);
    p.beginShape();
    for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, rr = i % 2 ? r * 0.28 : r; p.vertex(Math.cos(a) * rr, Math.sin(a) * rr); }
    p.endShape(p.CLOSE);
    p.pop();
  },
  // awan bulat gemuk sebagai contoh bentuk dasar
  cloud(p, x, y, s, c) {
    cute.body(p, c, s, () => {
      p.ellipse(x - s * 0.25, y + s * 0.05, s * 0.5, s * 0.4);
      p.ellipse(x + s * 0.25, y + s * 0.05, s * 0.5, s * 0.4);
      p.ellipse(x, y - s * 0.1, s * 0.6, s * 0.5);
      p.rect(x - s * 0.25, y, s * 0.5, s * 0.25, s * 0.12);
    });
    cute.highlight(p, x - s * 0.15, y - s * 0.22, s * 0.2, s * 0.1);
  }
};
