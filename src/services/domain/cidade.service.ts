import { CidadeDTO } from './../../models/cidade.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CidadeService {

  constructor(public http: HttpClient){

  }
  /**metodo responsavel por retornar as estados */
  findAll(estado_id: string) : Observable<CidadeDTO[]>{
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
  }

}
