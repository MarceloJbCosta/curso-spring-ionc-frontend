import { FieldMessage } from './../models/fieldmessage';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage : StorageService, public alertCtrl : AlertController){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .catch((error, caught) => {
        let errorObj = error;
        if(errorObj.error){
          errorObj = errorObj.error;
        }
        if(!errorObj.status){
          errorObj = JSON.parse(errorObj);
        }

        //console.log("Erro detectado pelo Interceptor");
        //console.log(errorObj);


        switch(errorObj.status){
          case 401:
          this.handle401();
          break;

          case 403:
          this.handle403();
          break;

          case 422:
            this.handle422(errorObj);
            break;

          default:
            this.handleDefaultError(errorObj);

        }

      return Observable.throw(errorObj);
    })as any;
  }

  handle403(){
    this.storage.setLocalUser(null);
  }
  handle401(){
    //criando um alerta personalizado
    let alert = this.alertCtrl.create({
      title: 'Erro 401 : Falha de autenticação',
      message: 'Email ou senha Incorretos',
      enableBackdropDismiss: false,//para sair do alerter tem que apertar no botao
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();

  }
  handle422(errorObj){
    let alert = this.alertCtrl.create({
      title: 'Erro 422, Validação',
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,//para sair do alerter tem que apertar no botao
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();

  }

  handleDefaultError(errorObj){
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,//para sair do alerter tem que apertar no botao
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();

  }
  private listErrors(messages : FieldMessage[]) : string{
    let s : string = '';
    for(var i=0; i<messages.length; i++){
      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }


}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
