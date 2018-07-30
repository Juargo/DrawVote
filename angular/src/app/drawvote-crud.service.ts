import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Iartistas, Iievent, Ievent } from './struct'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawvoteCrudService {

  constructor(private http: HttpClient) { }

  private _url: string = "http://192.168.0.8:8080";
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  public getArtistas(): Observable<Iartistas[]> {
    return this.http.get<Iartistas[]>(this._url + "/getArtistas")
  }

  public insertEvento(Body): Observable<Iievent> {
    console.log(Body.Reto)
    let data ={ "Reto": Body.Reto, "Fecha": Body.Fecha, "Despcipcion": Body.Descripcion, "Participantes": Body.Participantes}
    return this.http.post<Iievent>(this._url + "/insertEvento", JSON.stringify(data), this.options)
  }

}
