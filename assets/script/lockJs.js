const files = document.getElementsByClassName("imgLoad")
const listImg = document.getElementsByClassName("renderizerImg");
const form = document.getElementsByClassName("form");
const btn = document.querySelector('button');
const returnbtn = document.getElementById('return-home');
const popOver = document.getElementById('popOver')


files[0].addEventListener("change", (ev) => {
    const read = new FileReader();
    const path = ev.target.files[0];
    const form = new FormData();
    form.append("file",path);

    try {
        verifyExtension(path.name)
    } catch (error) {
        listImg[0].src = "../../public/icons/up-page/warning.svg"
        document.getElementById("text1").textContent = "tipo não suportado";
        throw new Error('tipo não suportado')
    }
    read.onload = function (e) {
        sessionStorage.setItem('img-1',e.target.result);
        listImg[0].src = e.target.result;
        document.getElementById("text").textContent = "";

    }
    
    read.readAsDataURL(path)
})
files[1].addEventListener("change", (ev) => {
    const read = new FileReader();
    const path = ev.target.files[0];
    try {
        verifyExtension(path.name);
    } catch (error) {
        listImg[1].src = "../../public/icons/up-page/warning.svg";
        document.getElementById("text").textContent = "tipo não suportado";
        throw new Error('tipo não suportado');
    }
    read.onload = function (e) {
        sessionStorage.setItem('img-2',e.target.result);
        listImg[1].src = e.target.result;
        document.getElementById("text1").textContent = "";
    }
    read.readAsDataURL(path)
})


returnbtn.addEventListener('click',()=>{
    location.href = location.origin + '/index.html';
})

btn.addEventListener('click',async(e) => {
    e.preventDefault();
    const values = [];
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        values.push(element.value);
        
    }

    console.log(values)
    const obj = new Matcher(values[0] || null ,values[1] || null ,values[2] || null,sessionStorage.getItem('img-1'),sessionStorage.getItem('img-2'),values[3] || null,values[4]);

    const header = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj)
    }
    
    const request = await fetch('http://localhost:8082/neptune',header).then(async(response) => {
        const body = await response.json()
        activyPoP(response.status,body.mensagem)
    })
    });
    const errorText = document.getElementById("error")
    const icons = document.getElementById("icons")

function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
}
  
function verifyExtension(filename){
    if(getFileExtension(filename) !== "svg"){
        throw new Error("sem suporte a este tipo de arquivo");
    }
}

class Matcher{
    teamLogoA;
    teamLogoB;
    nameTeamA;
    nameTeamB;
    localizacao;
    competicao;
    horarioMatcher;
    constructor(tim1,tim2,loc,log1,log2,horario,compt){
        this.localizacao = loc;
        this.teamLogoA = log1;
        this.teamLogoB = log2;
        this.nameTeamA = tim1;
        this.nameTeamB = tim2;
        this.horarioMatcher = horario;
        this.competicao = compt;


    }
}
const activyPoP = (status,mensagem) => {
    const text = document.getElementById('error')
    const icons = document.getElementById('icons')
    if(status == 417){
        popOver.style.display = "flex"
        popOver.classList.add("popOverFailed");
        popOver.classList.remove("popOverSucess");
        text.textContent = mensagem      
        icons.setAttribute("src","../../../public/icons/listar/arrow-bottom-svgrepo-com 1.svg")
        setTimeout(() => {
            popOver.style.display = "none"
        },3000)
    }
    if(status == 201){
        popOver.style.display = "flex"
        popOver.classList.add("popOverSucess");
        popOver.classList.remove("popOverFailed"); 
        text.textContent = "partida atualizada"
        icons.setAttribute("src","../../../public/icons/listar/success-check-win-done-mark-good-svgrepo-com 1.svg")

        setTimeout(() => {
            popOver.style.display = "none"
        },3000)    
    }
}

