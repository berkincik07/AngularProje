import { Uye } from './../models/uye';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'
import { Mesaj } from '../models/mesaj';
import { Musteri } from '../models/musteriler';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbUye = '/Uyeler';
  private dbMesaj = '/Mesajlar';
  private dbMusteri = '/Musteriler';
  musteriRef : AngularFireList<Musteri> = null;
  uyeRef: AngularFireList<Uye> = null;
  mesajRef : AngularFireList<Mesaj> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.uyeRef = db.list(this.dbUye);
    this.musteriRef = db.list(this.dbMusteri)
    this.mesajRef = db.list(this.dbMesaj)
  }

  adminOturumAc(mail:string , parola:string){
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  MesajEkle(mesaj:Mesaj){
    return this.mesajRef.push(mesaj)
  }
  MusteriEkle(musteri:Musteri){
    return this.musteriRef.push(musteri)
  }
  MusteriListele(){
    return this.musteriRef;
  }
  MesajListele(){
    return this.mesajRef;
  }

  // DeleteCar(car:Araba){
  //   this.DeleteCarData(car).then(()=>{
  //     this.DeleteFromStorage(car)
  //   });
  // }
  HepsiniSil(key : string){
    return this.mesajRef.remove(key);
  }
}
