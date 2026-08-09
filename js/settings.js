const CLOAK_DECOY_URL = "https://www.ixl.com";
const framed = window.self !== window.top;

function openCloak() {
    const win = window.open('about:blank', '_blank');
    if (!win) return false;
    const doc = win.document;
    doc.title = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
    const iframe = doc.createElement('iframe');
    iframe.style.cssText = "position:fixed;inset:0;border:0;width:100%;height:100%;margin:0;";
    iframe.src = location.href;
    doc.body.style.margin = '0';
    doc.body.appendChild(iframe);
    const icon = doc.createElement('link');
    icon.rel = 'icon';
    icon.href = 'https://www.ixl.com/ixl-favicon.png';
    doc.head.appendChild(icon);
    window.location.replace(CLOAK_DECOY_URL);
    return true;
}

function cloakNow() {
    if (!openCloak()) alert('allow popups for this site, then try again');
}

function setAutoCloak(on) {
    localStorage.setItem('opt-autocloak', on ? '1' : '0');
}

function armAutoCloak() {
    const fire = () => {
        if (openCloak()) {
            window.removeEventListener('pointerdown', fire);
            window.removeEventListener('keydown', fire);
        }
    };
    window.addEventListener('pointerdown', fire);
    window.addEventListener('keydown', fire);
}

(function initSettings() {
    if (localStorage.getItem('opt-autocloak') === '1' && !framed) armAutoCloak();

    const acEl = document.getElementById('opt-anticlose');
    if (acEl) acEl.checked = localStorage.getItem('opt-anticlose') !== '0';

    const autoEl = document.getElementById('opt-autocloak');
    if (autoEl) autoEl.checked = localStorage.getItem('opt-autocloak') === '1';
})();
