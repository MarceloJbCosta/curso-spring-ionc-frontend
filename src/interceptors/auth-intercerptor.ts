import { API_CONFIG } from './../config/api.config';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage : StorageService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    //pegar o tamanho da minha bse URl
    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;


    if(localUser && requestToAPI){
      const authReq = req.clone({headers: req.headers.set(`Authorization`, 'Bearer ' + localUser.token )});
      return next.handle(authReq);
    }
    else{
     return next.handle(req);
    }



  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
