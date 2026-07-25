// ==============================
// MSIX Search Version 3.0
// ==============================

const input = document.getElementById("search");

// Main Search
function searchNow() {

    const text = input.value.trim();

    if (text === "") {
        alert("Please type something to search.");
        input.focus();
        return;
    }

    // Save Search History
    let history = JSON.parse(localStorage.getItem("msix_history")) || [];

    history = history.filter(item => item !== text);
    history.unshift(text);

    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    localStorage.setItem("msix_history", JSON.stringify(history));

    document.body.style.cursor = "wait";

    setTimeout(() => {
        window.location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(text);
    }, 500);

}

// Press Enter to Search
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchNow();
    }
});

// Voice Search
function startVoiceSearch() {

    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice Search is not supported in this browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {

        const speech = event.results[0][0].transcript;

        input.value = speech;

        searchNow();
    };

    recognition.onerror = function () {
        alert("Voice Search failed.");
    };

}

// Image Search
function imageSearch() {

    const text = input.value.trim();

    if (text === "") {
        alert("Please type something.");
        return;
    }

    window.location.href =
        "https://www.google.com/search?tbm=isch&q=" +
        encodeURIComponent(text);

}

// Video Search
function videoSearch() {

    const text = input.value.trim();

    if (text === "") {
        alert("Please type something.");
        return;
    }

    window.location.href =
        "https://www.google.com/search?tbm=vid&q=" +
        encodeURIComponent(text);

}

// News Search
function newsSearch() {

    const text = input.value.trim();

    if (text === "") {
        alert("Please type something.");
        return;
    }

    window.location.href =
        "https://news.google.com/search?q=" +
        encodeURIComponent(text);

}

console.log("MSIX Search Version 3 Loaded");
