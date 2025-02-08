import { FormControl } from "@angular/forms"
import { ETicketStatus } from "../core/enums"

export interface ITicket {
    id: string,
    subject:string,
    lastMessage: string,
    isReplied: boolean,
    status: ETicketStatus
}
export interface ITicketCreate{
    subject: string,
    details: string,
    file: File
}

export interface ITicketCreateFormGroup{
    subject: FormControl<string>,
    details: FormControl<string>,
    file: FormControl<File | null>
}