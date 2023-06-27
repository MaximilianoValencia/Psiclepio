import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FotoUpload } from '../models/foto-upload.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FotoUploadService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,/*private auth:AuthService*/) { }

  pushFileToStorage(fotoUpload: FotoUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fotoUpload.foto.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fotoUpload.foto);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fotoUpload.url = downloadURL;
          //fotoUpload.uid = "";
          fotoUpload.name = fotoUpload.foto.name;
          this.saveFileData(fotoUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fotoUpload: FotoUpload): void {
    this.db.list(this.basePath).push(fotoUpload);
  }

  getFiles(numberItems: number): AngularFireList<FotoUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  // deleteFile(fotoUpload: FotoUpload): void {
  //   this.deleteFileDatabase(fotoUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fotoUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
