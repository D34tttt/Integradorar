import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CargarComponent } from '../cargar/cargar.component';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { EchoComponent } from '../echo/echo.component';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  public Tipo: Array<any> = [];
  t = 0;
  constructor(public dialog: MatDialog,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
  }

  ngOnInit(): void {
    this.p();

  }
  eliminar(item: 0) {
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
                        let yo=this.dialog.open(CargarComponent,{
                        });
                        yo.afterClosed().subscribe(dialogRef => {
                          if(dialogRef){
                          }else{
                            let correcto=this.dialog.open(EchoComponent,{
                              data:'Terreno Eliminado correctamente'
                            });
                            correcto.afterClosed().subscribe(dialogRef => {
                              this.usuariosService.eliHistorial(j).subscribe((rest: any)=>{})
                              this.usuariosService.eliTerreno(v).subscribe((rest: any)=>{})
                              window.location.reload();
                            })
                            
                          }
                        })
                    
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
  p() {
    this.usuariosService.getHistorial().subscribe((rest: any) => {
      let p = 0;
      let resultado = localStorage.getItem('resultados');
      let l = String(resultado);
      for (let i = 0; i < rest.length; i++) {
        let r = rest[i].nomUsuari;
        if (l == r) {
          this.Tipo[p] = rest[i];
          p++;
        }
      }
    });
  }
  editar(item:0){
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
                    localStorage.setItem('Terreno',  v ) ;
                   this.router.navigateByUrl('/editar')
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
  ver(item:string){

    this.usuariosService.getTerrenos().subscribe((rest: any) => {
        for (let i = 0; i <rest.length; i++){
           let idl= rest[i].idl
          if(item==idl) {
            let idr= rest[i]._id
            localStorage.setItem('Terreno',  idr ) ;
            this.router.navigateByUrl('/ver')
          }
        }
    })
  }
}
