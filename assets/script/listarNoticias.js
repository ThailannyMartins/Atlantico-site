const formNav = document.querySelector('form')
const inputName = document.getElementById('title')
const inputDate = document.getElementById('date')
const loadCard = document.getElementById('news-image')
const btnSair = document.getElementById('exist')
const dbLocal = localStorage
const dbSession = sessionStorage


onload = () => {
    fn();
    renderizerAll();
}



const fn = async () => {
    const response = await fetch("/assets/script/db.json").then(response => response.json());
    dbSession.clear()
    dbSession.setItem("responses", JSON.stringify(response))
}

const revertDate = (date) => {
    let dateArray = date.split("/");
    dateArray.reverse()
    let newString = dateArray.join("/")
    return newString;
}
formNav.addEventListener('submit', (e) => {
    e.preventDefault()
    const valueTitle = inputName.value || "all"
    const valueDate = inputDate.value.replaceAll("-", "/") || "all"

    renderizerPartial(valueTitle, valueDate);

})

btnSair.addEventListener("click",() => {
    location.href = location.origin + "/index.html"
})

function renderizerAll() {
    let responses = JSON.parse(sessionStorage.getItem("responses"));
    loadCard.innerHTML = ''
    responses.forEach(element => {
        const card =
            `       
        <div class="card" 
        data-titulo=${element.title.replaceAll(" ","-")}
        data-desc=${element.preview.replaceAll(" ","-")}
        data-date=${element.date}
        data-id=${element.idPublic} 
        
        >
            <h1>${element.title}</h1>
            <img src="${element.img}" class="load" alt="">
        </div>

        `
        loadCard.innerHTML += card
        const cards = document.getElementsByClassName("card")
        for (let i = 0; i < cards.length; i++) {
            const element = cards[i];
            element.parentElement.addEventListener('click', (e) => {
                const element = e.target
                const title = element.dataset.titulo
                const idPub = element.dataset.id
                const preview = element.dataset.desc
                const date = element.dataset.date


                const cardData = {
                    title,
                    idPub,
                    preview,
                    date
                }

                dbSession.setItem("card", JSON.stringify(cardData))
                location.href = location.origin + "/assets/pages/noticia.html";
            })

        }
    });
}

function renderizerPartial(condition1, condition2) {
    let responses = JSON.parse(sessionStorage.getItem("responses"));
    if (condition1 !== "all") {
        responses = responses.filter(e => e.title === condition1);
    } if (condition2 !== "all") {
        responses = responses.filter(e => e.date === condition2);
    }
    loadCard.innerHTML = ''
    responses.forEach(element => {
        const card =
            `       
        <div class="card" 
        data-id="${element.idPublic}"
        data-desc="${element.preview.replaceAll(" ","-")}"
        data-titulo="${element.title.replaceAll(" ","-")}"
        data-date="${element.date}"
        
        >
            <h1>${element.title}</h1>
            <img src="${element.img}" class="load" alt="">
        </div>

        `
        loadCard.innerHTML += card
        const cards = document.getElementsByClassName("card")
        for (let i = 0; i < cards.length; i++) {
            const element = cards[i];
            element.addEventListener('click', (e) => {
                const element = e.target

                const title = element.dataset.titulo
                const idP = element.dataset.idP
                const preview = element.dataset.desc
                const date = element.dataset.date

                const cardData = {
                    title,
                    idP,
                    preview,
                    date
                }

                dbSession.setItem("card", JSON.stringify(cardData))
                location.href = location.origin + "/assets/pages/noticia.html"
            })
        }
    })
}
