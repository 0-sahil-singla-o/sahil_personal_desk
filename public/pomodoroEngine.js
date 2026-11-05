// Pomodoro Engine - Pixel-Perfect Parity & Ultra-High-Performance Living Texture Architecture
(() => {
  const themeImages = {
    fantasy: '/bg-fantasy.webp',
    pastel: '/bg-pastel.webp',
    lofi: '/bg-lofi.webp',
    cyberpunk: '/bg-cyberpunk.webp'
  };

  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.src = themeImages.fantasy;

  let lofiVideo = null;
  if (typeof document !== 'undefined') {
    lofiVideo = document.createElement('video');
    lofiVideo.src = '/bg-lofi.mp4';
    lofiVideo.autoplay = true;
    lofiVideo.loop = true;
    lofiVideo.muted = true;
    lofiVideo.playsInline = true;
    lofiVideo.crossOrigin = 'anonymous';
    lofiVideo.play().catch(() => {});
  }

  // Exact 1180 x 783 coordinate space matching Xe.tablet in ScreenOverlay (aspect ratio 1.50702)
  const W = 1180;
  const H = 783;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  window.__pomodoroCanvas = canvas;

  // Pre-baked static UI cache canvas (eliminates 95% of frame CPU rendering)
  const uiCanvas = document.createElement('canvas');
  uiCanvas.width = W;
  uiCanvas.height = H;
  let uiDirty = true;

  // Pre-baked radial scrim vignette canvas
  const scrimCanvas = document.createElement('canvas');
  scrimCanvas.width = W;
  scrimCanvas.height = H;
  const sCtx = scrimCanvas.getContext('2d');
  const scrimRadius = Math.sqrt((W * 0.5) ** 2 + (H * 0.55) ** 2);
  const scrim = sCtx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, scrimRadius);
  scrim.addColorStop(0, 'rgba(7, 6, 14, 0.20)');
  scrim.addColorStop(0.7, 'rgba(7, 6, 14, 0.68)');
  scrim.addColorStop(1, 'rgba(7, 6, 14, 0.96)');
  sCtx.fillStyle = scrim;
  sCtx.fillRect(0, 0, W, H);

  const state = {
    mode: 'focus', // 'focus' | 'short' | 'long'
    focusMin: 25,
    shortMin: 5,
    longMin: 15,
    longInterval: 4,
    timeLeft: 25 * 60,
    totalTime: 25 * 60,
    isRunning: false,
    sessions: 0,
    streak: 1,
    quote: '“It always seems impossible until it’s done.”',
    theme: 'fantasy',
    accent: '#a78bfa',
    ambientEffect: 'off',
    customBgUrl: null,
    isFocused: false,
    tasks: [
      { id: 1, title: 'Study Three.js 3D shaders & lighting', completed: true, est: 2, act: 2, prio: 'high' },
      { id: 2, title: 'Build Pomodoro focus session clone', completed: false, est: 4, act: 1, prio: 'high' },
      { id: 3, title: 'Configure ambient lo-fi soundscapes', completed: false, est: 3, act: 0, prio: 'medium' }
    ],
    activeTaskId: 2,
    listeners: new Set()
  };

  // Pre-allocated particle arrays for ambient effects (Zero GC allocations per frame)
  let ambientParticles = [];
  function initAmbientParticles(effect) {
    ambientParticles = [];
    if (!effect || effect === 'off') return;
    const count = effect === 'rain' ? 100 : effect === 'bubbles' ? 32 : effect === 'stars' ? 60 : 45;
    for (let i = 0; i < count; i++) {
      if (effect === 'rain') {
        ambientParticles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: 1.5,
          vy: 16 + Math.random() * 10,
          len: 24 + Math.random() * 18,
          r: 1.5
        });
      } else if (effect === 'bubbles') {
        ambientParticles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: -0.25 + Math.random() * 0.5,
          vy: -0.8 - Math.random(),
          r: 6 + Math.random() * 10,
          wobble: Math.random() * 6.28
        });
      } else if (effect === 'stars') {
        ambientParticles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 1.2 + Math.random() * 1.3
        });
      } else { // motes
        ambientParticles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: -0.35 + Math.random() * 0.7,
          vy: -0.4 - Math.random() * 0.8,
          r: 1.5 + Math.random() * 2
        });
      }
    }
  }

  // Audio Synthesizer for high-fidelity notifications
  let audioCtx = null;
  function playSound(type) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'start') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'pause') {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'complete') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.connect(g);
          g.connect(audioCtx.destination);
          o.frequency.setValueAtTime(freq, now + i * 0.08);
          g.gain.setValueAtTime(0.2, now + i * 0.08);
          g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
          o.start(now + i * 0.08);
          o.stop(now + i * 0.08 + 0.3);
        });
      }
    } catch (e) {}
  }

  // Timer Tick Interval
  let timerInterval = null;
  function startTicker() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      if (!state.isRunning) return;
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
        uiDirty = true;
        renderToCanvas();
        state.listeners.forEach(fn => fn(state));
      } else {
        playSound('complete');
        if (state.mode === 'focus') {
          state.sessions += 1;
          const activeTask = (state.tasks || []).find(t => t.id === state.activeTaskId);
          if (activeTask) activeTask.act += 1;
          if (state.sessions % state.longInterval === 0) {
            state.mode = 'long';
            state.totalTime = state.longMin * 60;
          } else {
            state.mode = 'short';
            state.totalTime = state.shortMin * 60;
          }
        } else {
          state.mode = 'focus';
          state.totalTime = state.focusMin * 60;
        }
        state.timeLeft = state.totalTime;
        state.isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
        uiDirty = true;
        renderToCanvas();
        state.listeners.forEach(fn => fn(state));
      }
    }, 1000);
  }

  // Pre-render static UI layer onto uiCanvas (100% 1:1 Pixel-Parity with DOM Overlay)
  function renderUiToCache() {
    const ctx = uiCanvas.getContext('2d');
    const accent = state.accent || '#a78bfa';

    ctx.clearRect(0, 0, W, H);

    // 1. Top bar: Brand "Pomodoro Timer" (left)
    // Exact DOM: left: 32px, center Y: 39.07px
    const topY = 39.07;
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 21px "Space Grotesk", Figtree, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Pomodoro Timer', 32, topY);

    // Top bar right buttons: 🔥 1, 🎨 Aesthetics, ⚙️ Settings
    // Exact DOM: height 34.1px, center Y: 39.07px
    const btnH = 34.1;

    // Settings Pill: center X = 1095.0, width = 106.0
    const setW = 106.0;
    const setX = 1042.0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(setX, topY - btnH / 2, setW, btnH, 999);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '600 13px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('⚙️ Settings', 1095.0, topY);

    // Aesthetics Pill: center X = 971.3, width = 121.4
    const aesW = 121.4;
    const aesX = 910.6;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(aesX, topY - btnH / 2, aesW, btnH, 999);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText('🎨 Aesthetics', 971.3, topY);

    // Streak Pill: center X = 866.6, width = 68.0
    const stkW = 68.0;
    const stkX = 832.6;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(stkX, topY - btnH / 2, stkW, btnH, 999);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText('🔥 ' + state.streak, 866.6, topY);

    // 2. Mode tabs: Focus 0 | Short Break 0 | Long Break 0
    // Exact DOM: center Y = 164.5px; Focus cx = 458.7, Short cx = 569.6, Long cx = 700.9
    const tabY = 164.5;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 16px "Space Grotesk", Figtree, sans-serif';

    // Focus tab
    ctx.fillStyle = state.mode === 'focus' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('Focus ' + (state.sessions || 0), 458.7, tabY);

    // Short Break tab
    ctx.fillStyle = state.mode === 'short' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('Short Break 0', 569.6, tabY);

    // Long Break tab
    ctx.fillStyle = state.mode === 'long' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('Long Break 0', 700.9, tabY);

    // Active tab underline indicator at Y = 181
    let activeX = 458.7;
    let activeW = 60.4;
    if (state.mode === 'short') { activeX = 569.6; activeW = 105.5; }
    else if (state.mode === 'long') { activeX = 700.9; activeW = 101.1; }

    ctx.fillStyle = accent;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(activeX - activeW / 2, 181, activeW, 2.5, 1.5);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Left Vertical Nav Dock (exact 62px x 224px, center Y = 391.5)
    const dockX = 55.0;
    const dockCenterY = 391.5;
    const dockW = 62.0;
    const dockH = 224.0;

    ctx.fillStyle = 'rgba(14, 10, 22, 0.72)';
    ctx.beginPath();
    ctx.roundRect(dockX - dockW / 2, dockCenterY - dockH / 2, dockW, dockH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Slot 1: 🏆 (Exact DOM center Y = 310.5)
    ctx.font = '18px sans-serif';
    ctx.fillText('🏆', dockX, 310.5);

    // Slot 2: 🔥 + streak count (Exact DOM center Y = 364.5)
    ctx.font = '14px sans-serif';
    ctx.fillText('🔥', dockX, 359);
    ctx.font = '700 11px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(state.streak), dockX, 373);

    // Slot 3: 🎨 (Exact DOM center Y = 418.5)
    ctx.font = '18px sans-serif';
    ctx.fillText('🎨', dockX, 418.5);

    // Slot 4: ⚙️ (Exact DOM center Y = 472.5)
    ctx.fillText('⚙️', dockX, 472.5);

    // 4. Circular Timer Dial (Outer Diameter 281.6px, exact center 591.2, 376.4, radius 140.8)
    const dialX = 591.2;
    const dialY = 376.4;
    const radius = 140.8;

    // Track circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 7.5;
    ctx.beginPath();
    ctx.arc(dialX, dialY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Progress arc with neon glow
    const progress = Math.min(1, Math.max(0, 1 - state.timeLeft / state.totalTime));
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (1 - progress));

    const ringGrad = ctx.createLinearGradient(dialX - radius, dialY - radius, dialX + radius, dialY + radius);
    ringGrad.addColorStop(0, '#ffffff');
    ringGrad.addColorStop(1, accent);

    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 8.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = accent;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(dialX, dialY, radius, startAngle, endAngle, false);
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // Digital countdown text: MM:SS
    // Exact DOM: center Y = 353.0px, font: 800 82px 'Space Grotesk'
    const mins = Math.floor(state.timeLeft / 60);
    const secs = state.timeLeft % 60;
    const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 82px "Space Grotesk", Figtree, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeStr, dialX, 357.0);

    // Subtitle pill inside dial: • Focus session
    // Exact DOM: center Y = 424.4px, height: 32px, radius: 999
    const pillY = 424.4;
    const pillW = 134.3;
    const pillH = 32.1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(dialX - pillW / 2, pillY - pillH / 2, pillW, pillH, 999);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Glowing dot inside pill
    ctx.fillStyle = state.isRunning ? '#34d399' : accent;
    if (state.isRunning) {
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 6;
    }
    ctx.beginPath();
    ctx.arc(dialX - 44, pillY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 13px "Space Grotesk", sans-serif';
    ctx.fillText(state.isRunning ? 'Focus in progress' : 'Focus session', dialX + 7, pillY);

    // 5. Active Task target bar (Exact DOM: center Y = 564.3, width = 389.2, height = 32.6)
    const activeTask = (state.tasks || []).find(t => t.id === state.activeTaskId) || state.tasks[0];
    if (activeTask) {
      const taskY = 564.3;
      const taskW = 389.2;
      const taskH = 32.6;
      const taskTitle = activeTask.title.length > 36 ? activeTask.title.slice(0, 36) + '...' : activeTask.title;
      const fullText = '🎯  Focusing on: ' + taskTitle + '  🍅 ' + activeTask.act + '/' + activeTask.est;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.roundRect(dialX - taskW / 2, taskY - taskH / 2, taskW, taskH, 999);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 12px "Space Grotesk", Figtree, sans-serif';
      ctx.fillText(fullText, dialX, taskY);
    }

    // 6. Motivational Quote at Exact DOM center Y = 619.2
    ctx.font = 'italic 500 24px "Playfair Display", Georgia, serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 6;
    ctx.fillText(state.quote, dialX, 619.2);
    ctx.shadowBlur = 0;

    // 7. Session Dock (Bottom floating capsule at Exact DOM: center Y = 726.4, width = 313.3, height = 57.3)
    const dockY = 726.4;
    const capW = 313.3;
    const capH = 57.3;

    ctx.fillStyle = 'rgba(14, 10, 22, 0.70)';
    ctx.beginPath();
    ctx.roundRect(dialX - capW / 2, dockY - capH / 2, capW, capH, 999);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Reset button ↺ (Exact DOM: center X = 467.3)
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('↺', 467.3, dockY);

    // Start / Pause pill button (Exact DOM: center X = 553.8, width = 106.9, height = 43.2)
    const btnW = 106.9;
    const btnHp = 43.2;
    ctx.fillStyle = accent;
    ctx.shadowColor = accent + '80';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.roundRect(553.8 - btnW / 2, dockY - btnHp / 2, btnW, btnHp, 999);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = '700 15px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#0d1e2b';
    ctx.fillText(state.isRunning ? 'Pause' : 'Start', 553.8, dockY);

    // Tasks button (Exact DOM: center X = 676.4)
    const uncompletedCount = (state.tasks || []).filter(x => !x.completed).length;
    ctx.font = '600 13.5px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('📋 Tasks (' + uncompletedCount + ')', 676.4, dockY);
  }

  // Draw an image with object-fit: cover and brightness(0.85) matching DOM overlay
  function drawCover(ctx, img, targetW, targetH) {
    if (!img || !img.naturalWidth) return false;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const imgRatio = nw / nh;
    const targetRatio = targetW / targetH;
    let sx, sy, sw, sh;
    if (imgRatio > targetRatio) {
      sh = nh;
      sw = nh * targetRatio;
      sx = (nw - sw) / 2;
      sy = 0;
    } else {
      sw = nw;
      sh = nw / targetRatio;
      sx = 0;
      sy = (nh - sh) / 2;
    }
    try {
      ctx.filter = 'brightness(0.85)';
    } catch (e) {}
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
    try {
      ctx.filter = 'none';
    } catch (e) {}
    return true;
  }

  // Draw a video frame with object-fit: cover and brightness(0.85) matching DOM overlay
  function drawVideoCover(ctx, video, targetW, targetH) {
    if (!video || !video.videoWidth) return false;
    const nw = video.videoWidth;
    const nh = video.videoHeight;
    const imgRatio = nw / nh;
    const targetRatio = targetW / targetH;
    let sx, sy, sw, sh;
    if (imgRatio > targetRatio) {
      sh = nh;
      sw = nh * targetRatio;
      sx = (nw - sw) / 2;
      sy = 0;
    } else {
      sw = nw;
      sh = nw / targetRatio;
      sx = 0;
      sy = (nh - sh) / 2;
    }
    try {
      ctx.filter = 'brightness(0.85)';
    } catch (e) {}
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetW, targetH);
    try {
      ctx.filter = 'none';
    } catch (e) {}
    return true;
  }

  // Master Render Pass: Composite background + scrim + ambient effects + cached UI
  function renderToCanvas() {
    if (uiDirty) {
      renderUiToCache();
      uiDirty = false;
    }

    const ctx = canvas.getContext('2d');
    const accent = state.accent || '#a78bfa';

    // 1. Draw Living Background with object-fit: cover
    let drawn = false;
    if (state.theme === 'lofi' && lofiVideo && lofiVideo.readyState >= 2) {
      try {
        drawn = drawVideoCover(ctx, lofiVideo, W, H);
      } catch (e) {}
    }
    if (!drawn) {
      if (bgImg.complete && bgImg.naturalWidth > 0) {
        drawCover(ctx, bgImg, W, H);
      } else {
        ctx.fillStyle = '#07060e';
        ctx.fillRect(0, 0, W, H);
      }
    }

    // 2. Pre-baked radial vignette scrim
    ctx.drawImage(scrimCanvas, 0, 0);

    // 3. Batched Ambient Particles (Rain / Bubbles / Stars / Motes)
    if (state.ambientEffect && state.ambientEffect !== 'off' && ambientParticles.length > 0) {
      if (state.ambientEffect === 'rain') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let i = 0; i < ambientParticles.length; i++) {
          const p = ambientParticles[i];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 3, p.y + p.len);
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > H + 40) { p.y = -50; p.x = Math.random() * W; }
        }
        ctx.stroke();
      } else if (state.ambientEffect === 'bubbles') {
        ctx.beginPath();
        for (let i = 0; i < ambientParticles.length; i++) {
          const p = ambientParticles[i];
          p.wobble += 0.03;
          const ox = p.x + Math.sin(p.wobble) * 3;
          ctx.moveTo(ox + p.r, p.y);
          ctx.arc(ox, p.y, p.r, 0, Math.PI * 2);
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -p.r - 10) { p.y = H + p.r + 10; p.x = Math.random() * W; }
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      } else if (state.ambientEffect === 'stars') {
        ctx.beginPath();
        for (let i = 0; i < ambientParticles.length; i++) {
          const p = ambientParticles[i];
          ctx.moveTo(p.x + p.r, p.y);
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
      } else { // motes
        ctx.beginPath();
        for (let i = 0; i < ambientParticles.length; i++) {
          const p = ambientParticles[i];
          ctx.moveTo(p.x + p.r, p.y);
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
      }
    }

    // 4. Blit pre-baked UI layer
    ctx.drawImage(uiCanvas, 0, 0);

    // 5. Notify Three.js texture to upload new frame to GPU
    if (window.__tabletLiveTexture) {
      window.__tabletLiveTexture.needsUpdate = true;
    }
  }

  // Animation Loop for Video & Ambient Effects
  let videoAnimId = null;
  let lastLoopTime = 0;

  function startVideoLoop() {
    if (videoAnimId) return;
    function vLoop(timestamp) {
      const overlayEl = typeof document !== 'undefined' ? document.querySelector('.absolute.z-20.overflow-hidden') : null;
      const isOverlayActive = overlayEl && window.getComputedStyle(overlayEl).opacity === '1';

      if (isOverlayActive) {
        videoAnimId = requestAnimationFrame(vLoop);
        return;
      }

      if ((state.theme === 'lofi' && lofiVideo && lofiVideo.readyState >= 2) || (state.ambientEffect && state.ambientEffect !== 'off')) {
        const now = timestamp || performance.now();
        if (now - lastLoopTime >= 33) {
          lastLoopTime = now;
          renderToCanvas();
        }
      }
      videoAnimId = requestAnimationFrame(vLoop);
    }
    videoAnimId = requestAnimationFrame(vLoop);
  }

  function stopVideoLoop() {
    if (videoAnimId && state.theme !== 'lofi' && (!state.ambientEffect || state.ambientEffect === 'off')) {
      cancelAnimationFrame(videoAnimId);
      videoAnimId = null;
    }
  }

  function notify() {
    uiDirty = true;
    renderToCanvas();
    state.listeners.forEach(fn => fn(state));
  }

  const engine = {
    getState() { return state; },
    setFocused(isFoc) {
      state.isFocused = !!isFoc;
      if (!isFoc) {
        if (state.theme === 'lofi' && lofiVideo) {
          lofiVideo.play().catch(() => {});
        }
        uiDirty = true;
        renderToCanvas();
      }
      notify();
    },
    subscribe(fn) {
      state.listeners.add(fn);
      return () => state.listeners.delete(fn);
    },
    toggle() {
      state.isRunning = !state.isRunning;
      playSound(state.isRunning ? 'start' : 'pause');
      if (state.isRunning) {
        startTicker();
      } else {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }
      notify();
    },
    reset() {
      state.isRunning = false;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      if (state.mode === 'focus') state.timeLeft = state.focusMin * 60;
      else if (state.mode === 'short') state.timeLeft = state.shortMin * 60;
      else state.timeLeft = state.longMin * 60;
      state.totalTime = state.timeLeft;
      notify();
    },
    setMode(mode) {
      state.mode = mode;
      state.isRunning = false;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      if (mode === 'focus') state.timeLeft = state.focusMin * 60;
      else if (mode === 'short') state.timeLeft = state.shortMin * 60;
      else state.timeLeft = state.longMin * 60;
      state.totalTime = state.timeLeft;
      notify();
    },
    setTheme(theme) {
      state.theme = theme;
      if (theme === 'lofi') {
        if (lofiVideo) lofiVideo.play().catch(() => {});
        startVideoLoop();
      } else {
        bgImg.src = themeImages[theme] || themeImages.fantasy;
        stopVideoLoop();
      }
      notify();
    },
    setCustomBg(url) {
      state.theme = 'custom';
      state.customBgUrl = url;
      bgImg.src = url;
      stopVideoLoop();
      notify();
    },
    setAccent(color) {
      state.accent = color;
      notify();
    },
    setAmbient(effect) {
      state.ambientEffect = effect;
      initAmbientParticles(effect);
      if (effect && effect !== 'off') {
        startVideoLoop();
      } else if (state.theme !== 'lofi') {
        stopVideoLoop();
      }
      notify();
    },
    setQuote(q) {
      state.quote = q;
      notify();
    },
    renderToCanvas() {
      renderToCanvas();
    }
  };

  window.PomodoroEngine = engine;

  // Initial draw once fonts/images load
  bgImg.onload = () => {
    uiDirty = true;
    renderToCanvas();
  };
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      uiDirty = true;
      renderToCanvas();
    });
  }
  startVideoLoop();
})();
