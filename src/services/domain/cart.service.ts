import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";


@Injectable()
export class CartService{

  constructor(public storage: StorageService){

  }

  createOrClearCart(): Cart{
    let cart: Cart = {items: []};//carrinho vazio
    this.storage.setCart(cart);
    return cart;
  }

  //obter o carrinho
  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if(cart == null){
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart{
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if(position == -1){
      cart.items.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);
    return cart;

  }

}
