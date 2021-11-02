import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../config/api.config';
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService{

  //para autenticar no back tenho que enviar email e senha para o back no endpoint login
  constructor(public http : HttpClient){

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

}