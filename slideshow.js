(() => {
  const carousel = document.querySelector('.slideshow');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.slide')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const counter = carousel.querySelector('.slide-counter');
  const playButton = carousel.querySelector('.play-button');
  const announcement = carousel.querySelector('.slide-announcement');
  const previous = carousel.querySelector('[data-action="previous"]');
  const next = carousel.querySelector('[data-action="next"]');
  let current = 0;
  let playing = false;
  let timer = null;
  let hovered = false;
  let touchStart = null;

  function show(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (announce) announcement.textContent = `Slide ${current + 1} of ${slides.length}: ${slides[current].querySelector('figcaption').textContent.replace(/\s+/g, ' ').trim()}`;
  }

  function schedule() {
    clearInterval(timer);
    timer = null;
    const focusPauses = carousel.contains(document.activeElement) && document.activeElement !== playButton;
    if (playing && !hovered && !document.hidden && !focusPauses) {
      timer = setInterval(() => show(current + 1), 5000);
    }
  }

  function setPlaying(value) {
    playing = value;
    playButton.textContent = playing ? 'Pause slideshow' : 'Play slideshow';
    playButton.setAttribute('aria-pressed', String(playing));
    schedule();
  }

  function manuallyShow(index) {
    setPlaying(false);
    show(index, true);
  }

  previous.addEventListener('click', () => manuallyShow(current - 1));
  next.addEventListener('click', () => manuallyShow(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => manuallyShow(Number(dot.dataset.slide))));
  playButton.addEventListener('click', () => {
    setPlaying(!playing);
  });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', event => {
    if (event.target !== playButton) schedule();
  });
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      manuallyShow(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  const viewport = carousel.querySelector('.slides');
  viewport.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    touchStart = {x: touch.clientX, y: touch.clientY};
  }, {passive: true});
  viewport.addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      manuallyShow(current + (dx < 0 ? 1 : -1));
    }
    touchStart = null;
  }, {passive: true});
  viewport.addEventListener('touchcancel', () => { touchStart = null; }, {passive: true});
  show(0);
})();
