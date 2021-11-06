import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';


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

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
    ) {

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
    this.auth.authenticate(this.creds)
    .subscribe(response =>{
      this.auth.successFulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});

  }

}
