// Draws diagrams with Pele (https://pele.run), a Mermaid renderer whose colors come from CSS
// variables, so diagrams use the extension's palette (style.css).
//
// Write a diagram as Mermaid text in a code block inside a `pele-diagram` div:
//
//   <div className="pele-diagram">
//   ```text
//   flowchart LR
//     A --> B
//   ```
//   </div>
//
// Until Pele draws it the code block is hidden; if Pele fails to load or the text does not
// parse, the code block shows again so the diagram's text is still readable.
(function () {
  const PELE_URL = 'https://cdn.jsdelivr.net/npm/pele@1.9.0/dist/pele.global.js';
  const root = document.documentElement;
  root.classList.add('pele-loading');

  let loaded;
  let count = 0;
  function loadPele() {
    if (!loaded) {
      loaded = new Promise(function (resolve, reject) {
        if (window.pele) return resolve(window.pele);
        const script = document.createElement('script');
        script.src = PELE_URL;
        script.async = true;
        script.onload = function () { window.pele ? resolve(window.pele) : reject(new Error('pele missing')); };
        script.onerror = function () { reject(new Error('pele did not load')); };
        document.head.appendChild(script);
      });
    }
    return loaded;
  }

  function draw() {
    const pending = [...document.querySelectorAll('.pele-diagram:not([data-pele])')];
    if (!pending.length) return;
    loadPele().then(function (pele) {
      for (const box of pending) {
        if (box.dataset.pele) continue;
        const code = box.querySelector('pre code, pre');
        if (!code) continue;
        const target = document.createElement('div');
        target.className = 'pele-canvas';
        box.appendChild(target);
        // The reading column is about 600px on a laptop: keep each diagram's own direction there,
        // and turn left-to-right diagrams vertical only on phones.
        const mounted = pele.mount(target, code.textContent.trim(), { idPrefix: 'd' + (++count) + '-', directionBreakpoint: 520 });
        if (mounted.error) {
          mounted.destroy();
          target.remove();
          box.dataset.pele = 'failed';
          console.warn('Pele could not draw a diagram:', mounted.error);
        } else {
          box.dataset.pele = 'drawn';
        }
      }
      root.classList.remove('pele-loading');
    }, function (error) {
      root.classList.remove('pele-loading');
      root.classList.add('pele-unavailable');
      console.warn(error.message);
    });
  }

  // Mintlify swaps page content without a reload, so watch for new diagrams.
  let queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; draw(); });
  }).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('mintlify:navigate', draw);
  draw();
})();
