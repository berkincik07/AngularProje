import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Musteri } from 'src/app/models/musteriler';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-musteriler',
  templateUrl: './musteriler.component.html',
  styleUrls: ['./musteriler.component.css']
})
export class MusterilerComponent implements OnInit {
  key: string
  adsoyad: string;
  uid: string;
  musteriler : Musteri[]
  ad: string
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast: ToastrService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.musteriListele();
    this.route.params.subscribe(p => {
      this.ad = p.ad;
    });
  }

  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });

  }

  musteriListele(){
    this.fbServis.MusteriListele().snapshotChanges().subscribe(data => {
      this.musteriler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.musteriler.push(y as unknown as Musteri);
      });
    });
  }
}
