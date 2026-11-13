(() => {
  const measurementId = 'G-ZY5622LZME';
  const consentKey = '93seconds.analyticsConsent';
  const banner = document.getElementById('analytics-consent');
  const settingsButton = document.getElementById('analytics-settings');
  const acceptButton = document.getElementById('analytics-accept');
  const rejectButton = document.getElementById('analytics-reject');
  let choice = null;
  let tagLoaded = false;

  try {
    const saved = localStorage.getItem(consentKey);
    if (saved === 'accepted' || saved === 'rejected') choice = saved;
  } catch {
    // If storage is unavailable, keep the choice for this page view only.
  }

  const readConsent = () => {
    if (choice) return choice;
    try {
      const saved = localStorage.getItem(consentKey);
      if (saved === 'accepted' || saved === 'rejected') choice = saved;
    } catch {
      // The in-memory choice remains usable for this page view.
    }
    return choice;
  };

  const loadAnalytics = () => {
    if (tagLoaded || readConsent() !== 'accepted') return;
    tagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    const config = {};
    if (new URLSearchParams(window.location.search).get('ga_debug') === '1') {
      config.debug_mode = true;
    }
    window.gtag('config', measurementId, config);

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    tag.onerror = () => {
      tagLoaded = false;
      document.dispatchEvent(new CustomEvent('analytics:load-error'));
    };
    document.head.append(tag);
  };

  window.analyticsTrack = (eventName, parameters = {}) => {
    if (readConsent() !== 'accepted' || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  };

  const setChoice = value => {
    choice = value;
    try {
      localStorage.setItem(consentKey, value);
    } catch {
      // Consent remains active until this page is closed.
    }
    banner.hidden = true;
    settingsButton.hidden = false;
    settingsButton.setAttribute('aria-expanded', 'false');
    settingsButton.focus();
    if (value === 'accepted') loadAnalytics();
  };

  acceptButton.addEventListener('click', () => setChoice('accepted'));
  rejectButton.addEventListener('click', () => setChoice('rejected'));
  settingsButton.addEventListener('click', () => {
    banner.hidden = false;
    settingsButton.hidden = true;
    settingsButton.setAttribute('aria-expanded', 'true');
    acceptButton.focus();
  });

  if (choice === 'accepted') {
    settingsButton.hidden = false;
    loadAnalytics();
  } else if (choice === 'rejected') {
    settingsButton.hidden = false;
  } else {
    banner.hidden = false;
  }

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || !link.hash) return;
    const sectionId = decodeURIComponent(link.hash.slice(1));
    if (!sectionId || sectionId === 'top' || sectionId === 'contact') return;
    if (document.getElementById(sectionId)) {
      window.analyticsTrack('section_navigation', { section_id: sectionId });
    }
  });
})();
