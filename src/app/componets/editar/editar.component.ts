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
  user: any;
  resultad="";
  tipo=0;
  public Tipo: Array<any> = [];
  U="";
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
    this.getNumT()
    let date= new Date();
    let dia=date.getDate();
    let mes=date.getMonth()
    let year=date.getFullYear();
    let tiem=date.getHours()
    let min=date.getMinutes()
    this.data=(dia+"-"+ mes+"-"+ year+" "+tiem+":"+min)
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
    
  }
})}else{
this.T1="Tienes que seleccionar un Valuador para realisar la consulta"
}
}
  

}
