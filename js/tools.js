const IXL_TITLE = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";

function normUrl(v) {
    v = (v || '').trim();
    if (!v) return '';
    if (!/^[a-z]+:\/\//i.test(v)) v = 'https://' + v;
    return v;
}

function frameDoc(url) {
    return '<!DOCTYPE html><html><head><title>' + IXL_TITLE +
        '</title><link rel="icon" href="https://www.ixl.com/ixl-favicon.png">' +
        '<style>html,body{margin:0;height:100%;overflow:hidden;background:#000}' +
        'iframe{position:fixed;inset:0;border:0;width:100%;height:100%}</style></head>' +
        '<body><iframe src="' + url + '" allowfullscreen></iframe></body></html>';
}

function b64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function b64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
}

function showOut(id, text) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.classList.add('show');
}

function copyOut(id, btn) {
    const el = document.getElementById(id);
    const text = el.textContent;
    if (!text) return;
    navigator.clipboard && navigator.clipboard.writeText(text);
    const label = btn.textContent;
    btn.textContent = 'copied';
    setTimeout(() => { btn.textContent = label; }, 1200);
}

function dataUrlFor(url) {
    return 'data:text/html;base64,' + b64Encode(frameDoc(url));
}

function dataGen() {
    const url = normUrl(document.getElementById('dg-url').value);
    if (!url) return;
    showOut('dg-out', dataUrlFor(url));
}

function dataOpen() {
    const url = normUrl(document.getElementById('dg-url').value);
    if (!url) return;
    window.open(dataUrlFor(url), '_blank');
}

function blankLaunch() {
    const url = normUrl(document.getElementById('ab-url').value);
    if (!url) return;
    const win = window.open('about:blank', '_blank');
    if (!win) { alert('allow popups for this site, then try again'); return; }
    win.document.write(frameDoc(url));
    win.document.close();
}

function rawGen() {
    const html = document.getElementById('rh-in').value;
    if (!html) return;
    showOut('rh-out', 'data:text/html;base64,' + b64Encode(html));
}

function rawOpen() {
    const html = document.getElementById('rh-in').value;
    if (!html) return;
    window.open('data:text/html;base64,' + b64Encode(html), '_blank');
}

function b64(mode) {
    const inp = document.getElementById('b6-in').value;
    let out;
    try {
        out = mode === 'enc' ? b64Encode(inp) : b64Decode(inp);
    } catch (e) {
        out = 'invalid input';
    }
    showOut('b6-out', out);
}

function urlc(mode) {
    const inp = document.getElementById('ue-in').value;
    let out;
    try {
        out = mode === 'enc' ? encodeURIComponent(inp) : decodeURIComponent(inp);
    } catch (e) {
        out = 'invalid input';
    }
    showOut('ue-out', out);
}

const DISGUISES = {
    classroom: { title: 'Home', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    docs: { title: 'Google Docs', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
    drive: { title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
    clever: { title: 'Clever | Portal', icon: 'https://clever.com/favicon.ico' },
    reset: { title: IXL_TITLE, icon: 'https://www.ixl.com/ixl-favicon.png' }
};

function disguise(kind) {
    const d = DISGUISES[kind];
    if (!d) return;
    document.title = d.title;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = d.icon;
}
