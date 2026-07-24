function searchNow(){
    let text=document.getElementById("search").value;

    if(text==""){
        alert("Please type something.");
        return;
    }

    window.location.href="https://www.google.com/search?q="+encodeURIComponent(text);
}
