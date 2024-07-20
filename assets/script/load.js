const emblems = document.getElementsByClassName("escudo-principal")
const modality = document.getElementById("modality")

function expose() {
    const search = async () => {
        const response = await fetch('http://localhost:8080/neptune').then(json => json.json()).then(json => {
            renderExpose(json)
        }
        )
    }
    search()

}
function renderExpose(e) {
    console.log(e[0].teamLogoA)
    emblems[0].src = e[0].teamLogoA;
    emblems[1].src = e[0].teamLogoB;
    modality.textContent = e[0].competicao ?? 'amistoso'
}
expose()