import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';


/*
controlador da pagina
*/
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }
/*
Desabilitando o menu lateral na tela de login,
depois que o login for feito o mnu lateral sera habilitado novamente
*/
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
}
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
}

  login(){
    console.log(this.creds)
    this.navCtrl.setRoot('CategoriasPage');
  }

}
