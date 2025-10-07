    const email={
        email:'',
        asunto:'',
        mensaje:''
    }

    const inputEmail=document.querySelector('#email');
    const inputAsunto=document.querySelector('#asunto');
    const inputMensaje=document.querySelector('#mensaje');
    const spinner=document.querySelector('#spinner');
    const botonEnviar=document.querySelector('#botones button[type=submit]');
    const botonReset=document.querySelector('#botones button[type=reset]');
    const formulario=document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded',function(){

    inputEmail.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);
    formulario.addEventListener('submit',enviarEmail);
    botonReset.addEventListener('click',confirmarReseteo);
});

function enviarEmail(e){
    e.preventDefault();
    
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(()=>{
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');

        resetFormulario();

        alertaExito=document.createElement('p');
        alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
        alertaExito.textContent='El email se envió correctamente';
        formulario.appendChild(alertaExito);

        setTimeout(()=>{
            alertaExito.remove();
        },3000);

    },3000);


}

function validar(e){
    if(e.target.value.trim()===''){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
        email[e.target.id]='';
        comprobarEmail();
        return;
    }
    if(e.target.id==='email'){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validarEmail(e.target.value)) {
            mostrarAlerta(`El email NO es válido`,e.target.parentElement);
            email[e.target.id]='';
            comprobarEmail();
            return;
        }
    }
    limpiarAlerta(e.target.parentElement);

    //Asignar los valores al objeto email
    email[e.target.id]=e.target.value.trim().toLowerCase();
    
    comprobarEmail();
}

function mostrarAlerta(mensaje,referencia){
    //primero comprueba si ya existe esa alerta y si existe la elimina
    limpiarAlerta(referencia);
    //genera la alerta
    const error=document.createElement('p');
    error.classList.add('bg-red-600','text-white','p-2','text-center');
    error.textContent=mensaje;
    referencia.appendChild(error);
}

function limpiarAlerta(referencia){
    const alerta=referencia.querySelector('.bg-red-600');
    if(alerta){
        alerta.remove();
    }
}

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return resultado=regex.test(email);
}

function comprobarEmail(){
    if(Object.values(email).includes('')){
        botonEnviar.classList.add('opacity-50');
        botonEnviar.disabled=true;
        return;
    }
    botonEnviar.classList.remove('opacity-50');
    botonEnviar.disabled=false;
    
}

function confirmarReseteo(e){
    e.preventDefault();

    resetFormulario();
}

function resetFormulario(){
    email.email='';
    email.asunto='';
    email.mensaje='';

    formulario.reset();
    comprobarEmail();
}
function crearAlertaDeExito(mensaje){
    alertaExito=document.createElement('p');
    alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
    alertaExito.textContent=mensaje;
    formulario.appendChild(alertaExito);
}