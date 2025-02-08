import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILoginDTOFormGroup } from '../../models/auth.interface';
import { VALIDATORS } from '../../core/validations/global.validators';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  #fb = inject(FormBuilder);
  form= this.#fb.group<ILoginDTOFormGroup>({
    email: this.#fb.control('', [VALIDATORS['email'], Validators.required]),
    password: this.#fb.control('', [Validators.required]),
  })
  get email(){
    return this.form.controls.email;
  }
  get password(){
    return this.form.controls.password;
  }
}
