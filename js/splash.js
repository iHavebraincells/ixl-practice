const text = document.getElementById("splash");

const messages = [
    { text: "yo why does school need to use ai" },
    { text: "i dont want to go to school" },
    { text: "vs code is goated" },
    { text: "snooze my alarm" },
    { text: "why is grass green 🥀" }
];

let lastmsg = -1;


function getRandomMessage() {
    if (messages.length === 1) return messages[0];

    let index;
    do {
        index = Math.floor(Math.random() * messages.length);
    } while (index === lastmsg);

    lastmsg = index;
    return messages[index];
}

function renderGifs(msg) {
    text.innerHTML = `<div class="message">${msg.text}</div>`;
}

renderGifs(getRandomMessage());

text.addEventListener("click", () => {
    renderGifs(getRandomMessage());
});