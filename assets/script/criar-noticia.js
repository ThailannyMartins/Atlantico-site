const inputFile = document.getElementById("file")
const inputTitle = document.getElementById("title")
const inputDesc = document.getElementById("desc")
const btnEnviar = document.getElementById("enviar")
const btnSair  = document.getElementById("sair")
const btnEnviarImg = document.getElementById("enviar-img")
const img = document.getElementById("image")
const url = "http://localhost:8082/neptune"
onload = () => {
    img.src = JSON.parse(sessionStorage.getItem("path")) ?? "\public\icons\broken_image.svg"
}
btnSair.addEventListener("click",() => {
    location.href = location.origin + '/index.html'
})
inputFile.addEventListener('change', () => {
    const file = inputFile.files[0]
    const reader = new FileReader(file)

    reader.onload = (ev) => {
        const src = ev.target.result
        img.src = src;
    }
    reader.readAsDataURL(file)
})
btnEnviarImg.addEventListener('click', async () => {
    const file = inputFile.files[0]
    const form = new FormData()
    form.append("file", file)
    const dropPath = await pathImg(form);
    sessionStorage.setItem('path',await dropPath['path-return'])
    location.reload()


})
btnEnviar.addEventListener('click', async () => {




    const obj = {
        title: inputTitle.value,
        desc: inputDesc.value,
        path: sessionStorage.getItem('path')
    }
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(obj)
    }
    const reques = await fetch(url + "/noticias", config)
})



async function pathImg(fileForm) {
    const config = {
        method: "POST",
        body: fileForm
    }
    const fn = await fetch(url + "/uploads", config).then(response => response.json())
    return fn;
}