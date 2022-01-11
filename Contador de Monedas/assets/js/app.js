
document.addEventListener("DOMContentLoaded" , () =>
{
    const btnAgregar = document.getElementById("agregar")
    const limpiarRegistro = document.getElementById("limpiar")

    btnAgregar.addEventListener("click", AgregarRegistro)
    limpiarRegistro.addEventListener('click', limpiarDatos)
    mostrarDatos()
    totalAPagar()
})

class Registro
{
    constructor(day, month, year, hour, minutes, cantidad)
    {
        this.day = day
        this.month = month
        this.year = year
        this.hour = hour
        this.minutes = minutes
        this.cantidad = cantidad
    }
}

function obtenerRegistro()
{
    let registro

    if (localStorage.getItem("registro") == null)
    {
        return registro = []
    }

    return registro = JSON.parse(localStorage.getItem("registro"))
}

function crearRegistro(respuesta, cantidad)
{    
    if (respuesta)
    {
        let registro = obtenerRegistro()
        let [day, month, year, hour, minutes] = obtenerDatosFecha()


        let elemento = new Registro(day, month, year, hour, minutes, cantidad)
        let operacion = 
        {
            dia: elemento.day,
            mes: elemento.month,
            anio: elemento.year,
            hora: elemento.hour,
            minutos: elemento.minutes,
            cantidad: elemento.cantidad
        }
        
        registro.push(operacion)
        localStorage.setItem("registro", JSON.stringify(registro))
    } 

    return window.location.reload()
}

function AgregarRegistro()
{
    const cantidad = parseFloat(document.getElementById("cantidad").value)
    
    if (cantidad == .5)
    {
        const respuesta = alertaCantidad(cantidad)
        crearRegistro(respuesta, cantidad)
    }

    if (cantidad == 1)
    {
        const respuesta = alertaCantidad(cantidad)
        crearRegistro(respuesta, cantidad)
    }

    if (cantidad == 2)
    {
        const respuesta = alertaCantidad(cantidad)
        crearRegistro(respuesta, cantidad)
    }

    if (cantidad == 3)
    {
        const respuesta = alertaCantidad(cantidad)
        crearRegistro(respuesta, cantidad)
    }

    if (cantidad == 5)
    {
        const respuesta = alertaCantidad(cantidad)
        crearRegistro(respuesta, cantidad)
    }

    if (cantidad == 10)
    {
        const respuesta = alertaCantidad(cantidad)
        crearRegistro(respuesta, cantidad)
    }

}

function alertaCantidad(cantidad)
{
    return confirm(`Desea agregar monedas de ${cantidad}$`)
}

function obtenerDatosFecha()
{
    let day, month, year, hour, minutes

    day = new Date().getDate()
    month = new Date().getMonth()
    year = new Date().getFullYear()
    hour = new Date().getHours()
    minutes = new Date().getMinutes()

    return [day, month, year, hour, minutes]
}

function limpiarDatos()
{
    if (localStorage.getItem("registro") == null) return alert("No se cuenta con ningun registro")

    let registro = JSON.parse(localStorage.getItem("registro"))
    let ultimoRegistro = registro.pop()

    let decision = confirm(`Desea eliminar el registro del día ${ultimoRegistro.dia}/${ultimoRegistro.mes+=1}/${ultimoRegistro.anio}`)
    if (decision)
    {
        localStorage.clear()
        return window.location.reload()
    }

    return
}

function mostrarDatos()
{
    const agregarDatos = document.getElementById("registro")
    const registro = obtenerRegistro()
    let ultimo;

    if (registro != "")
    {
        registro.forEach((element, i) => 
        {
            const datos = document.createElement("p")
            datos.style.fontWeight = "bolder"
            datos.textContent = i + 1 + "| " + element.dia + "/" + element.mes + 1 + "/" + element.anio +" | " + element.hora + ":" + element.minutos + " | "  + element.cantidad + "$" 
            agregarDatos.append(datos)
            ultimo = i
        })
    
        const dia = new Date().getDate()
        
        if ( registro[ultimo].dia != dia )
        {
            alert("Hay registros de días anteriores, limpielos antes de empezar el día")
        }
    }

    else
    {
        const datos = document.createElement("p")
        datos.style.fontStyle = "oblique"
        datos.textContent = "Sin registros"
        agregarDatos.append(datos)
    }
    
}

function totalAPagar()
{
    const elementTotal = document.getElementById("total")
    const elementchild = document.createElement("b")

    const registro = obtenerRegistro()
    let total = 0;
    
    if (registro != "")
    {
        registro.forEach(elemento => 
            {
                elemento.cantidad == .5 ? total += .5 * 50 : elemento.cantidad == 1 ? total +=  1 * 50 : elemento.cantidad == 2 ? total +=  2 * 25 : elemento.cantidad == 5 ? total +=  5 * 20 : elemento.cantidad == 10 ? total +=  10 * 10 : total = total
            })
        
        elementchild.textContent = "Total a pagar: " + total + "$"
        elementTotal.append(elementchild) 
    }
    
    else
    {
        elementchild.textContent = "Total a pagar: 0$"
        elementTotal.append(elementchild)
    }
}

