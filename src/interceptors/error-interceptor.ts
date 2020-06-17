import {Injectable} from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler, HTTP_INTERCEPTORS, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    intercept (req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
       console.log("passou no interceptor");
        return next.handle(req)
        .catch((error, caugh) => {
            let errorObj = error;
            if (errorObj.error){
                errorObj =errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.log("erro detectado pelo interceptor");
            console.log(errorObj);
            return Observable.throw(errorObj);
        }) as any;
    }
}
 export const ErrorInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi:true,

 };