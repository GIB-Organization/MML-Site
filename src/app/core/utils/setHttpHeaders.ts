import { HttpRequest } from "@angular/common/http";

export function setHttpHeaders(req: HttpRequest<any>, token: string|undefined) {
    const isFormData:boolean = req.body instanceof FormData || req.responseType === 'blob';
    const REQ = req.clone({
        setHeaders: {
            ...!isFormData&&{'Content-Type':'application/json'},
            'Authorization': `Bearer ${token}`,
            'accept':'application/pdf'
        }
    })
    return REQ;
}