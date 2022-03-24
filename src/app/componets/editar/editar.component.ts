import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Consulta, Historial, NumT, Terreno } from 'src/app/models/servisiobasedatos';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { DialogoComponent } from '../dialogo/dialogo.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
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
  t=0;
  user: any;
  resultad="";
  tipo=0;
  public Tipo: Array<any> = [];
  U="";
  rr="";
  constructor(public dialog: MatDialog,public router: Router,public usuariosService: UsuariosService) {
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
   
  ngOnInit(): void {
    this.l()
    let date= new Date();
    let dia=date.getDate();
    let mes=date.getMonth()
    let year=date.getFullYear();
    let tiem=date.getHours()
    let min=date.getMinutes()
    this.data=(dia+"-"+ mes+"-"+ year+" "+tiem+":"+min)
    let r= String(localStorage.getItem("Terreno"))
    this.rr=r;
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
  GuT(){
    const dialogRef = this.dialog.open(DialogoComponent,{
      width:'350px',
      data:'¿Deseas confirmar el registro de este terreno?'
    });
    dialogRef.afterClosed().subscribe(dialogRef => {
      if(dialogRef){
    const newTerreno:Terreno={
      idl: this.tipo,
      idTerreno: this.valor0,
      nombre_pro: this.U,
      ancho: this.valor11,
      largo: this.valor12,
      area: this.valor13,
      estado: this.valor6,
      municipio: this.valor7,
      comunidad: "null",
      colinda: this.valor8,
      latitud: this.valor9,
      longitud: this.valor10,
      costoPropiedad: 0
    }
    this.usuariosService.addNewTerreno(newTerreno).subscribe((rest:any) => {})
    

    const historial:Historial={
      nomUsuari: this.U,
      fecha: new Date(),
      latitud: this.valor9,
      longitud: this.valor10,
      idl: this.tipo
    }
    console.log(this.tipo)
    this.usuariosService.newHistorial(historial).subscribe((historial:any)=>{})
    this.router.navigateByUrl('/mis terrenos')
  }
    })
  }
  y(){
    let nombreC=(this.valor1+" "+this.valor2+" "+this.valor3)
    if(this.valuador!=="" ){
      this.T1="";
      const dialogRef = this.dialog.open(DialogoComponent,{
        width:'350px',
        data:'¿Deseas confirmar la consulta con el evaluador?'
      });
      dialogRef.afterClosed().subscribe(dialogRef => {
        if(dialogRef){
    const consulta:Consulta={
      nomUsuari: this.valuador,
      fecha: new Date(),
      nombre: nombreC,
      estadoC: "",
      idT:this.tipo,
    }
    this.usuariosService.newConsulta(consulta).subscribe((rest: any)=>{
      
    })
    this.router.navigateByUrl('/mis terrenos')
  }
})}else{
this.T1="Tienes que seleccionar un Valuador para realisar la consulta"
}
}
editar(){
  this.valor13=this.valor11*this.valor12;
  const newTerreno:Terreno={
    idl: this.tipo,
    idTerreno: this.valor0,
    nombre_pro: this.U,
    ancho: this.valor11,
    largo: this.valor12,
    area: this.valor13,
    estado: this.valor6,
    municipio: this.valor7,
    comunidad: "null",
    colinda: this.valor8,
    latitud: this.valor9,
    longitud: this.valor10,
    costoPropiedad: 0
  }
  this.usuariosService.actualizarTerreno(this.rr,newTerreno).subscribe(res => {
    console.log(res)
  })
  window.location.reload();
}
cancelar(){
  this.router.navigateByUrl("/mis terrenos");
}
eliminar() {
  let item=this.tipo;
  this.t = 0;
  this.usuariosService.getTerrenos().subscribe((rest: any) => {
    this.usuariosService.getHistorial().subscribe((historial: any) => {
      this.usuariosService.getConsulta().subscribe((consulta: any) => {
        for (let i = 0; i < historial.length; i++) {
          let hist = historial[i].idl;
          if (item == hist) {
            let j = historial[i]._id;
            for (let i = 0; i < rest.length; i++) {
              let numT = rest[i].idl;
              if (item == numT) {
                let v= rest[i]._id;
                for (let i = 0; i <consulta.length; i++){
                  let cost = consulta[i].idT;
                  if(item == cost){this.t=1
                  }
                }
                if(this.t!=1){
                  const dialogRef = this.dialog.open(DialogoComponent,{
                    width:'350px',
                    data:'¿Deseas eliminar el terreno?'
                  });
                  dialogRef.afterClosed().subscribe(dialogRef => {
                    if(dialogRef){
                  this.usuariosService.eliHistorial(j).subscribe((rest: any)=>{})
                  this.usuariosService.eliTerreno(v).subscribe((rest: any)=>{})
                  this.router.navigateByUrl("/mis terrenos");
                    }
                });
                }else{
                  alert("Tu terreno esta siendo evaluado")
                }

              }
            }

          }
        }
      });
    });
  });
}
}
