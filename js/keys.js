(function () {
"use strict";

function decodeBase64(value) {
    try {
        return atob(value);
    } catch (error) {
        console.error("Failed to decode API key:", error);
        return "";
    }
}

const encodedKeys = {
    gemini: "QVEuQWI4Uk42Sms3c0hZY0ctTzNZUm9oSnFXZ1ZiLWJYaC1MYmlyc2Zmb1J2SkU0QnhQaWc",
};

window.AI_KEYS = {
    gemini: decodeBase64(encodedKeys.gemini),
};


window.AI_MODELS = {
    "gemini-flash": "gemini-3.8-flash",
    "gemini-pro": "gemini-3.1-pro",
    "gemini-flash-lite": "gemini-3.5-flash-lite",
};

console.log("registered");

})();