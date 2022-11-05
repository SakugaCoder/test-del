//mobile menu
const burgerIcon = document.querySelector('#burguer');
const navbarMenu = document.querySelector('#navbarBasicExample')

burgerIcon.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('is-active')
    burgerIcon.classList.toggle('is-active')
    
})
function goTo(evt, path){
    let target = null;
    let href = null;

    if(path){
        href = path;
    }

    else{
        evt.preventDefault();
        href = evt.target.href.split('/')[3];
    }

    target = document.getElementById(href).offsetTop;

    window.scrollTo({
        top: target - 140,
        behavior: 'smooth'
    });
}
let links = document.querySelector('#menu');
document.getElementById("mail").value = ''
links.forEach( function(link) {
    link.addEventListener('click', goTo);
});
document.getElementById("mail").value =''
function validarEmail(elemento) {
    var texto = document.getElementById(elemento).value;
    var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!regex.test(texto)) {
        document.getElementById("resultado").innerHTML = "Correo invalido";
        document.getElementById('saveMail').disabled = true;
    } else {
        document.getElementById("resultado").innerHTML = "";
        document.getElementById('saveMail').disabled = false;
    }

}
function saveMail() {
    var data_info = {
        "correo": document.getElementById("mail").value
      }
      document.getElementById("mail").value = ''
     $.ajax({
        type: "POST",
        url: 'http://ec2-54-241-64-82.us-west-1.compute.amazonaws.com:2999/clientes/guardar-correo',
        data:JSON.stringify(data_info) ,
        contentType: 'application/json',
        success: function(result){
            document.getElementById("resultado").innerHTML = "Ten enviaremos mas detalles por correo";
        }, error: function(error) {
            document.getElementById("resultado").innerHTML = "Solicitar en otro momento";
        }
    }); 
}

async function sendEmail(evt){
    evt.preventDefault();
    console.log('hey');

    let nombre = document.getElementsByName('name').value;
    let empresa = document.getElementsByName('company').value;
    let tel = document.getElementsByName('tel').value;
    let data =
    {
        destinatario: 'mgutierreze@quintaapp.com.mx',
        // destinatario: 'diego.bocanegra.trenado@gmail.com',
        asunto: "Cliente requiere demo",
        contenido: `El cliente ${nombre} de la empresa ${empresa} require ver una demo. Por favor ponte en contacto con el al teléfono ${tel}.`
    }

    let res = await fetch('http://ec2-54-241-64-82.us-west-1.compute.amazonaws.com:2999/enviar-correo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    });

    let json = await res.json();
    console.log(json);
    alert('Gracias por tu información. Nos pondremos en contacto contigo.')
}
