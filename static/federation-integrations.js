// NextXus Federation Integration Pack v1.1 — Four UI Fixes
window.FED_CONFIG = {
  googleClientId: "134917241648-9goc8mcat23m1qkts62ujnq723a81n2v.apps.googleusercontent.com",
  geminiApiKey: "",
  version: "1.1.0",
  federation: "NextXus",
  sites: ["nextxus.tech","nextxus.online","nextxus.org","nextxus.studio","nextxus.help","next-xus.com","nextxus.space"]
};

window.FED_GOOGLE_CLIENT_ID = window.FED_CONFIG.googleClientId;

window.FED_NAV = [
  {label:"The Throne",url:"https://nextxus.tech"},
  {label:"The Core",url:"https://nextxus.online"},
  {label:"The Library",url:"https://nextxus.org"},
  {label:"The Sanctuary",url:"https://nextxus.studio"},
  {label:"The University",url:"https://nextxus.help"},
  {label:"The Storefront",url:"https://next-xus.com"},
  {label:"The Space",url:"https://nextxus.space"}
];

// ============================================================
// FIX 2: ORBOT PANEL — Toggle logic
// ============================================================
function initOrbot() {
  var btn = document.getElementById('orbot-tour-btn');
  var panel = document.getElementById('orbot-panel');
  var overlay = document.getElementById('orbot-overlay');
  var closeBtn = document.getElementById('orbot-close');

  if (!btn || !panel) return;

  function openOrbot() {
    panel.classList.add('active');
    if (overlay) overlay.classList.add('active');
  }
  function closeOrbot() {
    panel.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  btn.addEventListener('click', openOrbot);
  if (closeBtn) closeBtn.addEventListener('click', closeOrbot);
  if (overlay) overlay.addEventListener('click', closeOrbot);

  // Orbot tour stop navigation
  var stops = panel.querySelectorAll('[data-orbot-target]');
  stops.forEach(function(stop) {
    stop.addEventListener('click', function() {
      var target = this.getAttribute('data-orbot-target');
      var el = document.querySelector(target);
      closeOrbot();
      if (el) {
        setTimeout(function() {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    });
  });

  // Wire any existing cinema/video buttons to open Orbot
  var cinemaButtons = document.querySelectorAll('[class*="cinema"], [data-action="cinema"], [data-action="tour"], .cinema-btn, .video-trigger');
  cinemaButtons.forEach(function(b) {
    b.addEventListener('click', function(e) {
      e.preventDefault();
      openOrbot();
    });
  });
}

// ============================================================
// FIX 3: AUDIO DURATION — Load metadata + display real duration
// ============================================================
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds) || !isFinite(seconds) || seconds <= 0) return '--:--';
  var m = Math.floor(seconds / 60);
  var s = Math.floor(seconds % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function initAudioDuration() {
  var audios = document.querySelectorAll('audio');
  audios.forEach(function(audio) {
    var durationSpan = audio.parentElement
      ? audio.parentElement.querySelector('.nx-audio-duration')
      : null;
    if (!durationSpan) return;

    function updateDuration() {
      durationSpan.textContent = formatDuration(audio.duration);
    }

    // If metadata already loaded
    if (audio.readyState >= 1 && audio.duration > 0) {
      updateDuration();
    } else {
      // Listen for loadedmetadata
      audio.addEventListener('loadedmetadata', updateDuration);
      // Also handle durationchange for streaming sources
      audio.addEventListener('durationchange', function() {
        if (audio.duration > 0 && isFinite(audio.duration)) {
          updateDuration();
        }
      });
    }

    // Ensure the placeholder shows --:-- not 0:00
    if (durationSpan.textContent === '0:00' || durationSpan.textContent === '0:00/0:00') {
      durationSpan.textContent = '--:--';
    }
  });
}

// ============================================================
// FIX 1: MOBILE MAP BUTTON — Scroll to Federation nav on tap
// ============================================================
function initMobileMap() {
  var mapBtn = document.getElementById('nx-mobile-map-btn');
  if (!mapBtn) return;

  mapBtn.addEventListener('click', function() {
    // Try to find an existing Master Map panel, otherwise scroll to the nav
    var mapPanel = document.querySelector('[class*="master-map"], [class*="MasterMap"], .nx-master-map, .federation-map, .master-map-panel');
    if (mapPanel) {
      mapPanel.style.display = mapPanel.style.display === 'none' ? 'block' : 'none';
    } else {
      // Fallback: scroll to Federation nav links
      var nav = document.querySelector('.nx-universal-nav');
      if (nav) nav.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ============================================================
// INIT — Run after DOM ready
// ============================================================
function initFederationFixes() {
  initOrbot();
  initAudioDuration();
  initMobileMap();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFederationFixes);
} else {
  initFederationFixes();
}

console.log("[NextXus Federation] Integration Pack v1.1 loaded — 4 UI fixes active.");
