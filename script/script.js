let citas  = JSON.parse(localStorage.getItem('Citas'));
let formulario = document.getElementById('formulario');
let listarCita = document.getElementById('listarCita');
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busqueda');
let id = 0;

const capturaDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;
    id += 1;
    
    let registro = {
        nombre, 
        fecha,
        hora,
        sintomas,
        id
    }

    citas.unshift(registro);
    // console.log(citas);
    localStorage.setItem('Citas',JSON.stringify(citas));
    getLocalStorage();
}

formulario.addEventListener('submit',  e => {
    e.preventDefault();
    capturaDatos();
})

const getLocalStorage = () => {

    listarCita.innerHTML = '';

    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));
    console.log(citasLocalStorage);

    citasLocalStorage.map(cita => {
        const {nombre,fecha,hora,sintomas} = cita;
        listarCita.innerHTML += `
        <div class="card mt-1">
            <table class="table">

                    <td>${nombre}</td>
                    <td>${fecha}</td>
                    <td>${hora}</td>
                    <td>${sintomas}</td>
            </table>
        </div>
        `
    })
}

document.addEventListener('DOMContentLoaded',getLocalStorage);

buscar.addEventListener('click', e => {
    buscarItem()
})

busqueda.addEventListener('click', e =>{
    let traer = JSON.parse(localStorage.getItem('Citas'));
    if(e.target.innerHTML == "Borrar"){
        let id1 = e.target.id;
        let x;
        traer.forEach((element, index) => {
            if(element.id == id1) {
                x = index;
            }
        });
        traer.splice(x,1);
        localStorage.setItem('Citas', JSON.stringify(traer))
        getLocalStorage();

        buscarItem()
    }
})

function buscarItem(){
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('citas'))
    let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())
    busqueda.innerHTML = '';

    filtro.lenght === 0
    busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`
    ;
    (
      filtro.map(cita => { 
          const {nombre,fecha,hora,sintomas,id} = cita;
          busqueda.innerHTML += ` 
          <div style="color:white;">${nombre}</div>
          <div style="color:white;">${fecha}</div>
          <div style="color:white;">${hora}</div>
          <div style="color:white;">${sintomas}
          <button id="${id}">Borrar</Button></div><br>             
        `   
        })
    )
}

