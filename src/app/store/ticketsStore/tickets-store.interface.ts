import { ITicket } from "../../models/ticket.interface";

export interface ITicketsStore{
    tickets:ITicket[],
    isCreatingTicket: boolean
}