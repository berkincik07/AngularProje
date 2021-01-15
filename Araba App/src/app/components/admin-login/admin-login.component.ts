import { FbservisService } from './../../services/fbservis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  constructor(
    public toast: ToastrService,
    public fbServis: FbservisService,
    public router: Router,
    
  ) { }

  ngOnInit() {
  }
  GirisYap(mail: string, parola: string) {
    this.fbServis.adminOturumAc(mail, parola).then(d => {
      localStorage.setItem("user", JSON.stringify(d.user));
      this.toast.success("Başarıyla giriş yaptınız.")
      this.router.navigate(['/admin']);
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "E-Posta Adresi veya Parolanız geçersiz. Lütfen tekrar deneyiniz.";
    });
  }
}
