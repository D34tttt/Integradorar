import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componets/login/login.component';
import { PrincipalComponent } from './componets/principal/principal.component';
import { NavegadorComponent } from './componets/navegador/navegador.component';
import { RegistroComponent } from './componets/registro/registro.component';
import { HistorialComponent } from './componets/historial/historial.component';
import { ValuadorComponent } from './componets/valuador/valuador.component';
import { EvaluarComponent } from './componets/evaluar/evaluar.component';
import { EditarComponent } from './componets/editar/editar.component';
import { VerComponent } from './componets/ver/ver.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: PrincipalComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mis terrenos', component: HistorialComponent },
  { path: 'terreno a evaluar', component: EvaluarComponent },
  { path: 'navejador', component: NavegadorComponent },
  { path: 'evaluar terrenos', component: ValuadorComponent },
  { path: 'login', component: LoginComponent },
  { path:'editar', component: EditarComponent },
  { path:'ver', component:VerComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
