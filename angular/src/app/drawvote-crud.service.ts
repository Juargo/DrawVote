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
    let _participantes = ''
    for (let item of Body.Participantes){
      _participantes = _participantes + '"' + item + '",'
    }
    _participantes = _participantes.substring(0,_participantes.length - 1 )
    let data ={ "Reto": Body.Reto, "Fecha": Body.Fecha, "Descripcion": Body.Descripcion, "Participantes": _participantes}
    //INTENTANDO ENVIAR PARTICIPANTES COMO ARRAY
    //let data ={ "Reto": Body.Reto, "Fecha": Body.Fecha, "Descripcion": Body.Descripcion, "Participantes": Body.Participantes}
    //ERROR 2018/07/30 18:59:30 Cannot run insert statementsql: converting argument $4 type: unsupported type []string, a slice of string
    return this.http.post<Iievent>(this._url + "/insertEvento", JSON.stringify(data), this.options)
  }

}
