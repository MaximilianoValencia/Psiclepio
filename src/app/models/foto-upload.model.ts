export class FotoUpload {
  uid!:string;
  name!: string;
  url!: string;
  foto: File;
  // key?:  undefined;

  constructor(foto: File, uid:string) {
    this.foto = foto;
    this.uid=uid;
  }
}

