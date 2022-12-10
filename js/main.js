
const productosBox = document.querySelector(".productos")
const btnCarrito = document.querySelector("#btnCarro")

const btnSalirModal = document.querySelector(".btnSalirModal")
const btnEfectuarCompra = document.querySelector(".btnEfectuarCompra")

const dialogCarrito = document.querySelector("#dialogCarrito")


const generateID = () => (Date.now() / Math.random() * 10).toString(30).split(".").join("") + Math.random().toString(30).slice(2)


/* ---------- Articulos del carrito ------------*/

let listaArticulos = []

/* -------------- FIN ARTICULOS ----------------*/


let precioTotal = 0



const pintarProductos = () =>{

    productosBox.innerHTML = ""

    productos.forEach(producto =>{
  
        productosBox.innerHTML += `
            <div class="producto" productId="${producto.id}">
                <img src="assets/${producto.img}.jpg" alt="producto" class="producto__img">
                <div class="producto__nombre">${producto.nombre}</div>
                <div class="producto__precio">${producto.precio} €</div>
                <div class="producto__btn"> <button class="btnAddCarrito">➕</button></div>
            </div>
        `
    })


    const btnAgregarAlCarrito = document.querySelectorAll(".btnAddCarrito")

    btnAgregarAlCarrito.forEach(btn => {
        btn.addEventListener("click", ()=>{
            const producto = productos.find(product => product.id == btn.parentNode.parentNode.attributes.productId.value)
            const articleAlreadyExist = listaArticulos.find(art => art.id == producto.id) 


            if(articleAlreadyExist){
                articleAlreadyExist.cantidad++
            }else{
                listaArticulos.push({...producto, cantidad: 1})
            }

           
            pintarArticulosCarrito()  
        })
    })

}



const pintarArticulosCarrito = () =>{

  
    const artBody = document.querySelector(".articulosBody")
    artBody.innerHTML = ""

    let carritoTabla = "<table border='1'class='articulos'>"

    listaArticulos.forEach(art =>{
        carritoTabla += `
            <tr class="articulo" artId="${art.id}">
                <td><img class="artImg" src="assets/${art.img}.jpg"></td>
                <td>${art.nombre}</td>
                <td>${art.precio} €</td>
                <td>${art.descripcion}</td>
                <td>${art.cantidad}</td>
                <td><button class="btnEliminarArticulo">❌</button></td>
            </tr>
        `
    })


    const cantidades = listaArticulos.reduce((a,b) => a + b.cantidad,0)
    precioTotal = listaArticulos.reduce((a,b)=> a + (b.precio*b.cantidad), 0) 
    
    carritoTabla+=`
        <tr>
            <td>Cantidad Total</td>
            <td colspan='2'>${cantidades}</td>
            <td>Precio Total</td>
            <td colspan='2'>${precioTotal}</td>
        </tr>
    
    `

    carritoTabla += "</table>"

    artBody.innerHTML = carritoTabla


}



/*Pintamos productos y Asignamos funcionalidad a los btns del carrito*/

pintarProductos()

btnCarrito.addEventListener("click", ()=>{
    dialogCarrito.showModal()
})

btnSalirModal.addEventListener("click", ()=>{
    dialogCarrito.close()
})

btnEfectuarCompra.addEventListener("click", ()=>{

    document.write(JSON.stringify({id:generateID(), articulos : [...listaArticulos], total: precioTotal}))
    
})


