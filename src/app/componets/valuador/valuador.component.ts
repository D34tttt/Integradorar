import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-valuador',
  templateUrl: './valuador.component.html',
  styleUrls: ['./valuador.component.scss']
})
export class ValuadorComponent implements OnInit {
  Tipo:Array<any> = [];

  constructor(private router: Router, private usuariosService: UsuariosService) { }

  r(){
    this.router.navigateByUrl('/terreno a evaluar')
  }
  ngOnInit(): void {
    this.p()
  }
  p(){
    this.usuariosService.getConsulta().subscribe((rest:any)=>{
      let p=0;
      let resultado=localStorage.getItem('resultados');
      let l=String(resultado)
      for (let i = 0; i < rest.length; i++){
          let r=rest[i].nomUsuari;
          if(l==r){
            this.Tipo[p]=rest[i]
            p++;
          }
        }
    })
  }
}
