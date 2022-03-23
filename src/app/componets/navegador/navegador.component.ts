import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.scss']
})
export class NavegadorComponent implements OnInit {
  public resultado="";
  constructor(private router: Router) { }
 y(){
  this.router.navigateByUrl('/home')
 }
 j(){
  this.router.navigateByUrl('/mis terrenos')
}
l(){
   this.router.navigateByUrl('/evaluar terrenos')
}
s(){
  this.router.navigateByUrl('/login')
  localStorage.setItem('resultados',  this.resultado )
 }
  ngOnInit(): void {
  }
 
}
