import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';

import { FakeProducts } from '../../providers/FakeService/FakeProducts';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  

  products: Array<{id: number, title: string, image: string}> = [];
  constructor(public navCtrl: NavController) {
    this.products=FakeProducts.getProducts();
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

}
