import { ValidatorFn, Validators } from "@angular/forms";

export const INSURNACE_INQUIRE_VALIDATORS: { [key: string]: ValidatorFn[] } = {
    serialNumber: [Validators.required, Validators.pattern(/^.{6,9}$/)],
    required: [Validators.required],
    idNumber: [Validators.required, Validators.pattern(/^[12][\d\w]{9}$/), Validators.minLength(10), Validators.maxLength(10)],
}