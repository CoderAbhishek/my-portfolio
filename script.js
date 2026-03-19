/* ============================================================
   ABHISHEK VINOD — PORTFOLIO SCRIPTS
   File: script.js
   All interactive behaviour lives here.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────
     1. TYPING EFFECT
     To change the phrases shown in the hero,
     just edit the array below.
  ──────────────────────────────────────────── */
  const phrases = [
    'Strategy Consultant',
    'MBA Analytics',
    'AI Tools Builder',
    'Full-Stack Engineer',
    'BI & Data Analyst',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  const typedEl = document.getElementById('typed-text');

  function type() {
    const currentPhrase = phrases[phraseIndex];
    typedEl.textContent = isDeleting
      ? currentPhrase.slice(0, --charIndex)
      : currentPhrase.slice(0, ++charIndex);

    // Finished typing — pause, then start deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      return setTimeout(type, 1900);
    }

    // Finished deleting — move to next phrase
    if (isDeleting && charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 44 : 82);
  }

  setTimeout(type, 700); // initial delay before typing starts


  /* ────────────────────────────────────────────
     2. SCROLL REVEAL ANIMATION
     Elements with class "reveal" fade up when
     they enter the viewport.
  ──────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


  /* ────────────────────────────────────────────
     3. TOOL CARD — RADIAL MOUSE GLOW
     Each AI tool card gets a subtle glow that
     follows the user's cursor.
  ──────────────────────────────────────────── */
  document.querySelectorAll('.tool-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', x);
      card.style.setProperty('--my', y);
    });
  });


  /* ────────────────────────────────────────────
     4. NAVIGATION SHADOW ON SCROLL
     Adds a drop-shadow to the sticky nav once
     the user scrolls past the top.
  ──────────────────────────────────────────── */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 2px 30px rgba(0, 0, 0, 0.45)'
      : 'none';
  }, { passive: true });

});
