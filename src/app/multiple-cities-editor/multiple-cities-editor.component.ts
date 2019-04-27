import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-multiple-cities-editor',
  templateUrl: './multiple-cities-editor.component.html',
  styleUrls: ['./multiple-cities-editor.component.css']
})
export class MultipleCitiesEditorComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      cities: this.fb.array([])
    })

    this.setCities();
  }

  data = {
    cities: [
      {
        city: "",
        addressLines: [
          {
            addressLine: "",
          }
        ]
      }
    ]
  }

  setCities() {
    let control = <FormArray>this.myForm.controls.cities;
    this.data.cities.forEach(x => {
      control.push(this.fb.group({ 
        city: x.city, 
        addressLines: this.setAddressLines(x) }))
    })
  }

  setAddressLines(x) {
    let arr = new FormArray([])
    x.addressLines.forEach(y => {
      arr.push(this.fb.group({ 
        addressLine: y.addressLine 
      }))
    })
    return arr;
  }

  onSubmit() {
    alert(this.myForm.value);
  }
  
  ngOnInit() {
  }

}