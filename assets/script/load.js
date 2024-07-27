const emblems = document.getElementsByClassName("escudo-principal")
const cardsImages = document.getElementsByClassName('expired-images')
const modality = document.getElementById("modality")

const url = 'http://localhost:8082/neptune'

function exposePartida() {
    const search = async () => {
        const response = await fetch(url).then(json => json.json()).then(json => {
            renderPartida(json)
        }
        )
    }
    search()
}
function exposeNoticia() {
    const search = async () => {
        const response = await fetch(url + "/noticias").then(json => json.json()).then(json => {
            sessionStorage.setItem('response', JSON.stringify(json))
            renderNoticia()
        }
        )
    }
    search()
}

function renderPartida(e) {

    emblems[0].src = e[0].teamLogoA;
    emblems[1].src = e[0].teamLogoB;
    modality.textContent = e[0].competicao ?? 'amistoso'
    for (let i = 0; i < emblems.length; i++) {
        const classList = emblems[i].classList.remove('load')

    }
}
function renderNoticia() {
    const responses = JSON.parse(sessionStorage.getItem('response'))
    for (let i = 0; i < responses.length; i++) {
        cardsImages[i].src = responses[i].path ?? '';

    }
}


exposeNoticia()
exposePartida()

























