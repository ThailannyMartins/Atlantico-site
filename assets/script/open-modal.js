const modal = document.querySelector('dialog')
const btnSair = document.getElementById('btn-closer')
const btnLixeira = document.getElementById('open-modal')
const background = document.getElementById('overlay')
const layerBack = "overlay"
btnSair.addEventListener('click', () => {
    modal.style.display = "none";
    background.classList.remove(layerBack)

})
btnLixeira.addEventListener('click', () => {
    modal.style.display = "flex";
    background.classList.add(layerBack)
})