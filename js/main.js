document.addEventListener("DOMContentLoaded", () => {
    fetchDatos() //llama a funcion para traer datos del JSON
    filtroProductos(".buscarProductos",".card")
})

const fetchDatos = async () => {//Funcion para traer platos disponibles desde archivo JSON
    try {
        const res = await fetch('../database/db.json')
        const data = await res.json()
        mostrarPlatos(data)
        detectarBotones(data)
    } catch (error) {
        console.log(error)
    }
}

const boton = document.getElementById('botonCambiar');

//manejo de vistas platos y resumen
boton.addEventListener("click", () => {
        if (boton.textContent == ' Resumen') {
        const platos = document.getElementById('contenedorPlatos');
        platos.className = 'container-fluid invisible'
        const resumen = document.getElementById('resumen');
        resumen.className = 'my-5'
        const boton = document.getElementById('botonCambiar');
        boton.textContent = ' Ordenar'
    } else if (boton.textContent == " Ordenar"){
        const platos = document.getElementById('contenedorPlatos');
        platos.className = 'container-fluid'
        const resumen = document.getElementById('resumen');
        resumen.className = 'my-5 invisible'
        const boton = document.getElementById('botonCambiar');
        boton.textContent = ' Resumen'
    }
})

const contendorProductos = document.querySelector('#contenedor-productos')
const mostrarPlatos = (data) => { //Funcion para cargar datos del JSON en forma de tarjetas en el HTML
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    data.forEach(producto => {
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h3').textContent = producto.title
        template.querySelector('.descripcion').textContent = producto.descripcion
        template.querySelector('.claves').textContent = producto.claves
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
}

let resumen = {}

const detectarBotones = (data) => { //escuchar botones de tarjetas para agregar el plato a la mesa
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', () => { //detecta click en tarjeta
            
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (resumen.hasOwnProperty(producto.id)) {
                producto.cantidad = resumen[producto.id].cantidad + 1
            }
            resumen[producto.id] = { ...producto }
            alert("Agregado "+producto.title+" a la mesa."); //confirmacion plato agregado
            mostrarResumen()
        })
    })
}

const items = document.querySelector('#items')

const mostrarResumen = () => { //muestra resumen de lo cargado en la mesa

    items.innerHTML = ''

    const template = document.querySelector('#template-resumen').content
    const fragment = document.createDocumentFragment()

    Object.values(resumen).forEach(producto => {

        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones para sumar o restar items
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

}

const footer = document.querySelector('#footer-resumen')
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(resumen).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Se han eliminado los pedidos de la mesa</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(resumen).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(resumen).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-resumen')
    boton.addEventListener('click', () => {
        resumen = {}
        mostrarResumen()
    })

}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')


    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = resumen[btn.dataset.id]
            producto.cantidad ++
            resumen[btn.dataset.id] = { ...producto }
            mostrarResumen()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {

            const producto = resumen[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete resumen[btn.dataset.id]
            } else {
                resumen[btn.dataset.id] = { ...producto }
            }
            mostrarResumen()
        })
    })
}


//Busqueda de platos
const d = document
function filtroProductos(input,selector) {
    d.addEventListener("keyup", (e) => {
        if(e.target.matches(input)){
            d.querySelectorAll(selector).forEach((el)=>
            el.textContent.toLowerCase().includes(e.target.value)
            ?el.classList.remove("filtrar")
            :el.classList.add("filtrar")
            );
        }
    })
}
