import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historial, Imagenes, Valorado } from 'src/app/models/servisiobasedatos';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MapService } from 'src/app/service/map.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss']
})
export class EvaluarComponent implements OnInit {
  public Tipo: Array<any> = [];
  valor=0;
  valor1="";
  suma=0;
  item=0;
  l:any;
  num=0;
  file:File;
  fotoSe:any ;
  constructor(public usuariosService: UsuariosService,private map: MapService,private router: Router) { 
    let resultado=localStorage.getItem('Terreno');
    this.get(resultado)
    this.l=resultado;
    this.num=Number(resultado);
  }
  
  ngOnInit(): void {
    this.map.buildMap();
    this.imagenes();
  
  }
 A(){

   
     const valor:Valorado={
       idTerreno:this.num ,
       Item: this.valor1,
       costo: this.valor,
     }
     this.usuariosService.newValoracio(valor).subscribe((res)=>{
       console.log(res)
     })
      window.location.reload();
 }
 get(item:any){
   let p=0;
  this.usuariosService.getValoracion().subscribe((valor: any) => {
    for (let i=0; i<valor.length; i++){
      let valor1=valor[i].idTerreno;
      if(item==valor1){
        this.Tipo[p]=valor[i]
        this.suma+=valor[i].costo;
        p++;
       
      }
    }
    })

 }
 C(){
this.valor=0;
this.valor1="";
 }
 g(){
   this.usuariosService.getConsulta().subscribe((consulta: any) => {
       for (let i = 0; i <consulta.length; i++){
         let v= consulta[i].idT;
         if(this.num==v){
           let id=consulta[i]._id;
          this.usuariosService.deleteC(id).subscribe((rest: any) => {
            
         })
         this.router.navigateByUrl("/evaluar terrenos")
         }
       }
     })
     let resultado=localStorage.getItem('Terreno');
     let item=Number(resultado);
     this.usuariosService.getHistorial().subscribe((rest: any) => {
      for (let i = 0; i < rest.length; i++) {
        let tip = rest[i].idl;
        if (item == tip) {
          let id = String(rest[i]._id);
          const historial: Historial = {
            status: 'Ya se evaluo tu terreno',
            idl: rest[i].idl,
            nomUsuari: rest[i].nomUsuari,
            fecha: rest[i].fecha,
            latitud: rest[i].latitud,
            longitud: rest[i].longitud,
          }
          this.usuariosService.actualizarHistorizl(id,historial).subscribe((rest: any) => {

          });
        }
      }
    });

 }
  p(){
  const image:Imagenes={
    idTerreno: this.num,
    imagen: this.file,
  }
  this.usuariosService.newImagen(image).subscribe((rest: any)=>{
    console.log(rest)
  })
  }
  imagenes(){
    this.usuariosService.geImagenes().subscribe((rest: any)=>{
      console.log(rest);
    })
  }
 
}
