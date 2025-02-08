import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IRegisterDTOFormGroup } from '../../models/auth.interface';
import { INSURNACE_INQUIRE_VALIDATORS } from '../../core/validations';
import { VALIDATORS } from '../../core/validations/global.validators';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  #fb = inject(FormBuilder);
  form= this.#fb.group<IRegisterDTOFormGroup>({
    fullName: this.#fb.control('', [Validators.minLength(8), Validators.required]),
    nationalId: this.#fb.control(null, INSURNACE_INQUIRE_VALIDATORS['idNumber']),
    phoneNumber: this.#fb.control(null, [VALIDATORS['phone'], Validators.required]),
    email: this.#fb.control('', [VALIDATORS['email'], Validators.required]),
    password: this.#fb.control('', [VALIDATORS['password'], Validators.required]),
    confirmPassword: this.#fb.control('', [VALIDATORS['password'], Validators.required]),
    agreeTerms: this.#fb.control(true, [Validators.requiredTrue]),
  })

  get fullName(){
    return this.form.controls.fullName;
  }
  get nationalId(){
    return this.form.controls.nationalId;
  }
  get phoneNumber(){
    return this.form.controls.phoneNumber;
  }
  get email(){
    return this.form.controls.email;
  }
  get password(){
    return this.form.controls.password;
  }
  get confirmPassword(){
    return this.form.controls.confirmPassword;
  }
  get agreeTerms(){
    return this.form.controls.agreeTerms;
  }

  get formIsValid(){
    return this.form.valid && this.password.value === this.confirmPassword.value
  }
}
