let btn = document.querySelector("#btn_cotizar");
let form = document.querySelector("#form_cotizador");
btn.addEventListener("click", cotizar);
function cotizar(e){
  e.preventDefault();
  let name = document.querySelector("#cliente").value;
  let dominio = document.querySelector("#dominio").value;
  let valor = document.querySelector("#valor").value;
  let tipo = document.querySelector("#tipo").value;
  let tabla = document.querySelector(".contenedor_cotizacion");
  if(!name || !dominio || !valor || !tipo){
  alert("complete todos los campos");
  return;
  }
  else{
    let cuota = 0;
    let textoTipo = "";
    if (tipo === "tercero") {
        textoTipo = "Terceros completos";
        cuota = valor * 0.5/100;
    } else {
        textoTipo = "Todo riesgo";
        cuota = valor * 1/100;
    }
 
  if (tipo === "todo_riesgo"){
    tabla.innerHTML+=`<ul>
      <li>${name}</li>
    </ul>
    `
    
  }
}
  
  
}

