import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

// Nomencladores config
import {nomencladoresFormConfig} from '../../config/nomencladores'

// AsyncVal
import {AsyncValServiceService} from '../../directive/exist-field/async-val-service.service'

// Service 
import {GeneralApiServicesService} from '../../service/general-api-services.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,
    private asyncValDirective : AsyncValServiceService,
    private _generalApi : GeneralApiServicesService,
    ) {}

  nomencladoresConfig = nomencladoresFormConfig;

  @Input() formType: number; // get the form type AKA: selected nomenclature

  @Output() cancelEvent = new EventEmitter(); // If the creation was canceled

  // Validación async -> El asyncValidators:[this.asyncValDirective.customVal2()]

  name = new FormControl(null, {validators: [Validators.required], updateOn:"blur"}); // Form input
  slug = new FormControl(null, [Validators.required]); // Form input

  //Form Group
  ngOnInit(): void {
    console.log(this.formType);
    this.name.setAsyncValidators(this.asyncValDirective.nomencladoresAsynVal()) // Async validation
  }

  // Send the cancel event
  sendCancelEvent() {
    this.cancelEvent.emit(0);
  }

  // Handles the data creation
  create() {
    const formData = new FormData();
    formData.append('name', this.name_nomenclador.value);
    let slug = this.createSlug(this.name_nomenclador.value);
    console.log(slug)
    formData.append('slug', slug);
    this.post(formData).then(data =>{
      console.log(data);
      this.sendCancelEvent();
    },
    err =>{
      console.log("Salio algo mal")
    })
    
    
  }

  // Geth nomenclature name
  get name_nomenclador() {
    return this.name;
  }

  // Create slug from nomenclature
  createSlug(value) {
    let char = [...value];
    let new_text = '';
    char.forEach((element) => {
      if (element === ' ') new_text += '_';
      else new_text += element;
    });
    return new_text.toLowerCase();
  }

  // Creates the nomenclature taking into account the value selected in the items components
  post(data) {
    switch (this.formType) {
      case 1:
        return this._generalApi.postCategory(data)
        break;
      case 2:
        return this._generalApi.postDifficulty(data)
        break;
      case 3:
        return this._generalApi.postMeasurement(data)
        break;
      case 4:
        return this._generalApi.postProduct(data)
        break;
    }
  }
}
