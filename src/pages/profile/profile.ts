import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../../services/storage.service';

//controlador da pagina profile

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;

  constructor(
    public navCtrl:NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        //buscar imagem, faxendo resuisiçao get para buscar a imagem
        this.getImageIfExistes();

      },
      error => {})
    }
  }

  //testar se imagem existe
  getImageIfExistes(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response =>{
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

}
