import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {
  valor0=""
  valor1="";
  valor2="";
  valor3="";
  valor4="";
  valor5="";
  valor6="";
  valor7="";
  valor8="";
  valor9=0;
  valor10=0;
  valor11=0;
  valor12=0;
  valor13=0;
  tipo=0;
  constructor(public usuariosService: UsuariosService) {
    let p=0;
    this.usuariosService.getPersonas().subscribe((rest:any)=>{
      let resultado=localStorage.getItem('resultados');
      for (let i = 0; i < rest.length; i++){
          let r=rest[i].nomUsuari;
          if(resultado==r){
             p=i;
          }
          
      }
      this.valor1=rest[p].nombre;
      this.valor2=rest[p].apPaterno;
      this.valor3=rest[p].apMaterno;
      this.valor4=rest[p].correoElec;
      this.valor5=rest[p].tel;
    })
    let r= String(localStorage.getItem("Terreno"))
    this.usuariosService.getTerreno(r).subscribe((rest:any)=>{
      let yy=rest.terreno;
     this.tipo=yy.idl;
     this.valor6=yy.estado;
     this.valor7=yy.municipio;
     this.valor8=yy.comunidad;
     this.valor9=yy.latitud;
     this.valor10=yy.longitud;
     this.valor11=yy.ancho;
     this.valor12=yy.largo;
     this.valor13=yy.area;
     this.valor0=yy.idTerreno;
    })
   }

  ngOnInit(): void {
  }

}
