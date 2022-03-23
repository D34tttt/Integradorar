import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, Estados, Municipios, Comunidades, tipoUsuario, NumT, Terreno, Historial, Consulta } from '../models/servisiobasedatos';



@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  url="http://localhost:4400/api/Usuarios"
  url1="http://localhost:4400/api/Estados"
  url2="http://localhost:4400/api/Municipios"
  url3="http://localhost:4400/api/Comunidades"
  url4="http://localhost:4400/api/Tipos"
  url5="http://localhost:4400/api/num/6238aba595a6f92cc4bb3576"
  url6="http://localhost:4400/api/nums"
  url7="http://localhost:4400/api/terrenos"
  url8="http://localhost:4400/api/historiales"
  url9="http://localhost:4400/api/Consultas"
  url10="http://localhost:4400/api/historial/"
  url11="http://localhost:4400/api/terreno/"
  constructor(private http: HttpClient) { 
   
  }
  getPersonas(){
  let header = new HttpHeaders()
  .set('Type-content','aplication/json')

  return this.http.get<Usuario>(this.url,{
    
  });
  
  }
   addNewUsuari(Usuario:Usuario):Observable<Usuario>{
     return this.http.post<Usuario>(this.url,Usuario);
   }
   getEstado(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<Estados>(this.url1,{
      
    });
   }
   getMunicipio(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<Municipios>(this.url2,{
      
    });
   }
   getComunidad(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<Comunidades>(this.url3,{
      
    });
   }
   getTipo(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<tipoUsuario>(this.url4,{
      
    });
   }
   getNumt(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<NumT>(this.url6,{
      
    });
   }
   actualizarNum(NumT:NumT):Observable<NumT>{
    return this.http.put<NumT>(this.url5,NumT);
  }
  getTerrenos(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<Terreno>(this.url7,{
      
    });
   }
  addNewTerreno(Terreno:Terreno):Observable<Terreno>{
    return this.http.post<Terreno>(this.url7,Terreno);
  }
  eliTerreno(t:string):Observable<Terreno>{
    return this.http.delete<Terreno>(this.url11+t);
  }

  getHistorial(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<Historial>(this.url8,{
      
    });
   }
   newHistorial(Historial:Historial):Observable<Historial>{
    return this.http.post<Historial>(this.url8,Historial);
  }
  eliHistorial(id:string):Observable<Historial>{
    return this.http.delete<Historial>(this.url10+id)
  }

  getConsulta(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  
    return this.http.get<Consulta>(this.url9,{
      
    });
   }
   newConsulta(Consulta:Consulta):Observable<Consulta>{
    return this.http.post<Consulta>(this.url9,Consulta);
  }
}