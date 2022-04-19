import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Consulta, Historial, NumT, Terreno, Usuario } from 'src/app/models/servisiobasedatos';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { tipoUsuario } from '../../models/servisiobasedatos';
import { CargarComponent } from '../cargar/cargar.component';
import { EchoComponent } from '../echo/echo.component';
import { MapService } from 'src/app/service/map.service';
import { map } from 'rxjs/internal/operators/map';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  mostrar:Boolean = false;
  cargarl:Boolean = false;
  result = "";
  valuador="";
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
  data="";
  T1="";
  btn=0;
  fecha:Date;
  user: any;
  resultad="";
  tipo=0;
  public Tipo: Array<any> = [];
  U="";
  constructor(public dialog: MatDialog,private map: MapService,
    public router: Router,public usuariosService: UsuariosService) {
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
      this.valor6=rest[p].estado;
      this.valor7=rest[p].municipio;
      this.valor8=rest[p].counidad;
      
    })
    function generaNss() {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result;
  }
   this.valor0=generaNss()
   
   }
   l(){
    let j = 0;
    let resultado=localStorage.getItem('resultados');
    this.U=String(resultado)
    this.usuariosService.getPersonas().subscribe((rest:any)=>{
    for(let i=0;i<rest.length;i++){
      this.user=rest[i].tipoUsuario
      if (this.user=="valuador"){
        this.resultad=rest[i].nomUsuari;
        this.Tipo[j]=rest[i]
        j++;
      }
    }
  })
    if(resultado!=""){
    }else{
      this.router.navigateByUrl('/login')
    }
   }
   showFiller = false;
  ngOnInit(): void {
    this.valor13=this.valor11*this.valor12;
    this.mapa();
    
    this.l()
    this.getNumT()
    
    
    
  }
  getNumT(){
    
    this.usuariosService.getNumt().subscribe((rest:any)=>{
     this.tipo=rest[0].nomNumT
     this.tipo++;
    })
  }
  GuT(){
    const dialogRef = this.dialog.open(DialogoComponent,{
      width:'350px',
      data:'¿Deseas confirmar el registro de este terreno?'
    });
    dialogRef.afterClosed().subscribe(dialogRef => {
      if(dialogRef){

    const newNum: NumT = {
      nomNumT: this.tipo
    }
    this.usuariosService.actualizarNum(newNum).subscribe((rest:any) => {})
    this.valor13=this.valor12*this.valor11;
    const newTerreno:Terreno={
      idl: this.tipo,
      idTerreno: this.valor0,
      nombre_pro: this.U,
      ancho: this.valor11,
      largo: this.valor12,
      area: this.valor13,
      estado: this.valor6,
      municipio: this.valor7,
      comunidad: this.valor8,
      colinda: "",
      latitud: this.valor9,
      longitud: this.valor10,
    }
    this.usuariosService.addNewTerreno(newTerreno).subscribe((rest:any) => {})
    

    const historial:Historial={
      nomUsuari: this.U,
      fecha: new Date(),
      latitud: this.valor9,
      longitud: this.valor10,
      idl: this.tipo,
      status: 'No esta evaluada'
    }
    console.log(this.tipo)
    this.usuariosService.newHistorial(historial).subscribe((historial:any)=>{})
    let yo=this.dialog.open(CargarComponent,{
    });
    yo.afterClosed().subscribe(dialogRef => {
      if(dialogRef){
      }else{
        let correcto=this.dialog.open(EchoComponent,{
          data:'Terreno Guardado Correctamente'
        });
        correcto.afterClosed().subscribe(dialogRef => {
            this.router.navigateByUrl('/mis terrenos')
          
        })
        
      }
    })
   
  }
    })
  }
   mostrarD(){
     if(this.mostrar){
       this.mostrar =false;
     }else{
      this.mostrar=true;
      this.cargarl=false;
      
     }
   } 
   localitation(){
     this.valor9=this.map.lait();
     this.valor10=this.map.lonng()
   }
  select(){
    if(this.btn==0){
      this.btn=1
      this.map.getPosition().then(pos => {
        this.map.select(pos.lat,pos.lng);
         
    });
    }else{
      this.btn=0;
      this.mapa
    }
    
    
  }
  mapa(){
    this.map.getPosition().then(pos => {
      this.map.buildMap(pos.lat,pos.lng);
       
  });
  }
}
