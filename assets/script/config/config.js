const config = {
    themes : ["dark","light"],
    routes : {
        url : [],
        paths : []
    },
}
onload = (e) => {
    localStorage.setItem("config",JSON.stringify(config))
}
