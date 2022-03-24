import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { PrincipalComponent } from './componets/principal/principal.component';
import { NavegadorComponent } from './componets/navegador/navegador.component';
import { RegistroComponent } from './componets/registro/registro.component';
import { HistorialComponent } from './componets/historial/historial.component';
import { ValuadorComponent } from './componets/valuador/valuador.component';
import { EvaluarComponent } from './componets/evaluar/evaluar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { Navegador2Component } from './componets/navegador2/navegador2.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoComponent } from './componets/dialogo/dialogo.component';
import { EditarComponent } from './componets/editar/editar.component';
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    PrincipalComponent,
    NavegadorComponent,
    RegistroComponent,
    HistorialComponent,
    ValuadorComponent,
    EvaluarComponent,
    Navegador2Component,
    DialogoComponent,
    EditarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    NzIconModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
   entryComponents: [DialogoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
