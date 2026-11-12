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

  /** Empties the form and marks it untouched (VULN-073): nothing the user typed outlives the dialog step that needed it. */
  clear(){
    this.form.reset({ email: '', password: '' });
  }

  /** After a failed attempt: the password goes, the e-mail stays so the user does not retype it. */
  clearSecrets(){
    this.password.reset('');
  }
}
