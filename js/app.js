/*-------------------ARRAYS-----------------------*/
//Arrays donde voy a guardar las sucursales, los productos y tipos de productos.
let sucursales = [{
    id: 0,
    nombrePublico: 'Casa Central',
    direccion: "Fernandez Crespo 2102",
    propietario: 'Micaela Demello',
    stockProductos: [],
}];
let productos = [];
let tiposDeProducto = [];


/*-----------------------CONSTRUCTORES-----------------------*/
//Sucursales - constructores
let idSucursal;
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
let idProducto;
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

//Tipo de producto - contructor
let idTipoProducto;
class TipoProducto {
    constructor(tipo, marca, modelo, precio) {
        this.id = idTipoProducto;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;

        idTipoProducto++;
        tiposDeProducto.push(this);
    }
}

/*---------------------------------PRECARGA DE DATOS---------------------------------*/

//JSON

async function crearPrecarga() {
    await $.ajax({
        url: 'json/productos.json',
        dataType: 'json',

        success: function (data) {

            productos = data;
        }
    });
    await $.ajax({
        url: 'json/sucursales.json',
        dataType: 'json',
        success: function (data) {

            sucursales = data;
        }
    });
    await $.ajax({
        url: 'json/tiposDeProducto.json',
        dataType: 'json',
        success: function (data) {

            tiposDeProducto = data;
        }
    });
    guardarArrayEnStorage(sucursales, 'sucursales');
    guardarArrayEnStorage(productos, 'productos');
    guardarArrayEnStorage(tiposDeProducto, 'tiposDeProducto');

    idSucursal = sucursales[sucursales.length - 1].id + 1;
    idProducto = productos[productos.length - 1].id + 1;
    idTipoProducto = tiposDeProducto[tiposDeProducto.length - 1].id + 1;

    router();
}

/*------------------------FUNCIONES PARA LA LOGICA DEL PROYECTO-----------------------*/

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

//Funcion para buscar un tipo de producto
function buscarTipoDeProducto(idTipoProducto) {
    let encontre = false;
    for (let i = 0; i < tiposDeProducto.length && !encontre; i++) {
        if (tiposDeProducto[i].id == idTipoProducto) {
            encontre = true;
            return tiposDeProducto[i];
        }
    }
}

//Funcion para agregar un producto existente a una sucursal
function agregarProdASucc(idProducto, idSucursal) {
    buscarSucursal(idSucursal)[`stockProductos`].push(buscarProducto(idProducto));
    buscarProducto(idProducto).sucursalActual = idSucursal;
    guardarArrayEnStorage(sucursales, 'sucursales');
    guardarArrayEnStorage(productos, 'productos');
}

//Crear en el HTML una lista de todas las sucursales
function listarSucursalesTotalesHTML() {
    let lista = document.querySelector('#listaSucursales');
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


//Desplegar el stock de una sucursal seleccionada

let sucursalSelecList;

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
    if (resultado.children[1] == undefined) {
        let sinStock = document.createElement('div');
        sinStock.classList = "my-4 col-sm text-center";
        sinStock.textContent = "La sucursal seleccionada no Posee Stock de Productos"
        resultado = sinStock;
    }
    return resultado;
}


//Creando una nueva sucursal
let btnAgregarSucursal;

function eventosCrearSucursal() {
    validarFormularioInput();

    let inputs = document.querySelectorAll('#carga input');

    btnAgregarSucursal.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputsCorrectos(inputs)) {

            if (document.querySelector('.formulario__P-errorEnvio-hide') == null) {

                mostrarOcultarErrorEnvio();
            }

            let nom = document.querySelector('#inputNombreSuccNew');
            let prop = document.querySelector('#inputPropietarioSuccNew');
            let dir = document.querySelector('#inputDireccionSuccNew');
            new Sucursal(nom.value, dir.value, prop.value);
            // guardarArrayEnStorage(sucursales,'sucursales');
            localStorage.sucursales = JSON.stringify(sucursales);
            alertaSuccess("#btnAgregarSuccursal");
        } else {
            if (document.querySelector('.formulario__P-errorEnvio-show') == null) {

                mostrarOcultarErrorEnvio();
            }
        }
    })

}

//Crear un nuevo tipo de Producto
let btnCrearNuevoProducto;

function eventosCrearNuevoProducto() {
    validarFormularioInput();

    let inputs = document.querySelectorAll('#carga input');

    btnCrearNuevoProducto.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputsCorrectos(inputs)) {
            if (document.querySelector('.formulario__P-errorEnvio-hide') == null) {

                mostrarOcultarErrorEnvio();
            }
            let tipo = document.querySelector('#inputTipoProdNew').value;
            let precio = Number(document.querySelector('#inputPrecioProdNew').value);
            let marca = document.querySelector('#inputMarcaProdNew').value;
            let modelo = document.querySelector('#inputModeloProdNew').value;
            new TipoProducto(tipo, marca, modelo, precio);
            guardarArrayEnStorage(tiposDeProducto, "tiposDeProducto");
            alertaSuccess("#btnProdNew");
        } else {
            if (document.querySelector('.formulario__P-errorEnvio-show') == null) {

                mostrarOcultarErrorEnvio();
            }
        }

    })

}

//Varias funciones constructoras para agregar Stock de un producto
function crearSelectTipo() {
    let selector = document.querySelector("#slectTipoStockProd");
    let tipos = [];
    tiposDeProducto.forEach(e => {
        if (!tipos.includes(e.tipo)) {
            let option = document.createElement('option');
            option.setAttribute('value', e.tipo);
            option.textContent = e.tipo;
            selector.appendChild(option);
            tipos.push(e.tipo);
        }
    });
}

function crearSelectMarca(tipoProd) {
    let selectorMarca = document.querySelector("#selectMarcaStockProd");
    let marcas = [];
    vaciarSelector(selectorMarca, "Seleccione Marca")
    tiposDeProducto.forEach(e => {
        if (e.tipo == tipoProd && !marcas.includes(e.marca)) {
            let option = document.createElement('option');
            option.setAttribute('value', e.marca);
            option.textContent = e.marca;
            selectorMarca.appendChild(option);
            marcas.push(e.marca);
        }
    });
}

function crearSelectModelo(tipoProd, marcaProd) {
    selectorModelo = document.querySelector("#selectModeloStockProd");
    selectorModelo.textContent = "";
    let option0 = document.createElement('option');
    option0.textContent = 'Seleccione Tipo y Marca';
    option0.className = 'hide';
    selectorModelo.appendChild(option0);
    tiposDeProducto.forEach(e => {
        if (e.tipo == tipoProd && e.marca == marcaProd) {
            let option = document.createElement('option');
            option.setAttribute('value', e.id);
            option.textContent = e.modelo;
            selectorModelo.appendChild(option);
        }
    });
}

function crearSelectSucursal() {
    selectorSucursal = document.querySelector("#selectSucursalStockProd");

    let option0 = document.createElement('option');
    option0.textContent = 'Seleccione sucursal';
    option0.className = 'hide';
    selectorSucursal.appendChild(option0);

    sucursales.forEach(e => {
        let option = document.createElement('option');
        option.setAttribute('value', e.id);
        option.textContent = e.nombrePublico;
        selectorSucursal.appendChild(option);
    });
}

//funcion para vaciar selectores colocandole el texto por defecto
function vaciarSelector(selector, textoSelector) {
    selector.textContent = "";
    let opcion = document.createElement('option');
    opcion.setAttribute('selected', 'true');
    opcion.textContent = textoSelector;
    selector.appendChild(opcion);
}

//Funcion para agregar nuevo stock a una sucursal
function agregarNuevoStock(tipoproducto, cantidad, idsucursalDestino) {
    for (let i = 1; i <= cantidad; i++) {
        new Producto(tipoproducto.tipo, tipoproducto.marca, tipoproducto.modelo, tipoproducto.precio)
        agregarProdASucc(productos[productos.length - 1].id, idsucursalDestino);
    }
}

function eventosAgregarStock() {

    document.querySelector("#selectMarcaStockProd").addEventListener('click', (e) => {
        crearSelectModelo(document.querySelector("#slectTipoStockProd").value, document.querySelector("#selectMarcaStockProd").value)
    })

    document.querySelector("#slectTipoStockProd").addEventListener('click', (e) => {
        let selecTipo = document.querySelector("#slectTipoStockProd");
        if (selecTipo.value != "Seleccione Tipo") {

            crearSelectMarca(selecTipo.value);
        } else(
            document.querySelector("#selectMarcaStockProd").value = ""
        )
    })
    let inputs = document.querySelectorAll('#carga input');
    let selectores = document.querySelectorAll('#carga select');

    //para validar selectores selectoresCorrectos()
    validarFormularioInput();
    document.querySelector("#btnCrearStock").addEventListener('click', (e) => {
        e.preventDefault();
        if (inputsCorrectos(inputs) && selectoresCorrectos(selectores)) {
            if (document.querySelector('.formulario__P-errorEnvio-hide') == null) {

                mostrarOcultarErrorEnvio();
            }
            let idTipoProducto = Number(document.querySelector("#selectModeloStockProd").value);
            let cantidad = Number(document.querySelector("#inputCantidadStockProd").value);
            let idSucursal = Number(document.querySelector("#selectSucursalStockProd").value);
            agregarNuevoStock(buscarTipoDeProducto(idTipoProducto), cantidad, idSucursal);
            alertaSuccess("#btnCrearStock");
        } else {
            if (document.querySelector('.formulario__P-errorEnvio-show') == null) {

                mostrarOcultarErrorEnvio();
            }
        }



    })
}

//Varias funciones para mover stock

//funcion para crear un select para la sucursal de origen y destino
function succursalesEnSelect(elemento, idOrigen = null) {
    sucursales.forEach(e => {
        if (e.id != idOrigen) {
            let option = document.createElement('option');
            //nombrePublico
            option.setAttribute('value', e.id);
            option.textContent = e.nombrePublico;
            elemento.appendChild(option);
        }
    });
}

//funcion para generar el stock seleccionado del Origen
function stockOrigen() {
    let divStock = document.querySelector("#divStockOrigen");
    divStock.textContent = '';
    if (document.querySelector("#selectSucOrigen").value != 'Seleccione Sucursal') {
        let stock = buscarSucursal(document.querySelector("#selectSucOrigen").value).stockProductos;
        stock.forEach(e => {
            let btn = document.createElement('button');
            btn.classList.add("list-group-item");
            btn.classList.add("list-group-item-action");
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', e.id);
            btn.textContent = `|ID=${e.id}| ${e.tipo} ${e.marca} ${e.modelo}`
            divStock.appendChild(btn);
        });
    }
    if (divStock.textContent == '') {
        divStock.innerHTML = `<p class= "p-2 text-center">Sucursal sin Stock</p>`;
    }
    if (document.querySelector("#selectSucOrigen").value == "Seleccione Sucursal") {
        divStock.innerHTML = `<p class= "p-2 text-center">Seleccione Sucursal</p>`;
    }
}

//funcion para generar el stock seleccionado del Destino
function stockDestino() {
    let divStock = document.querySelector("#divMovSuccDestino");
    divStock.textContent = '';
    if (document.querySelector("#selectSucDestino").value != 'Seleccione Sucursal') {
        let stock = buscarSucursal(document.querySelector("#selectSucDestino").value).stockProductos;
        let lista = document.createElement('ul');
        lista.classList.add('list-group');
        stock.forEach(e => {
            let liElemento = document.createElement('li');
            liElemento.classList.add("list-group-item");
            liElemento.textContent = `|ID=${e.id}| ${e.tipo} ${e.marca} ${e.modelo}`;
            lista.appendChild(liElemento);
        });
        if (lista.textContent != '') {
            divStock.appendChild(lista);
        } else {
            divStock.innerHTML = `<p class= "p-2 text-center">Sucursal sin Stock</p>`;
        }
    } else {
        divStock.innerHTML = `<p class= "p-2 text-center">Seleccione Sucursal</p>`;
    }
}

//funcion del evento para colocarles la clase active a los botones en stock
function eventoActiveEnOrigen() {
    let elementosStock = document.querySelectorAll('.list-group-item-action');
    elementosStock.forEach(e => {
        e.addEventListener('click', () => {
            e.classList.toggle('active');
        })
    });
}

//eventos para la seccion de Mover Stock
function eventosMoverStock() {
    // Armado del selector Sucursal de Origen
    succursalesEnSelect(document.querySelector('#selectSucOrigen'));

    //evento para generar el select de las sucursales de destino y el stock de la de origen.
    document.querySelector("#selectSucOrigen").addEventListener('click', () => {
        vaciarSelector(document.querySelector("#selectSucDestino"), "Seleccione Sucursal");
        // divStock.innerHTML = `<p class= "p-2 text-center">Seleccione Sucursal</p>`;
        document.querySelector('#divMovSuccDestino').innerHTML = `<p class= "p-2 text-center">Seleccione Sucursal</p>`;
        let origen = document.querySelector("#selectSucOrigen");
        if (origen.value != "Seleccione Sucursal") {
            succursalesEnSelect(document.querySelector("#selectSucDestino"), origen.value);
        }
        document.querySelector('#selectSucDestino').addEventListener('click', stockDestino);
        stockOrigen();
        eventoActiveEnOrigen()
    })


    // evento del boton para mover stock
    let inputs = document.querySelectorAll('#carga input');
    document.querySelector("#btnMoverStock").addEventListener('click', (e) => {
        e.preventDefault();
        if (inputsCorrectos(inputs) && $('#divMovSuccOrigen .active').length != 0) {
            if (document.querySelector('.formulario__P-errorEnvio-hide') == null) {

                mostrarOcultarErrorEnvio();
            }
            let botonesPresionados = document.querySelectorAll('.active');
            let sucOrigen = buscarSucursal(document.querySelector('#selectSucOrigen').value);
            let sucDestino = buscarSucursal(document.querySelector('#selectSucDestino').value);
            let productosAmover = [];
            botonesPresionados.forEach(e => {
                let produc = buscarProducto(e.value);
                produc.sucursalActual = sucDestino.id;
                productosAmover.push(produc);
            });

            productosAmover.forEach(f => {
                sucOrigen.stockProductos.splice(sucOrigen.stockProductos.indexOf(f), 1);
                sucDestino.stockProductos.push(f);
            });
            guardarArrayEnStorage(sucursales, 'sucursales');
            guardarArrayEnStorage(productos, 'productos');
            alertaSuccess("#btnMoverStock");
        } else {
            if (document.querySelector('.formulario__P-errorEnvio-show') == null) {

                mostrarOcultarErrorEnvio();
            }
        }



    })
}



/*==============================VALIDACIONES=====================*/

const expresiones = {
    nombre_numeros: /^[a-zA-ZÀ-ÿ\s0-9\-]{3,16}$/, // Letras, numeros y guion
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    numero: /^\d+$/,
}

function validarFormularioInput() {
    let inputs = document.querySelectorAll('form input');
    inputs.forEach((inputs) => {
        inputs.addEventListener('keyup', validarFormulario);
        inputs.addEventListener('blur', validarFormulario);
    })

}

const validarFormulario = (e) => {
    let esCorrecto = false;
    switch (e.target.name) {
        case 'nombrePublico':
            esCorrecto = expresiones.nombre_numeros.test(e.target.value)
            break;
        case 'propietario':
            esCorrecto = expresiones.nombre.test(e.target.value)
            break;
        case 'numero':
            if (expresiones.numero.test(e.target.value)) {
                if (Number(e.target.value) > 0) {
                    esCorrecto = true
                }
            }
            break;
    }

    if (esCorrecto) {
        e.target.classList.remove('formulario__input-incorrecto')
        e.target.parentElement.classList.remove('formulario__grupo-incorrecto');
        e.target.parentElement.querySelector('p').className = 'formulario__P-error-hide';
    } else {
        e.target.classList.add('formulario__input-incorrecto');
        e.target.parentElement.classList.add('formulario__grupo-incorrecto');
        e.target.parentElement.querySelector('p').className = 'formulario__P-error-show';
    }

}

function inputsCorrectos(inputs) {
    let esCorrecto = true;
    for (let i = 0; i < inputs.length && esCorrecto; i++) {
        const e = inputs[i];
        if (e.value == "" || e.classList.length == 2) {
            esCorrecto = false;
        }
    }
    return esCorrecto;
}

function mostrarOcultarErrorEnvio() {
    // formulario__P-errorEnvio-hide  formulario__P-errorEnvio-show
    let oculto = document.querySelector('.formulario__P-errorEnvio-hide');
    let visible = document.querySelector('.formulario__P-errorEnvio-show');

    if (oculto == null) {
        visible.className = 'formulario__P-errorEnvio-hide';
    } else {
        oculto.className = 'formulario__P-errorEnvio-show';
    }
}

function selectoresCorrectos(selectores) {
    let esCorrecto = true;
    for (let i = 0; i < selectores.length && esCorrecto; i++) {
        const f = selectores[i];
        if (f.value == "" || f.value == f[0].value) {
            esCorrecto = false;
        }
    }
    return esCorrecto;
}




/*============================STORAGE Y ARMADO DEL DOCUMENTO===================*/


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('sucursales') == null) {
        idSucursal = 1;
        idProducto = 1;
        idTipoProducto = 1;
        crearPrecarga();
    } else {
        sucursales = JSON.parse(localStorage.getItem('sucursales'));
        productos = JSON.parse(localStorage.getItem('productos'));
        tiposDeProducto = JSON.parse(localStorage.getItem('tiposDeProducto'));
        idSucursal = sucursales[sucursales.length - 1].id + 1;
        idProducto = productos[productos.length - 1].id + 1;
        idTipoProducto = tiposDeProducto[tiposDeProducto.length - 1].id + 1;

        router();
    }
    //temp
})


// document.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);


const ListarSucursales = {
    render: () => {
        return `
        <div class="text-center mt-4">
                    <h2>Listado de Sucursales</h2>
                </div>
                <div class="container border border-dark">
                    <div class="row text-center border-bottom border-3 bg-primary text-white">
                        <div class="col-sm border-end">
                            ID
                        </div>
                        <div class="col-sm border-end">
                            Nombre Publico
                        </div>
                        <div class="col-sm border-end">
                            Dirección
                        </div>
                        <div class="col-sm">
                            Propietario
                        </div>
                    </div>
                    <div id="listaSucursales">
                    </div>
                </div>
                <div class="container mt-4">
                    <div class="border border-dark">
                        <h3 class="text-center">Stock de la Sucursal</h3>
                    </div>
                    <div id="stockActivo" class="border border-dark">
                        <div class=" text-center my-4">
                            Seleccione una Sucursal
                        </div>
                    </div>
                </div>
        `
    }
}
const AgregarStock = {
    render: () => {
        return `
        <div class="text-center mt-4 mb-3">
            <h2>Agregar Stock de un Producto</h2>
        </div>
                
                <div class="container">
                    <form class="row g-3">
                
                        <div class="col-md-6">
                            <label for="slectTipoStockProd" class="form-label">Tipo de Producto</label>
                            <select class="form-select" id="slectTipoStockProd" aria-label="Default select example">
                                <option selected>Seleccione Tipo</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="selectMarcaStockProd" class="form-label">Marca</label>
                            <select class="form-select" id="selectMarcaStockProd" aria-label="Default select example">
                                <option selected>Seleccione Marca</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label for="selectModeloStockProd" class="form-label">Modelo</label>
                            <select class="form-select" id="selectModeloStockProd" multiple
                                aria-label="multiple select example">
                                <option selected>Seleccione Tipo y Marca</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputCantidadStockProd" class="form-label">Cantidad</label>
                            <input type="text" class="form-control" name="numero" id="inputCantidadStockProd">
                            <p class="formulario__P-error-hide">Error: La cantidad debe ser en numeros y mayor a 0</p>
                        </div>
                        <div class="col-md-6">
                            <label for="selectSucursalStockProd" class="form-label">Sucursal</label>
                            <select class="form-select" id="selectSucursalStockProd" aria-label="multiple select example">
                
                            </select>
                        </div>
                        <div class="col-12">
                        <p class="formulario__P-errorEnvio-hide"><i class="fas fa-exclamation-triangle"></i><strong>Error:</strong> Por favor rellena el formulario de manera correcta</p>
                            <button type="submit" id="btnCrearStock" class="btn btn-primary">Crear Stock</button>
                        </div>
                    </form>
                </div>
        `
    }
}
const CrearProducto = {
    render: () => {
        return `
        <div class="text-center mt-4 mb-3">
        <h2>Agregar Producto Nuevo</h2>
    </div>
    
    <div class="container">
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputTipoProdNew" class="form-label">Tipo de Producto</label>
                <input type="text" class="form-control" name="nombrePublico" id="inputTipoProdNew">
                <p class="formulario__P-error-hide">Error: El tipo de producto debe contener al menos 3 caracteres (16 max.) y solo se aceptan numeros y/o letras</p>
            </div>
            <div class="col-md-6">
                <label for="inputPrecioProdNew" class="form-label">Precio</label>
                <input type="text" class="form-control" name="numero" id="inputPrecioProdNew" placeholder="Solo numeros">
                <p class="formulario__P-error-hide">Error: El precio debe ser en numeros y mayor a 0</p>
            </div>
            <div class="col-md-6">
                <label for="inputMarcaProdNew" class="form-label">Marca</label>
                <input type="text" class="form-control" name="nombrePublico" id="inputMarcaProdNew">
                <p class="formulario__P-error-hide">Error: La Marca debe contener al menos 3 caracteres (16 max.) y solo se aceptan numeros y/o letras</p>
            </div>
            <div class="col-md-6">
                <label for="inputModeloProdNew" class="form-label">Modelo</label>
                <input type="text" class="form-control" name="nombrePublico" id="inputModeloProdNew">
                <p class="formulario__P-error-hide">Error: El modelo debe contener al menos 3 caracteres (16 max.) y solo se aceptan numeros y/o letras</p>
            </div>
            <div class="col-12">
            <p class="formulario__P-errorEnvio-hide"><i class="fas fa-exclamation-triangle"></i><strong>Error:</strong> Por favor rellena el formulario de manera correcta</p>
                <button type="submit" id="btnProdNew" class="btn btn-primary">Crear</button>
            </div>
        </form>
    </div>
        `
    }
}
const CrearSucursal = {
    render: () => {
        return `
        <div class="text-center mt-4">
                    <h2>Agregar Sucursal</h2>
                </div>
                
                <div class="container">
                    <form class="row g-3">
                        <div class="col-12 ">
                            <label for="inputNombreSuccNew" class="form-label">Nombre Publico</label>
                            <input type="text" class="form-control" name="nombrePublico" id="inputNombreSuccNew">
                            <p class="formulario__P-error-hide">Error: El nombre Publico debe contener al menos 3 caracteres y solo se aceptan numeros y/o letras</p>

                        </div>
                        <div class="col-md-6">
                            <label for="inputPropietarioSuccNew" class="form-label">Propietario</label>
                            <input type="text" class="form-control" name="propietario" id="inputPropietarioSuccNew" placeholder="Ingrese el Nombre">
                            <p class="formulario__P-error-hide">Error: El nombre del propietario debe contener al menos 3 caracteres y solo letras</p>
                        </div>
                        <div class="col-md-6">
                            <label for="inputDireccionSuccNew" class="form-label">Direccion</label>
                            <input type="text" class="form-control" name="nombrePublico" id="inputDireccionSuccNew">
                            <p class="formulario__P-error-hide">Error: La direccion debe contener al menos 3 caracteres y solo se aceptan numeros y/o letras</p>
                        </div>
                        <div class="col-12">
                            <p class="formulario__P-errorEnvio-hide"><i class="fas fa-exclamation-triangle"></i><strong>Error:</strong> Por favor rellena el formulario de manera correcta</p>
                            <button type="submit" id="btnAgregarSuccursal" class="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
        `
    }
}
const MoverSucursal = {
    render: () => {
        return `
        <h2 class="text-center mt-4">
                    Mover Stock
                </h2>
                <div class="row ">
                    <div class="col-5">
                        <label for="selectSucOrigen" class="form-label">Sucursal de Origen</label>
                        <select class="form-select mb-2" id="selectSucOrigen" aria-label="Default select example">
                            <option selected>Seleccione Sucursal</option>
                        </select>
                        <div id="divMovSuccOrigen" class="border rounded p-1">
                            <div id="divStockOrigen" class="list-group">
                                <p class="p-2 text-center">Seleccione Sucursal</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-flex align-items-center justify-content-center">
                        <button type="submit" id="btnMoverStock" class="btn btn-primary">Mover >>></button>
                    </div>
                    <div class="col-5">
                        <label for="selectSucDestino" class="form-label">Sucursal de Destino</label>
                        <select class="form-select mb-2" id="selectSucDestino" aria-label="Default select example">
                            <option selected>Seleccione Sucursal</option>
                        </select>
                        <div id="divMovSuccDestino" class="border rounded p-1">
                            <p class= "p-2 text-center">Seleccione Sucursal</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <p class="formulario__P-errorEnvio-hide"><i class="fas fa-exclamation-triangle"></i><strong>Error:</strong> Por favor rellena el formulario de manera correcta</p>
                    </div>
                </div>
        `
    }
}
const ErrorComponent = {
    render: () => {
        return `
            <h1>Pagina no encontrada</h1>
        `
    }
}


const routes = [{
        path: '/',
        component: ListarSucursales
    },
    {
        path: '/agregarStock',
        component: AgregarStock
    },
    {
        path: '/nuevoProducto',
        component: CrearProducto
    },
    {
        path: '/nuevaSucursal',
        component: CrearSucursal
    },
    {
        path: '/moverStock',
        component: MoverSucursal
    },
]

function parseLocation() {
    return location.hash.slice(1) || '/'
}

function OptenerComponente(path, routes) {
    return routes.find(route => route.path.match(new RegExp(`^\\${path}$`, `gm`))) //Expresiones regulares
}

function router() {
    // Identificando la ruta elegida por el usuario
    const path = parseLocation();

    // Vamos a buscar el componente correspondiente al path
    const {
        component = ErrorComponent
    } = OptenerComponente(path, routes) || {};

    $('#carga').html(component.render());
    switch (path) {
        case '/':
            listarSucursalesTotalesHTML();
            sucursalSelecList = document.querySelectorAll('.elementoLista');
            clickElementoSuccLista();
            break;
        case '/agregarStock':
            crearSelectTipo();
            crearSelectSucursal();
            eventosAgregarStock();
            break;
        case '/nuevoProducto':
            btnCrearNuevoProducto = document.querySelector("#btnProdNew");
            eventosCrearNuevoProducto();
            break;
        case '/nuevaSucursal':
            btnAgregarSucursal = document.querySelector('#btnAgregarSuccursal');
            eventosCrearSucursal();
            break;
        case '/moverStock':
            eventosMoverStock();
            break;
    }

}

//funcion para guardar un array en el Storage
function guardarArrayEnStorage(array, clave) {
    localStorage.setItem(clave, JSON.stringify(array));
}

// Jquery

function alertaSuccess(boton) {
    let mensaje;
    switch (boton) {
        case "#btnCrearStock":
            mensaje = `
            <h4>Stock Generado</h4>
            <hr>
            <p>Se ha generado el stock para la sucursal de manera correcta</p>
            <button type="button" id="btnAceptar" class="btn btn-success">Aceptar</button>
            `
            break;
        case "#btnProdNew":
            mensaje = `
            <h4>Producto Creado</h4>
            <hr>
            <p>Se ha creado el producto de manera correcta</p>
            <button type="button" id="btnAceptar" class="btn btn-success">Aceptar</button>
            `
            break;
        case "#btnAgregarSuccursal":
            mensaje = `
            <h4>Sucursal Agregada</h4>
            <hr>
            <p>La sucursal ha sido agregada de manera correcta</p>
            <button type="button" id="btnAceptar" class="btn btn-success">Aceptar</button>
            `
            break;
        case "#btnMoverStock":
            mensaje = `
            <h4>Se ha realizado el movimiento</h4>
            <hr>
            <p>Se realizado el movimiento de stock de manera correcta</p>
            <button type="button" id="btnAceptar" class="btn btn-success">Aceptar</button>
            `
            break;
    }
    $('#alertBox').html(mensaje);
    $("#alertBox").show();
    $("#contenido").addClass('oscurecer');
    $(".nav-link").toggleClass('disabled');
    $("button").prop("disabled", true);
    $("#btnAceptar").prop("disabled", false);

    $("#btnAceptar").click(function () {
        $("#alertBox").hide();
        $("#contenido").removeClass('oscurecer');
        $(".nav-link").toggleClass('disabled')
        router();
    });
}