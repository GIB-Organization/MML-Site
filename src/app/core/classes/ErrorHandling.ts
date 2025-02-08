import { AuthApiService } from './../../services/api/authApi/auth-api.service';
import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, Injector } from "@angular/core";
import { ToasterService } from "../../services/toaster/toaster.service";
import { AuthStoreService } from "../../store/authStore/auth-store.service";
import { ErrorCodes } from '../enums';

interface IErrorHandlingStrategy{
    handleErrorResponse(error: HttpErrorResponse): void;
}

@Injectable({providedIn:'root'})
export class ErrorHandlerStrategy{
    injector = inject(Injector)
    private authApiService = inject(AuthApiService);
    errorInstance!:IErrorHandlingStrategy;
    createErrorInstance(error:HttpErrorResponse){
        if((error.status === ErrorCodes.unauthorized) && error.url?.includes(this.authApiService.refreshPath)) {
            this.errorInstance = this.injector.get(UnAuthorizedErrorResponse);
        }
    }
}

@Injectable({providedIn:'root'})
export class UnAuthorizedErrorResponse implements IErrorHandlingStrategy{
    private toaster = inject(ToasterService);
    private authStoreService = inject(AuthStoreService);
    handleErrorResponse(error: HttpErrorResponse): void {
        this.toaster.addError('httpErrors.401');
        this.authStoreService.logout();
    }
}

@Injectable({providedIn:'root'})
export class NotFoundErrorResponse implements IErrorHandlingStrategy{
    private toaster = inject(ToasterService);
    handleErrorResponse(error: HttpErrorResponse): void {
        // this.toaster.addError('Not Found');
    }
}