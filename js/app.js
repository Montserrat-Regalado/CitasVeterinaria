//variables/selectores

const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

let modificar = false

//contenedor para citas
const contenedorCitas = document.querySelector('#citas')


//formmulario para las nuevas citas
const formulario = document.querySelector('#nueva-cita')
formulario.addEventListener('submit', nuevaCita)

eventListener()

function eventListener() {
    mascotaInput.addEventListener('change', datosCita)
    propietarioInput.addEventListener('change', datosCita)
    telefonoInput.addEventListener('change', datosCita)
    fechaInput.addEventListener('change', datosCita)
    horaInput.addEventListener('change', datosCita)
    sintomasInput.addEventListener('change', datosCita)

}
//objeto para informacion
const citaObject = { //bolsa es del mandado
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

function datosCita(e) {
    citaObject[e.target.name] = e.target.value;
}
//Clases
class Cita {
    constructor() {
            this.citas = [] //deja de estar vacio y contiene la primer cita agregada por medio del metodo agregarcita
        }
        //agregarcita,eliminarcita,editarcita
    agregarCita(cita) { //entrada-proceso-salida // ... //cita=nombre de mascota, nombre de propietario....sintomas
        this.citas = [...this.citas, cita] //array vacio de cita= array vacio de cita + cita
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) { //25
        this.citas = this.citas.filter(cita => cita.id !== id)
            //1-2-3-4-...24-26

    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {

        //crear div
        const divAlerta = document.createElement('div')
        divAlerta.classList.add('text-center', 'alert', 'd-block', 'col-12')

        //
        if (tipo === 'error') {
            divAlerta.classList.add('alert-danger')
        } else {
            divAlerta.classList.add('alert-success')
        }

        divAlerta.textContent = mensaje
            //agregando elementos al DOM
        document.querySelector('#contenido').insertBefore(divAlerta, document.querySelector('.agregar-cita'))

        setTimeout(() => {
            divAlerta.remove()
        }, 3000)
    }

    imprimirCitas({ citas }) {
        this.limpiarHTML()

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita

            const divCita = document.createElement('div')
            divCita.classList.add('cita')
            divCita.dataset.id = id //

            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.innerHTML = `${mascota}`

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `<span class=''font-weight-bolder> Propietario: </span> ${propietario}`

            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `<span class=''font-weight-bolder> Telefono: </span> ${telefono}`

            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `<span class=''font-weight-bolder> Fecha: </span> ${fecha}`

            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `<span class=''font-weight-bolder> Hora: </span> ${hora}`

            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `<span class=''font-weight-bolder> Sintomas: </span> ${sintomas}`
                //crearboton eliminar
                //crear boton editar
            const btnEliminar = document.createElement('button')
            btnEliminar.onclick = () => eliminarCita(id) //darle funcion al boton de EliminarCita
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/> </svg> '

            const btnEditar = document.createElement('button')
            btnEditar.onclick = () => editar(cita)
            btnEditar.classList.add('btn', 'btn-info')
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg> '

            //agregando al HTML
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita)

        });
    }
    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI(); //para una variable global
const admonCitas = new Cita()


function nuevaCita(e) { //generando cita
    e.preventDefault()

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObject //object destructuring

    //validacion
    //if(mascota===null)
    //if(mascota.length===0)
    //if (!citaObject)
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return //cortar las lineas de intrucciones
    }

    if (modificar) {
        //estamos editando cita
        admonCitas.editarCita({...citaObject })

        ui.imprimirAlerta('Guardado correctamente')

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita'
        modificar = false
    } else {
        //nuevo registro

        //generar ID
        citaObject.id = Date.now //123456789218464
            //add nueva cita
        admonCitas.agregarCita({...citaObject })
            //console.log(admonCitas)

        ui.imprimirAlerta('Cita agregada correctamente')
    }
    //imprimiendo el HTML de citas
    ui.imprimirCitas(admonCitas)
        //reinicia el objeto para evitar futuros problemas de validacion
    reiniciarObjeto()
        //dejar vacios los campos de texto
    formulario.reset()
}

function reiniciarObjeto() {
    citaObject.mascota = '';
    citaObject.propietario = '';
    citaObject.telefono = '';
    citaObject.fecha = '';
    citaObject.hora = '';
    citaObject.sintomas = '';
}

function eliminarCita(id) { //25
    admonCitas.eliminarCita(id) //25
    ui.imprimirCitas(admonCitas)
}

function editar(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita

    citaObject.mascota = mascota;
    citaObject.propietario = propietario
    citaObject.telefono = telefono
    citaObject.fecha = fecha
    citaObject.hora = hora
    citaObject.sintomas = sintomas
    citaObject.id = id

    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'
    modificar = true
}