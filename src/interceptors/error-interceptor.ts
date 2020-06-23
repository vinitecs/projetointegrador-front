import {Injectable} from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler, HTTP_INTERCEPTORS, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from '../app/services/storage.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(public storage: StorageService){

    }
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
            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;

            }
            return Observable.throw(errorObj);
        }) as any;
    }

    handle403(){
            this.storage.setLocalUser(null);
    }
}
 export const ErrorInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi:true,

 };