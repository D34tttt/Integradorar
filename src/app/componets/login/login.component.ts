import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { UsuariosService } from "src/app/service/usuarios.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user="";
  valor1="";
  usuario: any;
  pass: any;
  public usuarios: Array<any> = [];
  valor2: any;
  resul1: any;
  tipo="";
  valor="";
  v="";
  public resultado="";
  
  constructor(private router: Router, private usuariosService:UsuariosService) {
    
   }
  login(){
    
  this.usuariosService.getPersonas().subscribe((rest:any)=>{

    for(let i=0;i<rest.length;i++){
      this.user=rest[i].nomUsuari
      if (this.user==this.valor1){
        this.user=rest[i]
        this.resultado=rest[i].nomUsuari;
        this.usuario=rest[i].usuario;
        this.pass=rest[i].contr;
        this.tipo=rest[i].tipoUsuario
        if(this.pass==this.valor2){
          if(this.tipo=="valuador"){
            
            this.router.navigateByUrl('/evaluar terrenos');
          }else{
            this.router.navigateByUrl('/home');
  
          }
        }else{
          this.resul1="contraseña incorrecta";
        }
      }else{
        this.resul1="Correo incorrecto";
      }
    }
    localStorage.setItem('resultados',  this.resultado ) ;
  })
   

  }
  ngOnInit(): void {
    let resultado=localStorage.getItem('resultados');
    let l=String(resultado)
    this.usuariosService.getPersonas().subscribe((rest:any)=>{
    for(let i=0;i<rest.length;i++){
      this.user=rest[i].nomUsuari
      if (this.user==l){
        this.tipo=rest[i].tipoUsuario
        if(this.tipo=="valuador"){
            
          this.router.navigateByUrl('/evaluar terrenos');
        }else{
         
          this.router.navigateByUrl('/home');

        }
      }
    }
  })
  }
  
}
