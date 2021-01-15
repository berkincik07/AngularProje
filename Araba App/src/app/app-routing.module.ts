import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AnasayfaComponent } from './components/anasayfa/anasayfa.component';
import { MesajlarComponent } from './components/mesajlar/mesajlar.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MusterilerComponent } from './components/musteriler/musteriler.component';

const redirectLogin = () => redirectUnauthorizedTo(['login']);
const redirectadminLogin = () => redirectUnauthorizedTo(['admin-login']);
const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  }, {
    path: 'kayitlar',
    component: KayitlarComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
   {
    path: 'mesajlar',
    component: MesajlarComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'musteriler',
    component: MusterilerComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectadminLogin
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectadminLogin
    }
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: AnasayfaComponent },
  { path: 'admin-login', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
