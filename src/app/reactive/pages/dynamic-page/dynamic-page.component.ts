import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  newFavorite: FormControl = new FormControl('', Validators.required);

  myForm: FormGroup = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  constructor(private fb: FormBuilder) {}

  onAddToFavorites() {
    if(this.newFavorite.invalid) return;
    const newFavorite = this.newFavorite.value;
    console.log("NEWFAV", newFavorite);
    this.favoriteGames.push(
      this.fb.control(newFavorite, Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return ;
    }
    console.log("FORM", this.myForm.value);
    this.myForm.controls['favoriteGames'] = new FormArray([]);
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
