import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerStrategy } from '../../classes/ErrorHandling';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlerStartegy = inject(ErrorHandlerStrategy)
  const errorHandler = (err:HttpErrorResponse)=>{
     errorHandlerStartegy.createErrorInstance(err)
     return errorHandlerStartegy?.errorInstance;
  }
  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    errorHandler(err)?.handleErrorResponse(err);
    return throwError(() => err);
  }));
};
