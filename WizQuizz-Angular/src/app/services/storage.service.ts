import { Injectable } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : AngularFireStorage, private router : Router) { }

  // async uploadFile(image : any, filePath : string) {
  //   const ref = this.storage.ref(filePath);
  //   const task = await ref.put(image);
  //   console.log(task);
  //   return task;
  // }

  async uploadFile(imagePath: string) {
    const filePath = 'name-your-file-path-here'; // Ruta en el almacenamiento
    const fileRef = this.storage.ref(filePath);

    const assetRef = this.storage.ref(imagePath);
    // Obtener la URL de descarga de la imagen en la carpeta 'assets'
    // assetRef.getDownloadURL().subscribe((url) => {
    //   // Cargar la imagen desde la URL en la carpeta 'assets' al almacenamiento
    //   const task = fileRef.putString(url, 'data_url');
    // })
    const task = assetRef.put(fileRef);
  }

}
