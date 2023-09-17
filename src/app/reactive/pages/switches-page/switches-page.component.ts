import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  constructor(private fb: FormBuilder) {}

  //ngSubmit
  onSave() {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
  }


}
