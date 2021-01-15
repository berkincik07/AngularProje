import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesaj } from 'src/app/models/mesaj';
import { Sonuc } from 'src/app/models/sonuc';
import { Araba } from 'src/app/models/araba';
import { FbservisService } from 'src/app/services/fbservis.service';
import { StorageService } from 'src/app/services/storage.service';
import { Musteri } from 'src/app/models/musteriler';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  cars : Araba[]
  musteriler : Musteri = new Musteri();
  mesaj : Mesaj = new Mesaj();
  constructor(public fbServis: FbservisService,
              public router: Router,
              public toast: ToastrService,
              public stServis : StorageService) {  }

  ngOnInit(): void {
    this.listCar()
  }
  
  listCar(){
    this.stServis.listCar().snapshotChanges().subscribe(data => {
      this.cars = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key:satir.key};
        this.cars.push(y as Araba)
      })
    })
  }

  OturumKapat(){
    {
      this.fbServis.OturumKapat().then(d => {
        localStorage.removeItem("user");
        this.router.navigate(['/']);
      });
  
    }
    this.toast.success("Başarıyla Çıkış Yaptınız.")
  }

  kirala(gun:number,mail:string,ad:string,fiyat:number,model:string){

    var tarih = new Date().toString()   
    this.toast.success(`Size en kısa sürede ${mail} adresiniz üzerinden ulaşacağız. İşleminizin tutarı ${gun*fiyat} TL.`,`Sayın ${ad},`)

    this.fbServis.MusteriEkle({
      ad : ad,
      mail : mail,
      gun : gun,
      fiyat : fiyat,
      tarih: tarih,
      model : model
    }).then(d => {
     this.sonuc.mesaj = "Mesajınız bize ulaştı. Teşekkür ederiz !";
    });
  }

  oturumKontrol(){
    return this.fbServis.OturumKontrol()
  }

  Toast(){
    this.toast.success("Islem Tamam")
  }

  Gonder(ad:string,mail:string,tel:string,mesaj:string) {
    
    var tarih = new Date().toString()
    
    this.fbServis.MesajEkle({
      ad : ad,
      mail : mail,
      telefon : tel,
      mesaj : mesaj,
      gonTarih : tarih,

    }).then(d => {
      this.toast.success("Mesajınız bize ulaştı, Teşekkür ederiz !","",{ positionClass : "toast-bottom-right"})
     
    });
  }

}
