import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService{

  constructor( public http: HttpClient, public storage: StorageService){

  }
    findByEmail(email: string)  {

      //pegar o valor do token
      //let token = this.storage.getLocalUser().token
      //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

      //na aula 147 tiramos a tipagem do metodo, ou seja vai retornar exatamente o que esta no banco de dados

      return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);

    }

    findById(id: string)  {
      return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);

    }
    //metodo para buscar imagem no buket
    getImageFromBucket(id : string) : Observable<any>{
      let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
      return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClienteDTO){
      return this.http.post(
        `${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );

    }



}
