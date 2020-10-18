import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecintosService {

  api="https://www.controlelectoralcctarija.com/api";
  constructor(private http: HttpClient) {
    
  }
  all():Observable<any>{
    return this.http.get<any>(`${this.api}/recintos`);
  }
  getMesasCargadas(idrec):Observable<any>{
    return this.http.get<any>(`${this.api}/votacion/recinto/${idrec}`);
  }
  aperturarMesa(idrec,data){
    return this.http.put<any>(`${this.api}/recintos/${idrec}/mesa`,data);
  }
}
