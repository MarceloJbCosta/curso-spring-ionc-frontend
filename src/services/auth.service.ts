import { LocalUser } from './../models/local_user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../config/api.config';
import { CredenciaisDTO } from "../models/credenciais.dto";
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService{

  jwtHelper : JwtHelper = new JwtHelper();

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
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub // faz pegar o email do token
    };
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}
