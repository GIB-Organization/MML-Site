import { FormControl } from "@angular/forms"

export interface IContactUs{
    email: string,
    phone: string,
    message: string,
    fullName:string,
    subject:string
}
export interface IContactUsFormGroup{
    email: FormControl<string>,
    phone: FormControl<string>,
    message: FormControl<string>,
    fullName:FormControl<string>,
    subject:FormControl<string>
}