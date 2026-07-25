// ==============================
// MSIX Search Version 3.0
// ==============================

const input = document.getElementById("search");

// Search Function
function searchNow() {

    let text = input.value.trim();

    if (text === "") {
        alert("Please type something to search.");
        input.focus();
        return;
    }

    // Save Search History
    let history = JSON.parse(localStorage.getItem("msix_history")) || [];

    if (!history.includes(text)) {
        history.unshift(text);

        if (history.length > 10) {
            history.pop();
        }

        localStorage.setItem("msix_history", JSON.stringify(history));
    }

    // Loading
    document.body.style.cursor = "wait";

    setTimeout(function () {

        window.location.href =
        "https://www.google.com/search?q=" +
        encodeURIComponent(text);

    },600);

}

// Enter Key Search
input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        searchNow();
    }

});

// Show History in Console
console.log(
JSON.parse(localStorage.getItem("msix_history"))
);
// ==============================
// Voice Search
// ==============================

function startVoiceSearch(){

    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice Search is not supported on this browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = function(){
        alert("🎤 Speak now...");
    };

    recognition.onresult = function(event){

        let speech = event.results[0][0].transcript;

        document.getElementById("search").value = speech;

        searchNow();
    };

    recognition.onerror = function(){
        alert("Voice Search failed.");
    };

}
