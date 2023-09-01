import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  myForm: FormGroup = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  constructor(private fb: FormBuilder) {}

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return ;
    }
    console.log("FORM", this.myForm.value);
    this.myForm.reset();
  }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  getFieldError(field: string): string | null {
    if(!this.myForm.controls[field]) return null; 
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      console.log(key);
      switch (key) {
        case 'required':
          return 'Este campo es requerido';  
        case 'minlength':
        return `Mínimo ${errors['minlength'].requiredLength } caracteres.`;
      }
    }
      return null;
  }

}
