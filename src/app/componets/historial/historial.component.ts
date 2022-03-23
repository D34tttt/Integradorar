import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  public Tipo: Array<any> = [];
  t=0;
  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {
  }

  ngOnInit(): void {
    this.p();

  }
  eliminar(item: 0) {
    this.t=0;
    console.log(item);
    this.usuariosService.getTerrenos().subscribe((rest: any) => {
      this.usuariosService.getHistorial().subscribe((historial: any) => {
        this.usuariosService.getConsulta().subscribe((consulta: any) => {
        for (let i = 0; i < historial.length; i++) {
          let hist = historial[i].idl;
          if (item == hist) {
              let j=historial[i]._id;
            for (let i = 0; i < rest.length; i++) {
              let numT = rest[i].idl;
              if (item == numT) {
                 let y=rest[i]._id;
                 for (let i = 0; i < rest.length; i++) {
                      let cosulta=consulta[i].idTerreno
                     
                     if(item==cosulta){this.t=1}
                     
                }
                if(this.t!=1){
                  console.log(
                  "hola"
                  )
               }else{
                 alert("este terreno esta en proseso para su valoracio")
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
}
