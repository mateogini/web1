let tablaDesc = document.querySelector('.tablaDesc');
let users = [];

const API= "https://62b738df0d4a2cd3e1a8ea24.mockapi.io/api/v1/compras"
document.addEventListener("DOMContentLoaded", iniciarpag);

/* Al inciar la pagina*/
async function iniciarpag(){
  cargarTabla();
}
async function cargarTabla(){ 
    let respuesta= await fetch(API, {   // Guardamos lo del api en una variable
      'method': "GET" 
    }) //elegimos el metodo
    let users= await respuesta.json(); 
    
        for (let renglon of users){ // imprimimos el array
        
          tablaDesc.innerHTML+= ` 
                <tr>
                    <td>${renglon.producto }</td>
                    <td>${"$"+renglon.precio}</td>
                    <td><button data-id="${renglon.id}" class="btnEditar"> Editar </button></td>
                    <td><button id="btnBorrar${renglon.id}"> Borrar </button></td>
                    
                </tr>
            `;;
        }
            for (let i = 0; i <users.length; i++) {
              let id = users[i].id;
              document.querySelector("#btnBorrar" + id).addEventListener("click", function () {
                  borrarDato(id);
                  window.setTimeout(cargarTabla, 1000);
                });
            }
          editBtn()
}
// selecciono todos los botones con class editar para llamar a funcion
function editBtn() {
let btnEdit = document.querySelectorAll(".btnEditar");
for (const btn of btnEdit) {
  btn.addEventListener("click", iniciarEdicion);
  
}
}
// enviar datos al api 
let form = document.querySelector(".formulario_venta").addEventListener("submit", async function (e) {
  e.preventDefault();
  let formData = new FormData(this);
  let user = {
    producto: formData.get("producto"),
    precio: formData.get("precio")
  };
  try {
    await fetch(API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    });
  } catch (error) {
    console.log(error);
  }
  tablaDesc.innerHTML="";
  cargarTabla();
});

// tomo valor id del form a editar
formEdit.addEventListener("submit", editarfila);
// editar con PUT
async function editarfila(e) {
e.preventDefault();
formEdit.classList.toggle("show");
let formData = new FormData(this);
let datos = {
  producto: formData.get("editarProducto"),
  precio: formData.get("editarPrecio")
};
console.log(datos);
let response = null;
inputsedit.disabled = true;
try {
  response = await fetch(API + "/" + formData.get("id"), {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datos)
  });
} catch (error) {
  console.log(error);
}
if (response == null) {
  return;
}
formEdit.classList.add("hidden");
inputsedit.disabled = false;
tablaDesc.innerHTML="";
await cargarTabla(); //vuelvo a mostrar la tabla luego de edicion
}
async function iniciarEdicion() {
formEdit.classList.remove("hidden");
const idSeleccionado = this.dataset.id;
console.log(this.dataset.id);
inputEditId.value = idSeleccionado;
editarProducto.value=" ";
editarPrecio.value=" ";
}
async function borrarDato(id) {
console.log(`Deleting #${id}...`);
try {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  if (res.ok) {
    console.log(`${id}+"borrado"`);
    let json = await res.json();
    console.log(json);
  }
} catch (error) {
  console.log(error)
}
tablaDesc.innerHTML=""; 
}