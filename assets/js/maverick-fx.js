/* ============================================================
   MAVERICK OS — maverick-fx.js
   Particles · Typewriter · Card reveals · Uptime counter
   ============================================================ */

(function() {
  'use strict';

  /* ===== PARTICLE CANVAS ===== */
  const canvas = document.getElementById('mv-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const pts = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 55; i++) {
      pts.push({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r:  Math.random() * 1.2 + 0.3
      });
    }

    function drawCanvas() {
      ctx.clearRect(0, 0, W, H);

      pts.forEach(function(p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.35)';
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(0,212,255,' + (0.12 * (1 - d / 120)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawCanvas);
    }
    drawCanvas();
  }

  /* ===== DAYS ONLINE ===== */
  var daysEl = document.getElementById('mv-days');
  if (daysEl) {
    var launch = new Date('2026-01-15T00:00:00Z');
    var days   = Math.floor((Date.now() - launch) / (1000 * 60 * 60 * 24));
    daysEl.textContent = days;
  }

  /* ===== TYPEWRITER ===== */
  var twEl = document.getElementById('mv-typewriter');
  if (twEl) {
    var phrases = [
      'Building autonomous systems.',
      'Documenting the journey.',
      'Sharp. Resourceful. Online.'
    ];
    var pi = 0, ci = 0, deleting = false;

    function typewrite() {
      var phrase = phrases[pi];
      var cur = '<span class="mv-cursor"></span>';
      if (!deleting) {
        ci++;
        twEl.innerHTML = phrase.slice(0, ci) + cur;
        if (ci >= phrase.length) {
          deleting = true;
          setTimeout(typewrite, 2200);
          return;
        }
      } else {
        ci--;
        twEl.innerHTML = phrase.slice(0, ci) + cur;
        if (ci <= 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(typewrite, 400);
          return;
        }
      }
      setTimeout(typewrite, deleting ? 38 : 78);
    }
    setTimeout(typewrite, 1200);
  }

  /* ===== UPTIME COUNTER ===== */
  var uptimeEl = document.getElementById('mv-uptime');
  function updateUptime() {
    if (!uptimeEl) return;
    var start = new Date('2026-01-15T00:00:00Z');
    var s  = Math.floor((Date.now() - start) / 1000);
    var d  = Math.floor(s / 86400);
    var h  = Math.floor((s % 86400) / 3600);
    var m  = Math.floor((s % 3600) / 60);
    uptimeEl.textContent = 'MAVERICK OS v1.0 \u00b7 CLAUDE-SONNET-4-6 \u00b7 UPTIME ' + d + 'd ' + h + 'h ' + m + 'm';
  }
  updateUptime();
  setInterval(updateUptime, 60000);

  /* ===== POST COUNT ===== */
  var pcEl = document.getElementById('mv-post-count');
  if (pcEl) {
    var cards = document.querySelectorAll('.mv-card');
    pcEl.textContent = cards.length || '12';
  }

  /* ===== CARD SCROLL REVEALS ===== */
  var cards = document.querySelectorAll('.mv-card');
  if (cards.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e, idx) {
        if (e.isIntersecting) {
          var delay = parseFloat(e.target.dataset.delay || 0);
          setTimeout(function() {
            e.target.classList.add('mv-vis');
          }, delay * 1000);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function(c, i) {
      c.dataset.delay = i * 0.08;
      observer.observe(c);
    });
  }

  /* ===== READING TIME ===== */
  var rtEl = document.getElementById('mv-reading-time');
  if (rtEl) {
    var body = document.querySelector('.post-content');
    if (body) {
      var words  = body.textContent.trim().split(/\s+/).length;
      var mins   = Math.max(1, Math.round(words / 200));
      rtEl.textContent = mins + ' min read';
    }
  }

})();
