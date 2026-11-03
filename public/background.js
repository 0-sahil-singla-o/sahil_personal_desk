/* ==========================================================================
   ANIMATED BACKGROUND: injects the field markup and draws the dust particles.
   Include once per page: <script src="background.js" defer></script>
   Requires tokens.css and background.css. All colours and settings are read from tokens,
   and they are re-read whenever <html data-theme> or <html class> changes (dark/light switch).
   API: window.BgField.pause() / resume() / refresh() / setTheme('dark' | 'light')
   ========================================================================== */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function token(name) { 
    return getComputedStyle(root).getPropertyValue(name).trim(); 
  }
  function num(name, fallback) { 
    var v = parseFloat(token(name)); 
    return isNaN(v) ? fallback : v; 
  }
  function toRgb(value) {
    if (!value) return [255, 255, 255];
    if (value.charAt(0) === '#') {
      var h = value.slice(1);
      if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
      var n = parseInt(h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    var m = value.match(/[\d.]+/g);
    return m && m.length >= 3 ? [+m[0], +m[1], +m[2]] : [255, 255, 255];
  }

  function mount() {
    var field = document.querySelector('.bg-field');
    if (!field) {
      field = document.createElement('div');
      field.className = 'bg-field';
      field.setAttribute('aria-hidden', 'true');
      field.innerHTML =
        '<div class="bg-blob bg-blob-3"></div><div class="bg-blob bg-blob-5"></div>' +
        '<div class="bg-blob bg-blob-1"></div><div class="bg-blob bg-blob-4"></div>' +
        '<div class="bg-blob bg-blob-2"></div><canvas class="bg-dust"></canvas>';
      document.body.insertBefore(field, document.body.firstChild);
    }
    return field.querySelector('.bg-dust');
  }

  function start() {
    var canvas = mount();
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var pool = [], minCount = 100, maxCount = 190, area = 8500, parallax = 16, radiusMin = 0.5, haloAlpha = 0.14; 
    var w = 0, h = 0, dpr = 1, parts = [], mx = 0, my = 0, tx = 0, ty = 0; 
    var paused = reduce, raf = 0, resizeTimer = 0, themeTimer = 0; 

    function readTokens() { 
      var colors = [1, 2, 3, 4, 5].map(function (i) { return toRgb(token('--color-bg-dust-' + i)); }); 
      var weights = [4, 3, 1, 1, 1]; 
      pool = []; 
      weights.forEach(function (wt, i) { 
        for (var k = 0; k < wt; k++) pool.push(colors[i]); 
      }); 
      minCount = num('--bg-dust-count-min', 100); 
      maxCount = num('--bg-dust-count-max', 190); 
      area = num('--bg-dust-area-per-particle', 8500); 
      parallax = num('--bg-dust-parallax', 16); 
      radiusMin = num('--bg-dust-radius-min', 0.5); 
      haloAlpha = num('--bg-dust-halo-alpha', 0.14); 
    } 

    function build() { 
      readTokens(); 
      dpr = Math.min(window.devicePixelRatio || 1, 2); 
      w = window.innerWidth; 
      h = window.innerHeight; 
      canvas.width = w * dpr; 
      canvas.height = h * dpr; 
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
      var n = Math.max(minCount, Math.min(maxCount, Math.round(w * h / area))); 
      parts = []; 
      for (var i = 0; i < n; i++) { 
        var z = 0.2 + Math.random() * 0.8; /* depth: 0.2 far, 1 near */ 
        parts.push({ 
          x: Math.random() * w, 
          y: Math.random() * h, 
          z: z, 
          r: radiusMin + z * 1.1, /* nearer = bigger */ 
          v: 0.05 + Math.random() * 0.12, /* upward drift speed */ 
          a: 0.35 + Math.random() * 0.5, /* base opacity */ 
          s: 0.5 + Math.random() * 1.5, /* twinkle speed */ 
          ph: Math.random() * 6.28, /* twinkle phase */ 
          c: pool[Math.floor(Math.random() * pool.length)] || [255, 255, 255]
        }); 
      } 
    } 

    function rgba(c, a) { 
      return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')'; 
    } 

    function frame(t) { 
      ctx.clearRect(0, 0, w, h); 
      mx += (tx - mx) * 0.04; 
      my += (ty - my) * 0.04; 
      for (var i = 0; i < parts.length; i++) { 
        var p = parts[i]; 
        if (!paused) { 
          p.y -= p.v * p.z; 
          p.x += Math.sin(t / 4000 + p.ph) * 0.04 * p.z; 
          if (p.y < -4) { 
            p.y = h + 4; 
            p.x = Math.random() * w; 
          } 
        } 
        var twinkle = 0.55 + 0.45 * Math.sin(t / 1000 * p.s + p.ph); 
        var alpha = p.a * twinkle * (0.4 + 0.6 * p.z); /* nearer = brighter */ 
        var px = p.x + mx * p.z * parallax, py = p.y + my * p.z * parallax; 
        ctx.fillStyle = rgba(p.c, alpha); 
        ctx.beginPath(); 
        ctx.arc(px, py, p.r, 0, 6.2832); 
        ctx.fill(); 
        if (p.z > 0.85) { /* halo on the nearest ones */ 
          ctx.fillStyle = rgba(p.c, alpha * haloAlpha); 
          ctx.beginPath(); 
          ctx.arc(px, py, p.r * 3.2, 0, 6.2832); 
          ctx.fill(); 
        } 
      } 
      if (!reduce) raf = requestAnimationFrame(frame); 
    } 

    function refresh() { 
      build(); 
      if (reduce) frame(0); 
    } 

    build(); 
    raf = requestAnimationFrame(frame); 

    window.addEventListener('resize', function () { 
      clearTimeout(resizeTimer); 
      resizeTimer = setTimeout(refresh, 150); 
    }); 

    if (!reduce) { 
      window.addEventListener('pointermove', function (e) { 
        tx = e.clientX / w - 0.5; 
        ty = e.clientY / h - 0.5; 
      }); 
      document.addEventListener('visibilitychange', function () { 
        if (document.hidden) cancelAnimationFrame(raf); 
        else raf = requestAnimationFrame(frame); 
      }); 
    } 

    /* Re-read the dust tokens whenever the theme changes */ 
    new MutationObserver(function () { 
      clearTimeout(themeTimer); 
      themeTimer = setTimeout(refresh, 60); 
    }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] }); 

    window.BgField = { 
      pause: function () { 
        paused = true; 
        root.classList.add('bg-paused'); 
      }, 
      resume: function () { 
        if (reduce) return; 
        paused = false; 
        root.classList.remove('bg-paused'); 
      }, 
      refresh: refresh, 
      setTheme: function (mode) { 
        root.setAttribute('data-theme', mode === 'light' ? 'light' : 'dark'); 
        try { 
          localStorage.setItem('theme', mode === 'light' ? 'light' : 'dark'); 
        } catch (e) {} 
      } 
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
