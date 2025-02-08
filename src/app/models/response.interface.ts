import { HttpErrorResponse } from "@angular/common/http"

export interface IResponse<Response>{
    message?:string,
    result: Response,
}
export interface IErrorResponse extends HttpErrorResponse{
    error:{
        status:number,
        message: string
    }
}

export interface IPageDto<Response>{
    totalRecords: number,
    data:Response
}

export interface IPagingResponse<Response> extends IResponse<IPageDto<Response>>{}