(function () {
  const themeImages = {
    fantasy: '/bg-fantasy.webp',
    pastel: '/bg-pastel.webp',
    lofi: '/bg-lofi.webp',
    cyberpunk: '/bg-cyberpunk.webp'
  };

  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.src = themeImages.fantasy;

  // Video element for animated lofi theme
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

  const canvas = document.createElement('canvas');
  canvas.width = 1180;
  canvas.height = 783;
  window.__pomodoroCanvas = canvas;

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
    quote: "“It always seems impossible until it’s done.”",
    theme: 'fantasy', // 'fantasy' | 'pastel' | 'lofi' | 'cyberpunk' | 'custom'
    accent: '#a78bfa', // '#a78bfa', '#60a5fa', '#2dd4bf', '#a3e635', '#fb7185', '#f2c879'
    ambientEffect: 'off', // 'off' | 'motes' | 'stars' | 'rain' | 'bubbles'
    customBgUrl: null,
    tasks: [
      { id: 1, title: 'Study Three.js 3D shaders & lighting', completed: true, est: 2, act: 2, prio: 'high' },
      { id: 2, title: 'Build Pomodoro focus session clone', completed: false, est: 4, act: 1, prio: 'high' },
      { id: 3, title: 'Configure ambient lo-fi soundscapes', completed: false, est: 3, act: 0, prio: 'medium' }
    ],
    activeTaskId: 2,
    listeners: new Set()
  };

  window.__pomodoro = state;

  // Ambient particles on the 3D desk canvas
  let ambientParticles = [];
  function initAmbientParticles(eff) {
    ambientParticles = [];
    if (!eff || eff === 'off') return;
    const count = eff === 'rain' ? 140 : eff === 'bubbles' ? 36 : eff === 'stars' ? 70 : 60;
    for (let i = 0; i < count; i++) {
      ambientParticles.push({
        x: Math.random() * 1180,
        y: Math.random() * 783,
        r: eff === 'bubbles' ? 5 + Math.random() * 12 : eff === 'rain' ? 1.5 : 1.5 + Math.random() * 2.5,
        vy: eff === 'rain' ? 14 + Math.random() * 8 : eff === 'bubbles' ? -0.8 - Math.random() * 1.2 : -0.2 - Math.random() * 0.4,
        vx: eff === 'rain' ? 1.5 : (Math.random() - 0.5) * 0.3,
        len: eff === 'rain' ? 24 + Math.random() * 16 : 0,
        a: 0.35 + Math.random() * 0.5,
        wobble: Math.random() * 6.28
      });
    }
  }

  function playSound(kind) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.2, now);
      if (kind === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.start(now);
        osc.stop(now + 1.8);
      } else if (kind === 'chime') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.12);
        osc.frequency.setValueAtTime(783.99, now + 0.24);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
        osc.start(now);
        osc.stop(now + 1.4);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {}
  }

  function renderToCanvas() {
    const ctx = canvas.getContext('2d');
    const w = 1180;
    const h = 783;
    const accent = state.accent || '#a78bfa';

    // 1. Draw Living Background (Video for lofi, image for others)
    let drawn = false;
    if (state.theme === 'lofi' && lofiVideo && lofiVideo.readyState >= 2) {
      try {
        ctx.drawImage(lofiVideo, 0, 0, w, h);
        drawn = true;
      } catch (e) {}
    }
    if (!drawn) {
      if (bgImg.complete && bgImg.naturalWidth > 0) {
        ctx.drawImage(bgImg, 0, 0, w, h);
      } else {
        ctx.fillStyle = '#07060e';
        ctx.fillRect(0, 0, w, h);
      }
    }

    // 2. Scrim radial vignette gradient
    const scrim = ctx.createRadialGradient(w * 0.5, h * 0.45, 120, w * 0.5, h * 0.45, 680);
    scrim.addColorStop(0, 'rgba(7, 6, 14, 0.2)');
    scrim.addColorStop(0.7, 'rgba(7, 6, 14, 0.68)');
    scrim.addColorStop(1, 'rgba(7, 6, 14, 0.96)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, w, h);

    // 2B. Draw Ambient Particles on Canvas
    if (state.ambientEffect && state.ambientEffect !== 'off' && ambientParticles.length > 0) {
      for (const p of ambientParticles) {
        if (state.ambientEffect === 'rain') {
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + (p.a * 0.7) + ')';
          ctx.lineWidth = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 3, p.y + p.len);
          ctx.stroke();
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > h + 30) { p.y = -40; p.x = Math.random() * w; }
        } else if (state.ambientEffect === 'bubbles') {
          p.wobble += 0.03;
          const ox = p.x + Math.sin(p.wobble) * 3;
          ctx.beginPath();
          ctx.arc(ox, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (p.a * 0.2) + ')';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + (p.a * 0.7) + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -p.r - 5) { p.y = h + p.r + 5; p.x = Math.random() * w; }
        } else if (state.ambientEffect === 'stars') {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + p.a + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else { // motes
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
      }
    }

    // 3. Top bar: Brand "Pomodoro Timer" (left)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Space Grotesk", Figtree, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Pomodoro Timer', 42, 38);

    // 3B. Top bar right buttons: 🔥 1, 🎨 Aesthetics, ⚙️ Settings
    // (EXACTLY MATCHING FOCUSED VIEW!)
    const rY = 38;

    // Settings Pill
    const setW = 104;
    const setX = w - 42 - setW;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(setX, rY - 15, setW, 30, 15);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '600 13px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('⚙️ Settings', setX + setW / 2, rY);

    // Aesthetics Pill
    const aesW = 114;
    const aesX = setX - 10 - aesW;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(aesX, rY - 15, aesW, 30, 15);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    ctx.fillText('🎨 Aesthetics', aesX + aesW / 2, rY);

    // Streak Pill
    const stkW = 58;
    const stkX = aesX - 10 - stkW;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(stkX, rY - 15, stkW, 30, 15);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    ctx.fillText('🔥 ' + state.streak, stkX + stkW / 2, rY);

    // 4. Mode tabs at top: Focus 0 | Short Break 0 | Long Break 0
    const tabY = 156;
    ctx.textAlign = 'center';
    ctx.font = '600 16px "Space Grotesk", Figtree, sans-serif';
    const cx = w / 2;

    ctx.fillStyle = state.mode === 'focus' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('Focus ' + state.sessions, cx - 150, tabY);

    ctx.fillStyle = state.mode === 'short' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('Short Break 0', cx, tabY);

    ctx.fillStyle = state.mode === 'long' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('Long Break 0', cx + 150, tabY);

    // Accent underline on active tab
    let activeTabX = cx - 150;
    let tabWidth = 84;
    if (state.mode === 'short') { activeTabX = cx; tabWidth = 118; }
    else if (state.mode === 'long') { activeTabX = cx + 150; tabWidth = 114; }

    ctx.shadowColor = accent;
    ctx.shadowBlur = 12;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(activeTabX - tabWidth / 2, tabY + 8, tabWidth, 2.5, 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 5. Left Vertical Nav Dock (EXACT REPLICA FROM POMODOROTIMER.ONLINE)
    const dockX = 42;
    const dockCenterY = h / 2 - 10;
    ctx.fillStyle = 'rgba(14, 10, 22, 0.72)';
    ctx.beginPath();
    ctx.roundRect(dockX - 22, dockCenterY - 88, 44, 176, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dock icons
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px sans-serif';
    ctx.fillText('🏆', dockX, dockCenterY - 52);

    ctx.font = '13px sans-serif';
    ctx.fillText('🔥', dockX, dockCenterY - 20);
    ctx.font = '700 10px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(state.streak), dockX, dockCenterY - 7);

    // Palette icon
    ctx.font = '16px sans-serif';
    ctx.fillText('🎨', dockX, dockCenterY + 18);

    // Gear icon
    ctx.fillText('⚙️', dockX, dockCenterY + 54);

    // 6. Dial (Circular progress ring)
    const dialX = cx;
    const dialY = 356;
    const radius = 138;

    // Track circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(dialX, dialY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Progress arc
    const progress = Math.min(1, Math.max(0, 1 - state.timeLeft / state.totalTime));
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (1 - progress));

    const ringGrad = ctx.createLinearGradient(dialX - radius, dialY - radius, dialX + radius, dialY + radius);
    ringGrad.addColorStop(0, '#ffffff');
    ringGrad.addColorStop(1, accent);

    ctx.shadowColor = accent;
    ctx.shadowBlur = 16;
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(dialX, dialY, radius, startAngle, endAngle, false);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 7. Large digital countdown text: MM:SS
    const mins = Math.floor(state.timeLeft / 60);
    const secs = state.timeLeft % 60;
    const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 82px "Space Grotesk", Figtree, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeStr, dialX, dialY - 10);

    // Subtitle pill: • Focus session
    const pillY = dialY + 52;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(dialX - 68, pillY - 13, 136, 26, 13);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = state.isRunning ? '#34d399' : accent;
    ctx.beginPath();
    ctx.arc(dialX - 44, pillY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.font = '600 13px "Space Grotesk", Figtree, sans-serif';
    ctx.fillText(state.isRunning ? 'Focus in progress' : 'Focus session', dialX + 6, pillY);

    // 7B. ACTIVE TASK TARGET BAR (MATCHING FOCUSED VIEW!)
    const activeTask = (state.tasks || []).find(t => t.id === state.activeTaskId) || state.tasks[0];
    if (activeTask) {
      const taskY = dialY + 92;
      const taskTitle = activeTask.title.length > 36 ? activeTask.title.slice(0, 36) + '...' : activeTask.title;
      const fullText = '🎯 Focusing on: ' + taskTitle + '  🍅 ' + activeTask.act + '/' + activeTask.est;

      ctx.font = '600 12px "Space Grotesk", Figtree, sans-serif';
      const tw = ctx.measureText(fullText).width;
      const bw = Math.max(260, tw + 28);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.roundRect(cx - bw / 2, taskY - 13, bw, 26, 13);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(fullText, cx, taskY);
    }

    // 8. Motivational Quote
    ctx.font = 'italic 500 23px "Playfair Display", Georgia, serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(state.quote, cx, 584);

    // 9. Bottom floating dock
    const dockY = 684;
    ctx.fillStyle = 'rgba(14, 10, 22, 0.72)';
    ctx.beginPath();
    ctx.roundRect(cx - 150, dockY - 24, 300, 48, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Reset button
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('↺', cx - 105, dockY);

    // Start pill button
    ctx.shadowColor = accent + '80';
    ctx.shadowBlur = 18;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(cx - 50, dockY - 17, 100, 34, 17);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = '700 15px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#0d1e2b';
    ctx.fillText(state.isRunning ? 'Pause' : 'Start', cx, dockY);

    // Tasks button
    const uncompletedCount = (state.tasks || []).filter(x => !x.completed).length;
    ctx.font = '600 13px "Space Grotesk", Figtree, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('📋 Tasks (' + uncompletedCount + ')', cx + 90, dockY);

    // Update Three.js texture if bound
    if (window.__tabletScreenTexture) {
      window.__tabletScreenTexture.needsUpdate = true;
    }
    if (window.__tabletLiveTexture) {
      window.__tabletLiveTexture.needsUpdate = true;
    }
    if (window.__invalidateDesk) {
      window.__invalidateDesk();
    }
  }

  bgImg.onload = () => {
    renderToCanvas();
  };

  if (lofiVideo) {
    lofiVideo.onloadeddata = () => {
      if (state.theme === 'lofi') renderToCanvas();
    };
  }

  let timerInterval = null;
  let videoAnimId = null;

  function startVideoLoop() {
    if (videoAnimId) return;
    function vLoop() {
      if ((state.theme === 'lofi' && lofiVideo && lofiVideo.readyState >= 2) || (state.ambientEffect && state.ambientEffect !== 'off')) {
        renderToCanvas();
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
    renderToCanvas();
    state.listeners.forEach(fn => fn(state));
  }

  const engine = {
    getState() { return state; },
    subscribe(fn) {
      state.listeners.add(fn);
      return () => state.listeners.delete(fn);
    },
    toggle() {
      playSound('click');
      if (state.isRunning) {
        this.pause();
      } else {
        this.start();
      }
    },
    start() {
      if (state.isRunning) return;
      state.isRunning = true;
      notify();
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (state.timeLeft <= 1) {
          clearInterval(timerInterval);
          state.isRunning = false;
          playSound('bell');
          if (state.mode === 'focus') {
            state.sessions += 1;
            state.streak += 1;
            state.mode = 'short';
            state.timeLeft = state.shortMin * 60;
            state.totalTime = state.shortMin * 60;
          } else {
            state.mode = 'focus';
            state.timeLeft = state.focusMin * 60;
            state.totalTime = state.focusMin * 60;
          }
          notify();
          return;
        }
        state.timeLeft -= 1;
        notify();
      }, 1000);
    },
    pause() {
      state.isRunning = false;
      if (timerInterval) clearInterval(timerInterval);
      notify();
    },
    reset() {
      playSound('click');
      this.pause();
      const dur = state.mode === 'focus' ? state.focusMin : state.mode === 'short' ? state.shortMin : state.longMin;
      state.timeLeft = dur * 60;
      state.totalTime = dur * 60;
      notify();
    },
    setMode(m) {
      playSound('click');
      this.pause();
      state.mode = m;
      const dur = m === 'focus' ? state.focusMin : m === 'short' ? state.shortMin : state.longMin;
      state.timeLeft = dur * 60;
      state.totalTime = dur * 60;
      notify();
    },
    skip() {
      playSound('click');
      this.pause();
      if (state.mode === 'focus') {
        state.sessions += 1;
        if (state.sessions % state.longInterval === 0) {
          this.setMode('long');
        } else {
          this.setMode('short');
        }
      } else {
        this.setMode('focus');
      }
    },
    setQuote(q) {
      state.quote = q;
      notify();
    },
    setTheme(t) {
      playSound('click');
      state.theme = t;
      if (t === 'lofi' && lofiVideo) {
        lofiVideo.play().catch(() => {});
        startVideoLoop();
      } else {
        stopVideoLoop();
        if (themeImages[t]) {
          bgImg.src = themeImages[t];
        }
      }
      notify();
    },
    setAccent(c) {
      playSound('click');
      state.accent = c;
      notify();
    },
    setAmbientEffect(e) {
      playSound('click');
      state.ambientEffect = e;
      initAmbientParticles(e);
      if (e !== 'off') {
        startVideoLoop();
      } else {
        stopVideoLoop();
      }
      notify();
    },
    setCustomBg(url) {
      playSound('click');
      state.theme = 'custom';
      state.customBgUrl = url;
      bgImg.src = url;
      stopVideoLoop();
      notify();
    },
    renderToCanvas
  };

  window.PomodoroEngine = engine;
  renderToCanvas();
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => { renderToCanvas(); });
  }
  setTimeout(renderToCanvas, 500);
  setTimeout(renderToCanvas, 1500);
  setTimeout(renderToCanvas, 3000);
})();
