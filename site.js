(() => {
  document.querySelectorAll('[data-print-resume]').forEach(button => {
    // button.addEventListener('click', () => window.print());
    button.addEventListener('click', () => {
      let preview = document.getElementById('resume-pdf-preview');
    
      if (!preview) {
        preview = document.createElement('dialog');
        preview.id = 'resume-pdf-preview';
        preview.setAttribute('aria-label', 'Résumé preview');
    
        preview.style.cssText = `
          width: min(900px, 92vw);
          padding: 20px;
          border: 0;
          border-radius: 16px;
          background: #101827;
          color: white;
        `;
    
        preview.innerHTML = `
          <form method="dialog"
                style="text-align: right; margin-bottom: 12px;">
            <button type="submit" class="button" autofocus>
              Close
            </button>
          </form>
    
          <iframe
            src="assets/resume_mchen.pdf"
            title="Résumé PDF"
            style="display: block; width: 100%; height: 65vh;
                   border: 0; background: white;">
          </iframe>
    
          <p>
            <a class="text-link" href="assets/resume_mchen.pdf"
               target="_blank" rel="noopener">
              Open PDF in a new tab
            </a>
          </p>
        `;
    
        document.body.appendChild(preview);
      }
    
      if (!preview.open) preview.showModal();
    });
  });
})();

// Alternating timeline, matching the supplied 2D reference's central fill rail.
// Layout stays still; only the text moves 14px, keeping nodes pinned to the rail.
(() => {
  function startTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track) return;
    const entries = [...track.querySelectorAll('.timeline-entry')];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!entries.length || motion.matches || typeof window.requestAnimationFrame !== 'function' ||
        typeof window.cancelAnimationFrame !== 'function') return;
    let frame = 0;
    function cleanup() {
      window.cancelAnimationFrame(frame); frame = 0;
      ['scroll', 'resize', 'hashchange', 'pageshow', 'load'].forEach(name => window.removeEventListener(name, schedule));
      window.removeEventListener('pagehide', pause);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('focusin', onFocus);
      if (motion.removeEventListener) motion.removeEventListener('change', onMotion);
    }
    function showAll() {
      track.classList.remove('timeline-motion');
      entries.forEach(entry => { entry.classList.add('timeline-visible'); entry.classList.remove('timeline-active'); });
      cleanup();
    }
    function update() {
      frame = 0;
      try {
        // The standalone résumé view hides the homepage without unloading it.
        if (!track.getClientRects().length) return;
        const rect = track.getBoundingClientRect();
        if (!rect.height) return;
        const midpoint = window.innerHeight * .5;
        const progress = Math.min(1, Math.max(0, (midpoint - rect.top) / rect.height));
        track.style.setProperty('--timeline-progress', progress.toFixed(5));
        entries.forEach(entry => {
          const dotY = entry.getBoundingClientRect().top + 12;
          if (dotY < midpoint + 40) entry.classList.add('timeline-visible');
          entry.classList.toggle('timeline-active', dotY < midpoint + 40 && dotY > midpoint - 140);
        });
      } catch (_) { showAll(); }
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    function pause() { window.cancelAnimationFrame(frame); frame = 0; }
    function onVisibility() { if (document.hidden) pause(); else schedule(); }
    function onMotion(event) { if (event.matches) showAll(); }
    function onFocus(event) {
      const entry = entries.find(entry => entry.contains(event.target));
      if (entry) {
        entry.classList.add('timeline-visible');
        // A keyboard destination should be readable immediately.
        const copy = entry.querySelector('.timeline-copy');
        if (copy) copy.style.transition = 'none';
      }
    }
    try {
      window.addEventListener('scroll', schedule, {passive: true});
      ['resize', 'hashchange', 'pageshow', 'load'].forEach(name => window.addEventListener(name, schedule));
      window.addEventListener('pagehide', pause);
      document.addEventListener('visibilitychange', onVisibility);
      document.addEventListener('focusin', onFocus);
      if (motion.addEventListener) motion.addEventListener('change', onMotion);
      track.classList.add('timeline-motion');
      schedule();
    } catch (_) { showAll(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startTimeline, {once: true});
  else startTimeline();
})();

// A visual access-terminal intro; no credentials or fingerprint data are used.
// 360ms per key, a 2.6s scan, access granted, then sliding panels reveal the site.
(() => {
  function startIntro() {
    const intro = document.getElementById('site-intro');
    const typed = document.getElementById('intro-typed-name');
    const status = document.getElementById('intro-status-text');
    const skip = document.querySelector('[data-skip-intro]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hash = window.location.hash;
    if (!intro || !typed || !status || !skip || motion.matches || document.hidden ||
        (hash && hash !== '#home') || typeof intro.showModal !== 'function') return;

    const name = 'Melinda Chen';
    const keyDelay = 360, scanDuration = 2600, entryDuration = 900;
    const keys = [...intro.querySelectorAll('[data-intro-key]')];
    const timers = new Set();
    let index = 0, finished = false, leaving = false;

    function later(fn, delay) {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!finished && !leaving) {
          try { fn(); } catch (_) { finish(); }
        }
      }, delay);
      timers.add(timer);
    }
    function clearTimers() { timers.forEach(clearTimeout); timers.clear(); }
    function finish() {
      if (finished) return;
      finished = true;
      clearTimers();
      keys.forEach(key => key.classList.remove('is-pressed'));
      document.documentElement.classList.remove('intro-active');
      if (intro.open) intro.close();
      intro.hidden = true;
      intro.classList.remove('intro-entering', 'intro-skipping', 'is-scanning', 'is-granted');
    }
    function enter(automatic = false) {
      if (finished || leaving) return;
      leaving = true;
      clearTimers();
      intro.classList.add(automatic ? 'intro-entering' : 'intro-skipping');
      // This timeout also clears the dialog if transition events are lost.
      const timer = setTimeout(finish, automatic ? entryDuration + 50 : 230);
      timers.add(timer);
    }
    function scan() {
      intro.classList.add('is-scanning');
      status.textContent = 'Scanning fingerprint…';
      later(() => {
        intro.classList.remove('is-scanning');
        intro.classList.add('is-granted');
        status.textContent = 'Access granted';
        later(() => enter(true), 900);
      }, scanDuration);
    }
    function typeLetter() {
      const letter = name[index++];
      typed.textContent = name.slice(0, index);
      const key = keys.find(key => key.dataset.introKey === letter.toUpperCase());
      if (key) {
        key.classList.add('is-pressed');
        later(() => key.classList.remove('is-pressed'), 190);
      }
      if (index < name.length) later(typeLetter, keyDelay);
      else later(scan, 400);
    }

    skip.addEventListener('click', () => enter());
    intro.addEventListener('cancel', event => { event.preventDefault(); enter(); });
    intro.addEventListener('close', finish);
    intro.addEventListener('transitionend', event => {
      if (leaving && event.target === intro && event.propertyName === 'opacity') finish();
    });
    window.addEventListener('pagehide', finish, {once: true});
    window.addEventListener('hashchange', finish, {once: true});
    document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
    if (motion.addEventListener) motion.addEventListener('change', event => { if (event.matches) finish(); });
    try {
      intro.style.setProperty('--scan-duration', scanDuration + 'ms');
      intro.hidden = false;
      intro.showModal();
      document.documentElement.classList.add('intro-active');
      status.textContent = 'Entering identity…';
      later(typeLetter, 500);
      later(finish, 13000);
    } catch (_) { finish(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startIntro, {once: true});
  else startIntro();
})();

// Finder folders open an accessible, movable project notes window.
// The classified vault adds a short, purely visual opening interaction.
(() => {
  function startFinder() {
    const dialog = document.getElementById('project-window');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const body = document.getElementById('project-window-body');
    const title = document.getElementById('project-window-title');
    const bar = document.getElementById('project-window-bar');
    const dock = document.getElementById('project-dock');
    const restore = document.getElementById('project-restore');
    const restoreLabel = document.getElementById('project-restore-label');
    const links = [...document.querySelectorAll('[data-open-project]')];
    const expand = dialog.querySelector('[data-window-action="expand"]');
    if (!body || !title || !bar || !dock || !restore || !restoreLabel || !expand) return;
    let current = '', opener = null, drag = null, offset = {x:0,y:0};
    const vault = document.getElementById('project-vault');
    const vaultContent = document.getElementById('vault-content');
    const gate = document.getElementById('vault-gate');
    const unlock = document.getElementById('vault-unlock');
    const unlockLabel = document.getElementById('vault-unlock-label');
    const seal = document.getElementById('vault-seal');
    const vaultStatus = document.getElementById('vault-status-text');
    const staticHint = document.getElementById('vault-static-hint');
    const vaultMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hasVault = vault && vaultContent && gate && unlock && unlockLabel && seal && vaultStatus;
    let vaultTimer = 0;
    function setVaultOpen(open, focus = false) {
      if (!hasVault) return;
      clearTimeout(vaultTimer); vaultTimer = 0;
      vault.classList.remove('vault-is-opening');
      vault.classList.toggle('vault-is-open', open);
      vaultContent.hidden = !open; vaultContent.inert = !open;
      vaultContent.setAttribute('aria-hidden', String(!open));
      gate.hidden = open; seal.hidden = !open;
      if (staticHint) staticHint.hidden = true;
      unlock.disabled = false; unlockLabel.textContent = 'Open vault';
      unlock.setAttribute('aria-expanded', String(open));
      vaultStatus.textContent = open ? '3 dossiers / Vault open' : 'Vault sealed';
      if (focus) {
        const target = open ? links.find(link => link.classList.contains('dossier-file')) : unlock;
        if (target) target.focus({preventScroll:true});
      }
    }
    function unlockVault() {
      if (!hasVault || vaultTimer || vault.classList.contains('vault-is-open')) return;
      if (vaultMotion.matches) { setVaultOpen(true, true); return; }
      unlock.disabled = true; unlockLabel.textContent = 'Unlocking…';
      vaultStatus.textContent = 'Releasing project files…';
      // Content appears behind the sliding access panel and becomes interactive
      // only when the short opening animation is complete.
      vaultContent.hidden = false;
      vault.classList.add('vault-is-opening');
      vaultTimer = setTimeout(() => setVaultOpen(true, true), 850);
    }
    if (hasVault) {
      unlock.addEventListener('click', unlockVault);
      seal.addEventListener('click', () => { dialog.querySelectorAll('video').forEach(video => video.pause());closeProject(); setVaultOpen(false, true); });
      if (vaultMotion.addEventListener) vaultMotion.addEventListener('change', event => {
        if (event.matches && vaultTimer) setVaultOpen(true);
      });
      window.addEventListener('pagehide', () => { if (vaultTimer) setVaultOpen(true); });
      setVaultOpen(false);
    }

    function setExpanded(value) {
      dialog.classList.toggle('is-expanded', value);
      expand.setAttribute('aria-pressed', String(value));
      expand.setAttribute('aria-label', value ? 'Restore window size' : 'Expand project');
      expand.title = value ? 'Restore window size' : 'Expand';
      offset = {x:0,y:0}; dialog.style.transform = ''; drag = null;
    }
    function syncLinks() {
      links.forEach(link => link.setAttribute('aria-expanded', String(dialog.open && link.dataset.openProject === current)));
    }
    function openProject(key, source, restoring = false) {
      const record = document.getElementById('project-' + key);
      if (!record) return false;
      const heading = record.querySelector('.project-record-title');
      if (!heading) return false;
      setVaultOpen(true);
      if (!restoring || key !== current) {
        const copy = record.cloneNode(true); copy.removeAttribute('id');
        body.replaceChildren(copy); title.textContent = heading.textContent;
        body.scrollTop = 0; setExpanded(false);
      }
      if (source) opener = source;
      current = key; dock.hidden = true; dialog.hidden = false;
      try {
        if (!dialog.open) dialog.showModal();
      } catch (_) {
        dialog.hidden = true;
        document.documentElement.classList.remove('finder-ready');
        record.scrollIntoView({block:'start'});
        return false;
      }
      document.documentElement.classList.add('project-window-active');
      syncLinks();
      dialog.querySelector('[data-window-action="close"]').focus({preventScroll:true});
      return true;
    }
    function closeProject(minimize = false) {
      if (minimize && current) {
        restoreLabel.textContent = 'Restore file: ' + title.textContent;
        dock.hidden = false;
      } else dock.hidden = true;
      if (dialog.open) dialog.close();
      dialog.hidden = true;
      document.documentElement.classList.remove('project-window-active');
      drag = null; syncLinks();
      const target = minimize ? restore : opener;
      if (target && target.isConnected) target.focus({preventScroll:true});
    }
    links.forEach(link => {
      link.setAttribute('aria-haspopup','dialog');
      link.setAttribute('aria-controls','project-window');
      link.setAttribute('aria-expanded','false');
      link.addEventListener('click', event => {
        // Keep modifier-click and ordinary anchors available.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
        event.preventDefault(); openProject(link.dataset.openProject, link);
      });
    });
    dialog.querySelectorAll('[data-window-action]').forEach(button => button.addEventListener('click', () => {
      if (button.dataset.windowAction === 'expand') setExpanded(!dialog.classList.contains('is-expanded'));
      else closeProject(button.dataset.windowAction === 'minimize');
    }));
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
    dialog.addEventListener('close', () => {
      dialog.hidden = true; document.documentElement.classList.remove('project-window-active'); syncLinks();
    });
    restore.addEventListener('click', () => openProject(current, null, true));
    // Drag only the title bar; modal focus and body scrolling remain native.
    bar.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('button') || dialog.classList.contains('is-expanded')) return;
      const rect = dialog.getBoundingClientRect();
      drag = {id:event.pointerId, x:event.clientX, y:event.clientY, offset:{...offset}, rect};
      bar.setPointerCapture(event.pointerId); event.preventDefault();
    });
    bar.addEventListener('pointermove', event => {
      if (!drag || drag.id !== event.pointerId) return;
      const r=drag.rect;
      const dx=Math.max(8-r.left, Math.min(window.innerWidth-8-r.right, event.clientX-drag.x));
      const dy=Math.max(8-r.top, Math.min(window.innerHeight-8-r.bottom, event.clientY-drag.y));
      offset={x:drag.offset.x+dx,y:drag.offset.y+dy};
      dialog.style.transform=`translate(${offset.x}px, ${offset.y}px)`;
    });
    ['pointerup','pointercancel','lostpointercapture'].forEach(name => bar.addEventListener(name, () => {drag=null;}));
    window.addEventListener('resize', () => {offset={x:0,y:0}; dialog.style.transform=''; drag=null;});
    function onProjectHash() {
      const hash = window.location.hash;
      if (dialog.open) closeProject();
      dock.hidden = true;
      if (hash.startsWith('#project-')) {
        const key = hash.slice(9);
        const source = links.find(link => link.dataset.openProject === key);
        if (source) { source.scrollIntoView({block:'center'}); openProject(key, source); }
      }
    }
    window.addEventListener('hashchange', onProjectHash);
    window.addEventListener('pagehide', () => closeProject());
    document.documentElement.classList.add('finder-ready');
    onProjectHash();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startFinder, {once:true});
  else startFinder();
})();

// Course dossiers loop seamlessly; the original list stays readable without JS.
(() => {
  function startCourses() {
    const ticker = document.getElementById('course-ticker');
    const track = document.getElementById('course-track');
    const group = document.getElementById('course-group');
    const control = document.getElementById('course-playback');
    const help = document.getElementById('courses-scroll-help');
    if (!ticker || !track || !group || !control || !help) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clone = group.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.add('course-clone');
    clone.setAttribute('aria-hidden', 'true');
    // Course cards contain no controls; the repeated visual copy is inert.
    clone.inert = true;
    track.append(clone);
    let userPaused = false;
    function updatePlayback() {
      const manual = userPaused || motion.matches;
      let offset = ticker.scrollLeft;
      const groupWidth = group.getBoundingClientRect().width;
      if (ticker.classList.contains('is-running')) {
        const matrix = window.getComputedStyle(track).transform.match(/^matrix(3d)?\(([^)]+)\)$/);
        if (matrix) {
          const x = Number(matrix[2].split(',')[matrix[1] ? 12 : 4]);
          if (Number.isFinite(x)) offset = Math.max(0, -x);
        }
      }
      ticker.classList.toggle('is-running', !manual);
      ticker.classList.toggle('is-manual', manual);
      control.hidden = motion.matches;
      control.setAttribute('aria-pressed', String(userPaused));
      control.querySelector('span').textContent = userPaused ? 'Resume scroll' : 'Pause scroll';
      help.textContent = manual ? 'Scroll or swipe to browse the courses.' : 'Hover or focus to pause. Use Pause scroll to browse by hand.';
      // Preserve the current course when changing between the moving track
      // and the native scrollable list, rather than snapping to the first file.
      if (manual) ticker.scrollLeft = groupWidth ? offset % groupWidth : 0;
      else {
        const duration = parseFloat(window.getComputedStyle(ticker).getPropertyValue('--course-loop-duration')) || 46;
        track.style.setProperty('--course-loop-offset', (groupWidth ? -duration * offset / groupWidth : 0) + 's');
        ticker.scrollLeft = 0;
      }
    }
    control.addEventListener('click', () => { userPaused = !userPaused; updatePlayback(); });
    if (motion.addEventListener) motion.addEventListener('change', updatePlayback);
    // Stop motion while this section is outside the viewport or the tab is hidden.
    let onScreen = true;
    function updateVisibility() { ticker.classList.toggle('is-offscreen', !onScreen || document.hidden); }
    if (typeof window.IntersectionObserver === 'function') {
      const observer = new window.IntersectionObserver(entries => {
        onScreen = entries.some(entry => entry.isIntersecting); updateVisibility();
      }, {rootMargin:'40px'});
      observer.observe(ticker);
    }
    document.addEventListener('visibilitychange', updateVisibility);
    updatePlayback(); updateVisibility();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startCourses, {once:true});
  else startCourses();
})();
