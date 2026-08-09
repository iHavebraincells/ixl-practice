function antiCloseHandler(e) {
    e.preventDefault();
    e.returnValue = '';
}

function setAntiClose(on) {
    localStorage.setItem('opt-anticlose', on ? '1' : '0');
    window.removeEventListener("beforeunload", antiCloseHandler);
    if (on) window.addEventListener("beforeunload", antiCloseHandler);
}

if (localStorage.getItem('opt-anticlose') !== '0') {
    window.addEventListener("beforeunload", antiCloseHandler);
}
