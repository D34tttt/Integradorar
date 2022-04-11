import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Historial } from 'src/app/models/servisiobasedatos';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CargarComponent } from '../cargar/cargar.component';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { EchoComponent } from '../echo/echo.component';
interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-valuador',
  templateUrl: './valuador.component.html',
  styleUrls: ['./valuador.component.scss']
})
export class ValuadorComponent implements OnInit {
  Tipo: Array<any> = [];
  file?:File ;
  constructor(private router: Router, private usuariosService: UsuariosService, private dialog:MatDialog) { }

  r(item: 0) {
    let tipo = String(item);
    localStorage.setItem('Terreno', tipo);
    this.router.navigateByUrl('/terreno a evaluar')
    this.usuariosService.getHistorial().subscribe((rest: any) => {
      for (let i = 0; i < rest.length; i++) {
        let tip = rest[i].idl;
        if (item == tip) {
          let id = String(rest[i]._id);
          const historial: Historial = {
            status: 'se esta valorando en este momento',
            idl: rest[i].idl,
            nomUsuari: rest[i].nomUsuari,
            fecha: rest[i].fecha,
            latitud: rest[i].latitud,
            longitud: rest[i].longitud,
          }
          this.usuariosService.actualizarHistorizl(id, historial).subscribe((rest: any) => {

          });
        }
      }
    });

  }
  ngOnInit(): void {
    this.p()
  }
  p() {
    this.usuariosService.getConsulta().subscribe((rest: any) => {
      let p = 0;
      let resultado = localStorage.getItem('resultados');
      let l = String(resultado)
      for (let i = 0; i < rest.length; i++) {
        let r = rest[i].nomUsuari;
        if (l == r) {
          this.Tipo[p] = rest[i]
          p++;
        }
      }
    })

  }
  cancelar() {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '350px',
      data: '¿Deseas confirmar que cancelas la consulta?'
    });
    dialogRef.afterClosed().subscribe(dialogRef => {
      if (dialogRef) {
        let yo=this.dialog.open(CargarComponent,{
        });
        yo.afterClosed().subscribe(dialogRef => {
          if(dialogRef){
          }else{
            let correcto=this.dialog.open(EchoComponent,{
              data:'valuacion Cancelada Correctamente'
            });
            correcto.afterClosed().subscribe(dialogRef => {
                
              
            })
            
          }
        })
      }
    })
  }
  
}
