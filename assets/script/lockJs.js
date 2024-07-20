const files = document.getElementsByClassName("imgLoad")
const listImg = document.getElementsByClassName("renderizerImg");
const form = document.getElementsByClassName("form");
const btn = document.querySelector('button');
const returnbtn = document.getElementById('return-home');

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
        localStorage.setItem('img-1',e.target.result);
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
        localStorage.setItem('img-2',e.target.result);
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

    const obj = new Matcher(values[0],values[1],values[2],localStorage.getItem('img-1'),localStorage.getItem('img-2'),values[3]);

    const header = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj)
    }
    
    const request = await fetch('http://localhost:8080/neptune',header).then(response => response.json());
})
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
    constructor(tim1,tim2,loc,log1,log2,horario){
        this.localizacao = loc;
        this.teamLogoA = log1;
        this.teamLogoB = log2;
        this.nameTeamA = tim1;
        this.nameTeamB = tim2;
        this.horarioMatcher = horario;


    }
}


