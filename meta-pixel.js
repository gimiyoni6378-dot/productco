// The pixel ID is public configuration. No access token or personal data belongs here.
(() => {
  const pixelId = document.querySelector('meta[name="meta-pixel-id"]')?.content?.trim();
  if (!/^\d+$/.test(pixelId || '') || window.__secondsMetaPixelLoaded) return;
  window.__secondsMetaPixelLoaded = true;

  if (!window.fbq) {
    const fbq = function () {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
      else fbq.queue.push(arguments);
    };
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.append(script);
  }

  // Explicit events only; do not enable automatic form/advanced matching.
  window.fbq('set', 'autoConfig', false, pixelId);
  window.fbq('init', pixelId);
  window.fbq('trackSingle', pixelId, 'PageView');

  document.addEventListener('seconds:inquiry-accepted', () => {
    try {
      window.fbq('trackSingle', pixelId, 'Lead');
    } catch { /* Advertising measurement must never interrupt the inquiry UI. */ }
  });
})();
