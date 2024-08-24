const modal = document.querySelector('dialog')
const btnSair = document.getElementById('btn-closer')
const btnSairDaPagina = document.getElementById('sair')
const btnLixeira = document.getElementById('open-modal')
const background = document.getElementById('overlay')
const box = document.getElementById('box')
const layerBack = "overlay"
const dbSession = sessionStorage 
onload = ()  => {
    const response = JSON.parse(dbSession.getItem("card"))
    const title = document.getElementById("title")
    const date = document.getElementById("date")
    const desc = document.getElementById("desc")
    const code = document.getElementById("code")
    title.textContent = response.title.replaceAll("-"," ")
    date.textContent = response.date
    desc.textContent = response.preview.replaceAll("-"," ")
    code.textContent = response.idPub
    box.src = response.path

}
btnSair.addEventListener('click', () => {
    modal.style.display = "none";
    background.classList.remove(layerBack)

})
btnLixeira.addEventListener('click', () => {
    modal.style.display = "flex";
    background.classList.add(layerBack)
})
btnSairDaPagina.addEventListener('click',() => {
    dbSession.removeItem("card")
    location.href  = "http://127.0.0.1:5500/assets/pages/noticias.html"
})




const deleteNoticia = () => {

}
