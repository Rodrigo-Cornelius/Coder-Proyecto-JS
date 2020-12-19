//Arrays donde voy a guardar las sucursales y los productos.
let sucursales = [{
    id: 0,
    nombrePublico: 'Casa Central',
    direccion: "Fernandez Crespo 2102",
    propietario: 'Micaela Demello',
    stockProductos: [],
}];
let productos = [];



//Sucursales - constructores
let idSucursal = 1;
class Sucursal {
    constructor(nombrePublico, direccion, propietario) {
        this.id = idSucursal;
        this.nombrePublico = nombrePublico;
        this.direccion = direccion;
        this.propietario = propietario;
        this.stockProductos = [];

        idSucursal++;
        sucursales.push(this)
    }
}

//Productos - constructores
let idProducto = 1;
class Producto {
    constructor(tipo, marca, modelo, precio) {
        this.id = idProducto;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.sucursalActual = 0;

        idProducto++;
        productos.push(this);
    }
}

//Pruebas con sucursales
function sucursalesPrueba() {
    new Sucursal(`TecnoPato`, `Jose de Martinez 1313`, `Maria Corrales`);
    new Sucursal(`La tienda de Jorgito`, `Pablo de Maria 521`, `Alberto Gonzalez Jr.`);
    new Sucursal('Hogar y algo mas...', '18 de Julio 1532', 'Jesús Suarez');
    new Sucursal('Audio Pepe', 'Avenida Gral. San Martin 2511', 'Alberto Garcia');
    new Sucursal('TecnoPato Norte', 'Enrique Segobiano 1313', 'Maria Corrales');
    new Sucursal('El buen oído', 'Bulevar Artigas 502 bis', 'Julieta Diaz');
    new Sucursal('Norma Eventos', 'Colón 758', 'Norma Ballestrino');
    new Sucursal('El Ombú tecnologia', 'Almirante Brown 3310', 'Micaela Estivado');
}
sucursalesPrueba();

//Pruebas con productos
function productosPrueba() {
    new Producto(`televisor`, `LG`, `nueva vista 500`, 5000);
    new Producto(`televisor`, `LG`, `nueva vista 500`, 5000);
    new Producto(`televisor`, `LG`, `nueva vista 500`, 5000);
    new Producto(`televisor`, `LG`, `nueva vista 500`, 5000);
    new Producto(`televisor`, `LG`, `nueva vista 500`, 5000);
    new Producto(`parlante`, `JBL`, `Go 2`, 3000);
    new Producto(`parlante`, `JBL`, `Go 2`, 3000);
    new Producto(`parlante`, `JBL`, `Go 2`, 3000);
    new Producto(`parlante`, `JBL`, `Go 2`, 3000);
    new Producto(`parlante`, `JBL`, `Go 2`, 3000);
    new Producto('televisor', 'LG', 'Vision 1020', 4500);
    new Producto('televisor', 'LG', 'Vision 1020', 4500);
    new Producto('televisor', 'LG', 'Vision 1020', 4500);
    new Producto('televisor', 'LG', 'Vision 1020', 4500);
    new Producto('televisor', 'LG', 'Vision 1020', 4500);
    new Producto('televisor', 'LG', 'Vision 1020', 4500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
    new Producto('auriculares', 'JBL', 'Hi 6', 500);
}
productosPrueba();

//Asignando Productos a succursales por defecto (para realizar pruebas)
function asignacionProductosPrueba() {
    // function agregarProdASucc(idProducto, idSucursal)
    agregarProdASucc(1, 1);
    agregarProdASucc(5, 1);
    agregarProdASucc(10, 1);
    agregarProdASucc(23, 1);
    agregarProdASucc(2, 2);
    agregarProdASucc(8, 2);
    agregarProdASucc(3, 2);
    agregarProdASucc(4, 3);
    agregarProdASucc(6, 3);
    agregarProdASucc(9, 3);
    agregarProdASucc(7, 4);
    agregarProdASucc(20, 4);
    agregarProdASucc(13, 4);
    agregarProdASucc(11, 5);
    agregarProdASucc(22, 5);
    agregarProdASucc(26, 5);
    agregarProdASucc(12, 6);
    agregarProdASucc(19, 6);
    agregarProdASucc(25, 6);
    agregarProdASucc(14, 7);
    agregarProdASucc(21, 7);
    agregarProdASucc(24, 7);
    agregarProdASucc(15, 8);
    agregarProdASucc(16, 8);
    agregarProdASucc(17, 8);
    agregarProdASucc(18, 8);
}
asignacionProductosPrueba();


//funciones para buscar el objeto por el id tanto para sucursales como para productos en sus respectivos arrays
function buscarSucursal(idSucursal) {
    let resultado;
    for (let i = 0; i < sucursales.length; i++) {
        let actual = sucursales[i];
        if (actual[`id`] == idSucursal) {
            resultado = sucursales[i];
        }
    }
    return resultado;
}

function buscarProducto(idProducto) {
    let resultado;
    for (let i = 0; i < productos.length; i++) {
        let actual = productos[i];
        if (actual[`id`] == idProducto) {
            resultado = productos[i];
        }
    }
    return resultado;
}

//Funcion para agregar un producto existente a una sucursal
function agregarProdASucc(idProducto, idSucursal) {
    buscarSucursal(idSucursal)[`stockProductos`].push(buscarProducto(idProducto));
    buscarProducto(idProducto).sucursalActual = idSucursal;

}

//Crear en el HTML una lista de todas las sucursales
function listarSucursalesTotalesHTML() {
    let lista = document.querySelector('#listaSucursales');
    lista.textContent = ""
    sucursales.forEach(e => {
        let row = document.createElement('div');
        row.classList = "row border-bottom elementoLista"
        let id = document.createElement('div');
        id.classList = "col-sm border-end text-center";
        let nombrePublico = document.createElement('div');
        nombrePublico.classList = "col-sm border-end";
        let direccion = document.createElement('div');
        direccion.classList = "col-sm border-end";
        let propietario = document.createElement('div');
        propietario.classList = "col-sm";

        id.textContent = e.id;
        nombrePublico.textContent = e.nombrePublico;
        direccion.textContent = e.direccion;
        propietario.textContent = e.propietario;

        row.appendChild(id);
        row.appendChild(nombrePublico);
        row.appendChild(direccion);
        row.appendChild(propietario);

        lista.appendChild(row);

    });
}
listarSucursalesTotalesHTML();

//Desplegar el stock de una sucursal seleccionada

/*primero seleccionar la sucursal y asignar un id(html sucursalSelecList) al id de la sucursal*/
let sucursalSelecList = document.querySelectorAll('.elementoLista');
clickElementoSuccLista();

function clickElementoSuccLista() {
    sucursalSelecList.forEach(e => {
        e.addEventListener('click', () => {
            pintarSucursalList(e);
            document.querySelector('#stockActivo').textContent = "";
            let idSeleccionada = Number(document.querySelector('#sucursalSelecList').textContent);
            document.querySelector('#stockActivo').appendChild(ArmarproductosDeSucursalPorID(idSeleccionada))
        })
    });
}

function pintarSucursalList(suc) {
    despintarTodosSuccList()
    suc.className = 'row border-bottom elementoLista bg-primary text-white';
    suc.children[0].setAttribute('id', 'sucursalSelecList');
}

function despintarTodosSuccList() {
    sucursalSelecList.forEach(e => {
        e.className = 'row border-bottom elementoLista';
        e.children[0].removeAttribute('id');
    });
}

//Armado del stock seleccionado
function ArmarproductosDeSucursalPorID(idsucursal) {
    let sucu = buscarSucursal(idsucursal);
    let listaproductos = sucu.stockProductos;
    let resultado = document.createElement('div');

    let encabezado = document.createElement('div');
    encabezado.classList = "row border-bottom";

    let columID = document.createElement('div');
    columID.classList = "col-sm border-end text-center"
    let columTipo = document.createElement('div');
    columTipo.classList = "col-sm border-end";
    let columMarca = document.createElement('div');
    columMarca.classList = "col-sm border-end";
    let columModelo = document.createElement('div');
    columModelo.classList = "col-sm border-end";
    let columPrecio = document.createElement('div');
    columPrecio.classList = "col-sm";

    columID.textContent = "ID";
    columTipo.textContent = 'TIPO';
    columMarca.textContent = 'MARCA';
    columModelo.textContent = 'MODELO';
    columPrecio.textContent = 'PRECIO';

    encabezado.appendChild(columID);
    encabezado.appendChild(columTipo);
    encabezado.appendChild(columMarca);
    encabezado.appendChild(columModelo);
    encabezado.appendChild(columPrecio);

    resultado.appendChild(encabezado);

    listaproductos.forEach(e => {
        let row = document.createElement('div');
        row.classList = "row border-bottom"
        let id = document.createElement('div');
        id.classList = "col-sm border-end text-center";
        let tipo = document.createElement('div');
        tipo.classList = "col-sm border-end";
        let marca = document.createElement('div');
        marca.classList = "col-sm border-end";
        let modelo = document.createElement('div');
        modelo.classList = "col-sm";
        let precio = document.createElement('div');
        precio.classList = "col-sm";

        id.textContent = e.id;
        tipo.textContent = e.tipo;
        marca.textContent = e.marca;
        modelo.textContent = e.modelo;
        precio.textContent = e.precio;

        row.appendChild(id);
        row.appendChild(tipo);
        row.appendChild(marca);
        row.appendChild(modelo);
        row.appendChild(precio);

        resultado.appendChild(row);

    });
    if(resultado.children[1] == undefined){
        let sinStock = document.createElement('div');
        sinStock.classList = "my-4 col-sm text-center";
        sinStock.textContent = "La sucursal seleccionada no Posee Stock de Productos"
        resultado = sinStock;
    }
    return resultado;
}


//Creando una nueva sucursal
let btnAgregarSucursal = document.querySelector('#btnAgregarSuccursal');
btnAgregarSucursal.addEventListener('click', (e) => {
    e.preventDefault();
    // inputNombreSuccNew inputPropietarioSuccNew inputDireccionSuccNew
    let nom = document.querySelector('#inputNombreSuccNew');
    let prop = document.querySelector('#inputPropietarioSuccNew');
    let dir = document.querySelector('#inputDireccionSuccNew');
    new Sucursal(nom.value, dir.value, prop.value);
    listarSucursalesTotalesHTML();
    sucursalSelecList = document.querySelectorAll('.elementoLista');
    clickElementoSuccLista();
})