import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from "src/app/service/usuarios.service";
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from 'src/app/models/servisiobasedatos';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public dos: Array<any> = [];
  public Mun: Array<any> = [];
  public Com: Array<any> = [];
  public Tipo: Array<any> = [];
  
  name = "";apP = "";apM = "";em = "";teL = ""; call = "";numC = 0;user = "";pass = "";pass1 = "";t = "";ta = "";valorr = "";valor1 = "";valor2 = "";valor3 = "";
  public T1="";
  T2="";
  T3="";
  constructor(public dialog: MatDialog,private router: Router, private usuariosService: UsuariosService) {
    this.usuariosService.getEstado().subscribe((rest: any) => {this.dos = rest;});
  }
  
  login() {this.router.navigateByUrl('/login')}
  capturar() {
    this.usuariosService.getMunicipio().subscribe((rest: any) => {
      let j = 0;
      this.Mun = []
      for (let i = 0; i < rest.length; i++) {
        this.t = rest[i].nomEstado;
        if (this.t == this.valor1) {
          this.Mun[j] = rest[i];
          j += 1;
        }

      }
    }
    )
  }
  captar() {
    this.usuariosService.getComunidad().subscribe((rest: any) => {
      let r = 0;
      this.Com = []
      for (let i = 0; i < rest.length; i++) {
        this.t = rest[i].nomMunicipio;
        if (this.t == this.valor2) {
          this.Com[r] = rest[i];
          r+= 1;
        }

      }
    }
    )

  }
  cap() {
    this.valor3;
    console.log("" + this.valor3)

  }

  guardar() {
    
    if (this.name!=""&&this.apP!=""&&this.apM!=""&&this.em!=""&&this.teL!="") {
      this.T1=""
      if(this.valor1!=""&&this.valor2!=""&&this.valor3!=""&& this.call!=""&&this.numC!=0){
        this.T2=""
        if(this.user!=""&&this.pass!=""&&this.pass1!=""&&this.valorr!=""){
          this.T3=""
      if (this.pass == this.pass1) {
        const dialogRef = this.dialog.open(DialogoComponent,{
          width:'350px',
          data:'¿Deseas confirmar tu registro?'
        });
        dialogRef.afterClosed().subscribe(dialogRef => {
        
          if(dialogRef){
          const newUsr: Usuario = {
            estado: this.valor1,municipio: this.valor2,counidad: this.valor3,nomUsuari: this.user,nombre: this.name,apPaterno: this.apP,apMaterno: this.apM,
            correoElec: this.em,tel: this.teL,contr: this.pass,tipoUsuario: this.valorr,nomCall: this.call,numDom: this.numC
            
          }

          this.usuariosService.addNewUsuari(newUsr).subscribe(rest => console.log(rest))
          this.router.navigateByUrl('/login')
        }
        })
        
        
      } else {
        this.pass1 = "";
        this.T3="Contraseña incorrecto";
       }
      }else{
        this.T3="llena todos los campos para registrarte"
      }
     }else{
       this.T2="llena todos los campos para registrarte"
     }
    }else{
      
      this.T1="llena todos los campos para registrarte"
      
    }
  }
  ngOnInit(): void {
    this.usuariosService.getTipo().subscribe((rest: any) => {
      this.Tipo = rest;
    })
  }

}

