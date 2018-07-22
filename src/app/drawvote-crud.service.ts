import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iartistas } from './struct'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawvoteCrudService {

  constructor(private http: HttpClient) { }

  private _url:string = "http://192.168.0.6/CRUD.php?option=getArtistas";

  public getArtistas(): Observable<Iartistas[]>{
      return this.http.get<Iartistas[]>(this._url)
  }

}
