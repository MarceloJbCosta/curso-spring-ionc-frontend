import { LocalUser } from './../models/local_user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../config/api.config';
import { CredenciaisDTO } from "../models/credenciais.dto";
import { StorageService } from './storage.service';

@Injectable()
export class AuthService{

  //para autenticar no back tenho que enviar email e senha para o back no endpoint login
  constructor(public http : HttpClient, public storage: StorageService){

  }

  authenticate(creds : CredenciaisDTO){
   return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
    })
  }
  successFulLogin(authorizationVAlue : string){
    let tok = authorizationVAlue.substring(7);
    let user : LocalUser = {
      token: tok
    };
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}
