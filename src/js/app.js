
function validarFormLogin(){
    var correo = document.getElementById("email").value;
    var contraseña = document.getElementById("password").value;

    if( !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)){
        document.getElementById("correoError").innerText =" Debe ingresar un correo Valido";
        return false;
    }else{
        document.getElementById("correoError").innerText ="";
    }
    if(contraseña.length===0){
        document.getElementById("passError").innerText ="Debe ingresar una contraseña";
        return false;
    }else{   
        document.getElementById("passError").innerText ="";
    }
    return true;
}
