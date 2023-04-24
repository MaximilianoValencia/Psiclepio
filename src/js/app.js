
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

function validarFormSignup(){
    var nombre = document.getElementById("name").value;
    var correo = documet.getElementById("email").value;
    var contraseña1 = document.getElementById("password");
    var contraseña2 = document.getElementById("confirm-password");

    if( !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)){
        document.getElementById("correoError").innerText =" Debe ingresar un correo Valido";
        return false;
    }else{
        document.getElementById("correoError").innerText ="";
    }

    if( !/^[a-zA-Z\s]*$/.test(nombre)){
        document.getElementById("mombreError").innerText =" Debe ingresar un nombre Valido";
        return false;
    }else{
        document.getElementById("nombreError").innerText ="";
    }
    
    if( !(contraseña1===contraseña2) ){
        document.getElementById("passError").innerText =" Las contraseñas ingresadas no coinciden ";
        return false;
    }

    if ( !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contraseña1)){
        document.getElementById("passError").innerText =" Debe ingresar una contraseña valida, una contraseña valida debe tener al menos 8 caracteres , almenos una letra y un numero";
        return false;
    }else{
        document.getElementById("passError").innerText ="";
    }
    return true
}