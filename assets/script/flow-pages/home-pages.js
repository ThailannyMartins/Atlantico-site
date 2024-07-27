const mody = document.getElementById("modificar")
const content = document.getElementById("content-opt")
let buttonsPages = document.getElementsByClassName("pass-page")

let open = true;
let pages = {
    "proxima partida": "index-up-game.html",
    "noticia": "",
    "listar": "listar.html",
}

mody.addEventListener('click',(e) => {
    if(open){
        content.classList.add("open")
        content.classList.remove("content-opt")
        open = false;
    }else{
        content.classList.remove("open")
        content.classList.add("content-opt")
        open = true;
    }
})

const redirect = (str) => {
    const path = pages[str] ?? './assets/pages/exception/'
    location.href = "./assets/pages/" + path;
}
for (let i = 0; i < buttonsPages.length; i++) {
    buttonsPages[i].addEventListener("click", e => {
        const text = e.target.textContent;
        redirect(text);
    })
}