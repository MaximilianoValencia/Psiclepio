export interface User {
    uid: string;
    email: string;
    nombre: string;
    fotoPerfilUrl: string;
    emailVerified: boolean;
    isPaciente: boolean;
    isProfesional: boolean;
    fechaNacimiento:Date;
    genero:string;
    numero:string;
 }