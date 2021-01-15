import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Araba } from 'src/app/models/araba';
import { FbservisService } from 'src/app/services/fbservis.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  cars : Araba[]
  file:FileList
  ad : string
  key: string
  model : string  
  yil : string;
  adsoyad: string;
  uid: string;
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public stServis : StorageService,
    public toast: ToastrService,
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.listCar()
  }
  ArabaSec(e){
    this.file = e.target.files;
  }

  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });

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

  FileUpload(yil,model,fiyat,id,km,klima,vites,yakit){
    var file = this.file[0];
    var car = new Araba();
    car.file= file;
    car.model = model
    car.yil = yil
    car.fiyat = fiyat
    car.id = id
    car.klima = klima
    car.km = km
    car.vites = vites
    car.yakit = yakit
    this.toast.success("Araç kaydı girildi.")
    this.stServis.CarUpload(car).subscribe(p =>{
      
    }, err =>{
      this.toast.success("Bir hata meydana geldi.")
    });
  }

  DeleteCar(car:Araba){
    this.stServis.DeleteCar(car)
  }

}
