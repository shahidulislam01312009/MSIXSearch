// ==============================
// MSIX Search Version 3.1
// Search History System Added
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


    saveHistory(text);


    document.body.style.cursor = "wait";


    setTimeout(() => {

        window.location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(text);

    }, 500);

}



// Save Search History
function saveHistory(text) {

    let history =
    JSON.parse(localStorage.getItem("msix_history")) || [];


    history = history.filter(item => item !== text);

    history.unshift(text);


    if (history.length > 10) {

        history = history.slice(0,10);

    }


    localStorage.setItem(
        "msix_history",
        JSON.stringify(history)
    );


    showHistory();

}



// Show Search History
function showHistory() {


    const historyBox =
    document.getElementById("history");


    if (!historyBox) return;


    let history =
    JSON.parse(localStorage.getItem("msix_history")) || [];


    historyBox.innerHTML = "";


    history.forEach(item => {


        let button =
        document.createElement("button");


        button.innerText = item;


        button.onclick = function(){

            input.value = item;

            searchNow();

        };


        historyBox.appendChild(button);


    });


}



// Clear History
function clearHistory(){


    localStorage.removeItem("msix_history");


    showHistory();


}



// Press Enter Search
input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        searchNow();

    }

});



// Voice Search
function startVoiceSearch(){


    if(!("webkitSpeechRecognition" in window)){

        alert("Voice Search is not supported.");

        return;

    }


    const recognition =
    new webkitSpeechRecognition();


    recognition.lang = "en-US";


    recognition.interimResults = false;


    recognition.maxAlternatives = 1;


    recognition.start();



    recognition.onresult = function(event){


        const speech =
        event.results[0][0].transcript;


        input.value = speech;


        searchNow();


    };



    recognition.onerror = function(){

        alert("Voice Search failed.");

    };


}



// Image Search
function imageSearch(){

    const text=input.value.trim();


    if(text===""){

        alert("Please type something.");

        return;

    }


    window.location.href =
    "https://www.google.com/search?tbm=isch&q="
    + encodeURIComponent(text);

}



// Video Search
function videoSearch(){

    const text=input.value.trim();


    if(text===""){

        alert("Please type something.");

        return;

    }


    window.location.href =
    "https://www.google.com/search?tbm=vid&q="
    + encodeURIComponent(text);

}



// News Search
function newsSearch(){

    const text=input.value.trim();


    if(text===""){

        alert("Please type something.");

        return;

    }


    window.location.href =
    "https://news.google.com/search?q="
    + encodeURIComponent(text);

}



// Load History When Page Opens
window.onload = function(){

    showHistory();

};



console.log("MSIX Search Version 3.1 Loaded");
