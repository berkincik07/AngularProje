import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Araba } from '../models/araba';
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  basePath = "/Arabalar";


  constructor(
    public db:AngularFireDatabase,
    public storage:AngularFireStorage
  ) { }

  CarUpload(car:Araba){
    var date = new Date();
    const path = this.basePath+"/"+car.file.name;
    const storageRef = this.storage.ref(path);
    const task = this.storage.upload(path,car.file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe(Url =>{
          car.url = Url;
          // Alttakini değişmen gerekebilir 
         
          car.ad=car.file.name;
          car.tarih = date.toString();
          this.carDataUpload(car)
        })
      })
    ).subscribe();

    return task.percentageChanges();
  }

  carDataUpload(car:Araba){
    this.db.list(this.basePath).push(car)
  }

  listCar(){
    return this.db.list(this.basePath);
  }
  
  DeleteCar(car:Araba){
    this.DeleteCarData(car).then(()=>{
      this.DeleteFromStorage(car)
    });
  }

  DeleteCarData(car:Araba){
    return this.db.list(this.basePath).remove(car.key)
  }

  DeleteFromStorage(car:Araba){
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(car.model).delete();
  }

}
