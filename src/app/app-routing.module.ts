import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componets/login/login.component';
import { PrincipalComponent } from './componets/principal/principal.component';
import { NavegadorComponent } from './componets/navegador/navegador.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: PrincipalComponent },
  { path: 'navejador', component: NavegadorComponent },
  { path: 'login', component: LoginComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
