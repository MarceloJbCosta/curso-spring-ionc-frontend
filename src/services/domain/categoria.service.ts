import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CategoriaService {

  constructor(public http: HttpClient){

  }
  /**metodo responsavel por retornar as categorias */
  findAll() : Observable<CategoriaDTO[]>{
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`)
  }

}
