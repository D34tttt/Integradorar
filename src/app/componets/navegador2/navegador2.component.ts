import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegador2',
  templateUrl: './navegador2.component.html',
  styleUrls: ['./navegador2.component.scss']
})
export class Navegador2Component implements OnInit {
  resultado="";
  
  constructor(private router: Router) { }
  s(){
    this.router.navigateByUrl('/login')
    localStorage.setItem('resultados',  this.resultado )
   }
  ngOnInit(): void {
  }
  y(){
    this.router.navigateByUrl('/evaluar terrenos')
  }
}
