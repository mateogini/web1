function generarcaptcha() {
  let a = Math.floor((Math.random() * 10));
  let b = Math.floor((Math.random() * 10));
  let c = Math.floor((Math.random() * 10));
  let d = Math.floor((Math.random() * 10));
  cap = a.toString()+b.toString()+c.toString()+d.toString();
  document.getElementById("captcha").value = cap;
  document.getElementById("verificacionCaptcha").innerHTML = " ";
  let enviarForm=document.querySelector(".enviarForm");
  enviarForm.addEventListener("click", check)
  }
  function check() {
      let entrada = document.getElementById("InputText").value;
      let mensaje = "CAPTCHA INCORRECTO";
      let mensaje2 = "Postulación Enviada."
      document.getElementById("verificacionCaptcha").value ="";
      if (entrada != cap)
      {
          document.querySelector("#verificacionCaptcha").innerHTML = mensaje;
      }
      else { 
      document.getElementById("verificacionCaptcha").innerHTML = mensaje2;
      }
  } 
  
  
  // MENU RESPONSIVE 
  document.querySelector(".menu_btn").addEventListener("click", mostrarmenu);
  function mostrarmenu() {
      document.querySelector(".nav").classList.toggle("show");
  }


 