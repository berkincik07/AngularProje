import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesaj } from 'src/app/models/mesaj';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-mesajlar',
  templateUrl: './mesajlar.component.html',
  styleUrls: ['./mesajlar.component.css']
})
export class MesajlarComponent implements OnInit {
  user : string
  userId: string;
  mesajlar: Mesaj[];  
  ad: string
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast: ToastrService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.userId;
    this.user = user.displayName;
    this.mesajListele();
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

  HepsiniSil(){
    this.fbServis.HepsiniSil(this.ad)
    this.toast.info("Mesaj kutunuz temizlendi.")
  }

  mesajListele(){
    this.fbServis.MesajListele().snapshotChanges().subscribe(data => {
      this.mesajlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.mesajlar.push(y as unknown as Mesaj);
      });
    });
  }
}
