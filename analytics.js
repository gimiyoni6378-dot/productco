(() => {
  const measurementId = 'G-ZY5622LZME';
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
  document.head.append(tag);
})();