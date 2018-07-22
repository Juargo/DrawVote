import { Component } from '@angular/core';
import { DrawvoteCrudService } from './drawvote-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _drawcrudservice: DrawvoteCrudService) { }
  public artistas;

  ngOnInit() {
    this._drawcrudservice.getArtistas()
      .subscribe(data => {
        console.log(data)
        this.artistas = data;
      })
  }
}
