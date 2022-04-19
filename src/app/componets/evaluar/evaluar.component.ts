import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historial, Imagenes, Valorado } from 'src/app/models/servisiobasedatos';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MapService } from 'src/app/service/map.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget | any;
}
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
  lat:number;
  lng:number;
  num=0;
  file!: File;
  y=this.file;
  imageSelected: String | ArrayBuffer |undefined;
  fotoSe:any ;
  constructor(public usuariosService: UsuariosService,private map: MapService,private router: Router) { 
    let resultado=localStorage.getItem('Terreno');
    this.get(resultado)
    this.l=resultado;
    this.num=Number(resultado);
    this.usuariosService.getTerrenos().subscribe((rest:any)=>{
      rest.forEach(element => {
        if(element.idl==this.num){
          this.lat=element.latitud
          this.lng=element.longitud
          this.map.g(this.lng,this.lat);
        }
      });
   });
  }
  
  ngOnInit(): void {
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
 onPhotoSelected(event: HtmlInputEvent):void{
  if (event.target.files && event.target.files[0]){
    this.file = <File>event.target.files[0];

    //prevista de imagen
    const reader=new FileReader();
    reader.onload= e => this.imageSelected= reader.result as String;
    reader.readAsDataURL(this.file);
  }
}
p(){
  const i:Imagenes={
    idTerreno: 75,
    imagen: this.y
  }
  this.usuariosService.newImagen(i).subscribe((rest: any)=>{

  })
}
 
}
