import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService
    ) {

      this.formGroup = this.formBuilder.group({
        nome: ['marcelo costa', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['marcelomogueco@gmail.com', [Validators.required, Validators.email]],
        tipo:['1', [Validators.required]],
        cpfOuCnpj: ['07234529462', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Via', [Validators.required]],
        numero: ['25', [Validators.required]],
        complemento: ['Apto 1101', []],
        bairro: ['Recife', []],
        cep: ['51130030', [Validators.required]],
        telefone1: ['863715261', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: ['', [Validators.required]]
      });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error =>{});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error =>{});
  }

  signupUser(){
    console.log("enviou o form");
  }
}
