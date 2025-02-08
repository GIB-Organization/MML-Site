import { IPolicy } from "../../models/policy.interface";

export interface IPoliciesStore{
    policies:IPolicy[]
    fileIsLoading: boolean,
}