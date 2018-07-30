import { Component } from '@angular/core';
import { DrawvoteCrudService } from './drawvote-crud.service';
import { FormBuilder, Validators, FormGroup, FormArray,FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _drawcrudservice: DrawvoteCrudService, private fb: FormBuilder) { this.createForm()}
  public artistas;

  EventoForm: FormGroup;
  

  createForm(){
    this.EventoForm = this.fb.group({
      Fecha :['', Validators.required],
      Reto: [''],
      Descripcion:['',Validators.required],
      Participantes: this.fb.array([])
    })
  }

  ngOnInit() {
    this._drawcrudservice.getArtistas()
      .subscribe(data => {
        console.log(data)
        this.artistas = data;
      })
      console.log(this.EventoForm)
  }

  onChange(participante:string, isChecked: boolean) {
    const participanteFormArray = <FormArray>this.EventoForm.controls.Participantes;
  
    if(isChecked) {
      participanteFormArray.push(new FormControl(participante));
    } else {
      let index = participanteFormArray.controls.findIndex(x => x.value == participante)
      participanteFormArray.removeAt(index);
    }
  }

  onFormSubmit(){
    if (this.EventoForm.valid) {
      let event = this.EventoForm.value;
      //console.log(event)
      this._drawcrudservice.insertEvento(event)
      .subscribe(data => console.log(data))
    }
  }


}
