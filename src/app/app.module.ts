import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { PrincipalComponent } from './componets/principal/principal.component';
import { NavegadorComponent } from './componets/navegador/navegador.component';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    PrincipalComponent,
    NavegadorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
   
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
