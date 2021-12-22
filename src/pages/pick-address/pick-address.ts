import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.items = [
     {
       id: "1",
       logradouro: "rua quinze de Novembro",
       numero: "300",
       bairro: "Santa monica",
       complemento: "apto",
       cep: "35278922",
       cidade: {
         id: "1",
         nome:"uberlandia",
         estado:{
           id:"1",
           nome:"minas Gerais"
         }
       }
     },
     {
      id: "2",
      logradouro: "rua alexandre toledo",
      numero: "410",
      bairro: "Centro",
      complemento: null,
      cep: "76654356",
      cidade: {
        id: "3",
        nome:"Sao paulo",
        estado:{
          id:"2",
          nome:"Sao Paulo"
        }
      }
     }
   ];
  }

}
