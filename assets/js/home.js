//Validación formulario
var arreglo = new Array();
arreglo[0] = "errorNombre";
arreglo[1] = "errorEdad";
arreglo[2] = "errorEmail";
arreglo[3] = "errorUsuario";
arreglo[4] = "errorPassword";
arreglo[5] = "errorConfirmar";

function validar() {
  var entrada = new Array();
  entrada[0] = document.getElementById("completo").value;
  entrada[1] = document.getElementById("dir").value;
  entrada[2] = document.getElementById("email").value;
  entrada[3] = document.getElementById("user").value;
  entrada[4] = document.getElementById("pass1").value;
  entrada[5] = document.getElementById("pass2").value;

  var error = new Array();
  error[0] =
    "<div class='alert alert-danger' role='alert'>Ingrese el nombre!!</div>";
  error[1] =
    "<div class='alert alert-danger' role='alert'>Ingrese la dirección!!</div>";
  error[2] =
    "<div class='alert alert-danger' role='alert'>Ingrese el email!!</div>";
  error[3] =
    "<div class='alert alert-danger' role='alert'>Ingrese el usuario!!</div>";
  error[4] =
    "<div class='alert alert-danger' role='alert'>Ingrese el password!!</div>";
  error[5] =
    "<div class='alert alert-danger' role='alert'>Ingrese la confirmación del Password!!</div>";

  //Definiendo un ciclo forech
  for (i in entrada) {
    var mensajeError = error[i];
    var valorArreglo = arreglo[i];
    //Validando campo requerido
    if (entrada[i] == "") {
      document.getElementById(valorArreglo).innerHTML = mensajeError;
    }

    //Validar correo
    else if (i == 2) {
      var arroba = entrada[i].indexOf("@");
      var punto = entrada[i].lastIndexOf(".");

      if (arroba < 1 || punto < arroba + 2 || entrada[i].length < punto + 2) {
        document.getElementById("errorEmail").innerHTML =
          "<div class='alert alert-danger' role='alert'>Ingrese un email válido!!</div>";
      } else {
        document.getElementById("errorEmail").innerHTML =
          "<div class='alert alert-success' role='alert'>Campo válido!!</div>";
      }
    } else if (i == 5) {
      var primero = document.getElementById("pass1").value;
      var segundo = document.getElementById("pass2").value;

      if (primero != segundo) {
        document.getElementById("errorConfirmar").innerHTML =
          "<div class='alert alert-danger' role='alert'>Las passwords no coinciden!!</div>";
      } else {
        document.getElementById("errorConfirmar").innerHTML =
          "<div class='alert alert-success' role='alert'>Campo válido!!</div>";
      }
    } else {
      document.getElementById(valorArreglo).innerHTML =
        "<div class='alert alert-success' role='alert'>Campo válido!!</div>";
    }
  }
}

function validarTodos() {
  var contador = 0;
  for (i = 0; i < 6; i++) {
    var valorArreglo = arreglo[i];
    if (document.getElementById(valorArreglo).innerHTML == "Campo válido!!") {
      contador++;
    }
  }
  if (contador == 6) {
    document.getElementById("mensajefinal").innerHTML = "Formulario validado!!";
    alert("Usuario creado exitosamente");
  } else {
    document.getElementById("mensajefinal").innerHTML = "Formulario INVÁLIDO!!";
  }
}

function guardar() {
  alert("Usuario creado exitosamente");
}

// Paginación carousel

var slider = $(".carousel-inner")
  .carousel({ interval: 5000 })
  .bind("slid", function () {
    var index = $(this).find(".active").index();
    $(this)
      .find("a")
      .removeClass("pager-active")
      .eq(index)
      .addClass("pager-active");
  });

$(".slider-pager a").click(function (e) {
  var index = $(this).index();
  slider.carousel(index);
  e.preventDefault();
});

// Carrito de Compras

window.onload = function () {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Regalo 1',
            precio: 24990,
            imagen: 'assets/img/producto01.jpg'
        },
        {
            id: 2,
            nombre: 'Regalo 2',
            precio: 29990,
            imagen: 'assets/img/producto01.jpg'
        },
        {
            id: 3,
            nombre: 'Regalo 3',
            precio: 16990,
            imagen: 'assets/img/producto01.jpg'
        },
        {
            id: 4,
            nombre: 'Regalo 4',
            precio: 49990,
            imagen: 'assets/img/producto01.jpg'
        }

    ];

    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info.precio + '$';
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}€`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    /**
    * Calcula el precio total teniendo en cuenta los productos repetidos
    */
    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
        // Renderizamos el precio en el HTML
        DOMtotal.textContent = total.toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderizarProductos();


  } 

// Otras validaciones

$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

