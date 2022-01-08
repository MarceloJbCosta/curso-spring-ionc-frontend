import { CartService } from './../services/domain/cart.service';
import { AuthInterceptorProvider } from './../interceptors/auth-intercerptor';
import { StorageService } from './../services/storage.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { ClienteService } from '../services/domain/cliente.service';
import { ProdutoService } from '../services/domain/produto.service';
import { ImageUtilService } from '../services/image-util.service';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    ImageUtilService

  ]
})
export class AppModule {}
