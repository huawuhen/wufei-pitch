/**
 * 《代号：雾绯》 (CODENAME: MIST & CRIMSON)
 * Interactive Web Pitch Deck Engine
 * Features:
 * 1. Global Astral Mist & Flowing Fire Particle Canvas
 * 2. Pitch Deck Keyboard Navigation (ArrowLeft / ArrowRight / Space) & Scroll Spy
 * 3. Gameplay Reference GIF Lightbox (06 界面/玩法参考)
 * 4. Mobile-First Interactivity (悬浮底栏 / 横向画廊分段器)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientMistCanvas();
  initGameplayLightbox();
  initDeckNavigation();
  initMobileExperience();
});

/* ==========================================================================
   1. Global Ambient Mist & Flowing Fire Embers Canvas
   ========================================================================== */
function initAmbientMistCanvas() {
  const canvas = document.getElementById('mist-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 58 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.45 - 0.12,
    alpha: Math.random() * 0.55 + 0.15,
    isCrimson: Math.random() > 0.48
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.isCrimson
        ? `rgba(244, 63, 94, ${p.alpha})`
        : `rgba(192, 132, 252, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.isCrimson ? '#F43F5E' : '#C084FC';
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. Pitch Deck Keyboard Navigation & Scroll Spy
   ========================================================================== */
function initDeckNavigation() {
  const sections = Array.from(document.querySelectorAll('.pitch-section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  let currentIdx = 0;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.32;
    sections.forEach((sec, idx) => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentIdx = idx;
        navLinks.forEach((a) => a.classList.remove('active'));
        if (navLinks[idx]) navLinks[idx].classList.add('active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.code === 'ArrowRight' || e.code === 'PageDown') {
      e.preventDefault();
      currentIdx = Math.min(sections.length - 1, currentIdx + 1);
      sections[currentIdx].scrollIntoView({ behavior: 'smooth' });
    } else if (e.code === 'ArrowLeft' || e.code === 'PageUp') {
      e.preventDefault();
      currentIdx = Math.max(0, currentIdx - 1);
      sections[currentIdx].scrollIntoView({ behavior: 'smooth' });
    } else if (e.code === 'Space' && e.ctrlKey) {
      e.preventDefault();
      sections[0].scrollIntoView({ behavior: 'smooth' });
    }
  });

  const deckBtn = document.getElementById('btn-deck-mode');
  if (deckBtn) {
    deckBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % sections.length;
      sections[currentIdx].scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Gameplay Reference GIF Lightbox Modal (06 界面/玩法参考 动态GIF放大检视)
   ========================================================================== */
function initGameplayLightbox() {
  const modal = document.getElementById('gp-lightbox');
  const backdrop = document.getElementById('gp-lightbox-backdrop');
  const closeBtn = document.getElementById('gp-lightbox-close');
  const imgEl = document.getElementById('gp-lightbox-img');
  const titleEl = document.getElementById('gp-lightbox-title');
  const triggers = document.querySelectorAll('.gp-ref-card[data-lightbox-src]');

  if (!modal || !imgEl) return;

  function openModal(src, title) {
    imgEl.src = src;
    if (titleEl) titleEl.textContent = title || '';
    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
  }

  triggers.forEach((el) => {
    el.addEventListener('click', () => {
      openModal(
        el.dataset.lightboxSrc,
        el.dataset.lightboxTitle
      );
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. Mobile-First Interactivity (移动端专属交互增强)
   ========================================================================== */
function initMobileExperience() {
  // A. 移动端悬浮底栏双向同步与平滑滚动
  const mobileNav = document.getElementById('mobile-bottom-nav');
  if (mobileNav) {
    const navItems = mobileNav.querySelectorAll('.mobile-nav-item');
    const sections = Array.from(navItems)
      .map((item) => {
        const secId = item.getAttribute('href').replace('#', '');
        return document.getElementById(secId);
      })
      .filter(Boolean);

    window.addEventListener(
      'scroll',
      () => {
        const scrollPos = window.scrollY + window.innerHeight * 0.35;
        sections.forEach((sec, idx) => {
          if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            navItems.forEach((b) => b.classList.remove('active'));
            if (navItems[idx]) navItems[idx].classList.add('active');
          }
        });
      },
      { passive: true }
    );

    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // B. 03 宿命男主移动端画廊分段器与指示点联动
  const charTabs = document.querySelectorAll('.mobile-char-tab');
  const charOverview = document.getElementById('char-cards-overview');
  const charDots = document.querySelectorAll('#char-carousel-indicator .m-dot');

  if (charOverview && charTabs.length > 0) {
    const cards = charOverview.querySelectorAll('.char-vertical-card');

    charTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = Number(tab.dataset.charIdx || 0);
        charTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        if (cards[idx]) {
          cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        if (charDots[idx]) {
          charDots.forEach((d) => d.classList.remove('active'));
          charDots[idx].classList.add('active');
        }
      });
    });

    charOverview.addEventListener(
      'scroll',
      () => {
        const scrollLeft = charOverview.scrollLeft;
        const cardWidth = cards[0]?.offsetWidth || 280;
        const activeIdx = Math.round(scrollLeft / (cardWidth + 14));
        if (charTabs[activeIdx]) {
          charTabs.forEach((t) => t.classList.remove('active'));
          charTabs[activeIdx].classList.add('active');
        }
        if (charDots[activeIdx]) {
          charDots.forEach((d) => d.classList.remove('active'));
          charDots[activeIdx].classList.add('active');
        }
      },
      { passive: true }
    );
  }

  // C. 04 三联实机框移动端滑动分段器
  const framePills = document.querySelectorAll('#mobile-frame-pills .m-frame-pill');
  const framesContainer = document.getElementById('dungeon-frames');

  if (framesContainer && framePills.length > 0) {
    const frames = framesContainer.querySelectorAll('.vertical-916-frame');

    framePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const idx = Number(pill.dataset.frameIdx || 0);
        framePills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        if (frames[idx]) {
          frames[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });

    framesContainer.addEventListener(
      'scroll',
      () => {
        const scrollLeft = framesContainer.scrollLeft;
        const frameWidth = frames[0]?.offsetWidth || 280;
        const activeIdx = Math.round(scrollLeft / (frameWidth + 14));
        if (framePills[activeIdx]) {
          framePills.forEach((p) => p.classList.remove('active'));
          framePills[activeIdx].classList.add('active');
        }
      },
      { passive: true }
    );
  }
}
